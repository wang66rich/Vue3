<template>
  <div class="todo-list">
    <div class="header">TodoList</div>

    <input type="text" v-model="name" placeholder="请输入名字" />
    <input type="text" v-model="gender" placeholder="请输入性别" />
    <!-- <button @click="add">添加</button>
    <button @click="update">更新</button> -->
    <button @click="add" v-if="indexObj.index === null">添加</button>
    <button @click="update" v-else>更新</button>
    <button @click="clear">清空数组</button>

    <ul>
      <li v-for="(item, index) in list" :key="index">
        <span>姓名：{{ item.name }}</span>
        <span>性别：{{ item.gender }}</span>
        <div class="btn-div">
          <button @click="edit(index)">编辑</button>
          <button @click="del(index)">删除</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
export default {
  name: "todoList",
  setup() {
    let list = ref([]);
    let name = ref("");
    let gender = ref("");
    let indexObj = reactive({ index: null });
    const edit = (index) => {
      let item = list.value[index];
      name.value = item.name;
      gender.value = item.gender;
      indexObj.index = index;
      console.log(index);
    };
    const del = (index) => {
      list.value.splice(index, 1);
      indexObj.index = null;
      name.value = "";
      gender.value = "";
    };
    const update = () => {
      if (!name.value || !gender.value) {
        return;
      }
      list.value[indexObj.index].name = name.value;
      list.value[indexObj.index].gender = gender.value;
      name.value = "";
      gender.value = "";
      indexObj.index = null;
    };
    const add = () => {
      if (!name.value || !gender.value) {
        return;
      }
      list.value.push({
        name: name.value,
        gender: gender.value,
      });
      name.value = "";
      gender.value = "";
    };
    const clear = () => {
      list.value.length = 0;
    };
    return {
      list,
      name,
      gender,
      indexObj,
      add,
      edit,
      update,
      del,
      clear,
    };
  },
};
</script>

<style lang="scss" scoped>
.todo-list {
  width: 640px;
  margin: auto;
  .header {
    height: 60px;
    line-height: 60px;
    background-color: #3e3e3e;
    color: orange;
    font-size: 48px;
    margin-bottom: 20px;
    border-radius: 5px;
  }

  ul {
    padding: 10px;
    min-height: 400px;
    li {
      list-style: none;
      text-align: left;
      height: 40px;
      margin-bottom: 10px;
      background-color: #9ebabb;
      line-height: 40px;
      border-left: 8px solid #629a9c;
      border-radius: 5px;
      padding: 5px 10px;
      color: #fff;
      font-weight: bold;
      .btn-div {
        float: right;
      }
      span {
        display: inline-block;
        padding: 0 10px;
      }
    }
  }
}

input,
button {
  margin-right: 10px;
}
</style>