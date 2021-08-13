<template>
  <n-layout v-if="!isLoading">
    <n-layout-content>
      <n-grid :cols="1">
        <n-grid-item>
          <div class="project-info">
            <div class="project-name p-3">
              <h2>{{ project?.name }}</h2>
              <h6 v-if="project?.description" class="text-normal">{{ project.description }}</h6>
            </div>
            <div class="project-participants">
              <span></span>
              <span></span>
              <span></span>
              <button class="project-participants__add">Add Member</button>
            </div>
          </div>
          <div class="tag-progress p-3 d-flex align-items-center">
            <div class="tag-progress">
              <n-progress type="circle" color="pink" :percentage="20">
                <span class="text-center">20%</span>
              </n-progress>
              <div class="text-center mt-2">Copywriting</div>
            </div>
            <div class="tag-progress ms-3">
              <div class="tag-progress">
                <n-progress type="circle" color="orange" :percentage="50">
                  <span class="text-center">50% </span>
                </n-progress>
                <div class="text-center mt-2">Illustration</div>
              </div>
            </div>
            <div class="tag-progress ms-3">
              <n-progress type="circle" :percentage="75">
                <span class="text-center">75%</span>
              </n-progress>
              <div class="text-center mt-2">UI Design</div>
            </div>
          </div>
          <div class="project p-2 p-lg-4 p-md-3 p-sm-2">
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
            <div class="task-activity my-3 p-md-3">
              <h2>Recent Activity</h2>
              <n-timeline class="p-2" size="large">
                <n-timeline-item title="Create Task" content="{Task Name} created by Khalid" />
                <n-timeline-item
                  title="Rejected"
                  type="warning"
                  content="{Task Name} marked as rejected by Admin"
                />
                <n-timeline-item
                  type="info"
                  title="Inprogress"
                  content="{Task Name} marked as inprogress by Maitham"
                  time="2018-04-03 20:46"
                />
                <n-timeline-item
                  type="error"
                  title="Delete Task"
                  content="{Task Name} was deleted by Hamza"
                  time="2018-04-03 20:46"
                />
                <n-timeline-item
                  title="Edit Task"
                  type="info"
                  content=" {Task Name} had been updated by John Doe"
                  time="2018-04-03 20:46"
                />
                <n-timeline-item
                  type="success"
                  title="Complete"
                  content="{Task Name} marked as completed by Mohammed"
                  time="2018-04-03 20:46"
                />
              </n-timeline>
            </div>
          </div>
        </n-grid-item>
      </n-grid>
    </n-layout-content>
  </n-layout>
  <div v-else>
    <div class="d-flex flex-column align-items-center justify-content-center vh-100">
      <n-spin size="large" />
      <h4 class="mt-2">Getting Project Info</h4>
    </div>
  </div>
</template>

<script lang="ts">
  import { handleActions } from '@/utils/helpers'
  import { computed, defineComponent, onMounted, ref } from 'vue'
  import { Project, SelectedProjectTasksTypes } from '@/interfaces/Project'
  import { useRoute } from 'vue-router'
  import { useStore } from '@/use/useStore'
  import { ActionTypes as ProjectActions } from '@/store/modules/project/action-types'
  import ProjectColumn from '@/components/project/ProjectColumn.vue'
  export default defineComponent({
    name: 'Project',
    components: {
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
      const taskTypesLength: number = Object.keys(tasks).length
      onMounted(async () => {
        const [data, error] = await handleActions(
          store.dispatch(ProjectActions.FETCH_SINGLE_PROJECT, route.params.id.toString())
        )
        if (error) {
          return
        }
        project.value = data.data['data']
      })

      return { project, tasks, isLoading, taskTypesLength }
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

  // .tag-progress {
  //   margin: 1.5rem 0;
  //   h2 {
  //     font-size: 16px;
  //     margin-bottom: 1rem;
  //   }
  //   p {
  //     display: flex;
  //     width: 100%;
  //     justify-content: space-between;

  //     span {
  //       color: rgb(180, 180, 180);
  //     }
  //   }
  // }

  .task-activity {
    h2 {
      font-size: 1.5rem;
    }
  }

  @media only screen and (max-width: 1300px) {
    .project {
      max-width: 100%;
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

    h1 {
      font-size: 25px;
    }
  }
</style>
