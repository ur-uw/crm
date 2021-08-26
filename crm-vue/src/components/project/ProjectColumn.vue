<template>
  <div class="project-column bg-primary px-3 py-4 rounded mb-1">
    <div class="project-column-heading">
      <h2 class="project-column-heading__title">{{ columnHeading }}</h2>
      <router-link
        class="project-column-heading__options"
        :to="{ name: 'project.task.add', params: { taskStatus: listType } }"
      >
        <Icon>
          <Add28Filled />
        </Icon>
      </router-link>
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
        <project-task-card :task-info="element" :data-id="element.slug" @task-delete="deleteTask" />
      </template>
    </draggable>
  </div>
</template>
<script lang="ts">
  import { Task } from '@/interfaces/Task'
  import { defineComponent, PropType } from 'vue'
  import ProjectTaskCard from './ProjectTaskCard.vue'
  import { Icon } from '@vicons/utils'
  import { Add28Filled } from '@vicons/fluent'
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
      Add28Filled,
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
      // VARIABLES
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    height: 100%;
  }
  .flip-list-move {
    transition: transform 0.5s;
  }
</style>
