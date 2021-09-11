<template>
  <div class="add-member__container w-75 bg-primary2">
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
      <!-- SELECT TEAM -->
      <div class="m-4 add-member__team-search w-50 d-flex flex-column justify-content-center">
        <n-form ref="teamFormRef" :rules="rules" :model="model">
          <n-form-item path="team" label="Select a team to add users to">
            <n-select
              v-model:value="model.team"
              :on-update:value="onTeamUpdate"
              size="large"
              placeholder="Select a team..."
              :options="projectTeams"
            >
            </n-select>
          </n-form-item>
          <n-p depth="3">
            Team does not exists?
            <n-button text type="primary" @click.prevent="showAddTeam = !showAddTeam"
              >Add team
            </n-button>
          </n-p>
          <transition name="fade">
            <n-form-item v-if="showAddTeam" label="Enter team name" path="team">
              <n-input
                v-model:value="model.team"
                :on-update:value="onTeamUpdate"
                placeholder="Team name"
              />
            </n-form-item>
          </transition>
        </n-form>
      </div>
      <!-- USERS SEARCH -->
      <div class="m-4 add-member__team-search w-100 d-flex justify-content-center">
        <n-form-item label="Find users" class="w-100 mx-5">
          <n-input
            :on-update:value="filterContacts"
            size="large"
            placeholder="Search by name or email..."
          >
            <template #prefix>
              <n-icon><search-icon /></n-icon>
            </template>
          </n-input>
        </n-form-item>
      </div>
      <!-- User contacts table -->
      <!--
        FIXME: when enabling pagination filters not working properly.
               When th user is on a leading page and type to filter results
               previous pages contacts not shown
       -->
      <div class="m-4 add-member__user-contacts w-100 d-flex justify-content-center">
        <n-data-table
          ref="ref"
          class="mx-2"
          :loading="userContacts === null"
          :columns="columns"
          :data="userContacts ?? []"
          :bordered="false"
          :pagination="{ pageSize: 5 }"
          :row-key="(rowData) => rowData.slug"
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
        <n-form-item class="w-100 mx-5" label="Not in your contacts? Type their email below:">
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
          <n-button type="primary" :disabled="inviteDisabled" @click="inviteUsers"
            >Invite Users</n-button
          >
        </n-space>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref, computed, h, PropType } from 'vue'
  import {
    MailInboxArrowUp24Filled as MailSendIcon,
    Search28Regular as SearchIcon,
    Mail28Regular as MailIcon
  } from '@vicons/fluent'
  import { useStore } from '@/use/useStore'
  import { handleApi, sortByProperty } from '@/utils/helpers'
  import { DataTableColumn, SelectOption, useMessage } from 'naive-ui'
  import { useRoute } from 'vue-router'
  import { Project } from '@/interfaces/Project'
  import Contact from '@/interfaces/Contact'
  import Permission from '@/interfaces/Permission'
  import api from '@/utils/api'
  import ContactName from '../contacts/ContactName.vue'
  import AddMemberActionDropDown from './AddMemberActionDropDown.vue'

  export default defineComponent({
    name: 'AddMembers',
    components: {
      MailSendIcon,
      SearchIcon,
      MailIcon
    },
    props: {
      project: {
        type: Object as PropType<Project>,
        required: true
      }
    },
    emits: ['hide-modal'],
    setup(props) {
      const store = useStore()
      const route = useRoute()
      const message = useMessage()
      const currentUser = computed(() => store.getters.getCurrentUser)
      const userContacts = ref<
        | null
        | { type?: string; email?: string; name?: string; slug?: string; profileImage?: string }[]
      >(null)
      const permissions = ref<null | Permission[]>(null)
      const tableRef = ref<any>(null)
      let usersToAddPermissionArray: Array<{
        user: string
        permissions: string[]
      }> = []
      const usersToAdd = ref<Array<string | number>>([])
      const teamFormRef = ref<any>(null)
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
          render(data: any) {
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
              'onPermissions-updated': (value: any) => {
                console.log(value)
                const userPermissions = {
                  user: data.slug,
                  permissions: value
                }
                const tempNames = usersToAddPermissionArray.map((obj) => obj.user)
                if (tempNames.includes(data.slug)) {
                  const indexOfData = tempNames.indexOf(data.slug)
                  if (indexOfData !== -1) usersToAddPermissionArray[indexOfData].permissions = value
                } else {
                  usersToAddPermissionArray.unshift(userPermissions)
                }
              },
              placeHolder: 'Select Permissions',
              disabled: !usersToAdd.value.includes(data.slug)
            })
          }
        }
      ]
      const formModel = ref({ team: null as null | string })
      const rules = {
        team: {
          required: true,
          message: 'Please select a team',
          trigger: ['blur']
        }
      }
      // GET USER CONTACTS
      const fetchUserContacts = async () => {
        const promise = api.get(`/api/contacts/get`)
        const [data, error] = await handleApi(promise)
        if (error) {
          // TODO: handle error
          return
        }
        // Filter users that are already in project
        const contacts: Contact[] = data.data['data']?.filter((contact: Contact) => {
          return !props.project.users?.some((user) => user.email === contact.contact_info.email)
        })

        userContacts.value = contacts.map((contact): any => {
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
      // invite users function
      const inviteUsers = () => {
        teamFormRef.value.validate(async (errors: any) => {
          if (!errors) {
            const promise = api.post(`/api/projects/${route.params.slug}/add_user`, {
              users_permissions: usersToAddPermissionArray.filter((obj) =>
                usersToAdd.value.includes(obj.user)
              ),
              team: formModel.value.team
            })
            const [data, error] = await handleApi(promise)
            if (error) {
              // TODO: handle error
              message.error(error.message, { duration: 2500 })
              return
            }
            message.success(data.data.message, { duration: 2500 })
            usersToAddPermissionArray = []
            userContacts.value = userContacts.value?.filter(
              (obj) => !usersToAdd.value?.includes(obj.slug!)
            ) as []
            usersToAdd.value = []
            // TODO: ADD users to project users without refreshing
          }
        })
      }
      onMounted(() => {
        fetchPermissions()
        if (currentUser.value?.contacts != null) {
          userContacts.value = currentUser.value.contacts
        } else {
          fetchUserContacts()
        }
      })

      return {
        userContacts,
        columns,
        filterContacts,
        ref: tableRef,
        inviteUsers,
        teamFormRef,
        rules,
        model: formModel,
        showAddTeam: ref(false),
        handleCheck: (keys: Array<string | number>) => {
          usersToAdd.value = keys
        },
        inviteDisabled: computed(() => usersToAdd.value.length == 0),
        projectTeams: props.project.teams?.map((team) => {
          return {
            label: team.display_name,
            value: team.name
          }
        }),
        onTeamUpdate: (value: string | null) => {
          formModel.value.team = value
        }
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
