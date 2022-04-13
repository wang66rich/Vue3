<template>
  <div>
    你好markRaw {{ obj.name }}
    <button @click="update">不能修改数据</button>
    <hr>
    你好readonly {{ obj.name }}
    <button @click="update2">不能修改数据</button>
  </div>
</template>

<script>
import { markRaw, isReactive, readonly } from "vue";
export default {
  data: () => ({
    obj: markRaw({ name: "Vue" }),
    obj2: readonly({ name: "Vue" }),
  }),
  methods: {
    update() {
      console.log("markRaw创建是否为响应式"+isReactive(this.obj));
      this.obj.name = "Ken";
      console.log("obj属性name是否等于字符串vue:" + (this.obj.name == "Vue"));
      console.log(this.obj);
    },
    update2() {
      console.log("readOnly创建是否为响应式"+isReactive(this.obj2));
      this.obj2.name = "Ken";
      console.log("obj属性name是否等于字符串vue:" + (this.obj2.name == "Vue"));
      console.log(this.obj2);
    },
  },
};
</script>
