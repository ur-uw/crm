<template>
  <n-layout has-sider>
    <n-layout-sider
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
        class="first-nav-menu"
        :collapsed="collapsed"
        :collapsed-width="64"
        :on-update:value="onMenuItemClicked"
        :options="menuOptions"
      />
      <n-menu
        v-if="isLoggedIn"
        class="mt-auto"
        :collapsed="collapsed"
        :collapsed-width="64"
        :on-update:value="onSecondMenuClicked"
        :options="secondMenuOptions"
      />
    </n-layout-sider>
    <n-layout-content>
      <div id="content">
        <slot name="content"></slot>
      </div>
    </n-layout-content>
  </n-layout>
</template>

<script lang="ts">
  import { computed, defineComponent, h, ref } from 'vue'
  import { NIcon, NMenu, useNotification } from 'naive-ui'
  import {
    ClipboardTaskListLtr24Regular as BoardIcon,
    BookContacts28Regular as PersonIcon,
    CalendarLtr28Regular as CalendarIcon,
    Home28Regular as HomeIcon,
    ChatMultiple24Regular as ChatIcon,
    Settings28Regular as SettingsIcon,
    SignOut24Regular
    // ArrowRight28Regular as SignoutIcon
  } from '@vicons/fluent'
  import { useRouter } from 'vue-router'
  import { useStore } from '@/use/useStore'
  import { ActionTypes } from '@/store/modules/auth/action-types'
  import { handleActions } from '@/utils/helpers'

  export default defineComponent({
    components: { NMenu },
    setup() {
      // INITIALIZE ROUTER AND STORE
      const router = useRouter()
      const store = useStore()
      // Function to render icons
      const notification = useNotification()
      function renderIcon(icon) {
        return () => h(NIcon, null, { default: () => h(icon) })
      }
      // VARIABLES
      const isLoggedIn = computed(() => store.getters.isUserLoggedIn)
      const activeMenuItemKey = ref(null)
      const menuOptions = ref([
        {
          label: 'Home',
          key: 'home',
          icon: renderIcon(HomeIcon)
        },

        {
          label: 'Dashboard',
          key: 'dashboard.show',
          icon: renderIcon(BoardIcon)
        },
        {
          label: 'Contacts',
          key: 'contacts',
          disabled: true,
          icon: renderIcon(PersonIcon)
        },
        {
          label: 'Calendar',
          key: 'calendar.show',
          disabled: true,
          icon: renderIcon(CalendarIcon)
        },
        {
          label: 'Chat',
          key: 'chat.show',
          disabled: true,
          icon: renderIcon(ChatIcon)
        },
        {
          label: 'Settings',
          key: 'settings.show',
          disabled: true,
          icon: renderIcon(SettingsIcon)
        }
      ])
      const collapsed = ref(true)

      const secondMenuOptions = ref([
        {
          label: 'Sign Out',
          key: 'signOut',
          icon: renderIcon(SignOut24Regular)
        }
      ])
      // NAVIGATE TO CORRESPONDING PAGE USING VUE-ROUTER
      /*
        ? Note: the menu key should be the same as router link name
       */
      const onMenuItemClicked = (key: string) => {
        console.log(activeMenuItemKey.value)
        router.push({ name: key })
      }

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
        activeKey: activeMenuItemKey,
        collapsed,
        isLoggedIn,
        onMenuItemClicked,
        onSecondMenuClicked,
        secondMenuOptions
      }
    }
  })
</script>
<style lang="scss" scoped>
  #content {
    min-height: 100vh;
  }
  .first-nav-menu {
    height: 90%;
  }
</style>
