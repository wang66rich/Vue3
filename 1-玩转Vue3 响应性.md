# 玩转Vue3响应性

## 1、内容介绍

使用 `Vue-cli` 脚手架搭建 `Vue3` 项目，实现 `TodoList` 小案例，探索 `Vue3.0` 响应式特性。

脚手架相关请参考 [Vue CLI](https://cli.vuejs.org/zh/) 文档

#### 知识点

- 环境准备
- 搭建 Vue 3 项目
- 升级代码版本
- TodoList 案例



## 2、Vue 介绍

Vue 是由尤雨溪大神在 Google 工作时，受到其他框架设计思想的影响，开发出来的一套轻量级的前端框架，目前已成为全世界三大前端框架之一，是国内首选的前端框架。已有 15 万人在 Github 上为 Vue 点赞，可以在 [Vue.js 3.0 文档](https://v3.cn.vuejs.org/) 中看到最新版的 `Vue3` 文档。

#### 环境准备

通过脚手架的方式安装最新版本的 Vue。

```shell
npm i -g @vue/cli
```

使用以下命令可以查看是否升级到最新版本。

```shell
vue -V
```



## 3、搭建 Vue3 项目

输入以下命令创建一个名为 `vue-code` 的项目。

```bssh
vue create vue-code
```

第一步：按键盘下箭头键，选择第三项 **Manually select features**，回车进入第二步

<img src="https://cdn.jsdelivr.net/gh/mqxu/wiki-image@master/uPic/image-20220412111111266.png" alt="1" style="zoom:40%;" />

第二步：按键盘空格键选择要安装的依赖，如下图所示，然后回车进入第三步。

<img src="https://cdn.jsdelivr.net/gh/mqxu/wiki-image@master/uPic/image-20220412111248502.png" alt="1" style="zoom:40%;" />

选中 `3.x `

<img src="https://cdn.jsdelivr.net/gh/mqxu/wiki-image@master/uPic/image-20220412111311959.png" alt="1" style="zoom:40%;" />

第三步：配置文件

- Use history mode for router?  输入 `  y`，回车。

- Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported

按下键盘下箭头，选中 `Sass/SCSS (with dart-sass)`。

- Where do you prefer placing config for Babel, ESLint, etc.? (Use arrow keys)

选中 `In dedicated config files`。

<img src="https://cdn.jsdelivr.net/gh/mqxu/wiki-image@master/uPic/image-20220412111430824.png" alt="1" style="zoom:40%;" />

- Save this as a preset for future projects? (y/N)   ：输入 `y`。

- Save preset as：不用输入，直接回车。

<img src="https://cdn.jsdelivr.net/gh/mqxu/wiki-image@master/uPic/image-20220412111548776.png" alt="1" style="zoom:40%;" />

- 然后开始安装依赖，安装成功后：

<img src="https://cdn.jsdelivr.net/gh/mqxu/wiki-image@master/uPic/image-20220412111634197.png" alt="12" style="zoom:40%;" />

在 项目根目录下的 `vue.config.js`文件中写入以下内容。

```js
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: "localhost",
    port: 8888,
  },
});
```

完成配置后，使用以下命令运行当前项目。

```shell
npm run serve
```

<img src="https://cdn.jsdelivr.net/gh/mqxu/wiki-image@master/uPic/image-20220412112011191.png" alt="image1" style="zoom:25%;" />



<img src="https://cdn.jsdelivr.net/gh/mqxu/wiki-image@master/uPic/image-20220412112118378.png" alt="1" style="zoom:33%;" />



## 4、TodoList 案例

我们要实现一个简单的 TodoList ：姓名、性别清单列表，目的是了解 Vue3 的 reactive 响应式与 Vue2.x 的 reactive 响应式的区别。

首先在 项目的 src/views 目录下新建一个 TodoList.vue 文件。我们可以输入性别和姓名，生成姓名性别列表，增删改姓名和性别。

#### 新建模板

首先分析需求：用户在输入姓名，性别之后，生成一个列表，并且可以对这些列表进行**增删改**。其中 name 来保存用户输入的姓名，gender 来保存用户输入的性别，list 来保存用户添加之后的数据，index 来保存用户**编辑**，**更新**的姓名清单的下标。

在 `TodoList.vue` 中写入以下代码：

```html
<template>
  <div class="todo-list">
    <div class="header">todoList</div>

    <input type="text" v-model="name" placeholder="请输入名字" class="mr-1" />
    <input type="text" v-model="gender" placeholder="请输入性别" class="mr-1" />
    <button @click="add" class="mr-1">添加</button>
    <button @click="update" class="mr-1">更新</button>
    <button @click="clear">清空数组</button>

    <ul>
      <li v-for="(item, index) in list" :key="index">
        <span>姓名：{{ item.name }}</span>
        <span>性别：{{ item.gender }}</span>
        <div class="btn-div">
          <button @click="edit(index)">编辑</button>
          <button @click="del(index)">删除</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "todoList",
  data() {
    return {
      list: [
        {
          name: "aaa",
          gender: "male",
        },
      ],
      name: "",
      gender: "",
    };
  },
};
</script>
```

然后给 `TodoList` 加上样式：

```css
<style lang="scss" scoped>
.todo-list {
  width: 640px;
  margin: auto;
  .header {
    height: 60px;
    line-height: 60px;
    background-color: #3e3e3e;
    color: orange;
    font-size: 48px;
    margin-bottom: 20px;
    border-radius: 5px;
  }

  ul {
    padding: 10px;
    min-height: 400px;
    li {
      list-style: none;
      text-align: left;
      height: 40px;
      margin-bottom: 10px;
      background-color: #9ebabb;
      line-height: 40px;
      border-left: 8px solid #629a9c;
      border-radius: 5px;
      padding: 5px 10px;
      color: #FFF;
      font-weight: bold;
      .btn-div {
        float: right;
      }
      span {
        display: inline-block;
        padding: 0 10px;
      }
    }
  }
}

input,
button {
  margin-right: 10px;
}
</style>
```

接着打开 src/router/index.js 来配置下 TodoList 路由

```js
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/todoList",
    name: "todoList",
    component: () => import("../views/TodoList.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
```

接着在 src/App.vue 通过 router-link 标签来指定跳转页面：

```html
<router-link to="/">Home</router-link> |
<router-link to="/about">About</router-link> |
<router-link to="/todoList">todoList</router-link> |
```

最后运行以下命令：

```shell
npm run serve
```

可以看到界面如下所示：

<img src="https://cdn.jsdelivr.net/gh/mqxu/wiki-image@master/uPic/image-20220412120656316.png" alt="1" style="zoom:40%;" />



#### 添加操作

接下来需要让用户点击**添加按钮**，输入姓名、性别。

> 注意：如果输入框有一个为空，就不让用户进行**添加**处理。
>
> 添加成功之后，需要把 `name`，`gender` 上次保存的数据清空，以免重复添加。

使用数组的 push 方法来添加数据。在 data() 函数的下面添加一个 methods 对象，将方法 add() 写在 methods 里面，代码如下所示：

```javascript
<script>
export default {
  name: "todoList",
  data() {
    return {
      list: [
        {
          name: "aaa",
          gender: "male",
        },
      ],
      name: "",
      gender: "",
    };
  },
  methods: {
    add() {
      if (!this.name || !this.gender) {
        return;
      }
      this.list.push({
        name: this.name,
        gender: this.gender,
      });
      this.name = "";
      this.gender = "";
    },
  },
};
</script>
```

运行 效果如下所示：

<img src="../../../Library/Application Support/typora-user-images/image-20220412120736866.png" alt="1" style="zoom:40%;" />

#### 编辑操作

点击清单中的 **编辑按钮** 之后，数据会同步到两个输入框中。数据修改完成之后，点击 **更新按钮** 会对数据进行修改保存。

接下来我们在 methods 中添加 edit 方法，添加如下代码：

```js
<script>
export default {
  name: "todoList",
  data() {
    return {
      list: [
        {
          name: "aaa",
          gender: "male",
        },
      ],
      name: "",
      gender: "",
    };
  },
  methods: {
    add() {
      if (!this.name || !this.gender) {
        return;
      }
      this.list.push({
        name: this.name,
        gender: this.gender,
      });
      this.name = "";
      this.gender = "";
    },
    edit(index) {
      let item = this.list[index];
      this.name = item.name;
      this.gender = item.gender;
      this.index = index;
      console.log(index);
    },
  },
};
</script>
```

在 edit 方法中我们通过下标拿到当前用户点击 **编辑按钮** 的数据，分别赋值给当前姓名变量和当前性别变量，这样数据就同步到输入框中，就可以对数据进行修改了。

#### 更新操作

编辑完成之后，我们需要把数据更新到列表中，需要注意的是：

- 如果没有输入内容，不让用户更新，避免更新完之后没有数据。
- 更新完之后，需要清空输入框，避免重复更新。
- 同时把当前索引置空，将 `更新按钮` 变为 `添加按钮`。

在 methods 添加 update 方法，代码如下：

```js
<script>
export default {
  name: 'todoList',
  data() {
   list: [],
    name: '',
    sex: '',
    index: null,
  },
  methods: {
    add() {
      if (!this.name || !this.sex) {
        return;
      }
      this.list.push({
        name: this.name,
        sex: this.sex
      });
      this.name = "";
      this.sex = "";
    },
  },
  edit(index) {
     let item = this.list[index];
     this.name = item.name;
     this.sex = item.sex;
     this.index = index;
     console.log(index);
  },
  update() {
      if (!this.name || !this.sex) {
          return;
      }
      this.list[this.index].name = this.name;
      this.list[this.index].sex = this.sex;
      this.sex = "";
      this.name = "";
      this.index = null;
   },
};
</script>
```

运行 `npm run serve`，我们可以对每条清单点击“编辑”，修改后点击“更新”即可。

#### 删除操作

对于不需要的清单列表，只要拿到当前列表的索引，即可对列表进行删除操作。

添加 del 函数代码：

```js
del(index) {
    this.list.splice(index, 1);
    console.log(index);
},
```

点击删除之后，清单就被删除了。

#### 清空操作

如果用户不需要之前添加或者编辑过的数据，可以点击 `清空按钮` 将数据全部清空。

代码如下所示：

```js
clear() {
    this.list.length = 0
    // this.list = []
}
```

运行 `npm run serve`，先添加几条清单，然后再点击 `清空按钮`，即可清空数据。

#### 值得关注的点

- 在 Vue3 中，我们可以直接给对象赋值

```js
this.obj.name = 'Zhangsan';
this.obj.age = 18;
```

- 直接修改数组元素

```js
this.list[index] = { name: 'Zhangsan', gender: '男' };
```

- 设置数组 `length` 属性

```js
this.list.length = 0;
```

- 使用 `Map/Set`

举个例子，在 data 中使用集合初始化三个元素，对列表进行增删清空操作，代码如下：

```html
<template>
  <div>
    <ul>
      <li v-for="(item, index) in list" :key="index">
        <span>{{ item }}</span>
        <button @click="remove(item)">移除</button>
      </li>
    </ul>
    <button @click="add">添加</button>
    <button @click="clean">清空</button>
  </div>
</template>

<script>
  export default {
    data: () => ({
      list: new Set(['Zhangsan', 'JavaScript', '前端工程师']),
    }),
    created() {
      console.log(this.list);
    },
    methods: {
      remove(item) {
        this.list.delete(item);
      },
      add() {
        const newItem = prompt('Input a new item');
        if (newItem) {
          this.list.add(newItem);
        }
      },
      clean() {
        this.list.clear();
      },
    },
  };
</script>
```



## 5、升级 Todolist 代码

本机将学几个 `composition-api`。

- `ref` 接受一个内部值并返回一个响应式且可变的对象，可以定义单个变量，例如数字类型，字符串类型，布尔类型，数组类型。
- `reactive` 返回对象的响应式副本对象，可以定义多个变量，例如对象。
- `setup` 内部启动函数，有点类似 Vue2.x 的 data，返回一个对象。

#### HTML 代码

```html
<template>
  <div class="todo-list">
    <div class="header">TodoList</div>

    <input type="text" v-model="name" placeholder="请输入名字" />
    <input type="text" v-model="gender" placeholder="请输入性别" />
    <button @click="add" v-if="indexObj.index === null">添加</button>
    <button @click="update" v-else>更新</button>
    <button @click="clear">清空数组</button>

    <ul>
      <li v-for="(item, index) in list" :key="index">
        <span>姓名：{{ item.name }}</span>
        <span>性别：{{ item.gender }}</span>
        <div class="btn-div">
          <button @click="edit(index)">编辑</button>
          <button @click="del(index)">删除</button>
        </div>
      </li>
    </ul>
  </div>
</template>
```



#### 数据变量定义

在 Vue3中，所有的变量定义在 setup 函数里面，我们需要引入 `ref`，`reactive` 来定义变量。

```js
import { ref, reactive } from "vue";
```

使用 `ref` 来定义列表，姓名，性别三个简单变量，用 `reactive` 来定义索引对象。

```js
<script>
import { ref, reactive } from "vue";
export default {
  name: "todoList",
  setup() {
    let list = ref([]); // 定义数组
    let name = ref(""); // 定义 name
    let gender = ref(''); // 定义 gender
    let indexObj = reactive({ index: null }); // 定义对象
    return {
      list,
      name,
      gender,
      indexObj
    };
  }
};
</script>
```

#### 添加操作

首先在 setup 函数里定义 add 添加函数，来处理用户的添加操作。

其次在变量赋值的时，需要访问变量的 `value` 属性。

最后将 add 方法返回给模板 `todoList.vue` 中的按钮使用，代码如下：

```js
<script>
import { ref, reactive } from "vue";

export default {
  name: "todoList",
  setup() {
    let list = ref([]);
    let name = ref("");
    let gender = ref("");
    let indexObj = reactive({ index: null });
    const add = () => {
      if (!name.value || !sex.value) {
        return;
      }
      list.value.push({
        name: name.value,
        gender: gender.value,
      });
      name.value = "";
      gender.value = "";
    };
    return {
      list,
      name,
      gender,
      indexObj,
      add,
    };
  },
};
</script>
```

运行 `npm run serve` ，效果：

![image-20220412135245982](https://cdn.jsdelivr.net/gh/mqxu/wiki-image@master/uPic/image-20220412135245982.png)

#### 编辑操作

我们需要在 setup 函数中定义 edit 函数

- 获取索引
- 保存姓名
- 保存性别

具体代码如下：

```js
setup() {
    let list = ref([]);
    let name = ref("");
    let sex = ref("");
    let indexObj = reactive({ index: null });
    const add = () => {
      if (!name.value || !gender.value) {
        return;
      }
      list.value.push({
        name: name.value,
        gender: gender.value
      });
      name.value = "";
      gender.value = "";
    };
    const edit = index => {
      let item = list.value[index];
      name.value = item.name;
      gender.value = item.gender;
      indexObj.index = index;
      console.log(index);
    };
    return {
      list,
      name,
      gender,
      indexObj,
      add,
      edit
    };
  }
```

#### 更新操作

在 setup 函数定义 update 方法，需要对数据进行非空判断。

```js
const update = () => {
  if (!name.value || !gender.value) {
    return;
  }
  list.value[indexObj.index].name = name.value;
  list.value[indexObj.index].gender = gender.value;
  name.value = '';
  gender.value = '';
  indexObj.index = null;
};
```



#### 删除操作

我们在 setup 函数中定义 del 方法。

**删除时**

需要拿到当前点击所在列的索引，对列表进行删除操作。

**删除之后**

也需要将索引，姓名，性别置为置空。

```js
const del = (index) => {
  list.value.splice(index, 1);
  indexObj.index = null;
  name.value = '';
  gender.value = '';
};
```



#### 清空操作

将 clear 函数定义在 setup 中，最终暴露出去给模板使用。

```js
const clear = () => {
  list.value.length = 0;
};
```

#### 最终代码

实现的效果跟未升级之前的代码效果是一样的：

```html
<template>
  <div class="todo-list">
    <div class="header">TodoList</div>

    <input type="text" v-model="name" placeholder="请输入名字" />
    <input type="text" v-model="gender" placeholder="请输入性别" />
    <!-- <button @click="add">添加</button>
    <button @click="update">更新</button> -->
    <button @click="add" v-if="indexObj.index === null">添加</button>
    <button @click="update" v-else>更新</button>
    <button @click="clear">清空数组</button>

    <ul>
      <li v-for="(item, index) in list" :key="index">
        <span>姓名：{{ item.name }}</span>
        <span>性别：{{ item.gender }}</span>
        <div class="btn-div">
          <button @click="edit(index)">编辑</button>
          <button @click="del(index)">删除</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
export default {
  name: "todoList",
  setup() {
    let list = ref([]);
    let name = ref("");
    let gender = ref("");
    let indexObj = reactive({ index: null });
    const edit = (index) => {
      let item = list.value[index];
      name.value = item.name;
      gender.value = item.gender;
      indexObj.index = index;
      console.log(index);
    };
    const del = (index) => {
      list.value.splice(index, 1);
      indexObj.index = null;
      name.value = "";
      gender.value = "";
    };
    const update = () => {
      if (!name.value || !gender.value) {
        return;
      }
      list.value[indexObj.index].name = name.value;
      list.value[indexObj.index].gender = gender.value;
      name.value = "";
      gender.value = "";
      indexObj.index = null;
    };
    const add = () => {
      if (!name.value || !gender.value) {
        return;
      }
      list.value.push({
        name: name.value,
        gender: gender.value,
      });
      name.value = "";
      gender.value = "";
    };
    const clear = () => {
      list.value.length = 0;
    };
    return {
      list,
      name,
      gender,
      indexObj,
      add,
      edit,
      update,
      del,
      clear,
    };
  },
};
</script>

<style lang="scss" scoped>
.todo-list {
  width: 640px;
  margin: auto;
  .header {
    height: 60px;
    line-height: 60px;
    background-color: #3e3e3e;
    color: orange;
    font-size: 48px;
    margin-bottom: 20px;
    border-radius: 5px;
  }

  ul {
    padding: 10px;
    min-height: 400px;
    li {
      list-style: none;
      text-align: left;
      height: 40px;
      margin-bottom: 10px;
      background-color: #9ebabb;
      line-height: 40px;
      border-left: 8px solid #629a9c;
      border-radius: 5px;
      padding: 5px 10px;
      color: #fff;
      font-weight: bold;
      .btn-div {
        float: right;
      }
      span {
        display: inline-block;
        padding: 0 10px;
      }
    }
  }
}

input,
button {
  margin-right: 10px;
}
</style>
```



## 6、非响应式

在 Vue3 还提供了一些 `API` 专门处理非响应性的场景。

例如：我们在 `Vue` 组件中一次性消耗大量的数据，如果这些数据只是展示，那么我们是不应该让这些数据具有响应特性的，我们都知道在 Vue2.x 中，我们通常会使用以下代码：

```js
this.list = [{ name: Ken }]; // 假如这里数组有很多数据，如果 vue 直接去遍历数据使其具有响应式特性，就会变得很慢
this.list = Object.freeze(this.list); // 所以我们通常会将数据冻结起来
```

#### markRaw

在 Vue3 中，提供了 `markRaw`，`readonly`，这两个 `API` 是用来防止数据被改变的，告诉响应式机制系统，无需跟踪监测属性以及其后代属性，会跳过数据跟踪，进一步更新数据都不会触发渲染。

新建 src/views/MarkRaw.vue

```html
<template>
  <div>
    你好 {{ obj.name }}
    <button @click="update">不能修改数据</button>
  </div>
</template>

<script>
  import { markRaw } from 'vue';
  export default {
    data: () => ({
      obj: markRaw({ name: 'Vue' }),
    }),
    methods: {
      update() {
        this.obj.name = 'Ken';
        console.log(this.obj);
      },
    },
  };
</script>
```

运行 `npm run serve` 之后，效果如下：

看到打印出来的数据，被标志上了 `__v_skip:true` 属性。Vue3 就是通过这个属性来判断是否跳过当前值响应式特性的监测。

![图片描述](https://cdn.jsdelivr.net/gh/mqxu/wiki-image@master/uPic/6227e3c0382af8edcda43bbd479c346e-0.gif)

#### readonly

如下代码：

```js
<script>
import { readonly } from 'vue'
export default {
  data: () => ({
    obj: readonly({ name: 'Vue' })
  }),
  methods: {
    update(){
      this.obj.name = 'Ken'
      console.log(this.obj)
    }
  }
}
</script>
```

运行可以看到打印出来的数据被标记上了一个属性 `__v_readonly: Proxy`，表示仅仅被代理，不具有响应式特性

![图片描述](https://cdn.jsdelivr.net/gh/mqxu/wiki-image@master/uPic/6805ff300117523bbc2ea16b0f97f342-0.gif)

## 7、总结

学会如何搭建 Vue 3 项目，以及从 Vue 2 升级到 Vue3。

在 Vue3 中，可以使用：

- 给对象赋值
- 给数组 `length` 属性设置
- 通过下标的方式对数组元素进行修改
- 操作 `Map/Set`，`ref` 定义响应式单个变量，`reactive` 定义响应式对象