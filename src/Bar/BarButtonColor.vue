<template>
  <div class="bar-button" :class="button_class" :title="title" v-on="$listeners"
    @mousedown="(e) => e.preventDefault()"
    @click="(e) => item.click ? item.click(e) : e.stopPropagation()">

    <div class="color-square" :style="{ 'background-color': css_color }"></div>

    <component v-model="color"
      :is="item.type || 'compact'" class="menu"
      :class="item.menu_class" />

  </div>
</template>

<script>
import BarButtonGeneric from './BarButtonGeneric.vue'
import VueColor from 'vue-color'

export default {
  mixins: [ BarButtonGeneric ],

  components: {
    ...VueColor
  },

  data () {
    return {
      color: this.item.color
    }
  },

  computed: {
    is_menu () { return true; },
    css_color () {
      return this.color.hex8 || this.color || "#000"
    }
  },

  watch: {
    color (new_color) {
      if(this.item.update_color) this.item.update_color(new_color);
    },
    "item.color" (item_color) {
      this.color = item_color;
    }
  }
}
</script>

<style scoped>
.bar-button > .color-square {
  width: 15px;
  height: 15px;
  border: solid 1px rgba(0, 0, 0, 0.7);
  margin: 0 3px;
}
.bar-button.disabled > .color-square {
  border: solid 1px var(--bar-button-disabled-color, rgba(0, 0, 0, 0.3));
}
</style>