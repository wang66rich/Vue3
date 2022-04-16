<template>
  <div id="app">
    <!-- <vuex-con-one></vuex-con-one>
    <hr>
    <vuex-con-two></vuex-con-two> -->
    <vuex-con-three></vuex-con-three>
    <vuex-con-four></vuex-con-four>
  </div>
</template>

<script>
// import VuexConOne from './components/VuexCpnOne.vue';
// import VuexConTwo from './components/VuexCpnTwo.vue';

import VuexConThree from './components/VuexCpnThree.vue';
import VuexConFour from './components/VuexCpnFour.vue';
export default {
  name: 'App',
  components: {
    // VuexConOne,
    // VuexConTwo,
    VuexConThree,
    VuexConFour
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
