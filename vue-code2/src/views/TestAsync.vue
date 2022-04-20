<template>
  <logo-img />
  <hello-world msg="Welcome to Your Vue.js App" />
</template>

<script>
import LogoImg from "../components/LogoImg.vue";
import HelloWorld from "../components/HelloWorld.vue";

export default {
  name: "TestAnync",
  components: {
    LogoImg,
    HelloWorld,
  },
};
</script>