<template>
  <div id="body">
    <LeftBody/>
    <RightBody/>
  </div>
</template>

<script>
import LeftBody from "./LeftBody";
import RightBody from "./RightBody";

export default {
  name: "Body",
  components: {
    LeftBody,
    RightBody,
  },
};
</script>

<style lang="scss">
#body {
  display: grid;
  grid-template-columns: 40% 60%;
  grid-template-areas: "Left Right";
  padding: 16px;
}
input[type="text"] {
  outline: none;
}

.approved {
  background-color: #15d4a150;
  color: #15d4a1;
}

.inprogress {
  background-color: #0060ff20;
  color: #0060ff;
}

.rejected {
  background-color: #ff0e4620;
  color: #ff0e46;
}

.enabled-input {
  background-color: #fafafa;
  height: 2rem;
  border-radius: 5px;
  border: none;
}

.disabled-input {
  height: 2rem;
  outline: none;
  border-radius: 5px;
  border: none;
}

#plus-icon {
  height: 5px;
  width: 5px;
}

#plus-icon * {
  width: 100%;
  height: 100%;
  fill: white;
}
</style>
