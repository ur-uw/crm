<template>
  <n-thing content-indented>
    <template #avatar>
      <n-avatar :size="25" circle class="text-center"> J</n-avatar>
    </template>
    <template #header> John Doe </template>
    <template #header-extra> September 2, 2021</template>
    Money is any item or verifiable record that is generally accepted as payment for goods and
    services and repayment of debts, such as taxes, in a particular country or socio-economic
    context.
    <template #footer> <n-button text>Reply</n-button> </template>
  </n-thing>
</template>

<script>
  import { defineComponent } from '@vue/runtime-core'
  export default defineComponent({
    name: 'Comment'
  })
</script>
