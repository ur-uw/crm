<template>
  <div class="avatar-wrapper mb-3 d-flex flex-column align-items-center justify-content-start">
    <n-space>
      <n-button class="mb-3" size="large" type="primary" @click="showModal = !showModal">
        Change picture
      </n-button>
      <n-button ghost size="large">Delete picture </n-button>
    </n-space>
    <n-form-item>
      <n-avatar class="avatar" round :size="200" :src="newImagePath ?? path" />
    </n-form-item>
  </div>
  <n-modal
    v-model:show="showModal"
    class="custom-card"
    preset="card"
    :show-icon="false"
    :style="{ width: '45%' }"
    title="Upload Profile Picture"
    :bordered="false"
    size="huge"
    :segmented="{
      content: 'soft',
      footer: 'soft'
    }"
  >
    <n-upload :default-upload="false" accept=".png,.jpg,.jpeg" :on-change="handleChange">
      <n-upload-dragger>
        <div style="margin-bottom: 12px">
          <n-icon size="48" :depth="3">
            <archive-icon />
          </n-icon>
        </div>
        <n-text style="font-size: 16px">Click or drag file to this area to upload</n-text>
        <p depth="3" style="margin: 8px 0 0 0">
          Strictly prohibit from uploading sensitive information. For example, your deposit card's
          password or your credit card's expiration date and security code.
        </p>
      </n-upload-dragger>
    </n-upload>
    <template #footer>
      <n-space justify="end">
        <n-button :disabled="!fileListLength" @click.prevent="uploadImage">Save</n-button>
        <n-button @click="showModal = false">Cancel</n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  // import { UploadFile } from '@/interfaced/UploadFile'
  import { Archive48Regular as ArchiveIcon } from '@vicons/fluent'
  import { UploadFile } from '@/interfaces/UploadFile'
  import api from '@/utils/api'
  import { handleApi } from '@/utils/helpers'
  import { Image } from '@/interfaces/Image'
  import { useMessage } from 'naive-ui'
  export default defineComponent({
    name: 'SettingsUserAvatar',
    components: { ArchiveIcon },
    props: {
      path: {
        type: String,
        required: true
      }
    },
    emits: ['avatar-changed'],

    setup(props, { emit }) {
      const message = useMessage()
      const newImagePath = ref<null | string>(null)
      let newImageFile: null | File = null
      const showModal = ref(false)
      let fileListLength = ref(0)
      // Handle changes of files
      const handleChange = (options: {
        file: UploadFile
        fileList: Array<UploadFile>
        event?: Event
      }) => {
        fileListLength.value = options.fileList.length
        newImageFile = options.file.file
        if (options.fileList.length > 1) {
          options.fileList.pop()
        }
      }
      // Upload image to the back-end
      const uploadImage = async () => {
        if (newImageFile) {
          const formData: FormData = new FormData()
          formData.set('image', newImageFile)
          const promise = api.post('/api/user/change_avatar', formData)
          const [data, error] = await handleApi(promise)
          if (error) {
            message.error('Some thing went wrong pleas try again later', { duration: 3000 })
            return
          }
          const img: Image = data.data['data']
          emit('avatar-changed', img)
          newImagePath.value = img.path ?? null
          showModal.value = false
          fileListLength.value = 0
          message.success('Profile picture changed', { duration: 3000 })
        }
      }
      return { newImagePath, showModal, handleChange, fileListLength, uploadImage }
    }
  })
</script>
