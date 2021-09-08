<template>
  <div class="general-actions__container mx-3 my-4">
    <h2 class="fw-bold">Contacts</h2>
    <div class="d-flex align-items-center justify-content-between w-100">
      <n-space size="large" class="general-actions__search-filter">
        <n-input placeholder="Search">
          <template #prefix>
            <n-icon>
              <search-icon />
            </n-icon>
          </template>
        </n-input>
        <n-button rounded>
          <n-space>
            <span>
              <n-icon><FilterIcon /></n-icon>
            </span>
            <span>Filter</span>
          </n-space>
        </n-button>
      </n-space>
      <n-space size="large" class="general-actions__upload-add">
        <n-button rounded>
          <n-space>
            <span>
              <n-icon><UploadIcon /></n-icon>
            </span>
            <span>Upload</span>
          </n-space>
        </n-button>
        <n-button rounded type="primary">
          <n-space>
            <span>
              <n-icon><PersonAddIcon /></n-icon>
            </span>
            <span>Add New</span>
          </n-space>
        </n-button>
      </n-space>
    </div>
  </div>
  <div class="contacts-table__container mx-3 my-4">
    <n-data-table
      ref="table"
      :loading="userContacts === null"
      :columns="columns"
      :data="userContacts ?? []"
      :bordered="false"
      :row-key="(rowData) => rowData.contact_info.email"
      @update:checked-row-keys="handleCheck"
    />
  </div>
</template>

<script lang="ts">
  import ContactAction from '@/components/contacts/ContactAction.vue'
  import ContactName from '@/components/contacts/ContactName.vue'
  import Contact from '@/interfaces/Contact'
  import api from '@/utils/api'
  import { handleApi, sortByProperty } from '@/utils/helpers'
  import { DataTableColumn, NP } from 'naive-ui'
  import { defineComponent, h, onMounted, ref } from 'vue'
  import {
    Search28Regular as SearchIcon,
    Filter28Regular as FilterIcon,
    ArrowUpload24Regular as UploadIcon,
    PersonAdd28Regular as PersonAddIcon
  } from '@vicons/fluent'
  const columns: DataTableColumn[] = [
    {
      type: 'selection'
    },
    {
      title: 'NAME',
      key: 'name',
      sorter: (row1: any, row2: any) =>
        sortByProperty(row1.contact_info.name, row2.contact_info.name),
      render(data: any) {
        return h(ContactName, { contact: data })
      }
    },
    {
      title: 'TYPE',
      key: 'type',
      render(data: any) {
        return h(NP, {}, () => data.type.toUpperCase())
      }
    },
    {
      title: 'EMAIL',
      key: 'email',
      sorter: (row1: any, row2: any) =>
        sortByProperty(row1.contact_info.email, row2.contact_info.email),
      render(data: any) {
        return h(NP, {}, () => data.contact_info.email)
      }
    },
    {
      title: 'RECENT ACTIVITY',
      key: 'recent_activity',
      render() {
        // TODO: IMPLEMENT ONLINE ACTIVITY
        return h(NP, {}, () => `${Math.ceil(Math.random() * 100)} Minutes ago`)
      }
    },
    {
      title: 'PHONE',
      key: 'phone',
      sorter: (row1: any, row2: any) =>
        sortByProperty(row1.contact_info.phone, row2.contact_info.phone),
      render(data: any) {
        return h(NP, {}, () => data.contact_info.phone)
      }
    },
    {
      title: 'ACTIONS',
      key: 'actions',
      render(data: any) {
        return h(ContactAction, { contact: data })
      }
    }
  ]
  export default defineComponent({
    name: 'Contacts',
    components: {
      SearchIcon,
      FilterIcon,
      UploadIcon,
      PersonAddIcon
    },
    setup() {
      const tableRef = ref(null)
      const userContacts = ref<null | Contact[]>(null)
      // Fetch user contacts
      const fetchUserContacts = async () => {
        const promise = api.get(`/api/contacts/get`)
        const [data, error] = await handleApi(promise)
        if (error) {
          // TODO: handle error
          return
        }
        const contacts: Contact[] = data.data['data']
        userContacts.value = contacts
      }
      onMounted(() => {
        fetchUserContacts()
      })
      return {
        columns,
        userContacts,
        checkedRowKeys: ref([]),
        table: tableRef,
        handleCheck(rowKeys: any) {
          console.log(rowKeys)
        }
      }
    }
  })
</script>
<style lang="scss" scoped></style>
