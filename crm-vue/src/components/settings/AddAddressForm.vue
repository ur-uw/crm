<template>
  <n-form
    ref="formRef"
    :model="model"
    :rules="rules"
    class="mt-4 px-3"
    @keydown.enter.prevent="onSavePressed"
  >
    <n-form-item path="name" label="Name">
      <n-input v-model:value="model.name" class="input-field" placeholder="" size="large"></n-input>
    </n-form-item>
    <n-grid :x-gap="15" :y-gap="15" cols="2 xs:1 s:1">
      <n-grid-item>
        <n-form-item path="country" label="Country">
          <n-input
            v-model:value="model.country"
            class="input-field"
            placeholder="EX: Iraq"
            size="large"
          ></n-input>
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item path="city" label="City">
          <n-input
            v-model:value="model.city"
            class="input-field"
            placeholder="EX: Baghdad"
            size="large"
          ></n-input>
        </n-form-item>
      </n-grid-item>
    </n-grid>
    <n-form-item path="address1" label="Address1">
      <n-input
        v-model:value="model.address1"
        class="input-field"
        placeholder="EX: House no.45 second floor, 5th cross"
        size="large"
      >
      </n-input>
    </n-form-item>
    <n-form-item path="address2" label="Address2">
      <n-input
        v-model:value="model.address2"
        class="input-field"
        placeholder="EX: Banaswadi, Bangalore, KA 560043"
        size="large"
      >
      </n-input>
    </n-form-item>
    <n-grid :x-gap="15" :y-gap="15" cols="2 xs:1 s:1">
      <n-grid-item>
        <n-form-item path="state" label="State">
          <n-input
            v-model:value="model.state"
            class="input-field"
            placeholder="EX: Baghdad/Center"
            size="large"
          ></n-input>
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item path="zip" label="Zip">
          <n-input
            v-model:value="model.zip"
            class="input-field"
            placeholder="EX: 334341"
            size="large"
          ></n-input>
        </n-form-item>
      </n-grid-item>
    </n-grid>
    <n-space justify="end">
      <n-button :disabled="isSaveDisabled" @click.prevent="onSavePressed">Save</n-button>
    </n-space>
    <n-divider />
  </n-form>
</template>

<script lang="ts">
  import { numbersRegex } from '@/utils/regex'
  import { FormItemRule } from 'naive-ui'
  import { computed, defineComponent, ref } from 'vue'

  export default defineComponent({
    name: 'AddAddressForm',

    emits: ['add-address'],
    setup(props, { emit }) {
      const initAddressInfo = () => {
        return {
          country: '',
          name: '',
          address1: '',
          address2: '',
          state: '',
          city: '',
          zip: ''
        }
      }
      const formRef = ref<any>()
      const formModel = ref(initAddressInfo())
      const formRules = {
        name: {
          required: true,
          message: 'Address name is required',
          trigger: ['blur']
        },
        country: {
          required: true,
          message: 'Country is required',
          trigger: ['blur']
        },
        state: {
          required: true,
          message: 'State is required',
          trigger: ['blur']
        },
        address1: {
          required: true,
          message: 'This address is required',
          trigger: ['blur']
        },
        city: {
          required: true,
          message: 'City is required',
          trigger: ['blur']
        },
        zip: {
          required: true,
          validator: (rule: FormItemRule, val: string) => {
            if (val === '') {
              return Error('Zip is required')
            } else if (!numbersRegex.test(val)) {
              return Error('Zip code can contain numbers only [0-9]')
            } else if (val.length < 5 || val.length > 10) {
              return Error('Zip code must be from 5 to 10 characters')
            }
            return true
          },
          trigger: ['blur']
        }
      }

      // Indicate  weather save button is disabled
      const isSaveDisabled = computed(
        () => JSON.stringify(formModel.value) === JSON.stringify(initAddressInfo())
      )

      // emit an event when save is pressed
      const onSavePressed = () => {
        if (formRef.value !== null && !isSaveDisabled.value) {
          formRef.value.validate((errors: unknown) => {
            if (!errors) {
              emit('add-address', formModel.value)
            }
          })
        }
      }
      return {
        model: formModel,
        formRef,
        rules: formRules,
        onSavePressed,
        isSaveDisabled
      }
    }
  })
</script>
