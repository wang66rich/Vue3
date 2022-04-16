<template>
  <div class="dynamic-arguments">
    <h2>
  JavaScript 表达式
  <br />
  字符串 split 操作：{{ msg.split("，")[0] }}
  <br />
  数值计算：{{ num + 1 }}
  <br />
  数组操作：{{ arr[0] }}
</h2>
 <h2>
    v-bind: 绑定属性
    <br />
    <a :[urlKey]="a">海绵宝宝语录</a>
  </h2>

  <h2>
      v-on:[handlerEventName] 绑定事件名变量
      <br />
      <button v-on:[clickEventName]="increase">v-on{{num1}}</button>
      <button @[clickEventName]="increase">@{{num1}}</button>
      <!-- <button v-on:click="increase">{{num1}}</button> -->
    </h2>
    <h2>
      <hr>
      v-slot:[slotName] 具名插槽
      <parent>
        <!-- <template v-slot:child>
          <child></child>
        </template> -->
        <!-- <template v-slot:[child]>
          <child></child>
        </template> -->
        <template #[child]>
          <child></child>
        </template>
      </parent>
    </h2>
     <h2>
      动态指令计算
      <br />
      <h3>key1:{{key1}}</h3>
      <h3>key2:{{key2}}</h3>
      <h3>key1+key2:{{key1+key2}}</h3>
      <a v-bind:[key1+key2]="a">aaa.com</a>
    </h2>
  </div>
</template>

<script>
  import parent from './bbb.vue';
  import child from './aaa.vue';
import { ref } from "vue";
export default {
  name: "DynamicArguments",
  components: {
      parent,
      child,
    },
  setup() {
    let msg = ref("知识代替不了友谊，所以我宁愿做一个笨蛋也不愿失去你");
    let urlKey = ref('href');
    let num = ref(0);
    let arr = ref(['zhangsan', '前端开发', 'Python100天']);
    let a='https://wenku.baidu.com/view/03ead6efce7931b765ce0508763231126fdb77c0.html';
    let key1 = ref('nam');
    let key2 = ref('e');
    let num1 = ref(0);
      const increase = () => {
        num1.value++;
      };
       let clickEventName = ref('click');
       let child = ref('child')
    return {
        msg,
        num,
        arr,
        a,
        urlKey,
        increase,
        num1,
        clickEventName,
        child,
        key1,
        key2
      
        
    }
  }
};
</script>

<style scoped>
input {
  width: 300px;
}
</style>