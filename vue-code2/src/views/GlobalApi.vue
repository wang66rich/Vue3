<template>
  <div>
    <div class="global-api">
      <div class="drag" v-drag></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "globalApi",
  setup() {},
};
</script>
<style lang="scss" scoped>
.drag {
  position: relative; // 必须加上定位样式，否则不会生效
  height: 100px;
  width: 100px;
  background-color: #2194c5;
}
</style>