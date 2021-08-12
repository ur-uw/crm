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
        v-model:value="activeKey"
        :collapsed="collapsed"
        :collapsed-width="64"
        :on-update:value="onMenuItemClicked"
        :collapsed-icon-size="22"
        :options="menuOptions"
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
  import { defineComponent, h, ref } from 'vue'
  import { NIcon, NLayoutSider, NLayoutContent, NMenu } from 'naive-ui'
  import {
    ClipboardTaskListLtr24Regular as BoardIcon,
    Person28Regular as PersonIcon,
    Home28Regular as HomeIcon
  } from '@vicons/fluent'
  import { useRouter } from 'vue-router'

  export default defineComponent({
    components: { NLayoutSider, NMenu, NLayoutContent },
    setup() {
      // INITIALIZE ROUTER
      const router = useRouter()
      function renderIcon(icon) {
        return () => h(NIcon, null, { default: () => h(icon) })
      }

      const menuOptions = [
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
          label: 'Profile',
          key: 'profile',
          disabled: true,
          icon: renderIcon(PersonIcon)
        }
      ]
      const collapsed = ref(false)
      // NAVIGATE TO CORRESPONDING PAGE USING VUE-ROUTER
      /*
        ? Note: the menu key should be the same as router link name
       */
      const onMenuItemClicked = (key: string) => {
        router.push({ name: key })
      }
      return {
        menuOptions,
        activeKey: null,
        collapsed,
        onMenuItemClicked
      }
    }
  })
</script>
<style lang="scss" scoped>
  #content {
    min-height: 100vh;
  }
</style>
