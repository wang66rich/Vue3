<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/testCounter">TestCounter</router-link> |
    <router-link to="/parent">插槽</router-link> |
    <router-link to="/SlotName">SlotName</router-link> |
    <router-link to="/slotScopes">slotScopes</router-link> |
    <router-link to="/dynamicArguments">DynamicArguments</router-link> |
    <router-link to="/globalApi">globalApi</router-link> |
    <router-link to="/transition">transition</router-link> |
    <router-link to="/tele">tele</router-link> |
    <router-link to="/home">home</router-link> |
    <router-link to="/testAnync">testAnync</router-link> |
    <router-link to="/testAnync1">testAnync1</router-link> |
    <router-link to="/testAnync2">testAnync2</router-link> |
  </nav>
  <router-view></router-view>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
