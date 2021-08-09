<template>
  <n-space justify="center">
    <n-button @click="getDate"> Test </n-button>
  </n-space>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    setup() {
      const getDate = () => {
        const milliSecond = 1619902800 * 1000
        const myDate = new Date(milliSecond)
        const dateFlattened: string[] = myDate.toLocaleDateString().split('/')
        const year = dateFlattened[2].toString()
        const day =
          dateFlattened[1].length > 1 ? dateFlattened[1].toString() : `0${dateFlattened[1]}`
        const month =
          dateFlattened[0].length > 1 ? dateFlattened[0].toString() : `0${dateFlattened[0]}`
        const fullDate = `${year}-${month}-${day}`
        console.log(myDate.toLocaleDateString(), fullDate)
      }
      return { getDate }
    }
  })
</script>
