<template>
  <n-space align="center">
    <n-avatar circle :src="contact.contact_info.profile_image?.path"> </n-avatar>
    <div>
      <b>{{ contact.contact_info.name }}</b>
      <p v-if="showEmail">{{ contact.contact_info.email }}</p>
    </div>
  </n-space>
</template>

<script lang="ts">
  import Contact from '@/interfaces/Contact'
  import { defineComponent, PropType } from 'vue'

  export default defineComponent({
    name: 'ContactName',
    props: {
      contact: { type: Object as PropType<Contact>, required: true },
      showEmail: {
        type: Boolean,
        default: false
      }
    }
  })
</script>
<style lang="scss" scoped></style>
