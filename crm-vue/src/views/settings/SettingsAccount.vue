<template>
  <div class="ps-5 py-5">
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
            :src="user?.images !== null ? user?.images[0]?.path : null"
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
      <n-form-item path="password" class="px-3" label="Password">
        <n-input
          v-model:value="model.password"
          class="input-field"
          show-password-toggle
          type="password"
          size="large"
          placeholder="Change password"
        >
        </n-input>
      </n-form-item>
    </n-form>
    <n-divider />
    <h5 class="fw-bold mt-5">Address Information</h5>
    <n-form class="mt-5">
      <n-grid class="px-3" :x-gap="15" :y-gap="15" cols="2 xs:1 s:1">
        <n-grid-item>
          <n-form-item label="Country">
            <n-input class="input-field" placeholder="" size="large"></n-input>
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item label="City">
            <n-input class="input-field" placeholder="" size="large"></n-input>
          </n-form-item>
        </n-grid-item>
      </n-grid>
      <n-form-item class="px-3" label="Address1">
        <n-input
          class="input-field"
          placeholder="EX: House no.45 second floor, 5th cross"
          size="large"
        >
        </n-input>
      </n-form-item>
      <n-form-item class="px-3" label="Address2">
        <n-input class="input-field" placeholder="EX: Banaswadi, Bangalore, KA 560043" size="large">
        </n-input>
      </n-form-item>
      <n-grid class="px-3" :x-gap="15" :y-gap="15" cols="2 xs:1 s:1">
        <n-grid-item>
          <n-form-item label="State">
            <n-input class="input-field" placeholder="EX: Baghdad/Center" size="large"></n-input>
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item label="Zip">
            <n-input class="input-field" placeholder="EX: 334341f" size="large"></n-input>
          </n-form-item>
        </n-grid-item>
      </n-grid>
      <n-divider />
      <n-space size="large" class="pe-3" justify="end">
        <n-button size="large" ghost> Discard</n-button>
        <n-button size="large" type="success">Save Changes</n-button>
      </n-space>
    </n-form>
  </div>
</template>

<script lang="ts">
  import { Mail28Regular as MailIcon } from '@vicons/fluent'
  import { computed, defineComponent, ref, watch } from 'vue'
  import { useStore } from '@/use/useStore'
  import { User } from '@/interfaces/User'
  import { FormItemRule } from 'naive-ui'
  import { validEmail } from '@/utils/helpers'

  export default defineComponent({
    name: 'AccountSettings',
    components: {
      MailIcon
    },
    setup() {
      // INITIALIZE STORE
      const store = useStore()
      // VARIABLES
      const currentUser = computed<User | null>(() => store.getters.getCurrentUser)

      let modelValue = ref({
        firstName: currentUser?.value?.name,
        lastName: currentUser?.value?.name,
        email: currentUser?.value?.email,
        password: ''
      })
      const formRef = ref(null)
      const formModel = ref(modelValue.value)

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
        password: {
          required: true,
          validator: (rule: FormItemRule, val: string) => {
            if (val.length > 0 && val.length < 8) {
              return Error('Password must be at least 8 chars')
            } else if (val.length === 0 || val === null) {
              return Error('Please enter your password')
            }
          }
        },
        firstName: {
          required: true,
          message: 'Please enter your first name'
        },
        lastName: {
          required: true,
          message: 'Please enter your last name'
        }
      }

      watch(currentUser, (newVal: User | null) => {
        if (newVal !== null) {
          modelValue.value.email = newVal.email
          modelValue.value.firstName = newVal.name
          modelValue.value.lastName = newVal.name
        }
      })
      return {
        user: currentUser,
        formRef,
        model: formModel,
        rules: formRules
      }
    }
  })
</script>

<style lang="scss">
  .input-field {
    border-radius: 0.5rem;
  }
  .avatar {
    border: 1px solid #efefff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(245, 245, 245, 0.19);
  }
</style>
