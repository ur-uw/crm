<template>
  <div class="result-wrapper d-flex flex-column align-items-center justify-content-center vh-100">
    <n-result
      status="403"
      title="403 Forbidden"
      description="Are you sure you have the right permissions for this action ?"
    >
      <template #footer>
        <the-back />
      </template>
    </n-result>
  </div>
</template>

<script lang="ts">
  import TheBack from '@/components/TheBack.vue'
  import { defineComponent } from '@vue/runtime-core'

  export default defineComponent({
    name: 'Error',
    components: { TheBack }
  })
</script>
