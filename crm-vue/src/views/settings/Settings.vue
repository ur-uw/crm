<template>
  <n-layout has-sider>
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="width / 3"
      :collapsed="type === 'xs'"
    >
      <div class="p-4">
        <h3 v-if="type !== 'xs'" class="fw-bold">Settings</h3>
        <n-card v-if="width > 1027" class="bg-success" size="small" closable>
          <div class="profile-progress-wrapper d-flex justify-content-between align-items-center">
            <div class="profile-progress">
              <n-progress color="white" :percentage="75" type="circle" />
            </div>
            <div class="profile-message ps-3">
              <h4 class="fw-bold">Profile Information</h4>
              <p class="text-start">Complete your profile information to unlock all features</p>
            </div>
          </div>
          <n-space size="large" justify="center">
            <n-button size="large" type="default" round class="w-100 bg-white text-success">
              Complete My Profile
            </n-button>
          </n-space>
        </n-card>
      </div>
      <n-menu
        v-model:value="activeKey"
        class="pt-3"
        :collapsed="type === 'xs'"
        :options="menuOptions"
      />
    </n-layout-sider>
    <n-layout>
      <div id="profile-content" class="min-vh-100 w-100">
        <router-view />
      </div>
    </n-layout>
  </n-layout>
</template>

<script lan="ts">
  import { h, defineComponent, ref } from 'vue'
  import { NIcon } from 'naive-ui'
  import {
    Edit32Regular as PenIcon,
    Alert32Regular as NotificationIcon,
    ClipboardTaskListLtr24Regular as ChoosePlanIcon,
    ShieldCheckmark48Regular as SecurityIcon
  } from '@vicons/fluent'
  import { RouterLink, useRoute } from 'vue-router'
  import { useBreakPoints } from '@/use/useBreakpoints'
  export default defineComponent({
    name: 'Profile',
    setup() {
      // INITIALIZE ROUTE
      const route = useRoute()
      // VARIABLES
      const { width, type } = useBreakPoints()

      function renderIcon(icon) {
        return () => h(NIcon, null, { default: () => h(icon) })
      }

      const menuOptions = [
        {
          label: () =>
            h(RouterLink, { to: { name: 'settings.account' } }, () => 'Account Settings'),
          key: 'settings.account',
          icon: renderIcon(PenIcon)
        },
        {
          label: () =>
            h(RouterLink, { to: { name: 'settings.notifications' } }, () => 'Notifications'),
          key: 'settings.notifications',
          icon: renderIcon(NotificationIcon)
        },
        {
          label: () => h(RouterLink, { to: { name: 'settings.plan' } }, () => 'Choose a plan'),

          key: 'settings.plan',

          icon: renderIcon(ChoosePlanIcon)
        },
        {
          label: () =>
            h(RouterLink, { to: { name: 'settings.security' } }, () => 'Password & Security'),

          key: 'settings.security',
          icon: renderIcon(SecurityIcon)
        }
      ]

      return {
        menuOptions,
        activeKey: ref(route.name),
        type,
        width
      }
    }
  })
</script>

<style lang="scss" scoped></style>
