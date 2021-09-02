<template>
  <div class="project-column bg-primary px-3 py-4 rounded mb-1">
    <div class="project-column-heading">
      <h2 class="project-column-heading__title">{{ listType }}</h2>
      <n-tooltip trigger="hover">
        <template #trigger>
          <router-link
            class="project-column-heading__options"
            :to="{ name: 'project.task.add', params: { taskStatus: listType } }"
          >
            <n-icon>
              <add-icon />
            </n-icon>
          </router-link>
        </template>
        Add Task
      </n-tooltip>
    </div>
    <draggable
      class="draggable-list"
      :list="tasksList"
      tag="transition-group"
      :component-data="{
        type: 'transition-group',
        name: 'flip-list',
        tag: 'div'
      }"
      group="project-tasks"
      item-key="slug"
      @add="changeTaskStatus($event, listType)"
    >
      <template #item="{ element }">
        <project-task-card
          :task-info="element"
          :data-id="element.slug"
          @show-details="showTaskDetails"
          @task-delete="deleteTask"
        />
      </template>
    </draggable>
  </div>
  <!-- TASKS DETAILS -->
  <n-modal
    v-model:show="showModal"
    closeable
    class="bg-primary2"
    preset="card"
    :mask-closable="false"
    style="width: 38%; position: fixed; right: 10px; bottom: 10px"
    :bordered="false"
    size="huge"
    :segmented="{
      content: 'soft',
      footer: 'soft'
    }"
  >
    <template #header>
      <task-details-header></task-details-header>
    </template>
    <task-details :task="selectedTask" />
    <template #footer> <task-details-footer /> </template>
  </n-modal>
</template>
<script lang="ts">
  import { Task } from '@/interfaces/Task'
  import { defineComponent, PropType, ref } from 'vue'
  import ProjectTaskCard from './ProjectTaskCard.vue'
  import { AddCircle32Filled as AddIcon } from '@vicons/fluent'
  import { useStore } from '@/use/useStore'
  import { handleActions } from '@/utils/helpers'
  import { ActionTypes } from '@/store/modules/project/action-types'
  import draggable from 'vuedraggable'
  import { MutationTypes } from '@/store/modules/project/mutation-types'
  import TaskDetails from './TaskDetails.vue'
  import TaskDetailsHeader from './TaskDetailsHeader.vue'
  import TaskDetailsFooter from './TaskDetailsFooter.vue'
  export default defineComponent({
    name: 'ProjectColumn',
    components: {
      ProjectTaskCard,
      AddIcon,
      draggable,
      TaskDetails,
      TaskDetailsHeader,
      TaskDetailsFooter
    },
    props: {
      tasksList: {
        type: Object as PropType<Task[]>,
        required: true
      },
      listType: {
        type: String,
        required: true
      }
    },
    setup() {
      // INITIALIZE STORE
      const store = useStore()
      // VARIABLES
      const selectedTask = ref<null | Task>(null)
      const showModal = ref(false)
      const changeTaskStatus = async (event: any, status: string) => {
        // Get task slug from the data-id attributes in li element
        const taskSlug = event.item.getAttribute('data-id')
        const [, error] = await handleActions(
          store.dispatch(ActionTypes.CHANGE_PROJECT_TASK_STATUS, {
            slug: taskSlug,
            status: status
          })
        )
        if (error) {
          // TODO: HANDLE ERROR
          return
        }
      }
      const deleteTask = (task: Task) => {
        store.commit(MutationTypes.DELETE_PROJECT_TASK, task)
      }

      // Show modal with task details
      const showTaskDetails = (task: Task) => {
        selectedTask.value = task
        showModal.value = true
      }
      return {
        changeTaskStatus,
        deleteTask,
        showTaskDetails,
        selectedTask,
        showModal
      }
    }
  })
</script>
<style lang="scss" scoped>
  $light-grey: #c4cad3;
  $purple: #7784ee;
  @mixin display {
    display: flex;
    align-items: center;
  }
  .project-column {
    &-heading {
      margin-bottom: 1rem;
      @include display;
      justify-content: space-between;
      &__title {
        font-size: 20px;
        text-transform: capitalize;
      }
      &__options {
        background: transparent;
        color: $light-grey;
        font-size: 18px;
        border: 0;
        cursor: pointer;
      }
    }
  }
  .draggable-list {
    position: relative;
    height: 100%;
  }
  .flip-list-move {
    transition: transform 0.5s;
  }
</style>
