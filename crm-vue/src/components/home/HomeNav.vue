<template>
  <n-space justify="space-between" align="center" class="m-3">
    <div class="logo">Managee</div>
    <n-space align="center">
      <!-- HOME NAVIGATOR -->
      <nav>
        <div class="d-flex">
          <router-link to="#" class="mx-4"><n-button text>Home</n-button></router-link>
          <router-link to="#" class="mx-4"><n-button text>Features</n-button></router-link>
          <router-link to="#" class="mx-4"><n-button text>Pricing</n-button></router-link>
          <router-link to="#" class="mx-4"><n-button text>Contact</n-button></router-link>
        </div>
      </nav>
      <n-divider vertical />
      <!-- AUTH ACTIONS -->
      <div v-if="!isLoggedIn" class="auth-actions">
        <n-space align="center">
          <router-link :to="{ name: 'login.show' }">
            <n-button size="small">Sign In </n-button>
          </router-link>
          <router-link class="text-decoration-none" :to="{ name: 'register.show' }">
            <n-button size="small" type="primary">Register</n-button>
          </router-link>
        </n-space>
      </div>
      <!-- USER IMAGE AND NAME -->
      <n-space v-else align="center">
        <n-tooltip trigger="hover">
          <template #trigger>
            <router-link :to="{ name: 'dashboard.show' }">
              <n-button text>{{ user.name }}</n-button>
            </router-link>
          </template>
          Dashboard
        </n-tooltip>
        <router-link :to="{ name: 'settings.account', params: { slug: user.slug } }">
          <n-avatar circle :size="45" :src="user.profile_image?.path" />
        </router-link>
      </n-space>
    </n-space>
  </n-space>
</template>

<script lang="ts">
  import { User } from '@/interfaces/User'
  import { defineComponent, PropType } from 'vue'

  export default defineComponent({
    name: 'HomeNav',
    props: {
      isLoggedIn: {
        type: Boolean,
        required: true
      },
      user: {
        type: Object as PropType<User>,
        required: true
      }
    }
  })
</script>
<style lang="scss" scoped></style>
