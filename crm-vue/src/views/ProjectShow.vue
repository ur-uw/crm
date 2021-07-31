<template>
  <main class="project">
    <div class="project-info">
      <h1>{{ project?.name }}</h1>
      <div class="project-participants">
        <span></span>
        <span></span>
        <span></span>
        <button class="project-participants__add">Add Participant</button>
      </div>
    </div>
    <div class="project-tasks">
      <div class="project-column">
        <div class="project-column-heading">
          <h2 class="project-column-heading__title">Waiting</h2>
          <button class="project-column-heading__options">
            <fa icon="ellipsis-h" />
          </button>
        </div>
        <draggable
          :list="tasks.waiting"
          group="tasks"
          item-key="id"
          @add="changeTaskStatus($event, 'waiting')"
        >
          <template #item="{ element }">
            <ProjectTaskCard :task="element" :data-id="element.id" />
          </template>
        </draggable>
      </div>
      <div class="project-column">
        <div class="project-column-heading">
          <h2 class="project-column-heading__title">Approved</h2>
          <button class="project-column-heading__options">
            <fa icon="ellipsis-h" />
          </button>
        </div>

        <draggable
          :list="tasks.approved"
          group="tasks"
          item-key="id"
          @add="changeTaskStatus($event, 'approved')"
        >
          <template #item="{ element }">
            <ProjectTaskCard :task="element" :data-id="element.id" />
          </template>
        </draggable>
      </div>
      <div class="project-column">
        <div class="project-column-heading">
          <h2 class="project-column-heading__title">In Progress</h2>
          <button class="project-column-heading__options">
            <fa icon="ellipsis-h" />
          </button>
        </div>

        <draggable
          :list="tasks.inprogress"
          group="tasks"
          item-key="id"
          @add="changeTaskStatus($event, 'inprogress')"
        >
          <template #item="{ element }">
            <ProjectTaskCard :task="element" :data-id="element.id" />
          </template>
        </draggable>
      </div>
      <div class="project-column">
        <div class="project-column-heading">
          <h2 class="project-column-heading__title">Completed</h2>
          <button class="project-column-heading__options">
            <fa icon="ellipsis-h" />
          </button>
        </div>
        <draggable
          :list="tasks.completed"
          group="tasks"
          item-key="id"
          @add="changeTaskStatus($event, 'completed')"
        >
          <template #item="{ element }">
            <ProjectTaskCard :task="element" :data-id="element.id" />
          </template>
        </draggable>
      </div>
    </div>
  </main>
  <aside class="task-details">
    <div class="tag-progress">
      <h2>Task Progress</h2>
      <div class="tag-progress">
        <p>Copywriting <span>3/8</span></p>
        <progress class="progress progress--copyright" max="8" value="3">3</progress>
      </div>
      <div class="tag-progress">
        <p>Illustration <span>6/10</span></p>
        <progress class="progress progress--illustration" max="10" value="6">6</progress>
      </div>
      <div class="tag-progress">
        <p>UI Design <span>2/7</span></p>
        <progress class="progress progress--design" max="7" value="2">2</progress>
      </div>
    </div>
    <div class="task-activity">
      <h2>Recent Activity</h2>
      <ul>
        <li>
          <span class="task-icon task-icon--attachment"><i class="fas fa-paperclip"></i></span>
          <b>Andrea </b>uploaded 3 documents
          <time datetime="2021-11-24T20:00:00">Aug 10</time>
        </li>
        <li>
          <span class="task-icon task-icon--comment"><i class="fas fa-comment"></i></span>
          <b>Karen </b> left a comment
          <time datetime="2021-11-24T20:00:00">Aug 10</time>
        </li>
        <li>
          <span class="task-icon task-icon--edit"><i class="fas fa-pencil-alt"></i></span>
          <b>Karen </b>uploaded 3 documents
          <time datetime="2021-11-24T20:00:00">Aug 11</time>
        </li>
        <li>
          <span class="task-icon task-icon--attachment"><i class="fas fa-paperclip"></i></span>
          <b>Andrea </b>uploaded 3 documents
          <time datetime="2021-11-24T20:00:00">Aug 11</time>
        </li>
        <li>
          <span class="task-icon task-icon--comment"><i class="fas fa-comment"></i></span>
          <b>Karen </b> left a comment
          <time datetime="2021-11-24T20:00:00">Aug 12</time>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script lang="ts">
  import { handleApi } from '@/utils/helpers'
  import { computed, defineComponent, onMounted, ref } from '@vue/runtime-core'
  import { Project } from '@/interfaces/Project'
  import { useRoute } from 'vue-router'
  import { Task } from '@/interfaces/Task'
  import axios from 'axios'
  import ProjectTaskCard from '@/components/project/ProjectTaskCard.vue'
  import draggable from 'vuedraggable'
  export default defineComponent({
    name: 'Project',
    components: { ProjectTaskCard, draggable },
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

      const changeTaskStatus = async (event: Event, status: string) => {
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
  $light-grey: #c4cad3;
  $purple: #7784ee;

  @mixin display {
    display: flex;
    align-items: center;
  }

  .project {
    padding: 2rem;
    max-width: 75%;
    width: 100%;
    display: inline-block;

    &-info {
      padding: 2rem 0;
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
    }
    &-participants {
      @include display;
      span,
      &__add {
        width: 30px;
        height: 30px;
        display: inline-block;
        background: $purple;
        border-radius: 100rem;
        margin: 0 0.2rem;
      }
      &__add {
        background: transparent;
        border: 1px dashed rgb(150, 150, 150);
        font-size: 0;
        cursor: pointer;
        position: relative;

        &:after {
          content: '+';
          font-size: 15px;
          color: rgb(150, 150, 150);
        }
      }
    }

    &-tasks {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      width: 100%;
      grid-column-gap: 1.5rem;
    }
    &-column {
      &-heading {
        margin-bottom: 1rem;
        @include display;
        justify-content: space-between;
        &__title {
          font-size: 20px;
        }
        &__options {
          background: transparent;
          color: $light-grey;
          font-size: 18px;
          border: 0;
          cursor: pointer;
        }
      }
    }
  }
  .task-hover {
    border: 3px dashed $light-grey !important;
  }
  .task-details {
    width: 24%;
    border-left: 1px solid #d9e0e9;
    display: inline-block;
    height: 100%;
    vertical-align: top;
    padding: 3rem 2rem;
  }

  .tag-progress {
    margin: 1.5rem 0;
    h2 {
      font-size: 16px;
      margin-bottom: 1rem;
    }
    p {
      display: flex;
      width: 100%;
      justify-content: space-between;

      span {
        color: rgb(180, 180, 180);
      }
    }
    .progress {
      width: 100%;
      -webkit-appearance: none;
      appearance: none;
      border: none;
      border-radius: 10px;
      height: 10px;

      &::-webkit-progress-bar,
      &::-webkit-progress-value {
        border-radius: 10px;
      }
      &--copyright {
        &::-webkit-progress-bar {
          background-color: #ecd8e6;
        }

        &::-webkit-progress-value {
          background: #d459e8;
        }
      }

      &--illustration {
        &::-webkit-progress-bar {
          background-color: #dee7e3;
        }

        &::-webkit-progress-value {
          background-color: #46bd84;
        }
      }

      &--design {
        &::-webkit-progress-bar {
          background-color: #d8e7f4;
        }

        &::-webkit-progress-value {
          background-color: #08a0f7;
        }
      }
    }
  }

  .task-activity {
    h2 {
      font-size: 16px;
      margin-bottom: 1rem;
    }

    li {
      list-style: none;
      margin: 1rem 0;
      padding: 0rem 1rem 1rem 3rem;
      position: relative;
    }
    time {
      display: block;
      color: $light-grey;
    }
  }

  .task-icon {
    width: 30px;
    height: 30px;
    border-radius: 100rem;
    position: absolute;
    top: 0;
    left: 0;
    @include display;
    justify-content: center;

    svg {
      font-size: 12px;
      color: white;
    }
    &--attachment {
      background-color: #fba63c;
    }

    &--comment {
      background-color: #5dc983;
    }

    &--edit {
      background-color: #7784ee;
    }
  }
  @media only screen and (max-width: 1300px) {
    .project {
      max-width: 100%;
    }
    .task-details {
      width: 100%;
      display: flex;
    }
    .tag-progress,
    .task-activity {
      flex-basis: 50%;
      background: white;
      padding: 1rem;
      border-radius: 8px;
      margin: 1rem;
    }
  }

  @media only screen and (max-width: 1000px) {
    .project-column:nth-child(2),
    .project-column:nth-child(3) {
      display: none;
    }
    .project-tasks {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media only screen and (max-width: 600px) {
    .project-column:nth-child(4) {
      display: none;
    }
    .project-tasks {
      grid-template-columns: 1fr;
    }

    .task-details {
      flex-wrap: wrap;
      padding: 3rem 1rem;
    }
    .tag-progress,
    .task-activity {
      flex-basis: 100%;
    }
    h1 {
      font-size: 25px;
    }
  }
</style>
