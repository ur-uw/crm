<template>
  <n-form ref="formRef" :model="model" class="mt-4">
    <n-collapse>
      <n-collapse-item :title="model.name" :name="model.id">
        <n-grid class="px-3" :x-gap="15" :y-gap="15" cols="2 xs:1 s:1">
          <n-grid-item>
            <n-form-item path="country" label="Country">
              <n-input
                v-model:value="model.country"
                class="input-field"
                placeholder=""
                size="large"
              ></n-input>
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="City">
              <n-input
                v-model:value="model.city"
                class="input-field"
                placeholder=""
                size="large"
              ></n-input>
            </n-form-item>
          </n-grid-item>
        </n-grid>
        <n-form-item class="px-3" label="Address1">
          <n-input
            v-model:value="model.address1"
            class="input-field"
            placeholder="EX: House no.45 second floor, 5th cross"
            size="large"
          >
          </n-input>
        </n-form-item>
        <n-form-item class="px-3" label="Address2">
          <n-input
            v-model:value="model.address2"
            class="input-field"
            placeholder="EX: Banaswadi, Bangalore, KA 560043"
            size="large"
          >
          </n-input>
        </n-form-item>
        <n-grid class="px-3" :x-gap="15" :y-gap="15" cols="2 xs:1 s:1">
          <n-grid-item>
            <n-form-item label="State">
              <n-input
                v-model:value="model.state"
                class="input-field"
                placeholder="EX: Baghdad/Center"
                size="large"
              ></n-input>
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="Zip">
              <n-input
                v-model:value="model.zip"
                class="input-field"
                placeholder="EX: 334341"
                size="large"
              ></n-input>
            </n-form-item>
          </n-grid-item>
        </n-grid>
        <n-space class="pe-3" justify="end">
          <n-button :disabled="isSaveDisabled" @click.prevent="onSavePressed">Save</n-button>
        </n-space>

        <n-divider />
      </n-collapse-item>
    </n-collapse>
  </n-form>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType, ref } from 'vue'
  import { Address } from '@/interfaces/Address'
  export default defineComponent({
    name: 'UserAddressForm',
    props: {
      address: {
        type: Object as PropType<Address>,
        required: true
      }
    },
    emits: ['address-changed'],
    setup(props, { emit }) {
      const initAddressInfo = () => {
        return {
          id: props.address.id,
          country: props.address.country,
          name: props.address.name,
          address1: props.address.address1,
          address2: props.address.address2,
          state: props.address.state,
          city: props.address.city,
          zip: props.address.zip
        } as Address
      }
      const formRef = ref<any>()
      const formModel = ref(initAddressInfo())
      const formRules = {
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
          message: 'State is required',
          trigger: ['blur']
        }
      }
      // Indicate  weather save button is disabled
      const isSaveDisabled = computed(
        () => JSON.stringify(formModel.value) === JSON.stringify(initAddressInfo())
      )

      // emit an event when save is pressed
      const onSavePressed = () => {
        if (formRef.value !== null) {
          formRef.value.validate((errors: unknown) => {
            if (!errors) {
              emit('address-changed', formModel.value)
            }
          })
        }
      }
      return { model: formModel, formRef, rules: formRules, onSavePressed, isSaveDisabled }
    }
  })
</script>
