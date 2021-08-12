<template>
  <n-grid
    v-if="!isLoading"
    :cols="taskTypesLength > 4 ? '6 xs:1 s:1' : '4 s:1 xs:1'"
    responsive="screen"
  >
    <n-grid-item :span="taskTypesLength > 4 ? '5 xs:1 s:1' : '3 xs:1 s:1'">
      <div class="project p-2 p-lg-4 p-md-3 p-sm-2">
        <div class="project-info">
          <div class="project-name">
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
            <p>Copywriting</p>
            <n-progress
              type="line"
              :percentage="50"
              :height="15"
              border-radius="12px 0 12px 0"
              fill-border-radius="12px 0 12px 0"
            />
          </div>
          <div class="tag-progress">
            <p>Illustration</p>
            <n-progress
              type="line"
              :percentage="50"
              :height="15"
              color="orange"
              border-radius="12px 0 12px 0"
              fill-border-radius="12px 0 12px 0"
            />
          </div>
          <div class="tag-progress">
            <p>UI Design</p>
            <n-progress
              type="line"
              :percentage="50"
              :height="15"
              color="pink"
              border-radius="12px 0 12px 0"
              fill-border-radius="12px 0 12px 0"
            />
          </div>
        </div>
        <div class="task-activity">
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
  }

  .task-activity {
    h2 {
      font-size: 16px;
      margin-bottom: 1rem;
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
