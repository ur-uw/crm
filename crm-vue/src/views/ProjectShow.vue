<template>
  <div class="project-info m-4">
    <h1>{{ project?.name }}</h1>
    <p>{{ project?.description }}</p>
  </div>
  <div class="container">
    <div class="tasks mt-5">
      <h4 class="text-success">Tasks</h4>
      <div class="tasks-list">
        <div v-if="project">
          <div class="drag-container">
            <ul class="drag-list">
              <li class="drag-column drag-column-waiting">
                <span class="drag-column-header">
                  <h2>Waiting</h2>
                  <svg
                    class="drag-header-more"
                    fill="#FFFFFF"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2
                    2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                    />
                  </svg>
                </span>

                <draggable
                  class="drag-inner-list"
                  :list="tasks.waiting"
                  group="tasks"
                  item-key="id"
                >
                  <template #item="{ element }">
                    <li class="drag-item" :data-id="element.id">
                      <p>{{ element.title }}</p>
                    </li>
                  </template>
                </draggable>
              </li>
              <li class="drag-column drag-column-approved">
                <span class="drag-column-header">
                  <h2>Approved</h2>
                  <svg
                    class="drag-header-more"
                    fill="#FFFFFF"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2
                    2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                    />
                  </svg>
                </span>

                <draggable
                  class="drag-inner-list"
                  :list="tasks.approved"
                  group="tasks"
                  item-key="id"
                  @add="changeTaskStatus($event, 'approved')"
                >
                  <template #item="{ element }">
                    <li class="drag-item" :data-id="element.id">
                      <p>{{ element.title }}</p>
                    </li>
                  </template>
                </draggable>
              </li>
              <li class="drag-column drag-column-in-progress">
                <span class="drag-column-header">
                  <h2>In Progress</h2>
                  <svg
                    class="drag-header-more"
                    fill="#FFFFFF"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2
                    2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                    />
                  </svg>
                </span>
                <draggable
                  class="drag-inner-list"
                  :list="tasks.inprogress"
                  group="tasks"
                  item-key="id"
                  @add="changeTaskStatus($event, 'inprogress')"
                >
                  <template #item="{ element }">
                    <li class="drag-item" :data-id="element.id">
                      <p>{{ element.title }}</p>
                    </li>
                  </template>
                </draggable>
              </li>
              <li class="drag-column drag-column-completed">
                <span class="drag-column-header">
                  <h2>Completed</h2>
                  <svg
                    class="drag-header-more"
                    fill="#FFFFFF"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2
                    2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                    />
                  </svg>
                </span>

                <draggable
                  class="drag-inner-list"
                  :list="tasks.completed"
                  group="tasks"
                  item-key="id"
                  @add="changeTaskStatus($event, 'completed')"
                >
                  <template #item="{ element }">
                    <li class="drag-item" :data-id="element.id">
                      <p>{{ element.title }}</p>
                    </li>
                  </template>
                </draggable>
              </li>
              <li class="drag-column drag-column-rejected">
                <span class="drag-column-header">
                  <h2>rejected</h2>
                  <svg
                    class="drag-header-more"
                    fill="#FFFFFF"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2
                    2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                    />
                  </svg>
                </span>

                <draggable
                  class="drag-inner-list"
                  :list="tasks.rejected"
                  group="tasks"
                  item-key="id"
                  @add="changeTaskStatus($event, 'rejected')"
                >
                  <template #item="{ element }">
                    <li class="drag-item" :data-id="element.id">
                      <p>{{ element.title }}</p>
                    </li>
                  </template>
                </draggable>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { handleApi } from '@/utils/helpers'
  import { computed, defineComponent, onMounted, ref } from '@vue/runtime-core'
  import axios from 'axios'
  import { Project } from '@/interfaces/Project'
  import { useRoute } from 'vue-router'
  import draggable from 'vuedraggable'
  import { Task } from '@/interfaces/Task'
  export default defineComponent({
    name: 'Project',
    components: {
      draggable
    },
    setup() {
      const route = useRoute()
      const project = ref<Project | null>(null)
      const tasks = ref({
        waiting: [] as Task[],
        approved: [] as Task[],
        inprogress: [] as Task[],
        completed: [] as Task[],
        rejected: [] as Task[]
      })
      const drag = computed(() => false)
      const getProject = async () => {
        const response = axios.get(`/api/project/show/${route.params.id}`)
        const [data, error] = await handleApi(response)
        if (error) {
          return
        }
        project.value = data.data['data']
        if (project.value?.tasks) {
          const checkTaskStatus = (task: Task) => {
            switch (task.status?.slug) {
              case 'waiting':
                tasks.value.waiting.unshift(task)
                break
              case 'approved':
                tasks.value.approved.unshift(task)
                break
              case 'inprogress':
                tasks.value.inprogress.unshift(task)
                break
              case 'completed':
                tasks.value.completed.unshift(task)
                break
              case 'rejected':
                tasks.value.rejected.unshift(task)
                break
              default:
                // TODO: IMPLEMENT DEFAULT CASE
                console.log(task.status?.name)
                break
            }
          }
          project.value.tasks.forEach(checkTaskStatus)
        }
      }
      onMounted(() => {
        getProject()
      })

      const changeTaskStatus = async (event, status: string) => {
        // Get the task id from the data-id attributes in li element
        const taskId = event.item.getAttribute('data-id')
        const promise = axios.put(`/api/task/changestatus/${taskId}`, { status_slug: status })
        const [, error] = await handleApi(promise)
        if (error) {
          // TODO: HANDLE ERROR
          return
        }
      }

      return { project, drag, tasks, changeTaskStatus }
    }
  })
</script>

<style lang="scss" scoped>
  $ease-out: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  $waiting: #ffbb00;
  $rejected: #ff3250;
  $in-progress: #2a92bf;
  $completed: #894fc6;
  $approved: #00b961;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .drag-container {
    max-width: 1000px;
    margin: 20px auto;
  }

  .drag-list {
    display: flex;
    align-items: flex-start;

    @media (max-width: 690px) {
      display: block;
    }
  }

  .drag-column {
    flex: 1;
    margin: 0 10px;
    position: relative;
    background: rgba(rgb(255, 255, 255), 0.3);
    overflow: hidden;

    @media (max-width: 690px) {
      margin-bottom: 30px;
    }

    h2 {
      font-size: 0.8rem;
      margin: 0;
      text-transform: uppercase;
      font-weight: 600;
    }

    &-waiting {
      .drag-column-header {
        background: $waiting;
      }
    }

    &-in-progress {
      .drag-column-header {
        background: $in-progress;
      }
    }

    &-completed {
      .drag-column-header {
        background: $completed;
      }
    }

    &-approved {
      .drag-column-header {
        background: $approved;
      }
    }
    &-rejected {
      .drag-column-header {
        background: $rejected;
      }
    }
  }

  .drag-column-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
  }

  .drag-inner-list {
    min-height: 50px;
  }

  .drag-item {
    margin: 10px;
    padding: 1.2rem 0.5rem;
    height: 100px;
    background: white;
    transition: $ease-out;

    &:hover {
      cursor: pointer;
    }
    p {
      font-size: 14px;
      font-family: 'Open Sans', sans-serif;
      color: black;
    }
  }

  .drag-header-more {
    cursor: pointer;
  }
</style>
