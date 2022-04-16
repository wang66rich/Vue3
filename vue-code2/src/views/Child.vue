<template>
  <div class="child">
    <h3>子组件</h3>
    <slot :data="data"></slot>
    <!-- <slot :obj="obj"></slot> -->
  </div>
</template>
<script>
export default {
  name: "child",
  data: function () {
    return {
      data: ["张三", "张三丰", "小龙女", "杨过"],
    //   obj: {
    //     name: "zhangsan",
    //   },
    };
  },
};
</script>