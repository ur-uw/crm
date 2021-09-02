<template>
  <n-layout style="height: 100%; width: 100%" position="relative">
    <div id="task__details">
      <!-- Task Title -->
      <div class="task__title">
        <n-space size="small" align="baseline">
          <n-icon size="25">
            <TaskTitleIcon />
          </n-icon>
          <h6>Task Title</h6>
        </n-space>
        <div class="task__title__text mt-2">
          <h5>{{ task.title }}</h5>
        </div>
      </div>
      <!-- TASK INFO -->
      <div class="task__info mt-5 d-flex align-items-center justify-content-between">
        <div v-if="task.users !== undefined && task.users.length > 0" class="task__info__members">
          <p>Assigned To:</p>
          <div class="members-container d-flex align-content-center">
            <div v-for="user in task.users" :key="user.slug">
              <div v-if="user.profile_image !== undefined">
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <n-avatar circle :src="user.profile_image.path"> </n-avatar>
                  </template>
                  {{ user.name }}
                </n-tooltip>
              </div>
              <div v-else>
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <n-avatar circle class="text-center">
                      {{ user.name?.substring(0, 1).toUpperCase() }}
                    </n-avatar>
                  </template>
                  {{ user.name }}
                </n-tooltip>
              </div>
            </div>
          </div>
        </div>
        <div
          class="task__info__priority d-flex justify-content-center flex-column align-items-center"
        >
          <p>Task Priority</p>
          <p :style="`color:${task.priority?.color};`">
            {{ task.priority?.name }}
          </p>
        </div>
        <div class="task__info__due-date">
          <p>Due Date</p>
          <n-space size="small" align="baseline">
            <n-icon size="20"> <clock-icon /> </n-icon>
            <p>
              {{ taskDueDate }}
            </p>
          </n-space>
        </div>
      </div>
      <n-divider></n-divider>
      <!-- TASK DESCRIPTION -->
      <div class="task__description">
        <n-space size="small" align="baseline">
          <n-icon size="25">
            <TaskDescriptionIcon />
          </n-icon>
          <h6>Task Description</h6>
        </n-space>
        <div class="task__description__text mt-2">
          <p>{{ task.description }}</p>
        </div>
      </div>
      <!-- TASK ATTACHMENTS -->
      <div class="task__attachments mt-5">
        <n-upload
          v-model:file-list="fileList"
          action="/"
          multiple
          class="d-flex flex-column"
          @update:file-list="handleFileListChange"
          @remove="handleRemove"
        >
          <div class="w-100 d-flex justify-content-between align-items-center">
            <!-- TODO: REMOVE TEH BEHAVIOR THAT WHEN TEXT IS PRESSED UPLOAD WINDOW IS OPENED -->
            <n-space size="small" align="baseline">
              <n-icon size="25">
                <AttachIcon />
              </n-icon>
              <h6>Task Attachments</h6>
            </n-space>
            <n-button text>+ Add an Attachment...</n-button>
          </div>
        </n-upload>
      </div>
      <n-divider></n-divider>
      <!-- Task Comments -->
      <comment />
    </div>
  </n-layout>
</template>

<script lang="ts">
  import { Task } from '@/interfaces/Task'
  import { computed, defineComponent, PropType, ref } from '@vue/runtime-core'
  import moment from 'moment'
  import {
    ClipboardTextLtr24Regular as TaskTitleIcon,
    TextDescription24Filled as TaskDescriptionIcon,
    Clock28Filled as ClockIcon,
    Attach24Filled as AttachIcon
  } from '@vicons/fluent'
  import { useMessage } from 'naive-ui'
  import Comment from './Comment.vue'
  export default defineComponent({
    name: 'TaskDetails',
    components: {
      TaskTitleIcon,
      ClockIcon,
      TaskDescriptionIcon,
      AttachIcon,
      Comment
    },
    props: {
      task: {
        type: Object as PropType<Task>,
        required: true
      }
    },

    setup(props) {
      const taskDueDate = computed(() => moment(props.task.due_date).format('MMMM Do, YYYY'))
      // TODO: IMPLEMENT ATTACHMENTS FUNCTIONALITY
      const message = useMessage()
      const fileListRef = ref([
        {
          id: 'url-test',
          name: 'URL Test',
          url: 'http://www.mocky.io/v2/5e4bafc63100007100d8b70f',
          status: 'finished'
        },
        {
          id: 'text-message',
          name: 'Your text messages',
          status: 'error'
        },
        {
          id: 'notification',
          name: 'You notifications',
          status: 'finished'
        },
        {
          id: 'contact',
          name: 'You contact info',
          status: 'finished'
        }
      ])

      return {
        taskDueDate,
        fileList: fileListRef,
        handleRemove({ file }) {
          if (file.id === 'text-message') {
            message.info("Oops... It's now uploaded. Okay, delete it.")
          } else if (file.id === 'notification') {
            message.error('No, this is useful for us. Removal not allowed.')
            return false
          } else if (file.id === 'contact') {
            message.loading("Don' know whether it is useful for us, let me ask the server", {
              duration: 4000
            })
            return new Promise((resolve) => {
              setTimeout(() => {
                message.error("Oh no, they said you can't delete it too!")
                resolve(false)
              }, 4000)
            })
          }
        },
        handleFileListChange() {
          message.info('Yes, file-list changed.')
        }
      }
    }
  })
</script>
<style scoped lang="scss">
  #task {
    &__details {
      height: 55vh;
      max-height: 60vh;
    }
  }
</style>
