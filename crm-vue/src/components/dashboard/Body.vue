<template>
  <div id="body">
    <n-grid v-if="!isAuthLoading" cols="2 xs:1 s:1" responsive="screen">
      <n-grid-item>
        <LeftBody />
      </n-grid-item>
      <n-grid-item><RightBody /></n-grid-item>
    </n-grid>
    <div
      v-else
      class="
        loader
        container
        min-vh-100
        d-flex
        flex-column
        align-items-center
        justify-content-center
      "
    >
      <n-space>
        <n-spin size="large" />
        <h4>Getting user info</h4>
      </n-space>
    </div>
  </div>
</template>

<script>
  import LeftBody from '@/components/dashboard/LeftBody.vue'
  import RightBody from './RightBody.vue'
  import { computed, defineComponent } from 'vue'
  import { useStore } from '@/use/useStore'

  export default defineComponent({
    name: 'Body',
    components: {
      LeftBody,
      RightBody
    },
    setup() {
      // store instance
      const store = useStore()
      // Variables
      const isAuthLoading = computed(() => store.getters.isAuthLoading)

      return {
        isAuthLoading
      }
    }
  })
</script>

<style lang="scss">
  #body {
    padding: 16px 16px 0 16px;
    min-height: 100vh;
    background-color: $primary;
  }
</style>
