<template>
  <div class="info">
    <div class="left">
      <label
        v-if="
          !showEditTask &&
          (task.status?.slug === 'inprogress' ||
            task.status?.slug === 'completed' ||
            task.status?.slug === 'waiting')
        "
        class="custom-checkbox"
        tab-index="0"
        aria-label="Checkbox Label"
      >
        <input
          type="checkbox"
          name="test"
          :checked="task.status?.slug === 'completed'"
          @change="toogleTaskCompleted()"
        />
        <span class="checkmark"></span>
      </label>
      <h4 class="w-100" @dblclick="!showEditTask ? toogleTaskForm() : null">
        <form class="w-100" @submit.prevent="updateTaskTitle()">
          <!-- TODO: Add visual to see the character limit -->
          <input
            v-model="newTaskTitle"
            maxlength="26"
            :disabled="!showEditTask"
            class="bg-transparent border-0 p-2 w-100 overflow-auto outline-none h-100"
            :class="task.status?.slug === 'completed' && !showEditTask ? 'task-completed' : ''"
            placeholder="Title"
          />
        </form>
      </h4>
    </div>
    <div class="right">
      <img src="../../assets/images/edit.png" @click="toogleTaskForm()" />
      <img src="../../assets/images/del.png" @click="deleteTask()" />
      <!-- NOTE: there is a css class for every default task status -->
      <button :class="task.status?.slug">
        {{ task.status?.name }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { Task } from '@/interfaces/Task'
  import { defineComponent, PropType, ref } from 'vue'
  import { useStore } from '@/use/useStore'
  import { ActionTypes } from '@/store/modules/task/action-types'
  import Swal from 'sweetalert2'
  export default defineComponent({
    name: 'TaskCard',
    props: {
      task: {
        type: Object as PropType<Task>,
        required: true
      },
      index: {
        type: Number,
        required: true
      }
    },
    setup(props) {
      // Initialize custom vuex-store
      const store = useStore()
      // variables

      let showEditTask = ref<boolean>(false)
      let newTaskTitle = ref<string>(props.task.title ?? 'No title')
      /* TOGGLE TASK COMPLETED PROPERY */
      const toogleTaskCompleted = async () => {
        store.dispatch(ActionTypes.CHANGE_STATUS, {
          id: props.task.id!,
          status_slug: props.task.status?.slug === 'completed' ? 'inprogress' : 'completed',
          index: props.index!
        })
      }
      // Edit task
      const toogleTaskForm = () => {
        showEditTask.value = !showEditTask.value
      }
      const updateTaskTitle = () => {
        if (!(props.task.title === newTaskTitle.value)) {
          const newTask: Task = {
            title: newTaskTitle.value
          }
          store.dispatch(ActionTypes.EDIT_TASK, {
            id: props.task.id!,
            updatedTask: newTask,
            index: props.index!
          })
          toogleTaskForm()
        } else {
          Swal.fire({
            icon: 'warning',
            toast: true,
            showConfirmButton: false,
            text: 'Titles are the same',
            timer: 2000,
            position: 'top-end'
          })
        }
      }
      /* DELETE TASK */
      const deleteTask = (): void => {
        store.dispatch(ActionTypes.DELETE_TASK, props.task.id)
      }

      return {
        toogleTaskCompleted,
        deleteTask,
        showEditTask,
        toogleTaskForm,
        newTaskTitle,
        updateTaskTitle
      }
    }
  })
</script>

<style lang="scss">
  .info {
    display: grid;
    align-items: center;
    grid-template-columns: 3fr 1fr;
    padding: 0.5em 0.3em;
    border-radius: 0 0.3em 0.3em;

    &:hover {
      background-color: #70707010;
      transition: all 400ms ease-in-out;
    }

    .left {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      label {
        cursor: pointer;
        margin-top: 0.3em;
        padding-top: 0.4em;

        input {
          display: none;
        }

        span {
          height: 20px;
          width: 20px;
          display: inline-block;
          position: relative;
          border-radius: 50px;
          border: 2px solid var(--bs-success);
        }
      }

      h4 {
        margin: 0;
        margin-left: 15px;
        font-family: 'Open Sans', sans-serif;
        font-size: 13px;
        color: var(--bs-primary2);
        font-weight: 600;
      }
    }

    .right {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      img {
        margin-right: 1em;
        cursor: pointer;
      }

      button {
        padding: 5px 31px;
        border-radius: 50px;
        border: unset;
        box-shadow: unset !important;
        width: 120px;
        font-family: 'Open Sans', sans-serif;
        font-size: 12px;
        white-space: nowrap;
      }
    }
  }
</style>
