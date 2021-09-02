<template>
  <n-grid cols="12">
    <n-gi>
      <n-avatar circle :src="userAvatar" class="text-center"></n-avatar>
    </n-gi>
    <n-gi span="10">
      <n-input
        v-model:value="comment"
        type="textarea"
        style="min-width: 75%"
        autosize
        placeholder="Write a comment...."
        @keydown.enter.prevent="submitComment"
      />
    </n-gi>
  </n-grid>
</template>

<script lang="ts">
  import { defineComponent, ref } from '@vue/runtime-core'
  import { useStore } from '@/use/useStore'
  export default defineComponent({
    name: 'TaskDetailsFooter',
    setup() {
      // TODO: IMPLEMENT COMMENTING
      const submitComment = () => {
        console.log(comment.value)
      }
      const comment = ref('')
      return {
        comment,
        submitComment,
        userAvatar: useStore().getters.getCurrentUser?.profile_image.path
      }
    }
  })
</script>
