<template>
  <n-space align="center">
    <n-avatar circle :src="profileImage"> </n-avatar>
    <div>
      <b>{{ name }}</b>
      <p v-if="showEmail">{{ email }}</p>
    </div>
  </n-space>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'ContactName',
    props: {
      name: { type: String, required: true },
      email: { type: String, default: null },
      profileImage: { type: String, required: true },
      showEmail: {
        type: Boolean,
        default: false
      }
    }
  })
</script>
<style lang="scss" scoped></style>
