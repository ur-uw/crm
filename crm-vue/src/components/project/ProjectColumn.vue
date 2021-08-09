<template>
  <div class="project-column">
    <div class="project-column-heading">
      <h2 class="project-column-heading__title">{{ columnHeading }}</h2>
      <button class="project-column-heading__options">
        <Icon>
          <MoreHorizontal28Regular />
        </Icon>
      </button>
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
      item-key="id"
      @add="changeTaskStatus($event, listType)"
    >
      <template #item="{ element }">
        <project-task-card :task-info="element" :data-id="element.id" @task-delete="deleteTask" />
      </template>
    </draggable>
  </div>
</template>
<script lang="ts">
  import { Task } from '@/interfaces/Task'
  import { defineComponent, PropType } from 'vue'
  import ProjectTaskCard from './ProjectTaskCard.vue'
  import { Icon } from '@vicons/utils'
  import { MoreHorizontal28Regular } from '@vicons/fluent'
  import { useStore } from '@/use/useStore'
  import { handleActions } from '@/utils/helpers'
  import { ActionTypes } from '@/store/modules/project/action-types'
  import draggable from 'vuedraggable'
  import { MutationTypes } from '@/store/modules/project/mutation-types'
  export default defineComponent({
    name: 'ProjectColumn',
    components: {
      ProjectTaskCard,
      Icon,
      MoreHorizontal28Regular,
      draggable
    },
    props: {
      columnHeading: {
        type: String,
        required: true
      },
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const changeTaskStatus = async (event: any, status: string) => {
        // Get the task id from the data-id attributes in li element
        const taskId = event.item.getAttribute('data-id')
        const [, error] = await handleActions(
          store.dispatch(ActionTypes.CHANGE_PROJECT_TASK_STATUS, {
            id: taskId,
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
      return { changeTaskStatus, deleteTask }
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
    &::after {
      position: absolute;
      content: '';
      height: 50px;
      max-height: 200px;
      width: 100%;
    }
  }
</style>
