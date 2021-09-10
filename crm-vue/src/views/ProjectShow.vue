<template>
  <div v-if="!isLoading && project !== null">
    <n-layout>
      <n-layout-content>
        <project-header
          :users="project?.users"
          :description="project?.description"
          :name="project?.name"
          :owner="project?.owner"
          @show-add-members="showAddModal = true"
        />
        <!-- TODO: change percentage automatically when task status is changed -->
        <div
          v-if="project?.tags_progress !== undefined"
          class="tag-progresses p-3 d-flex align-items-center"
        >
          <div v-for="progress in project.tags_progress" :key="progress.tag_name" class="ms-2">
            <n-progress type="circle" :color="progress.color" :percentage="progress.percentage">
              <span class="text-center">{{ Math.round(progress.percentage) }}%</span>
            </n-progress>
            <div class="text-center mt-2">{{ progress.tag_name }}</div>
          </div>
        </div>
        <div class="project p-2 p-lg-4 p-md-3 p-sm-2 w-100">
          <div class="project-tasks w-100">
            <div v-for="(tasksValue, taskName) in tasks" :key="taskName">
              <project-column :list-type="taskName" :tasks-list="tasksValue" />
            </div>
          </div>
        </div>
        <!-- TASKs ACTIVITY -->
        <div class="task-activity-container">
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
  <!-- ADD MEMBERS MODAL -->
  <n-modal v-model:show="showAddModal">
    <add-member @hide-modal="showAddModal = false" />
  </n-modal>
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
  import ProjectHeader from '@/components/project/ProjectHeader.vue'
  import AddMember from '@/components/project/AddMember.vue'
  export default defineComponent({
    name: 'Project',
    components: {
      ProjectColumn,
      ArrowIcon,
      ProjectHeader,
      AddMember
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
      const showAddModal = ref(false)
      const fetchProject = async () => {
        const [data, error] = await handleActions(
          store.dispatch(ProjectActions.FETCH_SINGLE_PROJECT, route.params.slug.toString())
        )
        if (error) {
          // TODO: HANDLE ERROR
          return
        }
        project.value = data.data['data']
      }
      onMounted(() => {
        fetchProject()
      })
      return {
        project,
        tasks,
        isLoading,
        taskTypesLength,
        showAddModal
      }
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

    .task-activity-container {
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
