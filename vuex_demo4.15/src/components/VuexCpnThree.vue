<template>
  <div>
    <label for="firstName">firstName:</label>
    <input type="text" v-model="firstName" id="firstName" />

    <label for="lastName">firstName:</label>
    <input type="text" v-model="$store.state.lastName" id="lastName" />
    <!-- <button @click="$store.commit('submitAsync')">触发异步</button> -->
    <button @click="demoAction">触发异步</button>
    <hr />
    <div>VueCpnThree组件</div>
    <div>fullname:{{ $store.state.firstName }}-{{ $store.state.lastName }}</div>
  </div>
</template>

<script>
export default {
  computed: {
    firstName: {
      get() {
        return this.$store.state.firstName;
      },
      set(newVal) {
        this.$store.commit("handleFirstNameVal", newVal);
      },
    },
  },
  methods:{
    demoAction(){
      this.$store.dispatch('submitAction','demoAction').then((res)=>{
        alert(res);
        console.log(res);
      })
    }
  }
};
</script>

<style></style>
