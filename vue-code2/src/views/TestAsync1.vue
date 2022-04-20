<template>
  <logo-img />
  <hello-world msg="Welcome to Your Vue.js App" />
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import LogoImg from "../components/LogoImg.vue";
import ErrorComponent from "../components/error.vue";
import LoginComponent from "../components/Login.vue";

// 定义一个耗时执行的函数，t 表示延迟的时间， callback 表示需要执行的函数，可选
const time = (t, callback = () => {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      callback();
      resolve();
    }, t);
  });
};
// 记录加载次数
let count = 0;
const HelloWorld = defineAsyncComponent({
  // 工厂函数
  loader: () => {
    return new Promise((resolve, reject) => {
      (async function () {
        await time(2000);
        const res = await import("../components/HelloWorld.vue");
        
        if (++count < 3) {
          // 前两次加载手动设置加载失败
          reject(res);
        } else {
          // 大于3次成功
          resolve(res);
        }
      })();
    });
  },
  loadingComponent:LoginComponent,
  errorComponent: ErrorComponent,
  delay: 0,
  timeout: 1000,
  suspensible: false,
  onError(retry, fail, attempts) {
    // 注意，retry/fail 就像 promise 的 resolve/reject 一样：
    // 必须调用其中一个才能继续错误处理。
    if (attempts < 3) {
      // 请求发生错误时重试，最多可尝试 3 次
      console.log(attempts);
      retry();
    } else {
      fail();
    }
  },
});
</script>