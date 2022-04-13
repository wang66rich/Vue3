<template>
  <div class="home">
    <!-- <h2>这里是主页</h2> -->
    <div class="left">
      <div class="nav-container">
        <router-link to="/home/article/1">id为1的文章</router-link>
      </div>
      <div class="nav-container">
        <router-link to="/home/article?id=11">id为11的文章</router-link>
      </div>
      <!-- 使用命名路由传参 -->
      <div class="nav-container">
        <router-link :to="{ name: 'article', params: { id: 2 } }"
          >id为2的文章</router-link
        >
      </div>

      <div class="nav-container">
        <router-link to="/home/news">新闻</router-link>
      </div>
    </div>

    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
};
</script>

<style scoped >
.home {
  display: flex;
}
.left {
  width: 14%;
  height: 100vh;
  background: gray;
}
.right {
  padding: 20px;
}

.router-link-active {
  background-color: orange;
  width: 14%;
}

.nav-container {
  /* background: gray; */
  margin-top: 20px;
  padding: 20px;
  width: 100%;
}
.router-link-active:before {
  content: "";
  width: 0px;
  height: 0px;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 10px solid orange;
  position: absolute;
  left: 188px;
}
</style>
