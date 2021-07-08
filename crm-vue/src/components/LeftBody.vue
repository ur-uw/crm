<template>
  <div id="left">
    <img
      src="../assets/images/hamburger.png"
      class="hamburger"
      alt="hamburger"
    />
    <div class="profile">
      <h1>Hi Mohammed</h1>
      <h2>Let's make projects more amazing</h2>
      <div class="search">
        <input type="text" placeholder="Search your project" />
        <img src="../assets/images/search.png" alt="search" />
      </div>
    </div>
    <div class="project">
      <h3>Projects <span>(16)</span></h3>
      <div class="projects">
        <div class="a-project">
          <div class="box-color">
            <img src="../assets/images/overlay.png" alt="overlay" />
            <span>PT</span>
            <h6>Development</h6>
          </div>
        </div>

        <div class="a-project">
          <div class="box-color">
            <img src="../assets/images/overlay.png" alt="overlay" />
            <span>PT</span>
            <h6>Design</h6>
          </div>
        </div>

        <div class="a-project">
          <div class="box-color">
            <img src="../assets/images/overlay.png" alt="overlay" />
            <span>PT</span>
            <h6>Testing</h6>
          </div>
        </div>

        <div class="a-project">
          <div class="box-color">
            <img src="../assets/images/overlay.png" alt="overlay" />
            <span>PT</span>
            <h6>Medium Draft</h6>
          </div>
        </div>

        <div class="a-project">
          <div class="box-color">
            <img src="../assets/images/overlay.png" alt="overlay" />
            <span>PT</span>
            <h6>Landing Page</h6>
          </div>
        </div>

        <div class="a-project">
          <div class="box-color">
            <img src="../assets/images/plus.svg" id="plus-icon" />

            <h6>Add Project</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RightBody",
};
</script>

<style lang="scss"></style>
