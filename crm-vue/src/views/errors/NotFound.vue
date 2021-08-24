<template>
  <div class="result-wrapper d-flex flex-column align-items-center justify-content-center vh-100">
    <n-result
      status="404"
      title="404 Not Found"
      description="The resource you want to reach doesn't exists"
    >
      <template #footer>
        <the-back></the-back>
      </template>
    </n-result>
  </div>
</template>

<script>
  import TheBack from '@/components/TheBack.vue'
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'NotFound',
    components: { TheBack }
  })
</script>
