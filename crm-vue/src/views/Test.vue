<template>
  <n-button @click="showModal = true"> Start Me up </n-button>
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
    <n-form
      id="edit-task-form"
      ref="formRef"
      :model="model"
      :rules="rules"
      @submit.prevent="handleSubmit"
    >
      <n-space vertical>
        <n-form-item path="taskName" label="Task Name">
          <n-input
            v-model:value="model.taskName"
            type="text"
            placeholder="Name"
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
            :format="'yyyy/MM/dd'"
            type="date"
            :actions="['confirm']"
          />
        </n-form-item>
        <n-space justify="end">
          <n-button @click="hideModal">Cancel</n-button>
          <n-button type="primary" @click.prevent="handleSubmit">Confirm</n-button>
        </n-space>
      </n-space>
    </n-form>
  </n-modal>
</template>

<script lang="ts">
  import { ref, defineComponent } from 'vue'
  export default defineComponent({
    setup() {
      const formRef = ref(null)
      const modelRef = ref({
        taskName: null,
        taskDescription: null,
        dueDate: null
      })
      const hideModal = () => {
        showModal.value = false
      }
      const handleSubmit = () => {
        formRef.value.validate((errors: unknown) => {
          if (!errors) {
            console.log(modelRef.value.dueDate, modelRef.value.taskName)
            showModal.value = false
            // TODO: DO THE UPDATE
          }
        })
      }
      const rules = {
        taskName: [
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
      const bodyStyle = {
        width: '600px'
      }
      const showModal = ref(false)
      return { bodyStyle, showModal, formRef, model: modelRef, rules, handleSubmit, hideModal }
    }
  })
</script>
