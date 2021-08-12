<template>
  <n-layout>
    <n-layout-header>
      <div v-if="!isLoggedIn" class="auth-actions">
        <n-space justify="end" class="m-3">
          <router-link :to="{ name: 'login.show' }"> <n-button>Sign In </n-button></router-link>
          <router-link :to="{ name: 'register.show' }">
            <n-button type="primary">Register </n-button></router-link
          >
        </n-space>
      </div>
      <h1 class="text-center">Home</h1>
    </n-layout-header>
    <n-layout-content>
      <h3>This is home content</h3>
    </n-layout-content>
  </n-layout>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { useStore } from '@/use/useStore'

  export default defineComponent({
    setup() {
      return {
        isLoggedIn: computed(() => useStore().getters.isUserLoggedIn)
      }
    }
  })
</script>

<style lang="scss" scoped></style>
