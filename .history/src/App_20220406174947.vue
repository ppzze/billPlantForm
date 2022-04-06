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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding: 0;
  box-sizing: border-box;
  min-width: 1300px;
  min-height: 790px;
  /* max-width: 1520px; */
  margin: 0 auto;
  background: url('./views/img/background.png') bottom center no-repeat #efeff4 ;
  background-size: 100% 100%;
  /* background-color: #80c1f4; */
  /* min-height: 100vh; */
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
   /* height:100%; */
  /* min-width: 1000px; */
}
</style>
