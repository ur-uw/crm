<template>
  <n-skeleton text :repeat="4" />
  <n-skeleton text style="width: 60%" />
</template>

<script>
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    setup() {
      return {
        loading: ref(true)
      }
    }
  })
</script>
