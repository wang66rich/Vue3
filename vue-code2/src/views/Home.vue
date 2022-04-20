<template>
  <div class="home">
    <h2 style="text-align: center">基于vue的弹幕组件</h2>
    <div class="container">
      <!-- <video
        src="http://47.96.31.161:9000/my-file/soft1851.mp4"
        controls
        autoplay
        style="width: 100%; height: 100%; z-index: 2"
      /> -->
      <!-- 确保父元素是相对定位，弹幕容器是绝对定位 -->
      <v-barrage :arr="arr" :isPause="isPause" :percent="100"> </v-barrage>
    </div>

    <div class="barrage-control">
      <input
        type="text"
        v-model="sendContent"
        placeholder="回车发送"
        id="sendContent"
        @keyup.enter="sendBarrage"
      />

      <!-- 方向:
      <select style="margin: 0px 12px" v-model="direction">
        <option value="default">默认</option>
        <option value="top">顶部</option>
      </select> -->

      <!-- <input type="checkbox" v-model="isJs" /> js弹幕(直接写代码) -->

      <button
        id="sendBarrageBtn"
        style="margin-left: 25px"
        @click="sendBarrage"
      >
        发送
      </button>
      <button id="pauseBtn" @click="isPause = true">暂停</button>
      <button id="startBtn" @click="isPause = false">开始</button>
    </div>
  </div>
</template>

<script>
import VBarrage from "../components/VBarrage/index.vue";

export default {
  name: "App",
  components: {
    VBarrage,
  },
  data() {
    return {
      arr: [],
      isPause: false,
      sendContent: null,
      isJs: false,
      direction: "default",
    };
  },
  mounted() {
    this.initTestData();
  },
  methods: {
    // 初始化模拟弹幕数据
    initTestData() {
      let arr = ["这是一条弹幕", "今天也是努力的一天", "OK？", "UPUPUP！！！"];
      for (let i = 0; i < 6; i++) {
        for (let index = 0; index < 1000; index++) {
          this.arr.push({
            direction: "default",
            content: arr[parseInt(Math.random() * arr.length)],
          });
        }
      }
    },
    // 发送弹幕
    sendBarrage() {
      if (
        this.arr.length > 1 &&
        this.sendContent != "" &&
        this.sendContent != null
      ) {
        this.arr.unshift({
          content: this.sendContent,
          direction: this.direction,
          isSelf: true,
          style: {
            color: "red",
            fontSize: "25px",
          },
          isJs: this.isJs,
        });
      } else {
        this.arr.push({
          content: this.sendContent,
          direction: this.direction,
          isSelf: true,
          style: {
            color: "red",
          },
          isJs: this.isJs,
        });
      }
      this.sendContent = null;
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  height: 400px;
  width: 800px;
  position: relative;
  margin: 0px auto;
  background: #333;
}

.barrage-control {
  text-align: center;
  margin: 10px 0px;
}
</style>
