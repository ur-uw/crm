<template>
  <div class="task bg-dark">
    <div class="task__tags">
      <span class="task__tag task__tag--copyright">Copywriting</span>
      <n-dropdown trigger="click" :options="options" @select="handleSelect">
        <button class="task__options">
          <Icon> <MoreHorizontal28Regular /> </Icon>
        </button>
      </n-dropdown>
    </div>
    <p>{{ task.title }}</p>
    <div class="task__stats">
      <span>
        <time :datetime="task.created_at">
          <Icon> <Flag28Regular /></Icon>
          {{ task.due_date }}
        </time>
      </span>
      <span>
        <Icon>
          <CommentMultiple24Regular />
        </Icon>
        {{ Math.floor(Math.random() * 100) }}
      </span>
      <span>
        <Icon>
          <Attach20Regular />
        </Icon>
        {{ Math.floor(Math.random() * 100) }}
      </span>
    </div>
    <n-modal
      v-model:show="showModal"
      class="custom-card"
      preset="card"
      :style="bodyStyle"
      title="Edit"
      :bordered="false"
      size="huge"
      :segmented="{
        content: 'soft'
      }"
    >
      <edit-project-task-form :task="task" @hide-modal="hideModal" />
    </n-modal>
  </div>
</template>
<script lang="ts">
  import { Task } from '@/interfaces/Task'
  import { Icon } from '@vicons/utils'
  import {
    MoreHorizontal28Regular,
    CommentMultiple24Regular,
    Flag28Regular,
    Attach20Regular
  } from '@vicons/fluent'
  import { defineComponent, PropType, ref } from 'vue'
  import { NDropdown, useNotification } from 'naive-ui'
  import EditProjectTaskForm from './EditProjectTaskForm.vue'
  import api from '@/utils/api'
  import { handleApi } from '@/utils/helpers'
  export default defineComponent({
    name: 'ProjectTaskCard',
    components: {
      NDropdown,
      Icon,
      Attach20Regular,
      MoreHorizontal28Regular,
      CommentMultiple24Regular,
      Flag28Regular,
      EditProjectTaskForm
    },
    props: {
      taskInfo: {
        type: Object as PropType<Task>,
        required: true
      }
    },
    emits: ['task-delete'],
    setup(props, { emit }) {
      // VARIABLES
      const showModal = ref(false)
      const task = ref(props.taskInfo)
      const notification = useNotification()
      const hideModal = (t: Task | null) => {
        if (t != null) {
          task.value = t
        }
        showModal.value = false
      }
      const options = [
        {
          label: 'Edit',
          key: 'edit'
        },
        {
          label: 'Delete',
          key: 'delete'
        }
      ]
      const deleteTask = async () => {
        const promise = api.delete(`/api/tasks/delete/${props.taskInfo.id}`)
        const [, error] = await handleApi(promise)
        if (error) {
          notification.error({
            title: 'Error',
            content: 'Something went wrong, please try again later',
            duration: 2500
          })
          return
        }
      }
      const handleSelect = (key: 'edit' | 'delete') => {
        switch (key) {
          case 'edit':
            showModal.value = true
            break
          case 'delete':
            deleteTask()
            emit('task-delete', props.taskInfo)
            break
        }
      }
      return {
        options,
        handleSelect,
        showModal,
        task,
        bodyStyle: {
          width: '600px'
        },
        hideModal
      }
    }
  })
</script>
<style scoped lang="scss">
  $light-grey: #c4cad3;
  $tag-1: #ceecfd;
  $tag-1-text: #2e87ba;
  $tag-2: #d6ede2;
  $tag-2-text: #13854e;
  $tag-3: #ceecfd;
  $tag-3-text: #2d86ba;
  $tag-4: #f2dcf5;
  $tag-4-text: #a734ba;
  $purple: #7784ee;

  @mixin display {
    display: flex;
    align-items: center;
  }
  .task {
    cursor: move;
    background-color: white;
    padding: 1rem;
    border-radius: 8px;
    width: 100%;
    box-shadow: rgba(99, 99, 99, 0.1) 0px 2px 8px 0px;
    margin-bottom: 1rem;
    border: 3px dashed transparent;

    &:hover {
      box-shadow: rgba(99, 99, 99, 0.3) 0px 2px 8px 0px;
      border-color: rgba(162, 179, 207, 0.2) !important;
    }

    p {
      font-size: 15px;
      margin: 1.2rem 0;
    }
    &__tag {
      border-radius: 100px;
      padding: 2px 13px;
      font-size: 12px;

      &--copyright {
        color: $tag-4-text;
        background-color: $tag-4;
      }
      &--design {
        color: $tag-3-text;
        background-color: $tag-3;
      }
      &--illustration {
        color: $tag-2-text;
        background-color: $tag-2;
      }
    }
    &__tags {
      width: 100%;
      @include display;
      justify-content: space-between;
    }

    &__options {
      background: transparent;
      border: 0;
      color: $light-grey;
      font-size: 17px;
    }

    &__stats {
      position: relative;
      width: 100%;
      color: $light-grey;

      font-size: 12px;
      span:not(:last-of-type) {
        margin-right: 1rem;
      }
      svg {
        margin-right: 5px;
      }
    }

    &__owner {
      width: 25px;
      height: 25px;
      border-radius: 100rem;
      background: $purple;
      position: absolute;
      display: inline-block;
      right: 0;
      bottom: 0;
    }
  }
</style>
