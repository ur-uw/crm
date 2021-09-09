<template>
  <div class="container vh-100 d-flex align-items-center justify-content-center">
    <n-grid cols="2" :x-gap="20">
      <n-grid-item>
        <div class="d-flex align-items-center justify-content-start">
          <img class="h-75 w-75" src="../assets/images/project_lifecycle.svg" alt="work" />
        </div>
      </n-grid-item>
      <n-grid-item class="h-100">
        <n-h1>
          <n-text type="default"
            >Welcome back are you ready to <n-text type="primary">Sail</n-text> ?
          </n-text>
        </n-h1>
        <div class="h-100 d-flex flex-column align-items-center justify-content-center">
          <n-card>
            <n-form ref="formRef" :rules="formRules" :model="formData" @submit.prevent="login">
              <n-space vertical size="large" justify="center">
                <n-form-item
                  label="Email"
                  path="email"
                  :validation-status="formErrors?.email ? 'error' : undefined"
                  :feedback="formErrors?.email ? formErrors?.email[0] : undefined"
                >
                  <n-input
                    v-model:value="formData.email"
                    type="email"
                    size="large"
                    placeholder="Ex: johdoe@email.com"
                    @keydown.enter.prevent="login"
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
                    v-model:value="formData.password"
                    size="large"
                    type="password"
                    show-password-on="click"
                    placeholder=""
                    @keydown.enter.prevent="login"
                  />
                </n-form-item>
                <n-checkbox> Remember Me </n-checkbox>
                <n-space align="center" justify="space-between">
                  <transition name="fade">
                    <n-text v-if="formErrors?.auth_error" type="error">
                      <n-icon><ErrorIcon /> </n-icon>
                      {{ formErrors?.auth_error[0] }}
                    </n-text>
                  </transition>

                  <n-button type="primary" size="large" @click.prevent="login">Login </n-button>
                </n-space>
              </n-space>
            </n-form>
            <template #action>
              Don't have an account?
              <router-link :to="{ name: 'register.show' }">
                <n-text type="primary">Register</n-text>
              </router-link>
            </template>
          </n-card>
        </div>
      </n-grid-item>
    </n-grid>
  </div>
</template>
<script lang="ts">
  import { ref, defineComponent } from 'vue'
  import { useStore } from '@/use/useStore'
  import { ActionTypes } from '@/store/modules/auth/action-types'
  import { handleActions, validEmail } from '@/utils/helpers'
  import { useRouter } from 'vue-router'
  import { FormItemRule } from 'naive-ui'
  import { Mail28Regular as MailIcon, ErrorCircle24Regular as ErrorIcon } from '@vicons/fluent'

  export default defineComponent({
    name: 'Login',
    components: { MailIcon, ErrorIcon },
    setup() {
      // create store instance
      const store = useStore()
      // create router instance
      const router = useRouter()
      // variables
      const formData = ref({
        email: '',
        password: ''
      })
      const formErrors = ref()
      const formRef = ref()

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
          trigger: ['blur']
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
        }
      }

      // ? LOGIN FUNCTION
      const login = () => {
        formRef.value?.validate(async (errors: unknown) => {
          if (!errors) {
            const [, errorData] = await handleActions(
              store.dispatch(ActionTypes.LOGIN, formData.value)
            )
            if (errorData) {
              if (errorData.errors != null) {
                formErrors.value = errorData.errors
              }
              return
            }
            router.replace('/dashboard')
          }
        })
      }

      return {
        formData,
        login,
        formRef,
        formRules,
        formErrors
      }
    }
  })
</script>
