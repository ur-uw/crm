<template>
  <div class="container vh-100 d-flex align-items-center justify-content-center">
    <n-grid cols="2" :x-gap="20">
      <n-grid-item>
        <div class="h-100 d-flex align-items-center justify-content-start">
          <img class="h-75 w-75" src="@/assets/images/project_lifecycle.svg" alt="work" />
        </div>
      </n-grid-item>
      <n-grid-item class="h-100">
        <div class="h-100 d-flex flex-column align-items-center justify-content-center">
          <n-card>
            <n-form ref="formRef" :rules="formRules" :model="model" @submit.prevent="register">
              <n-space vertical size="large" justify="center">
                <n-grid cols="2" :x-gap="15">
                  <n-grid-item>
                    <n-form-item path="first_name" label="First Name">
                      <n-input
                        v-model:value="model.first_name"
                        size="large"
                        type="text"
                        placeholder="Ex: John"
                        @keydown.enter.prevent
                      >
                        <template #suffix>
                          <n-icon>
                            <PersonIcon />
                          </n-icon>
                        </template>
                      </n-input>
                    </n-form-item>
                  </n-grid-item>
                  <n-grid-item>
                    <n-form-item path="last_name" label="Last Name">
                      <n-input
                        v-model:value="model.last_name"
                        size="large"
                        type="text"
                        placeholder="Ex: Doe"
                        @keydown.enter.prevent
                      >
                        <template #suffix>
                          <n-icon>
                            <PersonIcon />
                          </n-icon>
                        </template>
                      </n-input>
                    </n-form-item>
                  </n-grid-item>
                </n-grid>
                <n-form-item label="Email" path="email">
                  <n-input
                    v-model:value="model.email"
                    size="large"
                    type="email"
                    placeholder="Ex: johdoe@email.com"
                    @keydown.enter.prevent
                  >
                    <template #suffix>
                      <n-icon>
                        <MailIcon />
                      </n-icon>
                    </template>
                  </n-input>
                </n-form-item>
                <n-form-item label="Password" path="password">
                  <n-input
                    v-model:value="model.password"
                    size="large"
                    type="password"
                    show-password-on="click"
                    placeholder=""
                    @keydown.enter.prevent
                  />
                </n-form-item>
                <n-form-item label="Confirm Password" path="password_confirmation">
                  <n-input
                    v-model:value="model.password_confirmation"
                    size="large"
                    type="password"
                    show-password-on="click"
                    placeholder=""
                    @keydown.enter.prevent
                  />
                </n-form-item>
                <n-form-item label="Phone Number" path="phoneNumber">
                  <n-input
                    v-model:value="model.phoneNumber"
                    size="large"
                    type="text"
                    placeholder="Ex: +311111111"
                    @keydown.enter.prevent
                  >
                    <template #suffix>
                      <n-icon>
                        <PhoneIcon />
                      </n-icon>
                    </template>
                  </n-input>
                </n-form-item>
                <n-checkbox> Remember Me </n-checkbox>
                <n-space align="center" justify="end">
                  <n-button type="primary" size="large" @click.prevent="register"
                    >Register
                  </n-button>
                </n-space>
              </n-space>
            </n-form>
            <template #action>
              Already have an account?
              <router-link :to="{ name: 'login.show' }">
                <n-text type="primary">Sign In</n-text>
              </router-link>
            </template>
          </n-card>
        </div>
      </n-grid-item>
    </n-grid>
  </div>
</template>
<script lang="ts">
  import { ActionTypes } from '@/store/modules/auth/action-types'
  import { useStore } from '@/use/useStore'
  import { handleActions } from '@/utils/helpers'
  import { phoneRegex } from '@/utils/regex'
  import { FormItemRule } from 'naive-ui'
  import { defineComponent, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import {
    Mail28Filled as MailIcon,
    Person28Regular as PersonIcon,
    Phone24Regular as PhoneIcon
  } from '@vicons/fluent'
  export default defineComponent({
    name: 'Register',
    components: {
      MailIcon,
      PersonIcon,
      PhoneIcon
    },
    setup() {
      // Store and router instances
      const store = useStore()
      const router = useRouter()
      // variables
      const formModel = ref({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phoneNumber: ''
      })

      const formRef = ref<any>(null)
      // PASSWORD VALIDATORS
      function validatePasswordStartWith(rule: FormItemRule, value: string) {
        return (
          formModel.value.password &&
          formModel.value.password.startsWith(value) &&
          formModel.value.password.length >= value.length
        )
      }
      function validatePasswordSame(rule: FormItemRule, value: string) {
        return value === formModel.value.password
      }
      const formRules = {
        first_name: {
          required: true,
          message: 'Please enter your first name'
        },
        last_name: {
          required: true,
          message: 'Please enter you last name'
        },
        email: {
          required: true,
          message: 'Please enter your email'
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
        password_confirmation: [
          {
            required: true,
            message: 'Re-entered Password is required',
            trigger: ['input', 'blur']
          },

          {
            validator: validatePasswordStartWith,
            message: 'Password is not same as re-entered password!',
            trigger: 'input'
          },
          {
            validator: validatePasswordSame,
            message: 'Password is not same as re-entered password!',
            trigger: ['blur', 'password-input']
          }
        ],
        phoneNumber: {
          required: false,
          validator: (rule: FormItemRule, val: string) => {
            if (val.length !== 0) {
              if (!phoneRegex.test(val)) {
                return Error('Please enter  valid phone number')
              }
            }
          }
        }
      }
      // ? REGISTER FUNCTION
      const register = () => {
        if (formRef.value !== null) {
          formRef.value.validate(async (errors: unknown) => {
            if (!errors) {
              const [, error] = await handleActions(
                store.dispatch(ActionTypes.REGISTER, formModel.value)
              )
              if (error) {
                // TODO: handle server errors
                return
              }
              router.push('/dashboard')
            }
          })
        }
      }
      return {
        model: formModel,
        register,
        formRef,
        formRules
      }
    }
  })
</script>
<style lang="scss"></style>
