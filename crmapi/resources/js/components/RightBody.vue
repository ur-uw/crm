<template>
  <div id="right">
    <h1>Development CRM</h1>
    <div class="horizontal">
      <img src="../images/horizontal.png" alt="" />
    </div>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis modi
      voluptatibus cupiditate! Veritatis nemo, reiciendis adipisci saepe officia
      eum optio, quis error earum tenetur consequuntur perspiciatis possimus
      aliquid voluptates dolore?
    </p>
    <div class="task">
      <div class="add-tasks">
        <h2>Today's Task</h2>
        <div class="add-action">
          <img src="../images/add.png" alt="add-action" />
        </div>
        <ul class="tasks-list"></ul>
      </div>

      <div class="upcoming">
        <div class="add-tasks">
          <h2>Upcoming</h2>
          <div class="add-action">
            <img src="../images/add.png" alt="add-action" />
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
                <img src="../images/edit.png" alt="edit" />
                <img
                  src="../images/del.png"
                  alt="delete"
                  @click="deleteUpcoming(upcomingTask.taskId)"
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RightBody",
  data() {
    return {
      todayTask: [],
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
    fetchTodayTasks() {},
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
        }).then(() => {
          this.upcoming.filter((ele) => {
            console.log(ele);
          });
        });
      }
    },
  },
};
</script>

<style>
</style>
