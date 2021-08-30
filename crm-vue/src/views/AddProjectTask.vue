<template>
  <n-grid cols="2 s:1 xs:1" :x-gap="15" :y-gap="10" responsive="screen">
    <n-grid-item class="h-100 w-100">
      <div class="container center mt-3 w-100 h-100">
        <h3 class="mb-3">Add a Task</h3>
        <n-card class="h-100">
          <n-form ref="formRef" :model="model" :rules="rules" @submit.prevent="handleSubmit">
            <n-space vertical size="large" justify="space-around">
              <n-grid cols="2 s:1 xs:1" :x-gap="15" responsive="screen">
                <n-grid-item>
                  <!-- TASK TITLE -->
                  <n-form-item path="taskTitle" label="Task Title">
                    <n-input
                      v-model:value="model.taskTitle"
                      maxlength="25"
                      show-count
                      size="large"
                      type="text"
                      placeholder=""
                      clearable
                      @keydown.enter.prevent
                    >
                    </n-input>
                  </n-form-item>
                </n-grid-item>
                <n-grid-item>
                  <!-- TASK TAGS -->
                  <n-form-item path="tags" label="Tags">
                    <n-dynamic-tags v-model:value="model.tags" :max="4" />
                  </n-form-item>
                </n-grid-item>
              </n-grid>
              <!-- ASSIGN USERS -->
              <n-form-item path="assignTo" label="Assign To">
                <n-select
                  v-model:value="model.assignTo"
                  size="large"
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
                <n-radio-group
                  v-if="priorities"
                  v-model:value="model.taskPriority"
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
              <!-- TASK DUE DATE -->
              <n-form-item path="taskDates" label="Start Date - Due Date">
                <n-date-picker
                  end-placeholder="Due Date and Time"
                  type="datetimerange"
                  clearable
                  update-value-on-close
                  :on-update:value="onTaskDatesChanged"
                  :ranges="ranges"
                />
              </n-form-item>

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
              <n-space justify="space-between">
                <h6 class="text-custom-grey">
                  <span>Fields with ( <span class="text-custom-pink">*</span> ) are required</span>
                </h6>
                <n-space>
                  <the-back button-size="large" button-text="Cancel"> </the-back>
                  <n-button type="primary" size="large" @click.prevent="handleSubmit"
                    >Save
                  </n-button>
                </n-space>
              </n-space>
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
  import { SelectGroupOption, SelectOption, useMessage } from 'naive-ui'
  import { ref, defineComponent, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import moment from 'moment'
  import TheBack from '@/components/TheBack.vue'
  import { Priority } from '@/interfaces/Priority'
  import Tag from '@/interfaces/Tag'

  // import { PersonAdd28Regular } from '@vicons/fluent'
  export default defineComponent({
    components: { TheBack },
    inheritAttrs: false,
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
      const now = new Date()
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      const message = useMessage()
      const formRef = ref<any>(null)
      const areUserOptionsLoading = ref(false)
      const userOptions = ref<SelectGroupOption[]>([])
      const statues = ref<Status[]>([])
      const priorities = ref<Priority>()
      const initFormRef = () => {
        return {
          taskTitle: null,
          taskDescription: null,
          assignTo: [] as (string | number)[],
          taskStatus: null as string | null,
          taskPriority: null as string | null,
          taskDates: null as { start_date: string; due_date: string } | null,
          tags: [] as string[]
        }
      }

      const modelRef = ref(initFormRef())
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
        taskDates: [
          {
            required: true,
            message: 'Please set task start and due dates'
          }
        ]
      }
      // FUNCTIONS
      const handleSubmit = () => {
        if (formRef.value !== null) {
          formRef.value.validate(async (errors: unknown) => {
            if (!errors) {
              if (modelRef.value.taskDates != null) {
                const task: Task = {
                  title: modelRef.value.taskTitle!,
                  description: modelRef.value.taskDescription!,
                  tags: modelRef.value.tags.map((tagName: string) => {
                    return { name: tagName } as Tag
                  }),
                  start_date: modelRef.value.taskDates.start_date,
                  due_date: modelRef.value.taskDates?.due_date
                }
                const promise = api.post('/api/tasks/create', {
                  ...task,

                  project: route.params.slug,
                  status: props.taskStatus ?? modelRef.value.taskStatus,
                  assigned_to: modelRef.value.assignTo,
                  created_by: store.getters.getCurrentUser?.slug,
                  priority: modelRef.value.taskPriority
                })
                const [, error] = await handleApi(promise)
                if (error) {
                  message.error('Something went wrong, please try agin later', { duration: 3000 })
                  return
                }
                modelRef.value = initFormRef()
                message.success('Task created successfully', {
                  duration: 3000
                })
              }
            }
          })
        }
      }
      // Fetch project users with their teams
      const fetchProjectUsers = async () => {
        if (userOptions.value.length === 0 && modelRef.value.assignTo.length === 0) {
          areUserOptionsLoading.value = true
          const promise = api.get(`api/projects/${route.params.slug}/users?withTeams=` + true)
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
        priorities,
        onTaskDatesChanged,

        ranges: {
          'This Month': [startOfMonth, endOfMonth]
        }
      }
    }
  })
</script>
