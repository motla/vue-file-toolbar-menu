<template>
  <div class="bar-button"
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
.bar-button {
  margin: auto 10px;
  border: solid 1px #CCC;
  height: 10px;
}
.bar-button:hover {
  background: linear-gradient(#000 60%, #666) !important; /* use !important to overwrite defaults */
}
.bar-button > .label {
  display: inline !important; /* needed for safari */
  font-size: 12px;
  font-weight: bold;
  animation: slide 3s linear infinite;
}
.bar-button:hover > .label {
  color: transparent;
  background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #2affdc, #7c92ff, #d2a7ff, #ff4dd8, #ff3131);
  background-size: 200%;
  background-clip: text;
  transition: .2s linear;
}
@keyframes slide {
  0% { background-position: 0% 0 }
  100% { background-position: 200% 0 }
}
</style>