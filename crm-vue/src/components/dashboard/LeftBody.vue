<template>
  <div id="left" class="p-lg-5 p-md-3">
    <div class="profile text-sm-center">
      <h1>Hi {{ currentUser?.name }}</h1>
      <h2>Let's make projects more amazing</h2>
      <div class="search">
        <input type="text" class="text-white outline-none" placeholder="Search your project" />
        <img src="../../assets/images/search.png" alt="search" />
      </div>
    </div>

    <projects-list v-if="!isLoading && projects !== null" :projects="projects"> </projects-list>
    <div v-else>
      <n-space vertical>
        <n-skeleton text :width="100" size="small" />
        <n-space>
          <n-skeleton :width="100" :height="100" size="medium" />
          <n-skeleton :width="100" :height="100" size="medium" />
          <n-skeleton :width="100" :height="100" size="medium" />
        </n-space>
        <n-space>
          <n-skeleton :width="100" :height="100" size="medium" />
          <n-skeleton :width="100" :height="100" size="medium" />
          <n-skeleton :width="100" :height="100" size="medium" />
        </n-space>
        <n-space>
          <n-skeleton :width="100" :height="100" size="medium" />
          <n-skeleton :width="100" :height="100" size="medium" />
          <n-skeleton :width="100" :height="100" size="medium" />
        </n-space>
      </n-space>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { useStore } from '@/use/useStore'
  import ProjectsList from './ProjectsList.vue'

  export default defineComponent({
    components: { ProjectsList },
    setup() {
      // store instance
      const store = useStore()
      // variables
      const currentUser = computed(() => store.getters.getCurrentUser)
      const projects = computed(() => store.getters.getProjects)
      const isLoading = computed(() => store.getters.isProjectsLoading)
      return {
        currentUser,
        projects,
        isLoading
      }
    }
  })
</script>

<style lang="scss">
  #left {
    position: relative;

    .profile {
      margin-top: 5px;

      h1 {
        font-family: 'Open Sans', sans-serif;
        font-size: 34px;
        color: white;
        font-weight: 500;
        text-transform: capitalize;
      }

      h2 {
        font-family: 'Open Sans', sans-serif;
        font-size: 16px;
        color: $custom-grey;
        font-weight: 300;
      }
    }
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
    .search {
      border: unset;
      border-radius: 14px;
      padding: 17px 25px 17px 55px;
      margin-top: 39px;
      position: relative;
      background-color: #70707050;
      height: 53px;
      margin-bottom: 35px;
      width: 90%;

      img {
        @extend .custom-middle;
        opacity: 1;
        left: 25px;
        cursor: pointer;
      }

      input {
        border: unset;
        padding: 0.2em;
        background-color: transparent;
        width: 100%;
        height: 100%;
        caret-color: white;

        &::placeholder {
          background-color: unset;
          color: $custom-grey;
          font-family: 'Open Sans', sans-serif;
          font-size: 14px;
        }
      }
    }
  }
</style>
