<template>
  <n-select
    :default-value="['task-read']"
    clearable
    multiple
    :disabled="disabled"
    :options="options"
    :on-update:value="onPermissionsSelected"
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
      placeHolder: {
        type: String,
        default: null
      },
      disabled: {
        type: Boolean,
        default: true
      }
    },
    emits: ['permissions-updated'],
    setup(props, { emit }) {
      const onPermissionsSelected = (value: Array<string> | string) => {
        emit('permissions-updated', value)
      }
      return { onPermissionsSelected }
    }
  })
</script>
