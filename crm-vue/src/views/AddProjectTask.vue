<template>
  <n-grid cols="2 s:1 xs:1" :x-gap="15" :y-gap="10" responsive="screen">
    <n-grid-item>
      <div class="container min-vh-100 d-flex flex-column justify-content-center">
        <h3 class="mb-2">Add a Task</h3>
        <n-card class="h-100">
          <n-form ref="formRef" :model="model" :rules="rules" @submit.prevent="handleSubmit">
            <n-space vertical size="large" justify="space-around">
              <!-- TASK TITLE -->
              <n-form-item path="taskTitle" label="Task Title">
                <n-input
                  v-model:value="model.taskTitle"
                  maxlength="25"
                  size="large"
                  type="text"
                  placeholder=""
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
              <n-form-item v-if="!taskStatus" path="taskStatus" label="Status">
                <n-radio-group v-model:value="model.taskStatus" name="task-statuses-group">
                  <n-radio v-for="status in statues" :key="status.slug" :value="status.slug">
                    {{ status.name }}
                  </n-radio>
                </n-radio-group>
              </n-form-item>
              <!-- TASK PRIORITY -->
              <n-form-item path="taskPriority" label="Priority">
                <n-radio-group v-model:value="model.taskPriority" name="task-statuses-group">
                  <n-radio v-for="priority in priorities" :key="priority" :value="priority">
                    {{ priority }}
                  </n-radio>
                </n-radio-group>
              </n-form-item>
              <n-grid cols="2 xs:1 s:1" responsive="screen">
                <n-grid-item>
                  <!-- TASK DUE DATE -->
                  <n-form-item path="dueDate" label="Due Date">
                    <n-input-group>
                      <n-date-picker
                        v-model:value="model.dueDate"
                        :format="'yyyy-MM-dd'"
                        :default-value="model.dueDate"
                        type="date"
                        :actions="['clear']"
                      />
                    </n-input-group>
                  </n-form-item>
                </n-grid-item>
                <n-grid-item>
                  <!-- TASK TAGS -->
                  <n-form-item path="tags" label="Tags">
                    <n-dynamic-tags v-model:value="model.tags" :max="4" />
                  </n-form-item>
                </n-grid-item>
              </n-grid>

              <!-- TASK DESCRIPTION -->
              <n-form-item path="taskDescription" label="Task Description">
                <n-input
                  v-model:value="model.taskDescription"
                  show-count
                  maxlength="150"
                  type="textarea"
                  placeholder=""
                  @keydown.prevent.enter
                />
              </n-form-item>

              <n-button type="primary" save="large" @click.prevent="handleSubmit">Save</n-button>
            </n-space>
          </n-form>
        </n-card>
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="d-flex justify-content-center align-items-center flex-column h-100 w-100">
        <img class="w-75 h-100" src="@/assets/images/add_task.svg" alt="" />
      </div>
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts">
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  import { Status } from '@/interfaces/Status'
  import { Task } from '@/interfaces/Task'
  import { Team } from '@/interfaces/Team'
  import { useStore } from '@/use/useStore'
  import api from '@/utils/api'
  import { handleApi } from '@/utils/helpers'
  import { TimeStamp } from '@/utils/Timestamp'
  import { SelectGroupOption, SelectOption, useNotification } from 'naive-ui'
  import { ref, defineComponent, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  // import { PersonAdd28Regular } from '@vicons/fluent'
  export default defineComponent({
    props: {
      taskStatus: {
        type: String,
        required: false,
        default: ''
      }
    },
    setup(props) {
      // INITIALIZE ROUTE AND STORE
      const route = useRoute()
      const store = useStore()
      // VARIABLES
      const notification = useNotification()
      const formRef = ref(null)
      const areUserOptionsLoading = ref(false)
      const userOptions = ref<SelectGroupOption[]>([])
      const statues = ref<Status[]>([])
      const priorities = ref<string[]>(['High', 'Medium', 'Low'])
      const modelRefValue = {
        taskTitle: null,
        taskDescription: null,
        assignTo: [] as (string | number)[],
        taskStatus: null as string | null,
        taskPriority: null as string | null,
        dueDate: null,
        tags: [] as string[]
      }
      const modelRef = ref(modelRefValue)
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
        formRef.value?.validate(async (errors) => {
          if (!errors) {
            const task: Task = {
              title: modelRef.value.taskTitle!,
              description: modelRef.value.taskDescription!,
              due_date: new TimeStamp().getDateFromTimestamp(modelRef.value.dueDate! / 1000.0)
            }
            const promise = api.post('/api/tasks/create', {
              ...task,
              project_id: route.params.id,
              slug: Math.random().toString(),
              status_slug: props.taskStatus ?? modelRef.value.taskStatus,
              assigned_to: modelRef.value.assignTo,
              created_by: store.getters.getCurrentUser?.id
            })
            const [data, error] = await handleApi(promise)
            if (error) {
              notification.error({
                title: 'Error',
                content: 'Something went wrong, please try agin later',
                duration: 3000
              })
              return
            }
            // TODO:USE THE DATA
            const createdTask: Task = data.data['data']
            notification.success({
              title: 'New Task Created',
              content: 'Task created successfully',
              duration: 3000
            })
            console.log(createdTask)
          }
        })
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

      onMounted(() => {
        if (!props.taskStatus) {
          fetchTasStatues()
        }
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
        priorities
      }
    }
  })
</script>

<style lang="scss" scoped></style>
