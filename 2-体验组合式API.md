## 1、知识点

- setup
- reactive
- computed
- toRefs
- watch
- watchEffect
- readonly

## 2、简单例子

组合 API 是 Vue3 中最常用特色语法。这是一种全新的逻辑重用和代码组织方法。

我们使用所谓的选项式 API 构建组件。如 `data`，`methods`，`computed` 等这种方法缺点已成事实，因为这些 JavaScript 代码本身不起作用。需要确切地知道模板中可以访问哪些属性以及 `this` 关键字的动作。Vue 编译器需要将此属性转换为工作代码。因此，我们无法从自动建议或类型检查中受益。

组合式 API 旨在通过将组件属性中当前可用的机制公开为 JavaScript 函数来解决此问题。Vue 核心团队将组合式 API 描述为“一组基于功能的附加 API，它们允许灵活地组成组件逻辑”。用组合式 API 编写的代码更具可读性，这使它更易于阅读和学习。

来看一个使用新的组合式 API 理解其工作原理的组件的简单示例。

新建 `src/components/counter/Counter.vue` 

```vue
<template>
  <button @click="increment">
    Count is: {{ count }}, double is: {{ double }} Name is: {{ reonly.name }}
  </button>
</template>

<script>
import { reactive, computed, toRefs, watch, watchEffect, readonly } from "vue";

export default {
  setup() {
    const state = reactive({
      count: 0,
      double: computed(() => state.count * 2),
    });

    const reonly = readonly({
      name: "InfinityX7",
    });

    function increment() {
      state.count++;
    }

    watch(
      () => state.count,
      (newVal, oldVal) => {
        console.log("Counter is change ===>", oldVal, newVal);
      }
    );

    watchEffect(() => {
      console.log("watchEffect");
      reonly.name = "开到荼蘼";
    })

    return {
      ...toRefs(state),
      reonly,
      increment,
    };
  },
};
</script>
```

在 `src/components/counter/index.js` 导出组件：

```js
import Counter from './src/Counter.vue';
export default Counter;
```


 新建`src/views/TestCounter.vue`

```vue
<template>
  <div class="test-counter">
    <Counter />
  </div>
</template>

<script>
import Counter from "../components/couter/Couter.vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "TestCounter",
  components: {
    Counter,
  },
});
</script>
```

在 `src/router/index.js` 配置路由

```javascript
 {
    path: "/counter",
    name: "Counter",
    component: () => import("../views/TestCounter.vue"),
 },
```

`App.vue`增加`/counter`导航跳转，运行效果

<img src="https://cdn.jsdelivr.net/gh/mqxu/wiki-image@master/uPic/2022-04-14%2009.40.02.gif" alt="11" style="zoom:50%;" />



## 3、setup

简而言之，它只是一个将属性和函数返回到模板使用的入口。

我们在这里声明所有响应式属性，计算属性，观察者和生命周期挂钩，然后将它们返回，以便可以在模板中使用它们。

所以**没有从 `setup` 函数返回的内容将在模板中不可用**。

```js
export default defineComponent({
  setup() {},
});
```



## 4、reactive 普通对象响应式代理

在 `setup` 函数里面， `reactive` 它主要是处理你的对象，让它经过 `Proxy` 的加工变为一个响应式的对象，类似于 `Vue2.0` 版本的 `data` 属性。

需要注意的是加工后的对象跟原对象是不相等的，并且加工后的对象属于**深度克隆的对象**。响应式转换是“深层的”：会影响对象内部所有嵌套的属性。基于 ES2015 的 Proxy 实现，返回的代理对象**不等于**原始对象。建议仅使用代理对象而避免依赖原始对象。

```js
const state = reactive({
  count: 0,
  double: computed(() => state.count * 2),
});
```



## 5、computed 计算属性

根据以上内容，我们声明了 `count` 用 `reatcive` 函数调用的响应式。它可以包装任何原生语法或对象并返回其响应式引用。传入一个 getter 函数，返回一个默认不可手动修改的 ref 对象。

```js
const double = computed(() => count.value * 2);

function increment() {
  count.value++;
}
```



## 6、toRefs

可以看到我们上面用了很多的新属性，`toRefs` 函数可以将 `reactive()` 创建出来的响应式对象，转换为普通的对象，只不过这个对象上的每个属性节点，都是 `ref()` 类型的响应式数据，配合 `{{}}` 插值指令能完成数据的双向绑定，在开发中非常高效。其实就有点像 ES6 的对象解构。

```js
return {
  ...toRefs(state),
  reonly,
  increment,
};
```

拆分之后，我们可以写出类似这样的伪代码：

```js
return {
  count,
  double,
  reonly,
  increament,
};
```

`count`，`double` 直接在 `html` 上使用了：

```html
<button @click="increment">
  <!-- Count is: {{ state.count }}, double is: {{ state.double }} -->
  Count is: {{ count }}, double is: {{ double }} Name is: {{reonly.name}}
</button>
```

无需使用如下：

```html
<button @click="increment">
  Count is: {{ state.count }}, double is: {{ state.double }} Name is:
  {{reonly.name}}
</button>
```

所以，这种开发方式就大大提高了开发效率了。



## 7、watch 监听

`watch()` 函数用来监视某些数据项的变化，从而触发某些特定的操作，使用之前还是需要按需导入，监听 `state.count` 的变化，然后触发回调函数里面的逻辑，也就是监听用户输入的检索值，然后触发回调函数的逻辑把 `state.count` 值打印到控制台上：

- 第一个参数传入一个 getter 函数，获取 state.count 返回值。
- 监听 state.count 新旧值变化。

```javascript
watch(
  () => state.count,
  (newVal, oldVal) => {
    console.log('Counter is change ===>', oldVal, newVal);
  }
);
```



## 8、watchEffect 立即执行监听

这个属性有点像 `vue 2.x` 中的 `immediate: true` 这个立即执行属性。立即执行传入的一个函数，并响应式追踪其依赖，并在其依赖变更时重新运行该函数。

```js
watchEffect(() => {
  console.log('watchEffect');
});
```

当 `watchEffect` 在组件的 `setup()` 函数或生命周期钩子被调用时，侦听器会被链接到该组件的生命周期，并在组件卸载时自动停止。

在一些情况下，也可以显式调用返回值以停止侦听：

```js
let stop = watchEffect(() => {
  console.log('watchEffect');
});
stop();
```



## 9、readonly 只读代理

传入一个对象（响应式或普通）或 ref，返回一个原始对象的 **只读** 代理。一个只读的代理是“深层的”，对象内部任何嵌套的属性也都是只读的。

```js
const reonly = readonly({
  name: 'Zhangsan',
});
```

然后我们来修改 `reonly.name`：

```js
watchEffect(() => {
  console.log('watchEffect');
  reonly.name = 'Lisi';
});
```

发现 `reonly.name` 还是 `Zhangsan`，没有变化。



## 10、总结

我们通过一个简单的例子对 `Vue 3` 组合式 `API` 有了一个初步的了解：

- reactive 对普通对象进行响应式代理。
- setup 类似 `created` 生命周期。
- computed 计算属性。
- watch 属性值监听。
- watchEffect 立即执行监听。
- readonly 对值，对象进行只读代理。
- toRefs 可对 reactive 申明的对象进行解构，提高开发效率。