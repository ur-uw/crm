<template>
  <div v-if="!isUserLoading" class="ps-5 py-5">
    <h3 class="fw-bold mb-5">Account Settings</h3>
    <n-divider />
    <h5 class="fw-bold mt-5">Personal Information</h5>
    <div class="container">
      <n-form ref="formRef" :model="model" :rules="rules" class="mt-5">
        <settings-user-avatar
          :path="
            user?.images !== undefined && user?.images[0] !== undefined
              ? user?.images[0]?.path
              : `https://avatars.dicebear.com/api/micah/${user?.name}.svg`
          "
          @avatar-changed="handleAvatarChange"
        />

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

    <n-divider />

    <!-- ADDRESS INFORMATION -->

    <h5 class="fw-bold mt-5">Addresses Information</h5>
    <div v-if="user?.addresses != null" class="user-addresses">
      <div v-if="user?.addresses.length > 0">
        <user-address-form
          v-for="address in user.addresses"
          :key="address.name"
          :address="address"
          @address-changed="changeAddressInfo"
        />
      </div>
      <div v-else>
        <h6 class="text-center"><n-text type="warning">You don't have any address</n-text></h6>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  // TODO: IMPLEMENT DELETING ADDRESS FUNCTIONALITY
  // TODO: MAKE SEPARATE COMPONENTS FOR THE FORMS OF ACCOUNT SETTINGS
  import { Mail28Regular as MailIcon } from '@vicons/fluent'
  import { computed, defineComponent, onBeforeMount, ref, watch } from 'vue'
  import { useStore } from '@/use/useStore'
  import { User } from '@/interfaces/User'
  import { FormItemRule, useMessage } from 'naive-ui'
  import { handleActions, handleApi, validEmail } from '@/utils/helpers'
  import { AllActionTypes } from '@/store/action-types'
  import { MutationTypes as AuthMutations } from '@/store/modules/auth/mutation-types'
  import api from '@/utils/api'
  import { Address } from '@/interfaces/Address'
  import SettingsUserAvatar from '@/components/settings/SettingsUserAvatar.vue'
  import UserAddressForm from '@/components/settings/UserAddressForm.vue'
  import { Image } from '@/interfaces/Image'
  export default defineComponent({
    name: 'AccountSettings',
    components: {
      MailIcon,
      SettingsUserAvatar,
      UserAddressForm
    },
    setup() {
      // INITIALIZE STORE
      const store = useStore()
      // VARIABLES
      const message = useMessage()
      const currentUser = computed<User | null>(() => store.getters.getCurrentUser)
      let userAddresses = ref<Address[] | null>(null)
      const getInitialUserData = () => {
        return {
          firstName: currentUser.value?.first_name,
          lastName: currentUser.value?.last_name,
          phone: currentUser.value?.phone,
          email: currentUser?.value?.email
        }
      }
      const initialUserInfo = getInitialUserData()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const formRef = ref<any>(null)
      const formModel = ref(initialUserInfo)
      const counter = ref(1)
      watch(currentUser, (newVal: User | null) => {
        if (newVal !== null) {
          initialUserInfo.firstName = newVal.first_name
          initialUserInfo.lastName = newVal.last_name
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
        if (formRef.value !== null) {
          formRef.value.validate(async (errors: unknown): Promise<void> => {
            // ? Check if any of the information is changed
            if (!errors) {
              let newUser = {
                newUserData: {
                  slug: currentUser.value?.slug,
                  first_name: formModel.value.firstName,
                  last_name: formModel.value.lastName
                } as User,
                additional: null as null | unknown
              }
              if (currentUser.value?.phone !== formModel.value.phone) {
                newUser.additional = {
                  phone: formModel.value.phone
                }
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
      }

      // Change address info
      // TODO: update this address in user addresses that are in vuex
      const changeAddressInfo = async (newInfo: Address) => {
        const promise = api.put(`/api/addresses/update/${newInfo.id}`, newInfo)
        const [error] = await handleApi(promise)
        if (error) {
          // TODO: HANDLE ERROR
          message.error('Something went wrong', { duration: 2000 })
          return
        }
        // TODO: USE DATA
        message.success('Address updated', {
          duration: 2000
        })
      }

      // Adding new user image to vuex when user avatar is changed
      const handleAvatarChange = (newImage: Image) => {
        if (newImage) {
          const user = currentUser.value
          user?.images?.unshift(newImage)
          store.commit(AuthMutations.SET_USER, user)
        }
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
        const addresses: Address[] = data.data['data']
        const newUser: User = {
          addresses: addresses
        }
        store.commit(AuthMutations.SET_USER, newUser)
        userAddresses.value = addresses
      }
      onBeforeMount(() => {
        loadUserAddresses()
      })

      return {
        user: currentUser,
        formRef,
        model: formModel,
        rules: formRules,
        discardChanges,
        changeUserInfo,
        isUserLoading: computed(() => store.getters.isAuthLoading),
        userAddresses,
        changeAddressInfo,
        counter,
        handleAvatarChange,
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
