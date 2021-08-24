<template>
  <n-button :size="buttonSize" @click="$router.back()">{{ buttonText }}</n-button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    props: {
      buttonText: {
        type: String,
        required: false,
        default: 'Back'
      },
      buttonSize: {
        type: String,
        required: false,
        default: 'medium'
      }
    }
  })
</script>

<style></style>
