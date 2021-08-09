<template>
  <n-config-provider :theme="theme">
    <IconConfigProvider size="20">
      <n-dialog-provider>
        <n-notification-provider>
          <the-nav-bar />
          <router-view :key="$route.path" />
        </n-notification-provider>
      </n-dialog-provider>
    </IconConfigProvider>
  </n-config-provider>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { IconConfigProvider } from '@vicons/utils'
  import { darkTheme, NConfigProvider, NDialogProvider, NNotificationProvider } from 'naive-ui'
  import TheNavBar from '@/components/TheNavBar.vue'
  import { useStore } from '@/use/useStore'
  import { ActionTypes } from './store/modules/auth/action-types'
  import api from '@/utils/api'
  export default defineComponent({
    name: 'App',
    components: {
      TheNavBar,
      IconConfigProvider,
      NConfigProvider,
      NDialogProvider,
      NNotificationProvider
    },
    setup() {
      const store = useStore()
      const getUser = () => {
        if (store.getters.getToken) {
          api.defaults.headers.common['Authorization'] = `Bearer ${store.getters.getToken}`
          store.dispatch(ActionTypes.GET_USER)
        }
      }
      getUser()

      const theme = ref(darkTheme)
      return { theme }
    }
  })
</script>

<style lang="scss"></style>
