<template>
  <div class="vh-100 d-flex align-items-center justify-content-center">
    <div class="row">
      <div class="col-md-10">
        <h3>404 | Not Found</h3>
      </div>
      <div class="col-md-2">
        <the-back></the-back>
      </div>
    </div>
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
