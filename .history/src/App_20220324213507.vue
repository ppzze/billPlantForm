<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'app',
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding: 0;
  box-sizing: border-box;
  min-width: 320px;
  max-width: 1920px;
  margin: 0 auto;
  background-color: #80c1f4;
  min-height: 100vh;
} */
#app{
  width: 100%;
  height: 100%;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
