<template>
  <div class="project">
    <h3>
      Projects <span>{{ projects?.length }}</span>
    </h3>
    <transition-group tag="div" name="projects-list" class="projects">
      <ProjectComponent
        v-for="project in projects"
        :key="project.id"
        index
        :project="project"
        @click="showProject(project.id, project.slug)"
      />
      <div key="addProject" class="add-project">
        <div
          class="
            box-color
            text-center text-white
            d-flex
            align-items-center
            justify-content-center
            flex-column
          "
        >
          <Icon>
            <Add28Filled />
          </Icon>
        </div>
      </div>
    </transition-group>
  </div>
</template>
<script lang="ts">
  import { Icon } from '@vicons/utils'
  import { Add28Filled } from '@vicons/fluent'
  import { Project } from '@/interfaces/Project'
  import { defineComponent, PropType } from 'vue'
  import { useRouter } from 'vue-router'
  import ProjectComponent from './ProjectComponent.vue'
  export default defineComponent({
    name: 'ProjectsList',
    components: { ProjectComponent, Icon, Add28Filled },
    props: {
      projects: {
        type: Object as PropType<Project[]>,
        required: true
      }
    },
    setup() {
      const router = useRouter()
      const showProject = (id: number, slug: string) => {
        router.push({ name: 'project.show', params: { id: id, slug: slug } })
      }
      return { showProject }
    }
  })
</script>

<style lang="scss" scoped>
  .custom-middle {
    transition: 0.5s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
    z-index: 1;
  }
  .project {
    margin-bottom: 70px;
    h3 {
      font-family: 'Open Sans', sans-serif;
      font-size: 19px;
      color: white !important;
      span {
        font-size: 14px;
        color: $custom-grey;
      }
    }

    .projects {
      margin-top: 27px;
      display: grid;
      grid-template-columns: repeat(3, 112px);
      grid-auto-flow: dense;

      .add-project {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        cursor: pointer;
        border-radius: 1em;
        background-color: transparent;
        margin-bottom: 1em;
        padding: 0.5em;

        span {
          font-size: 17px;
          color: white;
        }

        h6 {
          margin-top: 16px;
          font-family: 'Open Sans', sans-serif;
          font-size: 14px;
          color: white;
        }

        div.box-color {
          border-radius: 1em;
          margin-bottom: 1px;
          overflow: hidden;
          position: relative;

          span {
            @extend .custom-middle;
            opacity: 1;
          }

          img {
            width: 100%;
            height: 100%;
          }

          &:hover {
            border: 3px solid $custom-pink;
            transition: border 250ms ease-in-out;
          }
        }

        .customwidth {
          width: 100px;
          height: 94px !important;
        }

        div.box-color {
          @extend .customwidth;
        }
      }
    }
  }
</style>
