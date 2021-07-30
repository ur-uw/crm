<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Mangee</router-link>
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
            <router-link class="nav-link" to="dashboard">Dashboard</router-link>
          </li>
        </ul>
        <div v-if="!isUserLoggedIn" class="navbar-nav text-white">
          <div class="nav-item">
            <router-link class="nav-link me-2" to="login">Login</router-link>
          </div>
          <div class="nav-item">
            <router-link class="btn btn-outline-success" to="register"> Register </router-link>
          </div>
        </div>
        <div v-if="isUserLoggedIn" class="navbar-nav text-white">
          <div class="nav-item">
            <button class="btn btn-custom-purple" @click="logOut()">Sign out</button>
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
  import Swal from 'sweetalert2'
  import { useRouter } from 'vue-router'
  export default defineComponent({
    setup() {
      // Create store & router instances
      const store = useStore()
      const router = useRouter()
      // Variables
      const isUserLoggedIn = computed(() => store.getters.isUserLoggedIn)
      // functions
      const logOut = async () => {
        const confirmChoice = await Swal.fire({
          icon: 'question',
          text: 'Are you sure you want to sign out ?',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        })
        if (confirmChoice.isConfirmed) {
          await store.dispatch(AuthActions.LOGOUT)
          router.push('/login')
        }
      }
      return {
        isUserLoggedIn,
        logOut
      }
    }
  })
</script>
