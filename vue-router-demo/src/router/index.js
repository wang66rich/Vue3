// 引入Vue
import Vue from "vue";
// 引入router
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
// import About from "../components/About.vue";
import Article from "../components/Article.vue";
import News from "../components/News.vue";
import MainContainer from "../components/MainContainer.vue";
import LeftMenu from "../components/LeftMenu.vue";
import TopHeader from "../components/TopHeader.vue";


const About = () => import('../components/About.vue')
const My = () => import('../components/My.vue')

Vue.use(VueRouter);
//创建一个规则数组
const routes = [
  {
    path: '/',
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    // components: {
    //   center: MainContainer,
    //   left: LeftMenu,
    //   top: TopHeader
    // },

    children: [
      {
        path:"",
        component: Article
      },
      {
        // path: "article/:id/reader/:num",
        path: "article/:id?",
        name: "article",
        component: Article
      },
      {
        path: "news",
        component: News
      }
    ]
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/my:username",
    name: "my",
    component: My
  }
];

// 创建一个router实例对象引入规则数组
const router = new VueRouter({
  // 引入规则数组
  routes,
  // 选择模式history/hash
  mode: "history"
});

export default router;
