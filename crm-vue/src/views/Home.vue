<template>
  <home-nav :is-logged-in="isLoggedIn" :user="user" />
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { useStore } from '@/use/useStore'
  import HomeNav from '@/components/home/HomeNav.vue'
  export default defineComponent({
    components: {
      HomeNav
    },
    setup() {
      return {
        isLoggedIn: computed(() => useStore().getters.isUserLoggedIn),
        user: computed(() => useStore().getters.getCurrentUser)
      }
    }
  })
</script>

<style lang="scss" scoped></style>
