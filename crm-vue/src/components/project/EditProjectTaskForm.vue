<template>
  <n-form
    id="edit-task-form"
    ref="formRef"
    :model="model"
    :rules="rules"
    @submit.prevent="handleSubmit"
  >
    <n-space vertical>
      <n-form-item path="taskTitle" label="Task Title">
        <n-input
          v-model:value="model.taskTitle"
          size="large"
          type="text"
          placeholder="Title"
          show-count
          maxlength="25"
          clearable
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-grid :x-gap="15" cols="2 xs:1 s:1" responsive="screen">
        <n-grid-item>
          <!-- TASK DATES -->
          <n-form-item path="taskDates" label="Start Date - Due Date">
            <n-date-picker
              v-model:value="dates"
              :on-update:value="onTaskDatesChanged"
              size="large"
              :format="'yyyy-MM-dd - h:mm a'"
              type="datetimerange"
              :actions="['now', 'confirm']"
            />
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <!-- TASK PRIORITY -->
          <n-form-item v-if="priorities !== null" path="taskPriority" label="Priority">
            <n-radio-group
              v-if="priorities"
              v-model:value="model.taskPriority"
              size="large"
              name="task-priority-group"
            >
              <n-radio-button
                v-for="priority in priorities"
                :key="priority.slug"
                :value="priority?.slug"
              >
                {{ priority.name }}
              </n-radio-button>
            </n-radio-group>
          </n-form-item>
        </n-grid-item>
      </n-grid>
      <n-form-item path="taskDescription" label="Task Description">
        <n-input
          v-model:value="model.taskDescription"
          type="textarea"
          placeholder="Description"
          @keydown.prevent.enter
        />
      </n-form-item>

      <n-space justify="end">
        <n-button @click="$emit('hide-modal')">Cancel</n-button>
        <n-button type="primary" @click.prevent="handleSubmit">Confirm</n-button>
      </n-space>
    </n-space>
  </n-form>
</template>

<script lang="ts">
  /* eslint-disable @typescript-eslint/no-non-null-assertion */

  import { Task } from '@/interfaces/Task'
  import { handleApi } from '@/utils/helpers'
  import moment from 'moment'

  import api from '@/utils/api'
  import { ref, defineComponent, PropType, onMounted, computed } from 'vue'
  import { Priority } from '@/interfaces/Priority'
  export default defineComponent({
    props: {
      task: {
        type: Object as PropType<Task>,
        required: true
      }
    },
    emits: ['hide-modal'],
    setup(props, { emit }) {
      const formRef = ref<any>(null)
      const priorities = ref<Priority[] | null>(null)
      const modelRef = ref({
        taskTitle: props.task.title,
        taskDescription: props.task.description,
        taskPriority: props.task.priority?.slug,
        taskDates: {
          start_date: props.task.start_date,
          due_date: props.task.due_date
        }
      })

      // Submit edit request to the server
      const handleSubmit = () => {
        if (formRef.value !== null) {
          formRef.value.validate(async (errors: unknown) => {
            if (!errors) {
              // TODO: make api call only when the data of task is changed
              const promise = api.put(`/api/tasks/update/${props.task.slug}`, {
                title: modelRef.value.taskTitle,
                description: modelRef.value.taskDescription,
                priority: modelRef.value.taskPriority,
                start_date: modelRef.value.taskDates.start_date,
                due_date: modelRef.value.taskDates.due_date
              })
              const [data, error] = await handleApi(promise)
              if (error) {
                // TODO: HANDLE ERROR
                return
              }
              emit('hide-modal', data.data['data'])
            }
          })
        }
      }
      // Form rules
      const rules = {
        taskTitle: [
          {
            required: true,
            message: 'This field is required'
          }
        ],
        taskDates: [
          {
            required: true,
            message: 'Please set task start and due dates'
          }
        ],
        dueDate: [
          {
            required: true,
            message: 'This field is required'
          }
        ]
      }

      // Fetch task priorities
      const fetchPriorities = async () => {
        const promise = api.get('api/priorities/get')
        const [data, error] = await handleApi(promise)
        if (error) {
          return
        }
        priorities.value = data.data['data']
      }
      // When start date and due date picker values change
      const onTaskDatesChanged = (value: [number, number] | null) => {
        if (value !== null) {
          modelRef.value.taskDates = {
            start_date: moment(value[0]).format(),
            due_date: moment(value[1]).format()
          }
        }
      }
      onMounted(() => {
        fetchPriorities()
      })

      return {
        formRef,
        model: modelRef,
        rules,
        handleSubmit,
        priorities,
        onTaskDatesChanged,

        dates: computed(() => [
          parseInt(moment(modelRef.value.taskDates.start_date).format('x')),
          parseInt(moment(modelRef.value.taskDates.due_date).format('x'))
        ])
      }
    }
  })
</script>
