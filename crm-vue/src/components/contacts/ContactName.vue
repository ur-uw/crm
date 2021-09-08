<template>
  <n-space align="center">
    <n-avatar circle :src="contact.contact_info.profile_image?.path"> </n-avatar>
    <b>{{ contact.contact_info.name }}</b>
  </n-space>
</template>

<script lang="ts">
  import Contact from '@/interfaces/Contact'
  import { defineComponent, PropType } from 'vue'

  export default defineComponent({
    name: 'ContactName',
    props: {
      contact: { type: Object as PropType<Contact>, required: true }
    }
  })
</script>
<style lang="scss" scoped></style>
