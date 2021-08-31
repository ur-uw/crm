<template>
  <n-form
    ref="formRef"
    :rules="rules"
    :model="model"
    class="mt-4 px-3"
    @keydown.enter.prevent="onSavePressed"
  >
    <n-collapse>
      <n-collapse-item :title="model.name" :name="model.id">
        <template #arrow>
          <n-icon><LocationIcon /></n-icon>
        </template>
        <n-form-item path="name" label="Name">
          <n-input
            v-model:value="model.name"
            class="input-field"
            placeholder=""
            size="large"
          ></n-input>
        </n-form-item>
        <n-grid :x-gap="15" :y-gap="15" cols="2 xs:1 s:1">
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
            <n-form-item path="city" label="City">
              <n-input
                v-model:value="model.city"
                class="input-field"
                placeholder=""
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
        <n-space justify="space-between">
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button circle ghost type="error" @click="onDeleteAddressPressed">
                <template #icon>
                  <n-icon><delete-icon /></n-icon>
                </template>
              </n-button>
            </template>
            Delete Address
          </n-tooltip>
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
  import { Location28Filled as LocationIcon, Delete28Filled as DeleteIcon } from '@vicons/fluent'
  import { FormItemRule, useDialog } from 'naive-ui'
  import { numbersRegex } from '@/utils/regex'
  export default defineComponent({
    name: 'UserAddressForm',
    components: {
      LocationIcon,
      DeleteIcon
    },
    props: {
      address: {
        type: Object as PropType<Address>,
        required: true
      }
    },
    emits: ['address-changed', 'delete-address'],
    setup(props, { emit }) {
      const dialog = useDialog()
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
          message: 'Zip is required',
          validator: (rule: FormItemRule, val: string) => {
            if (val.length !== 0) {
              return Error('Zip is required')
            }
            if (!numbersRegex.test(val)) {
              return Error('Zip code can contain numbers only [0-9]')
            }
            return true
          },
          trigger: ['blur']
        }
      }

      // Show a confirm dialog when delete button is pressed
      const onDeleteAddressPressed = () => {
        dialog.create({
          content: 'Are you sure you want to delete this address',
          showIcon: false,
          closable: false,
          positiveText: 'Confirm',
          negativeText: 'Cancel',
          onPositiveClick: () => {
            emit('delete-address', props.address.id)
          }
        })
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
              emit('address-changed', formModel.value)
              // TODO: Disable save button after update is success
            }
          })
        }
      }
      return {
        model: formModel,
        formRef,
        rules: formRules,
        onSavePressed,
        isSaveDisabled,
        onDeleteAddressPressed
      }
    }
  })
</script>
