<template>
  <n-grid cols="3 s:1 xs:1" responsive="screen">
    <n-grid-item span="2 s:1">
      <h1 class="bg-custom-purple">First Item</h1>
    </n-grid-item>
    <n-grid-item>
      <h1 class="bg-custom-green">Second Item</h1>
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts">
  import { defineComponent } from '@vue/runtime-core'
  import { NGrid, NGridItem } from 'naive-ui'
  export default defineComponent({
    name: 'Test',
    components: {
      NGrid,
      NGridItem
    }
  })
</script>

<style></style>
