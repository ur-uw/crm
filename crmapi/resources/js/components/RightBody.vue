<template>
  <div id="right">
    <h1>Development Crm</h1>
    <div class="horizontal">
      <img src="../images/horizontal.png" />
    </div>

    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s
    </p>

    <div class="users-icon"><img src="../images/users.png" /></div>

    <div class="tasks">
      <div class="add-tasks">
        <h2>Today's Task</h2>
        <div class="add-action">
          <img src="../images/add.png" alt="add-action" />
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
              <img src="../images/edit.png" />
              <img
                src="../images/del.png"
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
          <img
            src="../images/add.png"
            alt="add-action"
          />
        </div>
      </div>
      <form action="" @submit="addUpcomingTask">
        <input type="text" v-model="newTask" />
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
              <img src="../images/edit.png" />
              <img
                src="../images/del.png"
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

<script>
export default {
  name: "RightBody",
  data() {
    return {
      todayTasks: [],
      upcoming: [],
      newTask: "",
    };
  },
  created() {
    this.fetchTodayTasks();
    this.fetchUpcoming();
  },
  methods: {
    //** Upcoming Task **//
    fetchUpcoming() {
      fetch("/api/upcoming")
        .then((res) => res.json())
        .then(({ data }) => {
          this.upcoming = data;
        })
        .catch((e) => console.log(e));
    },
    //** Today Task **//
    fetchTodayTasks() {
      fetch("/api/dailytask")
        .then((res) => res.json())
        .then(({ data }) => (this.todayTasks = data))
        .catch((e) => console.error(e));
    },
    //** Add Upcoming Task **//
    addUpcomingTask(e) {
      e.preventDefault();
      if (this.upcoming.length > 4) {
        alert("Please complete the upcoming tasks");
      } else {
        const newTask = {
          title: this.newTask,
          waiting: true,
          taskId: Math.random().toString(36).substring(7),
        };
        //post request
        fetch("/api/upcoming", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        })
          .then(() => this.upcoming.push(newTask))
          .catch((e) => console.log(e));

        //Clear or Reset newTask
        this.newTask = "";
      }
    },

    //** Delete Upcoming Task **//
    deleteUpcoming(taskId) {
      if (confirm("Are you sure?")) {
        //delete request
        fetch(`/api/upcoming/${taskId}`, {
          method: "delete",
        })
          .then(() => {
            this.upcoming = this.upcoming.filter(
              ({ taskId: id }) => id != taskId
            );
          })
          .catch((e) => console.error(e));
      }
    },
    // Check upcoming task
    checkUpcoming(taskId) {
      if (this.todayTasks.length > 4) {
        alert("Please complete existing tasks!");
      } else {
        this.addDailyTask(taskId);
        //Delete this task from db
        fetch(`/api/upcoming/${taskId}`, { method: "delete" }).then(() => {
          this.upcoming = this.upcoming.filter(
            ({ taskId: id }) => id != taskId
          );
        });
      }
    },
    //** Add daily task and remove upcoming from database **//
    addDailyTask(taskId) {
      const task = this.upcoming.filter(({ taskId: id }) => taskId == id)[0];

      //POST REQUEST
      fetch("/api/dailytask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      })
        .then((res) => res.json())
        .then(({ data }) => {
          this.todayTasks.unshift(data);
        })
        .catch((e) => console.error(e));
    },

    //Update today task
    updateTodayTask(taskId) {
      if (confirm("Task Completed?")) {
        fetch(`/api/dailytask/${taskId}`, {
          method: "delete",
        })
          .then(() => {
            this.todayTasks = this.todayTasks.filter(
              ({ taskId: id }) => id != taskId
            );
          })
          .catch((e) => console.error(e));
      }
    },

    // Delte today task
    deleteTodayTask(taskId) {
      if (confirm("Are you sure")) {
        //Delete this task from db
        fetch(`/api/dailytask/${taskId}`, { method: "delete" }).then(() => {
          this.todayTasks = this.todayTasks.filter(
            ({ taskId: id }) => id != taskId
          );
        });
      }
    },
  },
};
</script>

<style>
</style>
