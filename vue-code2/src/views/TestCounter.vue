<template>
  <button @click="increment">
    Count is: {{ count }}, double is: {{ double }} Name is: {{ reonly.name }}
  </button>
</template>

<script>
import { reactive, computed, toRefs, watch, watchEffect, readonly } from "vue";

export default {
  name: 'Counter',
  setup() {
    const state = reactive({
      count: 0,
      double: computed(() => state.count * 2),
    });

    const reonly = readonly({
      name: "InfinityX7",
    });

    function increment() {
      state.count++;
    }

    watch(
      () => state.count,
      (newVal, oldVal) => {
        console.log("Counter is change ===>", oldVal, newVal);
      }
    );

    watchEffect(() => {
      console.log("watchEffect");
      reonly.name = "whn";
    });

    return {
      ...toRefs(state),
      reonly,
      increment,
    };
  },
};
</script>
