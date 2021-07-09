<template>
  <router-view />
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap");
@font-face {
  font-family: "MyriadProLight";
  font-weight: normal;
  src: url("/src/assets/font/MyriadPro-Light.otf");
}
@font-face {
  font-family: "MyriadProSemiBold";
  font-weight: normal;
  src: url("/src/assets/font/MYRIADPRO-SEMIBOLD.OTF");
}

:root {
  --primary1: #15172b;
  --primary2: #262a41;
  --customblue: #0026ff;
  --custompink: #ff3250;
  --customeyellow: #ffbb00;
  --customgreen: #07e642;
  --custompurple: #894fc6;
  --customdarkblue: #121432;
  --white: #ffffff;
  --customgrey: #707070;
  --customgreen1: #15d4a1;
}

body {
  position: relative;
  font-family: "MyriadProRegular", sans-serif;
  background-color: var(--primary1);

  &::-webkit-scrollbar {
    display: none;
    scrollbar-width: none;
  }
}
</style>
