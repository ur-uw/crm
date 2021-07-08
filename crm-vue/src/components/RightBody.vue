<template>
  <div id="right">
    <h1>Development Crm</h1>
    <div class="horizontal">
      <img src="../assets/images/horizontal.png" />
    </div>

    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s
    </p>

    <div class="users-icon"><img src="../assets/images/users.png" /></div>

    <div class="tasks">
      <div class="add-tasks">
        <h2>Today's Task</h2>
        <div class="add-action">
          <img src="../assets/images/add.png" alt="add-action" />
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
                  @change="updateTodayTask(task.taskId)"
                />
                <span></span>
              </label>

              <h4>{{ task.title }}</h4>
            </div>
            <div class="right">
              <img src="../assets/images/edit.png" />
              <img
                src="../assets/images/del.png"
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
          <img src="../assets/images/add.png" alt="add-action" />
        </div>
      </div>
      <form action="" @submit="addUpcomingTask">
        <input type="text" v-model="newTaskTitle" />
      </form>
      <ul class="tasks-list">
        <li v-for="upcomingTask in this.upcoming" :key="upcomingTask.id">
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
              <img src="../assets/images/edit.png" />
              <img
                src="../assets/images/del.png"
                @click="deleteUpcoming(upcomingTask.taskId)"
              />

              <button
                v-bind:class="{
                  inprogress: !upcomingTask.approved,
                  approved: upcomingTask.approved,
                  waiting: upcoming.waiting,
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
import { DailyTask, UpComingTask } from "@/interfaces/Task";
export default {
  name: "RightBody",
  setup() {
    let todayTasks = [] as DailyTask[];
    let upcoming = [] as UpComingTask[];
    let newTaskTitle = "";
    //** Upcoming Task **//
    function fetchUpcoming(): void {
      axios.get("/api/upcoming").then(({ data }) => {
        upcoming = data;
      });
    }
    //** Today Task **//
    function fetchTodayTasks(): void {
      axios.get("/api/dailytask").then(({ data }) => (todayTasks = data));
    }
    //** Add Upcoming Task **//
    function addUpcomingTask(e: Event): void {
      e.preventDefault();
      if (upcoming.length > 4) {
        alert("Please complete the upcoming tasks");
      } else {
        const newTask = {
          title: newTaskTitle,
          waiting: true,
          taskId: Math.random().toString(36).substring(7),
        } as UpComingTask;
        //post request
        axios
          .post("/api/upcoming", JSON.stringify(newTask))
          .then(() => upcoming.push(newTask))
          .catch((e) => console.log(e));

        //Clear or Reset newTask
        newTaskTitle = "";
      }
    }

    //** Delete Upcoming Task **//
    function deleteUpcoming(taskId: string): void {
      if (confirm("Are you sure?")) {
        //delete request
        axios
          .delete(`/api/upcoming/${taskId}`, {})
          .then(() => {
            upcoming = upcoming.filter(
              (task: UpComingTask) => task.taskId != taskId
            );
          })
          .catch((e) => console.error(e));
      }
    }
    // Check upcoming task
    function checkUpcoming(taskId: string): void {
      if (todayTasks.length > 4) {
        alert("Please complete existing tasks!");
      } else {
        addDailyTask(taskId);
        //Delete this task from db
        axios.delete(`/api/upcoming/${taskId}`).then(() => {
          upcoming = upcoming.filter(
            (task: UpComingTask) => task.taskId != taskId
          );
        });
      }
    }
    //** Add daily task and remove upcoming from database **//
    function addDailyTask(taskId: string): void {
      const task = upcoming.filter(
        (task: UpComingTask) => task.taskId == taskId
      )[0];

      //POST REQUEST
      axios
        .post("/api/dailytask", JSON.stringify(task))
        .then(({ data }) => {
          todayTasks.unshift(data);
        })
        .catch((e) => console.error(e));
    }

    //Update today task
    function updateTodayTask(taskId: string): void {
      if (confirm("Task Completed?")) {
        axios
          .delete(`/api/dailytask/${taskId}`)
          .then(() => {
            todayTasks = todayTasks.filter(
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
          todayTasks = todayTasks.filter(
            (task: DailyTask) => task.taskId != taskId
          );
        });
      }
    }
    return {
      todayTasks,
      upcoming,
      newTaskTitle,
      fetchTodayTasks,
      fetchUpcoming,
      addUpcomingTask,
      deleteUpcoming,
      checkUpcoming,
      updateTodayTask,
      deleteTodayTask,
    };
  },
  created(): void {
    this.fetchTodayTasks();
    this.fetchUpcoming();
  },
};
</script>

<style></style>
