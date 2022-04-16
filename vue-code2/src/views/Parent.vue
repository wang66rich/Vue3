<template>
  <!-- <div class="parent">
    <h1>父级元素</h1>
    <slots>
      <p>插槽内容1</p>
      <p>插槽内容2</p>
    </slots>
  </div> -->
  <div class="father">
    <h3>父组件</h3>
    <child>
      <template v-slot="{ obj }">
        <div>
          {{ obj }}
        </div>
      </template>
    </child>
  </div>
</template>

<script>
// import slots from "./Slots";
import child from "./Child";
export default {
  name: "parent",
  components: {
    child,
    // slots,
  },
};
</script>