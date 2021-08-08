<template>
  <Body></Body>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue'
  import Body from '@/components/dashboard/Body.vue'
  import { useStore } from '@/use/useStore'
  import { ActionTypes as TaskATypes } from '@/store/modules/task/action-types'
  import { ActionTypes as ProjectATypes } from '@/store/modules/project/action-types'
  import { today } from '@/utils/helpers'

  export default defineComponent({
    name: 'Dashboard',
    components: {
      Body
    },
    setup() {
      const store = useStore()
      onMounted(() => {
        store.dispatch(TaskATypes.FETCH_RECENT_TASKS)
        store.dispatch(TaskATypes.FETCH_TASKS_FOR_DATE, today())
        store.dispatch(ProjectATypes.FETCH_PROJECTS)
      })
    }
  })
</script>
<style lang="scss"></style>
