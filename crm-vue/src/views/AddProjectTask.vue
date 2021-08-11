<template>
  <div class="container">
    <n-grid cols="2 s:1 xs:1">
      <n-grid-item>
        <div class="container">
          <n-form ref="formRef" :model="model" :rules="rules" @submit.prevent="handleSubmit">
            <n-space vertical>
              <!-- TASK TITLE -->
              <n-form-item path="taskTitle" label="Task Title">
                <n-input
                  v-model:value="model.taskTitle"
                  show-count
                  maxlength="25"
                  type="text"
                  placeholder="Title"
                  clearable
                  @keydown.enter.prevent
                >
                </n-input>
              </n-form-item>
              <!-- ASSIGN USERS -->
              <n-form-item path="assignTo" label="Assign To">
                <n-select
                  v-model:value="model.assignTo"
                  multiple
                  clearable
                  placeholder="Select Users"
                  filterable
                  :on-focus="onFocus"
                  :options="options"
                  :loading="areUserOptionsLoading"
                />
              </n-form-item>

              <!-- TASK STATUS -->
              <n-form-item path="status" label="Status">
                <n-radio-group
                  v-model:value="model.taskStatus"
                  :on-update:value="onStatusSelected"
                  name="task-statuses-group"
                >
                  <n-radio-button v-for="status in statues" :key="status.slug" :value="status.slug">
                    {{ status.name }}
                  </n-radio-button>
                </n-radio-group>
              </n-form-item>
              <!-- TASK PRIORITY -->
              <n-form-item path="taskPriority" label="Priority">
                <n-radio-group
                  v-model:value="model.taskStatus"
                  :on-update:value="onStatusSelected"
                  name="task-statuses-group"
                >
                  <n-radio-button v-for="status in statues" :key="status.slug" :value="status.slug">
                    {{ status.name }}
                  </n-radio-button>
                </n-radio-group>
              </n-form-item>

              <n-space>
                <!-- TASK DUE DATE -->
                <n-form-item path="dueDate" label="Due Date">
                  <n-date-picker
                    v-model:value="model.dueDate"
                    :format="'yyyy-MM-dd'"
                    :default-value="model.dueDate"
                    type="date"
                    :actions="['confirm']"
                  />
                </n-form-item>
                <!-- TASK TAGS -->
                <n-form-item path="tags" label="Tags">
                  <n-dynamic-tags v-model:value="model.tags" :max="4" />
                </n-form-item>
              </n-space>
              <!-- TASK DESCRIPTION -->
              <n-form-item path="taskDescription" label="Task Description">
                <n-input
                  v-model:value="model.taskDescription"
                  show-count
                  maxlength="150"
                  type="textarea"
                  placeholder="Description"
                  @keydown.prevent.enter
                />
              </n-form-item>

              <n-button type="primary" @click.prevent="handleSubmit">Save</n-button>
            </n-space>
          </n-form>
        </div>
      </n-grid-item>
      <n-grid-item>
        <div class="d-flex justify-content-center align-items-center flex-column h-100 w-100">
          <img class="w-75 h-100" src="@/assets/images/add_task.svg" alt="" />
        </div>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script lang="ts">
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  import { Status } from '@/interfaces/Status'
  import { Team } from '@/interfaces/Team'
  import api from '@/utils/api'
  import { handleApi } from '@/utils/helpers'
  import { SelectGroupOption, SelectOption } from 'naive-ui'
  import { ref, defineComponent, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  // import { PersonAdd28Regular } from '@vicons/fluent'
  export default defineComponent({
    setup() {
      // INITIALIZE ROUTE
      const route = useRoute()
      // VARIABLES
      const formRef = ref(null)
      const areUserOptionsLoading = ref(false)
      const userOptions = ref<SelectGroupOption[]>([])
      const statues = ref<Status[]>([])
      const modelRef = ref({
        taskTitle: null,
        taskDescription: null,
        assignTo: [] as (string | number)[],
        taskStatus: null as string | null,
        taskPriority: null as string | null,
        dueDate: null,
        tags: [] as string[]
      })
      const formRules = {
        taskTitle: [
          {
            required: true,
            message: 'This field is required'
          }
        ],
        assignTo: [
          {
            required: true,
            validator: (rule: SelectGroupOption, value: SelectGroupOption[]) => {
              if (value.length === 0) {
                return Error('Users are required')
              }
            }
          }
        ],
        status: [
          {
            required: true,
            message: 'Please set task status'
          }
        ],
        taskPriority: [
          {
            required: true,
            message: 'Please set task priority'
          }
        ],
        dueDate: [
          {
            required: true,
            message: 'This field is required'
          }
        ]
      }
      // FUNCTIONS
      const handleSubmit = () => {
        formRef.value?.validate()
      }
      const fetchProjectUsers = async () => {
        if (userOptions.value.length === 0 && modelRef.value.assignTo.length === 0) {
          areUserOptionsLoading.value = true
          const promise = api.get(`api/projects/${route.params.id}/users?withTeams=` + true)
          const [data, error] = await handleApi(promise)
          if (error) {
            areUserOptionsLoading.value = false
            return
          }
          const teams: Team[] = data.data['data']
          userOptions.value = teams.map((team) => {
            return {
              label: team.display_name,
              key: team.name,
              type: 'group',
              children: team.users?.map((user) => {
                return {
                  label: user.name ?? '',
                  value: user.slug ?? ''
                }
              }) as SelectOption[]
            }
          }) as SelectGroupOption[]
          areUserOptionsLoading.value = false
        }
      }
      // Fetch task statues
      const fetchTasStatues = async () => {
        const promise = api.get('api/statues/get')
        const [data, error] = await handleApi(promise)
        if (error) {
          return
        }
        statues.value = data.data['data']
      }

      // Set task status
      const onStatusSelected = (value: string | null) => {
        modelRef.value.taskStatus = value
      }

      onMounted(() => {
        fetchTasStatues()
      })

      return {
        formRef,
        model: modelRef,
        rules: formRules,
        handleSubmit,
        areUserOptionsLoading,
        options: userOptions,
        statues,
        onFocus: fetchProjectUsers,
        onStatusSelected
      }
    }
  })
</script>

<style lang="scss" scoped></style>
