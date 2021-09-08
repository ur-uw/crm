<template>
  <div class="actions__container d-flex align-items-center justify-content-between">
    <n-space class="actions__send-mail-message">
      <n-button rounded>
        <n-space>
          <span>
            <n-icon><SendIcon /> </n-icon>
          </span>
          <span>Send Message</span>
        </n-space>
      </n-button>
      <n-button rounded>
        <n-space>
          <span>
            <n-icon><MailIcon /> </n-icon>
          </span>
          <span>Send Email</span>
        </n-space>
      </n-button>
    </n-space>
    <n-space class="actions__delete-block-edit">
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button type="default" text>
            <n-icon :size="20"><edit-icon /></n-icon>
          </n-button>
        </template>
        Edit
      </n-tooltip>
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button type="error" text>
            <n-icon :size="20"><DeleteIcon /></n-icon>
          </n-button>
        </template>
        Remove
      </n-tooltip>
    </n-space>
  </div>
</template>

<script lang="ts">
  import Contact from '@/interfaces/Contact'
  import { defineComponent, PropType } from 'vue'
  import {
    Send28Regular as SendIcon,
    Mail28Regular as MailIcon,
    Delete28Regular as DeleteIcon,
    Edit32Regular as EditIcon
  } from '@vicons/fluent'

  export default defineComponent({
    name: 'ContactAction',
    components: {
      SendIcon,
      MailIcon,
      DeleteIcon,
      EditIcon
    },
    props: {
      contact: {
        type: Object as PropType<Contact>,
        required: true
      }
    }
  })
</script>
<style lang="scss" scoped></style>
