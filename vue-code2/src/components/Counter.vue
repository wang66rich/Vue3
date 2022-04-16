<template>
  <button @click="increment">
    Count is: {{ count }}, double is: {{ double }} Name is:whn
  </button>
</template>

<script>
import { reactive, computed, toRefs, watch, watchEffect, readonly } from "vue";

export default {
  name:Counter,
  setup() {
    const state = reactive({
      count: 0,
      double: computed(() => state.count * 2),
    });

    const reonly1 = readonly({
      name: "wangrich",
    });

    function increment() {
      state.count++;
    }

    watch(
      () => state.count,
      (newVal, oldVal) => {
        console.log("Counter is change ===>", oldVal, newVal);
        console.log("-------------------------------------");
        console.log(" Count is: "+state.count+",double is:"+state.double);
      }
    );

    watchEffect(() => {
      console.log("watchEffect");
      reonly.name = "whn";
    })

    return {
      // ...toRefs(state),
      state,
      reonly1,
      increment,
    };
  },
};
</script>