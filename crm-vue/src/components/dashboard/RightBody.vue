<template>
  <div id="right">
    <h1>Development Crm</h1>
    <div class="horizontal">
      <img src="../../assets/images/horizontal.png" alt="horizontal"/>
    </div>

    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s
    </p>

    <div class="users-icon">
      <img src="../../assets/images/users.png" alt="users"/>
    </div>

    <div class="tasks">
      <div class="add-tasks">
        <h2>Today's Task</h2>
        <div class="add-action">
          <img src="../../assets/images/add.png" alt="add-action"/>
        </div>
      </div>

      <ul class="tasks-list">
        <li v-for="task in todayTasks" v-bind:key="task.id">
          <div class="info">
            <div class="left">
              <label class="myCheckbox">
                <input
                    type="checkbox"
                    name="test"
                    :checked="task.completed"
                    @change="checkTodayTask(task.taskId)"
                />
                <span></span>
              </label>

              <h4>{{ task.title }}</h4>
            </div>
            <div class="right">
              <img src="../../assets/images/edit.png"/>
              <img
                  src="../../assets/images/del.png"
                  @click="deleteTodayTask(task.taskId)"
              />

              <button
                  v-bind:class="{
                  inprogress: !task.approved,
                  approved: task.approved,
                }"
              >
                {{ task.approved ? "Approved" : "In progress" }}
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="upcoming">
      <div class="add-tasks">
        <h2>Upcoming</h2>
        <div class="add-action">
          <img src="../../assets/images/add.png" alt="add-action"/>
        </div>
      </div>
      <form action="" @submit="addUpcomingTask">
        <input type="text" v-model="newTaskTitle"/>
      </form>
      <ul class="tasks-list">
        <li v-for="upcomingTask in upcoming" :key="upcomingTask.id">
          <div class="info">
            <div class="left">
              <label class="myCheckbox">
                <input
                    type="checkbox"
                    name="test"
                    :checked="upcomingTask.completed"
                    @change="checkUpcoming(upcomingTask.taskId)"
                />
                <span></span>
              </label>
              <h4>
                {{ upcomingTask.title }}
              </h4>
            </div>
            <div class="right">
              <img src="../../assets/images/edit.png" alt="edit"/>
              <img
                  src="../../assets/images/del.png"
                  @click="deleteUpcoming(upcomingTask.taskId)"
                  alt="del"
              />

              <button
                  v-bind:class="{
                  inprogress: !upcomingTask.approved,
                  approved: upcomingTask.approved,
                  waiting: upcomingTask.waiting,
                }"
              >
                {{ upcomingTask.waiting ? "Waiting" : "Approved" }}
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import {ref} from "vue";
import {DailyTask, UpComingTask} from "@/interfaces/Task";

export default {
  name: "RightBody",
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const todayTasks = ref<DailyTask[]>([]);
    const upcoming = ref<UpComingTask[]>([]);
    const newTaskTitle = ref<string>("");

    //** Upcoming Task **//
    function fetchUpcoming(): void {
      axios.get("/api/upcoming").then(({data}) => {
        upcoming.value = data["data"];
      });
    }

    //** Today Task **//
    function fetchTodayTasks(): void {
      axios
          .get("/api/dailytask")
          .then(({data}) => (todayTasks.value = data["data"]));
    }

    //** Add Upcoming Task **//
    function addUpcomingTask(e: Event): void {
      e.preventDefault();
      if (upcoming.value.length > 4) {
        alert("Please complete the upcoming tasks");
      } else {
        const newTask = {
          title: newTaskTitle.value,
          waiting: true,
          taskId: Math.random().toString(36).substring(7),
        } as UpComingTask;

        //post request
        axios
            .post("/api/upcoming", newTask)
            .then(() => upcoming.value.push(newTask))
            .catch((e) => console.log(e));

        //Clear or Reset newTask
        newTaskTitle.value = "";
      }
    }

    //** Delete Upcoming Task **//
    function deleteUpcoming(taskId: string): void {
      if (confirm("Are you sure?")) {
        //delete request
        axios
            .delete(`/api/upcoming/${taskId}`, {})
            .then(() => {
              upcoming.value = upcoming.value.filter(
                  (task: UpComingTask) => task.taskId != taskId
              );
            })
            .catch((e) => console.error(e));
      }
    }

    // Check upcoming task
    function checkUpcoming(taskId: string): void {
      if (todayTasks.value.length > 4) {
        alert("Please complete existing tasks!");
      } else {
        addDailyTask(taskId);
        //Delete this task from db
        axios.delete(`/api/upcoming/${taskId}`).then(() => {
          upcoming.value = upcoming.value.filter(
              (task: UpComingTask) => task.taskId != taskId
          );
        }).catch(e => console.warn(e.message));
      }
    }

    //** Add daily task and remove upcoming from database **//
    function addDailyTask(taskId: string): void {
      const task = upcoming.value.filter(
          (task: UpComingTask) => task.taskId == taskId
      )[0] as DailyTask;
      //POST REQUEST
      axios
          .post("/api/dailytask", task)
          .then(() => {
            todayTasks.value.unshift(task);
          })
          .catch((e) => console.error(e));
    }

    //Update today task
    function checkTodayTask(taskId: string): void {
      if (confirm("Task Completed?")) {
        axios
          .delete(`/api/dailytask/${taskId}`)
          .then(() => {
            todayTasks.value = todayTasks.value.filter(
              (task: DailyTask) => task.taskId != taskId
            );
          })
          .catch((e) => console.error(e));
      }
    }

    // Delte today task
    function deleteTodayTask(taskId: string): void {
      if (confirm("Are you sure")) {
        //Delete this task from db
        axios.delete(`/api/dailytask/${taskId}`).then(() => {
          todayTasks.value = todayTasks.value.filter(
            (task: DailyTask) => task.taskId != taskId
          );
        });
      }
    }

    //Calling functions
    fetchUpcoming();
    fetchTodayTasks();
    return {
      upcoming,
      todayTasks,
      newTaskTitle,
      addUpcomingTask,
      deleteUpcoming,
      checkUpcoming,
      checkTodayTask,
      deleteTodayTask,
    };
  },
};
</script>
<style scoped lang="scss">
#right {
  position: relative;
  grid-area: Right;
  background-color: #fff;
  border-radius: 15px;
  padding: 65px 20px 85px 70px;

  h1 {
    font-family: "MyriadProBold", sans-serif;
    font-size: 24px;
    font-weight: 400;
    margin-bottom: 10px;
  }

  .horizontal {
    img {
      width: 122px;
    }

    margin-bottom: 10px;
  }

  p {
    font-family: "Open Sans", sans-serif;
    font-size: 12px;
    font-weight: 300;
    width: 500px;
  }

  .users-icon {
    position: absolute;
    right: 42px;
    top: 65px;
    cursor: pointer;

    img {
      height: 30px;
    }
  }

  .tasks,
  .upcoming {
    margin-bottom: 1.3em;

    .add-tasks {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      h2 {
        font-family: "MyriadProBold", sans-serif;
        font-size: 15px;
        font-weight: 400;
      }

      img {
        cursor: pointer;
      }
    }

    input[type="text"] {
      border: unset;
      border-bottom: 1px solid var(--customgrey);
      width: 100%;
      caret-color: var(--primary1);
    }

    ul.tasks-list {
      margin-top: 15px;

      li {
        display: flex;
        flex-direction: column;

        .info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          padding: 0 0.3em;
          border-radius: 0 0.3em 3em;

          &:hover {
            background-color: #70707010;
            transition: all 400ms ease-in-out;
          }

          .left {
            display: flex;
            flex-direction: row;
            align-items: center;

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
                border: 2px solid var(--customgreen1);
              }

              [type="checkbox"]:checked + span:before {
                content: "\2714";
                @extend .middle;
                height: 20px;
                width: 20px;
                border-radius: 50px;
                border: 2px solid var(--customgreen1);
                background-color: var(--customgreen1);
                opacity: 1;
                font-size: 12px;
                top: 45%;
                color: #fff;
              }
            }

            h4 {
              margin-left: 15px;
              font-family: "Open Sans", sans-serif;
              font-size: 13px;
              color: var(--primary2);
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
              font-family: "Open Sans", sans-serif;
              font-size: 12px;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
}
</style>
