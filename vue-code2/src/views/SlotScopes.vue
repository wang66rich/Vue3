<template>
  <div class="parent">
    <h3>父组件</h3>

    <!-- 用列表展示数据-->
    <child>
      <template v-slot="res">
        <ul>
          <li :key="`key${index}`" v-for="(item, index) in res.data">
            {{ item }}
          </li>
        </ul>
      </template>
    </child>

    <!--直接显示数据-->
    <child>
      <template v-slot="res">{{ res.data }}</template>
    </child>

    <!--不使用其提供的数据，作用域插槽退变成匿名插槽-->
    <child>模板</child>
    <!-- <child>
      <template v-slot="{ obj }">
        <div>
          {{ obj }}
        </div>
      </template>
    </child> -->
  </div>
</template>
<script>
import child from "./Child";
export default {
  name: "slotScopes",
  components: {
    child,
  },
};
</script>
<style scoped>
ul {
  list-style-type: none;
}
</style>