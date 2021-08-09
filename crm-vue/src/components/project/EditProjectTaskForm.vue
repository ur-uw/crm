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
          type="text"
          placeholder="Title"
          clearable
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-form-item path="taskDescription" label="Task Description">
        <n-input
          v-model:value="model.taskDescription"
          type="textarea"
          placeholder="Description"
          @keydown.prevent.enter
        />
      </n-form-item>
      <n-form-item path="dueDate" label="Due Date">
        <n-date-picker
          v-model:value="model.dueDate"
          :format="'yyyy-MM-dd'"
          :default-value="model.dueDate"
          type="date"
          :actions="['confirm']"
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
  import { TimeStamp } from '@/utils/Timestamp'
  import { handleApi } from '@/utils/helpers'
  import api from '@/utils/api'
  import { ref, defineComponent, PropType } from 'vue'
  export default defineComponent({
    props: {
      task: {
        type: Object as PropType<Task>,
        required: true
      }
    },
    emits: ['hide-modal'],
    setup(props, { emit }) {
      const taskDueDate = new TimeStamp(props.task.due_date!)
      const formRef = ref(null)
      const modelRef = ref({
        taskTitle: props.task.title,
        taskDescription: props.task.description,
        dueDate: taskDueDate.getTimeStamp() * 1000.0
      })
      const handleSubmit = () => {
        formRef.value?.validate(async (errors: unknown) => {
          if (!errors) {
            // TODO: make api call only when the data of task is changed
            const promise = api.put(`/api/tasks/update/${props.task.id}`, {
              title: modelRef.value.taskTitle,
              description: modelRef.value.taskDescription,
              due_date: taskDueDate.getDateFromTimestamp(modelRef.value.dueDate / 1000.0)
            })
            const [data, error] = await handleApi(promise)
            if (error) {
              // TODO: HANDLE ERROR
              return
            }
            emit('hide-modal', data.data['data'])
            emit('hide-modal')
          }
        })
      }
      const rules = {
        taskTitle: [
          {
            required: true,
            message: 'This field is required'
          }
        ],
        dueDate: [
          {
            required: true,
            message: 'This field is required'
          }
        ]
      }

      return { formRef, model: modelRef, rules, handleSubmit }
    }
  })
</script>
