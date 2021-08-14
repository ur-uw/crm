<template>
  <div v-if="!isLoading">
    <n-layout>
      <n-layout-content>
        <div class="project-info">
          <div class="project-name p-3">
            <h2>{{ project?.name }}</h2>
            <h6 v-if="project?.description" class="text-normal">{{ project.description }}</h6>
          </div>

          <div v-if="project !== null" class="project-participants p-3">
            <div class="d-inline-blo project-project-participants__members me-3">
              <div v-if="project.users != null" class="d-inline-block">
                <n-badge
                  v-for="user in project.users"
                  :key="user?.slug"
                  :dot="user?.slug !== project?.owner?.slug"
                  type="success"
                >
                  <n-avatar
                    v-if="user.slug !== project?.owner?.slug"
                    class="text-center project-participants__member"
                  >
                    {{ user.name?.substring(0, 1) }}
                  </n-avatar>
                </n-badge>
              </div>
              <button class="project-participants__add ms-2">Add Member</button>
            </div>

            <!-- PROJECT OWNER -->
            <n-badge value="Owner" class="me-3">
              <n-avatar :size="50" class="text-center project-participants__owner">
                {{ project?.owner?.name?.substring(0, 1) }}
              </n-avatar>
            </n-badge>
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
      </n-layout-content>
    </n-layout>
    <!-- BACK TO TOP COMPONENT -->
    <n-back-top
      :bottom="100"
      :visibility-height="300"
      :style="{
        transition: 'all .3s cubic-bezier(.4, 0, .2, 1)'
      }"
    >
      <n-button circle>
        <template #icon>
          <n-icon>
            <arrow-icon />
          </n-icon>
        </template>
      </n-button>
    </n-back-top>
  </div>
  <!-- LOADING PROJECT COMPONENT -->
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
  import { ArrowUp48Filled as ArrowIcon } from '@vicons/fluent'
  export default defineComponent({
    name: 'Project',
    components: {
      ProjectColumn,
      ArrowIcon
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

      &__member,
      &__add {
        position: relative;
        width: 35px;
        height: 35px;
        display: inline-block;
        background: $purple;
        border-radius: 100rem;
        border: 1px solid $primary2;
        margin: 0 -0.2rem;
        z-index: 0;
      }
      &__add {
        position: relative;
        z-index: 10000;
        background-color: $primary2;
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
