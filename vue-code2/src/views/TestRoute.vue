<template>
  <div ref="root">
    <button @click="click">click</button>
    <button @click="toHome">toHome</button>
    <button @click="toAbout">toAbout</button>
  </div>
</template>

<script>
  import { getCurrentInstance, ref } from 'vue';
  import { createRouter, createWebHistory } from 'vue-router';
  import OtherRoute from './OtherRoute.vue';
  export default {
    name: 'TestRoute',
    props: {
      test: {
        type: String,
        default: 'test',
      },
    },
    data() {
      return {
        msg: 'hello',
      };
    },
    setup() {
      let { ctx } = getCurrentInstance();
      let root = ref(null);
      let routes = [
        {
          path: '/',
          name: 'Home',
          component: import(/* webpackChunkName: "about" */ './Home.vue'),
        },
        {
          path: '/about',
          name: 'About',
          component: import(/* webpackChunkName: "about" */ './About.vue'),
        },
      ];
      let router = createRouter({
        history: createWebHistory(process.env.BASE_URL),
        routes,
      });
      let removeRoute = router.addRoute({
        path: '/otherroute',
        name: 'OtherRoute',
        component: OtherRoute,
      });
      let isHasRoute = router.hasRoute('OtherRoute');
      let route = router.getRoutes();
      router.removeRoute('OtherRoute');
      let isRemove = router.hasRoute('OtherRoute');
      route = router.getRoutes();
      let click = () => {
        console.log("ctx===>"+ctx);
        // console.log(ctx);
        // console.log("ctx.$attrs===>"+ctx.$attrs);
        // console.log("ctx.$data===>"+ctx.$data);
        // console.log("ctx.$props===>"+ctx.$props);
        // console.log("ctx.$el===>"+ctx.$el);
        // console.log("ctx.$options===>"+ctx.$options);
        // console.log("ctx.$refs===>"+ctx.$refs);
        // console.log("ctx.$root===>"+ctx.$root);
        // console.log("ctx.$router===>"+ctx.$router);
        // console.log("ctx.$slots===>"+ctx.$slots);
        // console.log("ctx.$store===>"+ctx.$store);
        // console.log("ctx.$toast===>"+ctx.$toast);
        // console.log("ctx.$watch===>"+ctx.$watch);
        console.log('router===>', router);
        console.log('isHasRoute===>', isHasRoute);
        console.log('getRouter===>', route);
        console.log('remove route===>', isRemove);
      };
      let toHome = () => {};
      let toAbout = () => {};
      return {
        click,
        toHome,
        toAbout,
        root,
      };
    },
  };
</script>