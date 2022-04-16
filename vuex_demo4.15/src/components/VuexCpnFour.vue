<template>
  <div>

<hr>
    <div>VueCpnFour组件</div>
    <div>
      <!-- fullname:{{$store.state.firstName}}-{{$store.state.lastName}} -->
      fullname:{{$store.getters.fullName}}
    </div>
    
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>