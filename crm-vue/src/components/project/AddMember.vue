<template>
  <div class="add-member__container w-50 bg-primary2">
    <div class="add-member__header d-flex flex-column align-items-center justify-content-center">
      <n-icon :size="60" color="#15d4a1"><mail-send-icon /></n-icon>
      <div
        class="
          add-member__header__invite-text
          d-flex
          justify-content-center
          flex-column
          align-items-center
        "
      >
        <h4 class="large-text my-3 fw-bold">Invite People to this Project</h4>
        <p class="small-text">Invite existing team members or add new ones.</p>
      </div>
      <div class="m-4 add-member__team-search w-100 d-flex justify-content-center">
        <n-input
          :on-update:value="filterContacts"
          size="large"
          placeholder="Search by name or email..."
          class="w-100 mx-5"
        >
          <template #prefix>
            <n-icon><search-icon /></n-icon>
          </template>
        </n-input>
      </div>
      <!-- User contacts table -->
      <div class="m-4 add-member__user-contacts w-100 d-flex justify-content-center">
        <n-data-table
          ref="ref"
          class="mx-2"
          :loading="userContacts === null"
          :columns="columns"
          :data="userContacts ?? []"
          :bordered="false"
          :row-key="(rowData) => rowData.email"
          @update:checked-row-keys="handleCheck"
        >
        </n-data-table>
      </div>
      <!-- Add member by email -->
      <div
        class="
          mx-4
          my-3
          add-member__not-in-contacts
          w-100
          d-flex
          justify-content-center
          align-items-start
        "
      >
        <n-form-item class="w-100 mx-5" label="Not a team member? Type their email below:">
          <n-input size="large" placeholder="Add member by email....">
            <template #prefix>
              <n-icon><mail-icon /></n-icon>
            </template>
          </n-input>
        </n-form-item>
      </div>
      <!-- Action buttons -->
      <div class="mx-4 my-3 add-member__not-in-contacts w-100 d-flex justify-content-center">
        <n-space class="w-100 mx-5" justify="end" align="center" size="large">
          <n-button @click="$emit('hide-modal')">Cancel</n-button>
          <n-button type="primary" :disabled="inviteDisabled">Invite Users</n-button>
        </n-space>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref, computed, h } from 'vue'
  import {
    MailInboxArrowUp24Filled as MailSendIcon,
    Search28Regular as SearchIcon,
    Mail28Regular as MailIcon
  } from '@vicons/fluent'
  import { useStore } from '@/use/useStore'
  import Contact from '@/interfaces/Contact'
  import Permission from '@/interfaces/Permission'
  import { handleApi, sortByProperty } from '@/utils/helpers'
  import api from '@/utils/api'
  import { DataTableColumn, SelectOption } from 'naive-ui'
  import ContactName from '../contacts/ContactName.vue'
  import AddMemberActionDropDown from './AddMemberActionDropDown.vue'
  export default defineComponent({
    name: 'AddMember',
    components: {
      MailSendIcon,
      SearchIcon,
      MailIcon
    },
    emits: ['hide-modal'],
    setup() {
      const store = useStore()
      const currentUser = computed(() => store.getters.getCurrentUser)
      const userContacts = ref<
        | null
        | { type?: string; email?: string; name?: string; slug?: string; profileImage?: string }[]
      >(null)
      const permissions = ref<null | Permission[]>(null)
      const tableRef = ref<any>(null)
      const usersToAddPermissionArray: {
        user_slug: string
        permissions: string[]
      }[] = []
      const usersToAdd = ref<Array<string | number>>([])
      // GET USER CONTACTS
      const fetchUserContacts = async () => {
        const promise = api.get(`/api/contacts/get`)
        const [data, error] = await handleApi(promise)
        if (error) {
          // TODO: handle error
          return
        }
        const contacts: Contact[] = data.data['data']
        userContacts.value = contacts.map((contact) => {
          return {
            type: contact.type,
            email: contact.contact_info.email,
            name: contact.contact_info.name,
            profileImage: contact.contact_info.profile_image?.path,
            slug: contact.contact_info.slug
          }
        })
      }
      // Fetch Permissions
      const fetchPermissions = async () => {
        const promise = api.get('/api/auth/permissions/get')
        const [data, error] = await handleApi(promise)
        if (error) {
          // TODO: handle error
          return
        }
        const perms: Permission[] = data.data
        permissions.value = perms
      }
      // Filter user contacts by name or email
      const filterContacts = (value: string | [string, string]) => {
        tableRef.value.filter({ user: [value] })
      }
      onMounted(() => {
        fetchPermissions()
        if (currentUser.value?.contacts != null) {
          userContacts.value = currentUser.value.contacts
        } else {
          fetchUserContacts()
        }
      })

      const columns: DataTableColumn[] = [
        {
          type: 'selection'
        },
        {
          title: 'USER',
          key: 'user',
          sorter: (row1: any, row2: any) => sortByProperty(row1.name, row2.name),
          render(data: any) {
            return h(ContactName, {
              name: data.name,
              email: data.email,
              profileImage: data.profileImage,
              showEmail: true
            })
          },
          filter(value: any, row: any): any {
            return ~row.name.indexOf(value) || ~row.email.indexOf(value)
          }
        },
        {
          title: 'ACCESS LEVEL',
          key: 'access-level',
          render(data: any, index: number) {
            return h(AddMemberActionDropDown, {
              options:
                permissions.value != null
                  ? permissions.value?.map((perm) => {
                      return {
                        value: perm.name,
                        label: perm.display_name
                      } as SelectOption
                    })
                  : [],
              onUpdate: (value: any) => {
                usersToAddPermissionArray[index] = {
                  user_slug: data.slug,
                  permissions: value
                }
              },
              placeHolder: 'Select Permissions',
              disabled: !usersToAdd.value.includes(data.email)
            })
          }
        }
      ]
      return {
        userContacts,
        columns,
        handleCheck: (keys: Array<string | number>) => {
          usersToAdd.value = keys
        },
        filterContacts,
        ref: tableRef,
        inviteDisabled: computed(() => usersToAdd.value.length == 0)
      }
    }
  })
</script>
<style lang="scss" scoped>
  .add-member {
    &__header {
      &__invite-text {
        .small-text {
          word-spacing: 0.2rem;
          line-height: 1rem;
        }
      }
    }
  }
</style>
