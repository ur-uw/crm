<template>
  <div v-if="!isUserLoading" class="ps-5 py-5">
    <h3 class="fw-bold mb-5">Account Settings</h3>
    <n-divider />
    <h5 class="fw-bold mt-5">Personal Information</h5>
    <n-form ref="formRef" :model="model" :rules="rules" class="mt-5">
      <div class="avatar-wrapper mb-3 px-3 d-flex align-items-center justify-content-start">
        <n-form-item>
          <n-avatar
            class="avatar"
            round
            :size="200"
            :src="(user?.images !== null) !== null ? user?.images[0]?.path : null"
          />
        </n-form-item>
        <div
          class="
            avatar-buttons-container
            d-flex
            flex-column
            align-items-center
            justify-content-between
            ms-5
          "
        >
          <n-button class="mb-3" size="large" type="primary">Change picture </n-button>
          <n-button ghost size="large">Delete picture </n-button>
        </div>
      </div>

      <n-grid class="px-3" :x-gap="15" :y-gap="15" cols="2 xs:1 s:1">
        <n-grid-item>
          <n-form-item path="firstName" label="First Name">
            <n-input
              v-model:value="model.firstName"
              class="input-field"
              placeholder=""
              size="large"
            ></n-input>
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item path="lastName" label="Last Name">
            <n-input
              v-model:value="model.lastName"
              class="input-field"
              placeholder=""
              size="large"
            ></n-input>
          </n-form-item>
        </n-grid-item>
      </n-grid>
      <n-form-item path="email" class="px-3" label="Email Address">
        <n-input
          v-model:value="model.email"
          disabled
          class="input-field"
          placeholder="johndoe@email.com"
          size="large"
        >
          <template #suffix>
            <n-icon><MailIcon /></n-icon>
          </template>
        </n-input>
      </n-form-item>

      <n-form-item class="px-3" path="phone" label="Phone Number">
        <n-input
          v-model:value="model.phone"
          class="input-field"
          placeholder=""
          maxlength="15"
          size="large"
        ></n-input>
      </n-form-item>
    </n-form>
    <n-divider />

    <!-- ADDRESS INFORMATION -->

    <h5 class="fw-bold mt-5">Address Information</h5>
    <div v-if="user?.addresses != null" class="user-addresses">
      <div v-if="user?.addresses.length > 0">
        <n-form v-for="(address, index) in user.addresses" :key="index" class="mt-4">
          <n-collapse>
            <n-collapse-item :title="address.name" :name="index">
              <n-grid class="px-3" :x-gap="15" :y-gap="15" cols="2 xs:1 s:1">
                <n-grid-item>
                  <n-form-item label="Country">
                    <n-input
                      v-model:value="address.country"
                      class="input-field"
                      placeholder=""
                      size="large"
                    ></n-input>
                  </n-form-item>
                </n-grid-item>
                <n-grid-item>
                  <n-form-item label="City">
                    <n-input
                      v-model:value="address.city"
                      class="input-field"
                      placeholder=""
                      size="large"
                    ></n-input>
                  </n-form-item>
                </n-grid-item>
              </n-grid>
              <n-form-item class="px-3" label="Address1">
                <n-input
                  v-model:value="address.address1"
                  class="input-field"
                  placeholder="EX: House no.45 second floor, 5th cross"
                  size="large"
                >
                </n-input>
              </n-form-item>
              <n-form-item class="px-3" label="Address2">
                <n-input
                  v-model:value="address.address2"
                  class="input-field"
                  placeholder="EX: Banaswadi, Bangalore, KA 560043"
                  size="large"
                >
                </n-input>
              </n-form-item>
              <n-grid class="px-3" :x-gap="15" :y-gap="15" cols="2 xs:1 s:1">
                <n-grid-item>
                  <n-form-item label="State">
                    <n-input
                      v-model:value="address.state"
                      class="input-field"
                      placeholder="EX: Baghdad/Center"
                      size="large"
                    ></n-input>
                  </n-form-item>
                </n-grid-item>
                <n-grid-item>
                  <n-form-item label="Zip">
                    <n-input
                      v-model:value="address.zip"
                      class="input-field"
                      placeholder="EX: 334341"
                      size="large"
                    ></n-input>
                  </n-form-item>
                </n-grid-item>
              </n-grid>
              <n-divider />
            </n-collapse-item>
          </n-collapse>
        </n-form>
      </div>
      <div v-else><h3 class="text-center text-info">No addresses yet</h3></div>
    </div>
    <n-space size="large" class="pe-3" justify="end">
      <n-button :disabled="!isChangeActive" size="large" ghost @click="discardChanges">
        Discard
      </n-button>

      <n-button
        size="large"
        :disabled="!isChangeActive"
        type="success"
        @click.prevent="changeUserInfo"
      >
        Save Changes
      </n-button>
    </n-space>
  </div>
</template>

<script lang="ts">
  // TODO: IMPLEMENT UPDATING & DELETING ADDRESS FUNCTIONALITY
  // TODO: MAKE SEPARATE COMPONENTS FOR THE FORMS OF ACCOUNT SETTINGS
  import { Mail28Regular as MailIcon } from '@vicons/fluent'
  import { computed, defineComponent, ref, watch } from 'vue'
  import { useStore } from '@/use/useStore'
  import { User } from '@/interfaces/User'
  import { FormItemRule, useMessage } from 'naive-ui'
  import { handleActions, handleApi, validEmail } from '@/utils/helpers'
  import { AllActionTypes } from '@/store/action-types'
  import { MutationTypes as AuthMutations } from '@/store/modules/auth/mutation-types'
  import api from '@/utils/api'
  import { Address } from '@/interfaces/Address'

  export default defineComponent({
    name: 'AccountSettings',
    components: {
      MailIcon
    },
    setup() {
      // INITIALIZE STORE
      const store = useStore()
      // VARIABLES
      const message = useMessage()
      const currentUser = computed<User | null>(() => store.getters.getCurrentUser)
      let userAddresses = ref<Address[] | null>(null)
      const getInitialUserData = () => {
        const userName = currentUser.value?.name?.split(' ')
        return {
          firstName: userName != null ? userName[0] : '',
          lastName: userName != null ? userName[1] : '',
          phone: currentUser.value?.phone,
          email: currentUser?.value?.email
        }
      }
      const initialUserInfo = getInitialUserData()
      const formRef = ref(null)
      const formModel = ref(initialUserInfo)
      const counter = ref(1)
      watch(currentUser, (newVal: User | null) => {
        if (newVal !== null) {
          initialUserInfo.firstName = newVal.name?.split(' ')[0] ?? ''
          initialUserInfo.lastName = newVal.name?.split(' ')[1] ?? ''
          initialUserInfo.email = newVal.email
          initialUserInfo.phone = newVal.phone
        }
      })

      // Form Rules
      const formRules = {
        email: {
          required: true,
          validator: (rule: FormItemRule, value: string) => {
            if (!value) {
              return new Error('Pleas enter your email')
            } else if (!validEmail(value)) {
              return Error('Please enter valid email address')
            }
            return true
          },
          trigger: ['input', 'blur']
        },
        firstName: {
          required: true,
          message: 'Please enter your first name',
          trigger: ['blur']
        },
        lastName: {
          required: true,
          message: 'Please enter your last name',
          trigger: ['blur']
        }
      }

      // Change user info
      const changeUserInfo = () => {
        formRef.value?.validate(async (errors: unknown) => {
          // ? Check if any of the information is changed

          if (!errors) {
            let newUser = {
              newUserData: {
                id: currentUser.value?.id,
                name: formModel.value.firstName + ' ' + formModel.value.lastName
              } as User,
              additional: null as null | unknown
            }

            const promise = store.dispatch(AllActionTypes.UPDATE_USER_INFO, {
              newInfo: newUser.newUserData,
              additional: newUser.additional
            })
            const [, error] = await handleActions(promise)
            if (error) {
              message.error('Some thing went wrong please try again latter', {
                duration: 3000
              })
              return
            }
            message.success('Profile Updated', {
              duration: 3000
            })
          }
        })
      }

      // Discard Changes
      const discardChanges = () => {
        formModel.value = getInitialUserData()
      }

      // Load User addresses

      const loadUserAddresses = async () => {
        const promise = api.get('/api/addresses/get')
        const [data, error] = await handleApi(promise)
        if (error) {
          return
        }
        const newUser: User = {
          addresses: data.data['data']
        }
        store.commit(AuthMutations.SET_USER, newUser)
        userAddresses.value = data.data['data']
      }
      loadUserAddresses()

      return {
        user: currentUser,
        formRef,
        model: formModel,
        rules: formRules,
        discardChanges,
        changeUserInfo,
        isUserLoading: computed(() => store.getters.isAuthLoading),
        userAddresses,
        counter,
        isChangeActive: computed(
          () => JSON.stringify(getInitialUserData()) !== JSON.stringify(formModel.value)
        )
      }
    }
  })
</script>

<style lang="scss">
  .input-field {
    border-radius: 0.45rem;
  }
  .avatar {
    border: 1px solid #efefff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(245, 245, 245, 0.19);
  }
</style>
