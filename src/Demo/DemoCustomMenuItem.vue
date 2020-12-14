<template>
  <div class="bar-menu-item"
    @mousedown="(e) => e.preventDefault()"
    @click="(e) => (item.click && !item.disabled) ? item.click(e) : e.stopPropagation()">
      <div class="label">{{item.text}}</div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object // item contains the properties you defined in the Bar definition
  }
}
</script>

<style scoped>
.bar-menu-item:hover {
  background: #222 !important; /* use !important to overwrite defaults */
}
.bar-menu-item > .label {
  display: inline !important; /* needed for safari */
  background: linear-gradient(45deg, #ff0000, #db6300, #c0bd00, #3bcf00, #00ffd5, #7c92ff, #d2a7ff, #ff4dd8, #ff3131);
  background-size: 200%;
  color: transparent;
  background-clip: text;
  animation: slide 3s linear infinite;
  animation-play-state: paused;
}
.bar-menu-item:hover > .label {
  animation-play-state: running;
}
@keyframes slide {
  0% { background-position: 0% 0 }
  100% { background-position: 200% 0 }
}
</style>