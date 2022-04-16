<template>
  <div class="slot-name">
    <layout>
      <!--头部插槽放置的内容的区块-->
      <template v-slot:header>
        <header-slot></header-slot>
      </template>
      <!--中间内容放置的区块-->
      <template v-slot:body>
        <body-slot></body-slot>
      </template>
      <!--页脚内容放置的区块-->
      <template v-slot:footer>
        <footer-slot></footer-slot>
      </template>
    </layout>

    
  </div>
</template>

<script>
import layout from "./Layout";
import headerSlot from "./HeaderSlot";
import bodySlot from "./BodySlot";
import footerSlot from "./FooterSlot";
export default {
  name: "SlotName",
  components: {
    layout,
    headerSlot,
    bodySlot,
    footerSlot,
  },
};
</script>