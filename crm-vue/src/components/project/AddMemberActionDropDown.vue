<template>
  <n-select
    clearable
    multiple
    :disabled="disabled"
    :options="options"
    :on-update:value="onUpdate"
    :placeholder="placeHolder"
    filterable
  />
</template>

<script lang="ts">
  import { SelectOption } from 'naive-ui'
  import { defineComponent, PropType } from 'vue'

  export default defineComponent({
    name: 'AddMemberActionDropDown',
    props: {
      options: {
        type: Array as PropType<SelectOption[]>,
        required: true
      },
      onUpdate: {
        type: Function,
        required: true
      },
      placeHolder: {
        type: String,
        default: null
      },
      disabled: {
        type: Boolean,
        default: true
      }
    }
  })
</script>
