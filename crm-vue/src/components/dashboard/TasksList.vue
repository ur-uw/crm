<template>
  <h2 class="text-primary">Today Tasks</h2>
  <div v-if="isLoading" class="mt-1">
    <n-space vertical>
      <n-space>
        <n-skeleton :width="300" size="medium" />
        <n-skeleton circle size="small" />
        <n-skeleton circle size="small" />
        <n-skeleton :width="95" round size="medium" />
      </n-space>
      <n-space>
        <n-skeleton :width="300" size="medium" />
        <n-skeleton circle size="small" />
        <n-skeleton circle size="small" />
        <n-skeleton :width="95" round size="medium" />
      </n-space>
      <n-space>
        <n-skeleton :width="300" size="medium" />
        <n-skeleton circle size="small" />
        <n-skeleton circle size="small" />
        <n-skeleton :width="95" round size="medium" />
      </n-space>
    </n-space>
  </div>
  <div v-else>
    <transition-group v-if="todayTasks.length > 0" tag="ul" name="list" class="tasks-list">
      <li v-for="(task, index) in todayTasks" :key="task.slug">
        <TodayTask :index="index" :task="task" />
      </li>
    </transition-group>
    <div v-else class="p-3 text-center text-custom-dark-blue bg-light mt-2">
      <h6>No tasks for today <strong>😴</strong></h6>
    </div>
  </div>
  <h6 class="text-custom-dark-blue mt-3">Recent</h6>
  <div v-if="isLoading" class="mt-1">
    <n-space vertical>
      <n-space>
        <n-skeleton :width="300" size="medium" />
        <n-skeleton circle size="small" />
        <n-skeleton circle size="small" />
        <n-skeleton :width="95" round size="medium" />
      </n-space>
      <n-space>
        <n-skeleton :width="300" size="medium" />
        <n-skeleton circle size="small" />
        <n-skeleton circle size="small" />
        <n-skeleton :width="95" round size="medium" />
      </n-space>
      <n-space>
        <n-skeleton :width="300" size="medium" />
        <n-skeleton circle size="small" />
        <n-skeleton circle size="small" />
        <n-skeleton :width="95" round size="medium" />
      </n-space>
    </n-space>
  </div>
  <div v-else>
    <transition-group v-if="recentTasks.length > 0" tag="ul" name="list" class="tasks-list">
      <li v-for="(task, index) in recentTasks" :key="task.slug">
        <TodayTask :index="index" :task="task" />
      </li>
    </transition-group>
    <div v-else class="p-3 text-center text-custom-dark-blue bg-light mt-2">
      <h6>Nothing to mention <strong>😴</strong></h6>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from 'vue'
  import { useStore } from '@/use/useStore'
  import TodayTask from './TaskCard.vue'
  import { ActionTypes } from '@/store/modules/task/action-types'
  import { Task } from '@/interfaces/Task'
  import { useNotification } from 'naive-ui'
  export default defineComponent({
    components: {
      TodayTask
    },
    setup() {
      const store = useStore()
      // VARIABLES
      const newTaskTitle = ref<string>('')
      const recentTasks = computed(() => store.getters.getRecentTasks)
      const todayTasks = computed(() => store.getters.getTodayTasks)
      const isLoading = computed(() => store.getters.getTasksLoadingState)
      const notification = useNotification()
      // Methods
      const addDailyTask = () => {
        const task = recentTasks.value.find((t) => t.title === newTaskTitle.value) ?? null
        if (!task) {
          const newTask: Task = {
            title: newTaskTitle.value,
            status_id: 1,
            slug: newTaskTitle.value.toLowerCase().replaceAll(' ', '-')
          }

          store.dispatch(ActionTypes.CREATE_TASK, newTask)
          newTaskTitle.value = ''
        } else {
          notification.warning({
            title: 'Warning',
            content: 'Task already exists!',
            duration: 2500
          })
        }
      }
      return { recentTasks, isLoading, newTaskTitle, addDailyTask, todayTasks }
    }
  })
</script>

<style lang="scss" scoped>
  ul.tasks-list {
    margin-top: 15px;

    li {
      display: flex;
      flex-direction: column;
    }
  }
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }
  .list-enter-from {
    opacity: 0;
    transform: translateX(-30px);
  }
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
</style>
