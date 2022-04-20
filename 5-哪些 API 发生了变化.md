# 哪些API发生了变化

## 1、知识点

- 全局 api
- 自定义指令
- 移除过滤
- 不再支持 keycode
- 动画类名

## 2、全局 api 变化

在 Vue2 非常熟悉的全局组件注册、全局插件注册、全局混入 `mixin`、全局指令注册，以及组件挂载，原型链上属性，方法定义，都发生了变化。通常我们会在 `src/main.js` 进行如下全局配置：

```js
import Vue from 'vue'; // 引入 Vue
import App from './App.vue'; // 引入 App.vue
Vue.config.ignoredElements = [/^app-/]; // 全局忽略配置
Vue.use(/*...*/); // 全局注册 install
Vue.mixin(/*...*/); // 全局混入
Vue.component(/*...*/); // 全局组件注册
Vue.directive(/*...*/); // 全局指令注册

Vue.prototype.customProperty = () => {}; // 自定义方法

new Vue({
  render: (h) => h(App),
}).$mount('#app'); // 组件挂载
```

在 Vue3 中，更多的操作是直接放在实例中，通常我们如下处理：

```js
import { createApp } from 'vue'; // 不再是导出一整个 Vue, 而是导出创建实例的方法
import App from './App.vue';
const app = createApp(App); // 创建 vue 实例
app.config.isCustomElement = (tag) => tag.startsWith('app-'); // 全局配置
app.use(/**/); // 全局插件注册
app.mixin(/**/); // 全局混入注册
app.component(/**/); // 全局组件注册
app.directive(/**/); // 全局指令注册

app.config.globalProperties.customProperty = () => {}; // 定义全局方法，属性

app.mount(App, '#app'); // 挂载
```



## 3、自定义指令

在开发过程中，如果遇到需要输入框自动获取焦点，优化浏览器滚动条等比较难以处理的情况，我们就需要自己定义符合开发需求的指令。

在 `Vue 2` 中，自定义指令的生命周期如下：

指令钩子函数会被传入以下参数：

- `el`：指令所绑定的元素，可以用来直接操作 DOM。

- ```
  binding
  ```

  ：一个对象，包含以下 property。

  - `name`：指令名。
  - `value`：指令的绑定值。
  - `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
  - `expression`：字符串形式的指令表达式。
  - `arg`：传给指令的参数，可选。
  - `modifiers`：一个包含修饰符的对象。

- `vnode`：Vue 编译生成的虚拟节点。移步 [VNode API](https://cn.vuejs.org/v2/api/#VNode-接口) 来了解更多详情。

- `oldVnode`：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用。

```js
const MyDirective = {
  bind(el, binding, vnode, prevVnode) {},
  inserted() {},
  update() {},
  componentUpdated() {},
  unbind() {},
};
```

在 `Vue 3`中，自定义指令生命周期更加接近于组件的生命周期。

指令定义对象可以提供多个挂钩函数（所有可选）：

- `beforeMount`：在指令首次绑定到元素时以及挂载父组件之前调用。在这里您可以进行一次性设置工作。
- `mounted`：在安装绑定元素的父组件时调用。
- `beforeUpdate`：在包含组件的 `VNode` 更新之前调用

- `updated`：在包含组件的 `VNode` 及其子组件的 `VNode` 更新后调用。
- `beforeUnmount`：在卸载绑定元素的父组件之前调用
- `unmounted`：仅当指令从元素取消绑定并且父组件已卸载时，才调用一次。

```js
const MyDirective = {
  beforeMount(el, binding, vnode, prevVnode) {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {}, // new
  unmounted() {},
};
```



## 4、全局组件

components下的HelloWorld.vue组件

```vue
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<style scoped lang="scss"></style>
```

main.js全局挂载

```javascript
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import helloWorld from "./components/HelloWorld.vue";


const app = createApp(App); // 创建 app
app.component("hello-world", helloWorld); //注册全局组件


app.use(store).use(router).mount("#app");
```



随便找个页面，可以直接使用

<img src="https://cdn.jsdelivr.net/gh/mqxu/wiki-image@master/uPic/image-20220417101209631.png" alt="image-20220417101209631" style="zoom:50%;" />



效果

<img src="https://cdn.jsdelivr.net/gh/mqxu/wiki-image@master/uPic/image-20220417101256622.png" alt="image-20220417101256622" style="zoom:30%;" />



## 5、自定义拖拽指令

首先新建 `src/views/GlobalApi.vue` ，在其中添加一个宽高都为 `50px` 的 `div`，注意必须加上定位样式，否则不会生效，代码如下所示：

```html
<template>
  <div>
    <div class="global-api">
      <div class="drag" v-drag></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "globalApi",
  setup() {},
};
</script>
<style lang="scss" scoped>
.drag {
  position: relative; // 必须加上定位样式，否则不会生效
  height: 100px;
  width: 100px;
  background-color: #2194c5;
}
</style>
```

接着新建 `src/drag.js`，定义一个 `drag` 对象，在挂载之前，需要监听绑定指令元素鼠标是否按下，获取按下时的起始位置，保存在 `disX`，`disY` 中。

鼠标按下拖动，获取此时移动的位置差 `l`，`t`，重新改变元素的位置

鼠标停止移动，需要将监听鼠标是否抬起，将 `onmousemove`，`onmouseup` 移除。

```js
// src/drag.js
let drag = {
  beforeMount(el) {
    el.onmousedown = function (e) {
      // 获取鼠标点击出分别与 div 左边和上边的距离：鼠标位置 div 位置
      var disX = e.clientX - el.offsetLeft;
      var disY = e.clientY - el.offsetTop;
      document.onmousemove = function (e) {
        // 获取移动后 div 的位置：鼠标的位置 -disX/disY
        var l = e.clientX - disX;
        var t = e.clientY - disY;
        el.style.left = l + "px";
        el.style.top = t + "px";
      };
      // 停止移动
      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  },
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {}, // new
  unmounted() {},
};
export default drag;
```

在 `src/main.js` 全局注册指令。

```js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import helloWorld from "./components/HelloWorld.vue";

import drag from "./drag";

const app = createApp(App); // 创建 app
app.component("hello-world", helloWorld); //注册全局组件
app.directive("drag", drag); // 注册全局指令

app.use(store).use(router).mount("#app");
```

添加路由，导航跳转，效果如下：

![drag](https://cdn.jsdelivr.net/gh/mqxu/wiki-image@master/uPic/drag.gif)



## 6、移除过滤

在 `Vue 2` 允许你自定义过滤器，可被用于一些常见的文本格式化。

过滤器可以用在两个地方：**双花括号插值和 `v-bind` 表达式**。

过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示：

```html
<template>
  <div>
    <!-- 在双花括号中 -->
    {{ message | capitalize }}
  </div>
</template>
<script>
  export default {
    name: 'filters',
    data() {
      return {
        message: 'ken',
      };
    },
    filters: {
      capitalize: function (value) {
        if (!value) return '';
        value = value.toString();
        return value.charAt(0).toUpperCase() + value.slice(1);
      },
    },
  };
</script>
```

但是**在 `Vue 3` 中，过滤器被移除了**，原因有如下：

- 过滤器的功能可以很容易地通过方法调用或计算的属性来复制，因此它主要提供语法而不是实用的价值。
- 过滤器需要一种自定义的微语法，该语法打破了表达式只是 `JavaScript` 的假设-这增加了学习和实现成本。
- 实际上，它与 JavaScript 自己的按位或运算符（`|`）冲突，并使表达式解析更加复杂。
- 过滤器还会在模板 IDE 支持中增加额外的复杂性（由于它们不是真正的 JavaScript）。



## 7、不再支持 `keycode`

在 `Vue 2` 中，`keyCode` 的事件用法[已经被废弃了](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode)，并可能不会被最新的浏览器支持。

使用 `keyCode` attribute 也是允许的：

```html
<input v-on:keyup.13="submit" />
```

为了在必要的情况下支持旧浏览器，Vue 提供了绝大多数常用的按键码的别名：

- `.enter`
- `.tab`
- `.delete` (捕获“删除”和“退格”键)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

有一些按键 (`.esc` 以及所有的方向键) 在 IE9 中有不同的 `key` 值, 如果你想支持 IE9，这些内置的别名应该是首选。

但是在 `Vue 3` 中，不再支持以下内容：

- 不再支持使用数字（keyCodes）作为`v-on`修饰符。

- 去掉 `config.keyCodes`。

  

## 8、动画过渡类名

首先我们在 `src/views` 新建 `Transition.vue`，代码如下：

```html
<template>
  <div id="example">
    <button @click="show = !show">Toggle show</button>
    <transition name="bounce">
      <p v-if="show">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
        facilisis enim libero, at lacinia diam fermentum id. Pellentesque
        habitant morbi tristique senectus et netus.
      </p>
    </transition>
  </div>
</template>
```

写JS代码，定义变量控制文字展示隐藏。

```js
<script>
import { ref } from "vue";
export default {
  setup() {
    let show = ref(true);
    return {
      show
    };
  }
};
</script>
```

定义样式：

```scss
<style lang="scss" scoped>
#example {
  background-color: #2194c5;
  width: 500px;
  height: 200px;
  margin: 10px auto;
  p {
    color: #fff;
  }
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
```

接着在 `src/router/index.js`，创建路由。

```js
const routes = [
  {
    path: '/transition',
    name: 'transition',
    component: () => import('../views/Transition.vue'),
  },
];
```

最后在 `src/App.vue` 引入 `router-view`。

```html
<router-link to="/transition">transition</router-link>
```

效果自行运行。



## 9、总结

主要学习了如下几点：

- 全局 `API` 注册的变化
- 知道如何使用自定义指令，
- Vue3 移除了过滤器，
- Vue3 不再支持 `keyCode`。