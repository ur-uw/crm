<template>
  <n-layout v-if="!$store.getters['isAuthLoading']" has-sider>
    <n-layout-sider
      v-if="$route.name !== 'home' && currentUser !== null"
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :collapsed="collapsed"
      show-trigger
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <n-menu
        v-model:value="activeKey"
        class="first-nav-menu"
        :collapsed="collapsed"
        :collapsed-width="64"
        :options="menuOptions"
      />
      <n-menu :collapsed="collapsed" :collapsed-width="64" :options="secondMenuOptions" />
    </n-layout-sider>

    <n-layout-content>
      <div id="content">
        <slot name="content"></slot>
      </div>
    </n-layout-content>
  </n-layout>
</template>

<script lang="ts">
  import { computed, defineComponent, watch, h, ref } from 'vue'
  import { NIcon, useNotification } from 'naive-ui'
  import {
    ClipboardTaskListLtr24Regular as BoardIcon,
    BookContacts28Regular as ContactsIcon,
    CalendarLtr28Regular as CalendarIcon,
    Home28Regular as HomeIcon,
    ChatMultiple24Regular as ChatIcon,
    Settings28Regular as SettingsIcon,
    SignOut24Regular as SignOutIcon
  } from '@vicons/fluent'
  import { RouterLink, useRoute, useRouter } from 'vue-router'
  import { useStore } from '@/use/useStore'
  import { ActionTypes } from '@/store/modules/auth/action-types'
  import { handleActions } from '@/utils/helpers'
  import { MenuGroupOption, MenuOption } from 'naive-ui/lib/menu/src/interface'
  export default defineComponent({
    setup() {
      // INITIALIZE ROUTER AND STORE
      const router = useRouter()
      const route = useRoute()
      const store = useStore()
      // Function to render icons
      const notification = useNotification()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function renderIcon(icon: any) {
        return () => h(NIcon, null, { default: () => h(icon) })
      }
      // VARIABLES
      const currentUser = computed(() => store.getters.getCurrentUser)

      const settingsPath = {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: 'settings.account',
                params: { slug: store.getters.getCurrentUser?.slug }
              }
            },
            () => 'Settings'
          ),
        key: 'settings',
        icon: renderIcon(SettingsIcon)
      }
      const menuOptions = ref<Array<MenuOption | MenuGroupOption>>([
        {
          label: () =>
            h(
              RouterLink,
              {
                to: {
                  name: 'home'
                }
              },
              () => 'Home'
            ),
          key: 'home',
          icon: renderIcon(HomeIcon)
        },

        {
          label: () =>
            h(
              RouterLink,
              {
                to: {
                  name: 'dashboard.show'
                }
              },
              () => 'Dashboard'
            ),
          key: 'dashboard',
          icon: renderIcon(BoardIcon)
        },
        {
          label: () =>
            h(
              RouterLink,
              {
                to: {
                  name: 'contacts.show',
                  params: { slug: store.getters.getCurrentUser?.slug }
                }
              },
              () => 'Contacts'
            ),
          key: 'contacts',
          icon: renderIcon(ContactsIcon)
        },
        {
          label: 'Calendar',
          key: 'calendar',
          disabled: true,
          icon: renderIcon(CalendarIcon)
        },
        {
          label: 'Chat',
          key: 'chat',
          disabled: true,
          icon: renderIcon(ChatIcon)
        }
      ])

      watch(currentUser, (newVal) => {
        if (newVal !== null && !menuOptions.value.includes(settingsPath)) {
          menuOptions.value.push(settingsPath)
        } else if (newVal === null) {
          menuOptions.value = menuOptions.value.filter((el) => el.key !== 'settings.show')
        }
      })

      const activeMenuItem = ref()
      watch(route, (newRoute) => {
        if (newRoute.name !== null) {
          activeMenuItem.value = newRoute.name?.toString().split('.')[0]
        }
      })
      const collapsed = ref(true)

      const secondMenuOptions = ref([
        {
          label: 'Sign Out',
          key: 'signOut',
          icon: renderIcon(SignOutIcon)
        }
      ])

      // DOWN ITEMS OF THE SIDE BAR
      const onSecondMenuClicked = async (key: string) => {
        if (key === 'signOut') {
          const action = store.dispatch(ActionTypes.LOGOUT)
          const [, error] = await handleActions(action)
          if (error) {
            notification.error({
              title: 'Error',
              content: 'Something went wrong, please try again later'
            })
            return
          }
          router.replace({ name: 'login.show' })
        }
      }

      return {
        menuOptions,
        activeKey: activeMenuItem,
        collapsed,
        currentUser,
        onSecondMenuClicked,
        secondMenuOptions
      }
    }
  })
</script>
<style lang="scss" scoped>
  #content {
    max-height: 100vh;
  }
  .first-nav-menu {
    height: 90vh;
    max-height: 95vh;
  }
</style>
