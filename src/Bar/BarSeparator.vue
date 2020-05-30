<template>
  <div class="bar-separator"></div>
</template>

<script>
export default { }
</script>

<style scoped>
.bar-separator {
  width: var(--bar-separator-width, 2px);
  margin: var(--bar-separator-margin, 5px);
  background-color: var(--bar-separator-color, rgb(218, 220, 224));
}
</style>