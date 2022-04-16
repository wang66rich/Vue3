<template>
  <div>
    <!-- <div>计数:{{counter}}</div>
  <button @click="counter++">++</button>
  <button @click="counter--">--</button> -->

    <!-- <div>计数:{{$store.state.counter}}</div>
  <button @click="$store.state.counter++">++</button>
  <button @click="$store.state.counter--">--</button> -->

    <!-- <div>计数:{{$store.state.counter}}</div>
  <button @click="$store.commit('add')">++</button>
  <button @click="$store.commit('sub')">--</button> -->

    <!-- <div>计数:{{$store.state.counter}}</div>
  <button @click="$store.commit('add',5)">+5</button>
  <button @click="$store.commit('sub',5)">-5</button> -->

    <!-- <div>计数:{{$store.state.counter}}</div>
  <button @click="$store.commit('add',{num:5,multiple:2})">+10</button>
  <button @click="$store.commit('sub',{num:5,multiple:2})">-10</button> -->

    <div>计数:{{ $store.state.counter }}</div>
    <button @click="addChang">
      +10
    </button>
    <button @click="subChang">
      -10
    </button>
  </div>
</template>

<script>
import { COUNTER_ADD, COUNTER_SUB } from "../store/mutaition-type";
export default {
  components: {
    COUNTER_ADD,
    COUNTER_SUB,
  },
  name: "VuexConTwo",
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    addChang(){
      this.$store.commit(COUNTER_ADD, { num: 5, multiple: 2 })
    },
    subChang(){
      this.$store.commit(COUNTER_SUB, { num: 5, multiple: 2 })
    }
  },
};
</script>

<style></style>
