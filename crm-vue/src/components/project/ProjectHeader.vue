<template>
  <div class="project-info">
    <div class="project-name p-3">
      <h2>{{ name }}</h2>
      <h6 v-if="description" class="text-normal">{{ description }}</h6>
    </div>

    <div class="project-participants p-3 d-flex justify-content-center align-items-center">
      <div
        class="
          d-inline-block
          project-project-participants__members
          d-flex
          align-items-baseline
          me-3
        "
      >
        <div v-if="users != null" class="d-inline-block">
          <n-badge
            v-for="user in users"
            :key="user?.slug"
            :dot="user?.slug !== owner?.slug"
            type="success"
          >
            <div v-if="user.slug !== owner?.slug" class="inline-block">
              <n-tooltip placement="bottom" trigger="hover">
                <template #trigger>
                  <n-avatar
                    v-if="user.profile_image !== undefined"
                    class="text-center project-participants__member border border-custom-purple"
                    :src="user?.profile_image.path"
                    circle
                  >
                  </n-avatar>
                  <n-avatar
                    v-else
                    circle
                    class="text-center project-participants__member text-center"
                  >
                    {{ user.name?.substring(0, 1).toUpperCase() }}
                  </n-avatar>
                </template>
                {{ user.name }}
              </n-tooltip>
            </div>
          </n-badge>
        </div>

        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button size="large" class="ms-2" circle dashed @click="$emit('show-add-members')">
              <template #icon>
                <n-icon><add-icon /></n-icon>
              </template>
            </n-button>
          </template>
          Add Member
        </n-tooltip>
      </div>

      <!-- PROJECT OWNER -->

      <n-badge value="Owner" class="me-3">
        <n-avatar
          v-if="owner?.profile_image != null"
          :size="50"
          class="text-center project-participants__owner border border-custom-purple"
          :src="owner?.profile_image.path"
        >
        </n-avatar>
        <n-avatar v-else :size="50" class="text-center project-participants__owner">
          {{ owner?.name?.substring(0, 1) }}
        </n-avatar>
      </n-badge>
    </div>
  </div>
</template>

<script lang="ts">
  import { User } from '@/interfaces/User'
  import { defineComponent, PropType } from 'vue'
  import { Add28Regular as AddIcon } from '@vicons/fluent'

  export default defineComponent({
    name: 'ProjectHeader',
    components: {
      AddIcon
    },
    props: {
      name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        default: null
      },
      users: {
        type: Array as PropType<User[]>,
        required: true
      },
      owner: {
        type: Object as PropType<User>,
        required: true
      }
    },
    emits: ['show-add-members']
  })
</script>
<style scoped lang="scss">
  .project {
    &-participants {
      &__member,
      &__add {
        margin: 0 -0.15rem;
        position: relative;
        display: inline-block;
        background-color: transparent;
      }
    }
  }
</style>
