<template>
  <n-config-provider :theme-overrides="theme_overrides" :theme="theme">
    <n-theme-editor>
      <IconConfigProvider size="20">
        <n-dialog-provider>
          <n-notification-provider>
            <the-nav-bar>
              <template #content>
                <router-view :key="$route.path" />
              </template>
            </the-nav-bar>
          </n-notification-provider>
        </n-dialog-provider>
      </IconConfigProvider>
    </n-theme-editor>
  </n-config-provider>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { IconConfigProvider } from '@vicons/utils'
  import {
    darkTheme,
    GlobalThemeOverrides,
    NConfigProvider,
    NDialogProvider,
    NNotificationProvider
  } from 'naive-ui'
  import TheNavBar from '@/components/TheNavBar.vue'
  import { useStore } from '@/use/useStore'
  import { ActionTypes } from './store/modules/auth/action-types'
  import { NThemeEditor } from 'naive-ui'

  import api from '@/utils/api'
  export default defineComponent({
    name: 'App',
    components: {
      TheNavBar,
      IconConfigProvider,
      NConfigProvider,
      NDialogProvider,
      NNotificationProvider,
      NThemeEditor
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
      const theme_overrides: GlobalThemeOverrides = {
        Card: {
          color: '#262a41FF'
        },
        Menu: {
          color: '#15172bFF',
          itemColorActiveCollapsed: '#15172bFF',
          borderColorHorizontal: '#15172bFF',
          colorInverted: '#15172bFF'
        },
        Layout: {
          siderColor: '#15172bFF',
          siderColorInverted: '#15172bFF',
          color: '#15172bFF',
          colorEmbedded: '#15172bFF',
          headerColor: '#15172bFF',
          headerColorInverted: '#15172bFF',
          footerColor: '#15172bFF',
          footerColorInverted: '#15172bFF'
        }
      }

      const theme = ref(darkTheme)
      return { theme, theme_overrides }
    }
  })
</script>

<style lang="scss"></style>
