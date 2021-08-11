<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{ name: 'home' }">Managee</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarSupportedContent" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'dashboard.show' }">Dashboard</router-link>
          </li>
        </ul>
        <div v-if="!isUserLoggedIn" class="navbar-nav text-white">
          <div class="nav-item">
            <router-link class="nav-link me-2" :to="{ name: 'login.show' }">Login</router-link>
          </div>
          <div class="nav-item">
            <router-link class="btn btn-outline-success" :to="{ name: 'register.show' }">
              Register
            </router-link>
          </div>
        </div>
        <div v-if="isUserLoggedIn" class="navbar-nav text-white">
          <div class="nav-item">
            <n-button ghost type="warning" @click="logOut()">Sign out</n-button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { useStore } from '@/use/useStore'
  import { ActionTypes as AuthActions } from '@/store/modules/auth/action-types'
  import { useRouter } from 'vue-router'
  import { useDialog, useNotification } from 'naive-ui'
  import { handleActions } from '@/utils/helpers'
  export default defineComponent({
    setup() {
      // Create store & router instances
      const store = useStore()
      const router = useRouter()
      // Variables
      const notification = useNotification()
      const isUserLoggedIn = computed(() => store.getters.isUserLoggedIn)
      // functions
      const dialog = useDialog()
      const logOut = () => {
        dialog.warning({
          title: 'Sign out',
          showIcon: false,
          content: 'Are you sure you want to sign out?',
          closable: false,
          positiveText: 'Confirm',
          negativeText: 'Cancel',
          maskClosable: false,
          onPositiveClick: async () => {
            const promise = store.dispatch(AuthActions.LOGOUT)
            const [, error] = await handleActions(promise)
            if (error) {
              notification.error({
                title: 'Sign out failed',
                content: 'Something went wrong, please try again later'
              })
            }
            router.push('/login')
          },
          onNegativeClick: () => {
            dialog.destroyAll()
          }
        })
      }
      return {
        isUserLoggedIn,
        logOut
      }
    }
  })
</script>
