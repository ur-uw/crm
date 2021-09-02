<template>
  <n-button dashed>
    <n-space size="small" align="center">
      <n-icon>
        <check-icon />
      </n-icon>
      Mark complete
    </n-space>
  </n-button>
</template>

<script lang="ts">
  import { defineComponent } from '@vue/runtime-core'
  import { Checkmark48Filled as CheckIcon } from '@vicons/fluent'
  export default defineComponent({
    name: 'TaskDetailsHeader',
    components: {
      CheckIcon
    }
  })
</script>
