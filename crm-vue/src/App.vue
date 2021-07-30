<template>
  <the-nav-bar></the-nav-bar>
  <router-view :key="$route.path" />
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import TheNavBar from '@/components/TheNavBar.vue'
  import { useStore } from '@/use/useStore'
  import { ActionTypes } from './store/modules/auth/action-types'
  import axios from 'axios'
  export default defineComponent({
    name: 'App',
    components: { TheNavBar },
    setup() {
      const store = useStore()
      const getUser = () => {
        if (store.getters.getToken) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${store.getters.getToken}`
          store.dispatch(ActionTypes.GET_USER)
        }
      }
      getUser()
    }
  })
</script>

<style lang="scss"></style>
