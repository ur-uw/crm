<template>
  <n-grid
    v-if="!isLoading"
    :cols="tasksLength > 4 ? '6 xs:1 s:1' : '4 s:1 xs:1'"
    responsive="screen"
  >
    <n-grid-item :span="tasksLength > 4 ? '5 xs:1 s:1' : '3 xs:1 s:1'">
      <div class="project">
        <div class="project-info">
          <div class="project-name">
            <h2>{{ project?.name }}</h2>
            <h6 v-if="project?.description" class="text-normal">{{ project.description }}</h6>
          </div>
          <div class="project-participants">
            <span></span>
            <span></span>
            <span></span>
            <button class="project-participants__add">Add Participant</button>
          </div>
        </div>
        <div class="project-tasks">
          <project-column
            v-for="(tasksValue, taskName) in tasks"
            :key="taskName"
            :column-heading="taskName"
            :list-type="taskName"
            :tasks-list="tasksValue"
          />
        </div>
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="task-details">
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
              <span class="task-icon task-icon--attachment">
                <Icon><Attach20Regular /> </Icon>
              </span>
              <b>Andrea </b>uploaded 3 documents
              <time datetime="2021-11-24T20:00:00">Aug 10</time>
            </li>
            <li>
              <span class="task-icon task-icon--comment">
                <Icon> <Comment28Regular /> </Icon>
              </span>
              <b>Karen </b> left a comment
              <time datetime="2021-11-24T20:00:00">Aug 10</time>
            </li>
            <li>
              <span class="task-icon task-icon--edit">
                <Icon>
                  <Edit24Regular />
                </Icon>
              </span>
              <b>Karen </b>uploaded 3 documents
              <time datetime="2021-11-24T20:00:00">Aug 11</time>
            </li>
            <li>
              <span class="task-icon task-icon--attachment">
                <Icon><Attach20Regular /> </Icon
              ></span>
              <b>Andrea </b>uploaded 3 documents
              <time datetime="2021-11-24T20:00:00">Aug 11</time>
            </li>
            <li>
              <span class="task-icon task-icon--comment">
                <Icon> <Comment28Regular /> </Icon
              ></span>
              <b>Karen </b> left a comment
              <time datetime="2021-11-24T20:00:00">Aug 12</time>
            </li>
          </ul>
        </div>
      </div>
    </n-grid-item>
  </n-grid>

  <div v-else>
    <n-space justify="center">
      <n-spin size="large" />
      Getting project info
    </n-space>
  </div>
</template>

<script lang="ts">
  import { handleActions } from '@/utils/helpers'
  import { computed, defineComponent, onMounted, ref } from 'vue'
  import { Project, SelectedProjectTasksTypes } from '@/interfaces/Project'
  import { useRoute } from 'vue-router'
  import { Icon } from '@vicons/utils'
  import { Attach20Regular, Comment28Regular, Edit24Regular } from '@vicons/fluent'
  import { useStore } from '@/use/useStore'
  import { ActionTypes as ProjectActions } from '@/store/modules/project/action-types'
  import ProjectColumn from '@/components/project/ProjectColumn.vue'
  export default defineComponent({
    name: 'Project',
    components: {
      // ICONS
      Icon,
      Attach20Regular,
      Edit24Regular,
      Comment28Regular,
      ProjectColumn
    },
    setup() {
      // INITIALIZE ROUTES and STORE
      const store = useStore()
      const route = useRoute()
      // VARIABLES
      const project = ref<Project | null>(null)
      const isLoading = computed(() => store.getters.isProjectsLoading)
      const tasks = computed<SelectedProjectTasksTypes>(() => store.getters.getSelectedProjectTasks)
      const tasksLength: number = Object.keys(tasks).length
      onMounted(async () => {
        const [data, error] = await handleActions(
          store.dispatch(ProjectActions.FETCH_SINGLE_PROJECT, route.params.id.toString())
        )
        if (error) {
          return
        }
        project.value = data.data['data']
      })

      return { project, tasks, isLoading, tasksLength }
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
      grid-template-columns: repeat(5, 1fr);
      width: 100%;
      grid-column-gap: 1.5rem;
    }
  }
  .task-hover {
    border: 3px dashed $light-grey !important;
  }
  .task-details {
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
      color: black;
      background: white;
      padding: 1rem;
      border-radius: 8px;
      margin: 1rem;
    }
  }

  @media only screen and (max-width: 1000px) {
    .project-tasks {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media only screen and (max-width: 600px) {
    .project-tasks {
      padding: 1rem;
      grid-template-columns: 1fr;
    }

    .task-details {
      padding: 1rem;
      border: none;
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
