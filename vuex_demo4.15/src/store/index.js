
import Vue from "vue";
import Vuex from "vuex";

import { COUNTER_ADD, COUNTER_SUB } from "./mutaition-type"

//使用
Vue.use(Vuex);

//创建store对象
const store = new Vuex.Store({
  state: {
    counter: "0",
    firstName: "",
    lastName: ""
  },
  mutations: {
    add(state) {
      state.counter = state.counter+5
    },
    sub(state) {
      state.counter = state.counter-5
    },

    // add(state,num) {
    //   state.counter = state.counter+num
    // },
    // sub(state,num) {
    //   state.counter = state.counter-num
    // }

    // add(state, payload) {
    //   state.counter = state.counter + payload.num * payload.multiple
    // },
    // sub(state, payload) {
    //   state.counter = state.counter - payload.num * payload.multiple
    // }

    // [COUNTER_ADD](state, payload) {
    //   state.counter = payload.num * payload.multiple + state.counter
    // },
    // [COUNTER_SUB](state, payload) {
    //   state.counter = state.counter - payload.num * payload.multiple
    // }

    handleFirstNameVal(state, payload) {
      state.firstName = payload;
    },
    submitAsync(state) {
      setTimeout(() => {
        state.firstName = "hello";
      }, 1000);
    }
  },
  actions: {
    // submitAction(context) {
    //   context.commit("submitAsync")
    //  }

    submitAction(context, payload) {
      return new Promise((resolve) => {
        context.commit("submitAsync")
        resolve("异步操作完成" + payload)
      })
    },


    //解构赋值
    demoActions({ commit, state, getters }) {
      setTimeout(() => {
        commit("submitAsync")
      }, 1000);
    }

  },
  getters: {
    fullName(state) {
      return state.firstName + "-" + state.lastName;
    }
  },
  modules: {}
})

//导出对象
export default store;