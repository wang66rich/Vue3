<template>
<div>


  <div>
    <button @click="modalOpen = true">Open full screen modal!disabled</button>
    <teleport to="body" :disabled="true">
      <div v-if="modalOpen" class="modal">
        <div>
          I'm a teleported modal! (My parent is "body")
          <button @click="modalOpen = false">Close</button>
        </div>
      </div>
    </teleport>
  </div>

  <div>
    <button @click="modalOpen1 = true">Open full screen modal!</button>
    <teleport to="body">
      <div v-if="modalOpen1" class="modal">
        <div>
          I'm a teleported modal! (My parent is "body")
          <button @click="modalOpen1 = false">Close</button>
        </div>
      </div>
    </teleport>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'modalButton',
    data() {
      return {
        modalOpen: false,
        modalOpen1: false,
      };
    },
  };
</script>
<style lang="scss" scoped>
.modal {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.modal div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    width: 300px;
    height: 300px;
    padding: 5px;
}
</style>