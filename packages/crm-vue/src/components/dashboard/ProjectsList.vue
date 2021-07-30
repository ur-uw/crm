<template>
  <div class="project">
    <h3>
      Projects <span>{{ projects?.length }}</span>
    </h3>
    <transition-group tag="div" name="projects-list" class="projects">
      <Project v-for="project in projects" :key="project.id" index :project="project" />
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
          <fa icon="plus" class="display-4" />
        </div>
      </div>
    </transition-group>
  </div>
</template>
<script lang="ts">
  import { Project as project } from '@/interfaces/Project'
  import { defineComponent, PropType } from 'vue'
  import Project from './Project.vue'
  export default defineComponent({
    name: 'ProjectsList',
    components: { Project },
    props: {
      projects: {
        type: Object as PropType<project[]>,
        required: true
      }
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
      color: var(--bs-white) !important;
      span {
        font-size: 14px;
        color: var(--bs-custom-grey);
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
          font-family: 'MyriadProSemiBold', sans-serif;
          font-size: 17px;
          color: var(--bs-white);
        }

        h6 {
          margin-top: 16px;
          font-family: 'Open Sans', sans-serif;
          font-size: 14px;
          color: var(--bs-white);
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
            border: 3px solid var(--bs-custom-pink);
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
