<template>
  <div class="result-wrapper d-flex flex-column align-items-center justify-content-center vh-100">
    <n-result
      status="500"
      title="500 Server Error"
      description="This is a problem from our side and we will try to fix it as soon as possible."
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
