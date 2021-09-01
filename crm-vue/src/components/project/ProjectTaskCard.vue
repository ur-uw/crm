<template>
  <div class="task bg-primary2">
    <!-- Task options -->
    <div class="d-flex justify-content-between align-items-center">
      <span class="d-flex align-items-center task__due-date">
        <Icon size="15"> <clock-icon /></Icon>
        <span class="ms-1">{{ taskDueDate }}</span>
      </span>
      <n-dropdown trigger="click" :options="options" @select="handleSelect">
        <button class="task__options">
          <Icon> <MoreHorizontal28Regular /> </Icon>
        </button>
      </n-dropdown>
    </div>
    <!-- Task Title -->
    <router-link to="#" tag="h6" class="w-100 mt-2 task__title text-white text-decoration-none">{{
      task.title
    }}</router-link>
    <!-- Task Tags -->
    <div v-if="taskInfo.tags !== undefined" class="task__tags d-flex align-items-center my-4 w-100">
      <span
        v-for="tag in taskInfo.tags"
        :key="tag.slug"
        :style="`background-color:${tag.color};`"
        class="task__tag text-capitalize rounded p-1 ms-1 text-capitalize"
        :class="tag.color === '#ffffff' ? 'text-dark' : ''"
      >
        {{ tag.name }}
      </span>
    </div>
    <!-- Task Description
    <n-ellipsis expand-trigger="click" line-clamp="2" :tooltip="false">
      {{ taskInfo.description }}
    </n-ellipsis> -->
    <!-- Task Priority -->
    <n-space justify="end">
      <span class="task__priority">
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-icon :color="task.priority?.color">
              <priority-icon></priority-icon>
            </n-icon>
          </template>
          {{ task.priority?.name }} Priority
        </n-tooltip>
      </span>
    </n-space>

    <n-divider></n-divider>
    <!-- Task Stats -->
    <div class="task__stats">
      <n-grid cols="2">
        <!-- COMMENTS AND ATTACHMENTS NUMBERS -->
        <n-grid-item class="d-flex flex-column justify-content-center">
          <div class="d-flex align-items-center">
            <span class="d-flex">
              <Icon>
                <attach-icon />
              </Icon>
              {{ Math.floor(Math.random() * 100) }}
            </span>
            <span class="d-flex">
              <Icon>
                <comments-icon />
              </Icon>

              {{ Math.floor(Math.random() * 100) }}
            </span>
          </div>
        </n-grid-item>
        <!-- TASK USERS -->
        <n-grid-item>
          <div v-if="taskInfo.users !== undefined && taskInfo.users.length > 0" class="w-100">
            <n-space v-if="taskInfo.users.length <= 3" align="center" justify="end">
              <span v-for="(user, index) in taskInfo.users" :key="user.slug">
                <n-tooltip trigger="hover" placement="bottom">
                  <template #trigger>
                    <n-avatar
                      v-if="user.profile_image !== undefined"
                      class="shadow text-center"
                      :class="index !== 0 ? 'stack' : ''"
                      :src="user.profile_image.path"
                      :size="25"
                      circle
                    />
                    <n-avatar v-else class="stack shadow text-center" circle> </n-avatar>
                  </template>
                  {{ user.name }}
                </n-tooltip>
              </span>
            </n-space>
            <n-space v-else justify="end" align="center">
              <span class="me-2"> +{{ taskInfo.users.length - 3 }}</span>
              <div class="d-flex align-items-center avatars_container">
                <span v-for="user in taskInfo.users.slice(0, 3)" :key="user.slug">
                  <n-tooltip trigger="hover" placement="bottom">
                    <template #trigger>
                      <n-avatar
                        v-if="user.profile_image !== undefined"
                        class="shadow text-center stack"
                        :src="user.profile_image.path"
                        :size="25"
                        circle
                      />
                      <n-avatar v-else class="stack shadow text-center" circle> </n-avatar>
                    </template>
                    {{ user.name }}
                  </n-tooltip>
                </span>
              </div>
            </n-space>
          </div>
        </n-grid-item>
      </n-grid>
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
    CommentMultiple24Filled as CommentsIcon,
    Clock28Filled as ClockIcon,
    Attach24Filled as AttachIcon,
    Info28Filled as PriorityIcon
  } from '@vicons/fluent'
  import { computed, defineComponent, PropType, ref } from 'vue'
  import { NDropdown, useNotification } from 'naive-ui'
  import EditProjectTaskForm from './EditProjectTaskForm.vue'
  import api from '@/utils/api'
  import { handleApi } from '@/utils/helpers'
  import { useStore } from '@/use/useStore'
  import { MutationTypes } from '@/store/modules/project/mutation-types'
  import moment from 'moment'
  import { useBreakPoints } from '@/use/useBreakpoints'
  export default defineComponent({
    name: 'ProjectTaskCard',
    components: {
      NDropdown,
      Icon,
      AttachIcon,
      MoreHorizontal28Regular,
      CommentsIcon,
      ClockIcon,
      EditProjectTaskForm,
      PriorityIcon
    },
    props: {
      taskInfo: {
        type: Object as PropType<Task>,
        required: true
      }
    },
    emits: ['task-delete'],
    setup(props, { emit }) {
      // INITIALIZE STORE
      const store = useStore()
      // VARIABLES
      const taskDueDate = computed(() => moment(props.taskInfo.due_date).format('MMMM D'))
      const showModal = ref(false)
      const task = ref(props.taskInfo)
      const notification = useNotification()
      const hideModal = (t: Task | null) => {
        if (t != null) {
          task.value = t
          store.commit(MutationTypes.EDIT_PROJECT_TASK, t)
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
        const promise = api.delete(`/api/tasks/delete/${props.taskInfo.slug}`)
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
      const { type } = useBreakPoints()
      return {
        options,
        handleSelect,
        showModal,
        task,
        taskDueDate,
        bodyStyle: ref(
          type.value === 'xs'
            ? {
                width: '100%'
              }
            : {
                width: '50%'
              }
        ),
        hideModal
      }
    }
  })
</script>
<style scoped lang="scss">
  $light-grey: #c4cad3;
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
    position: relative;
    width: 100%;
    box-shadow: rgba(99, 99, 99, 0.1) 0px 2px 8px 0px;
    margin-bottom: 1rem;
    border: 3px dashed transparent;

    &:hover {
      box-shadow: rgba(99, 99, 99, 0.3) 0px 2px 8px 0px;
      border-color: rgba(162, 179, 207, 0.2) !important;
    }

    .stack {
      position: relative;
      margin: 0 -0.9rem;
      cursor: pointer;
      z-index: 0;
    }

    p {
      font-size: 15px;
      margin: 1.2rem 0;
    }
    &__due-date {
      font-size: 0.7rem;
    }
    &__tag {
      font-size: 10px;
    }

    &__priority {
      &:hover {
        cursor: pointer;
      }
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
