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