<template>
  <div id="app">
    <div class="nav">
      <router-link to="/home">主页</router-link>
      <!-- <router-link to="/about">关于</router-link> -->

      <!-- 命名路由的跳转 -->
      <router-link :to="{ name: 'about' }" >关于</router-link>
      <button @click="toMy()">去我的页面</button>
    </div>
 <router-view class="container"></router-view>
    <div class="container">
      <!-- <router-view></router-view> -->
      <!-- <router-view name="center"></router-view>
      <router-view name="left"></router-view>
      <router-view name="top"></router-view> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  methods: {
    toMy() {
      //编程式导航
      // this.$router.push("/my")
      // this.$router.push({
      //   name: 'my',
      //   params: {
      //     username:"zhangsan"
      //   }
      // })
      this.$router.push({
        path: `my/${zhangsan}`,
      })


    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.nav {
  height: 60px;
  line-height: 60px;
  background-color: #333;
  padding-left: 5%;
}

a {
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  padding: 10px 30px;
}
a:hover {
  color: #ddd;
}

.router-link-active {
  background-color: orange;
}

.container {
  width: 90%;
  margin: 10px auto;
  /* background-color: #ccc; */
  min-height: 400px;
  padding: 10px;
}
</style>
