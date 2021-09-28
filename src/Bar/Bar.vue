<template>
  <div class="bar">
    <component v-for="(item, item_idx) in content"
      :is="get_component(item.is)"
      :key="'bar-item-'+item_idx"
      :item="item"
      :class="item.class"
      :id="item.id"
      :is_open="menu_open"
      :ref="(el) => Object.defineProperty(item, '_el', { value: el, writable: true })"
      @click="toggle_menu(item, $event)" />
  </div>
</template>

<script>
import BarButtonGeneric from './BarButtonGeneric.vue'
import BarButtonColor from './BarButtonColor.vue'
import BarSeparator from './BarSeparator.vue'
import BarSpacer from './BarSpacer.vue'

import 'material-icons/iconfont/material-icons.css'


export default {
  components: {
    BarButtonGeneric,
    BarButtonColor,
    BarSeparator,
    BarSpacer
  },

  props: {
    content: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      menu_open: false
    }
  },

  methods: {
    clickaway (e) {
      if(!this.$el.contains(e.target)) this.menu_open = false;
    },
    toggle_menu(item, event) {
      event.stopPropagation();
      const touch = event.sourceCapabilities && event.sourceCapabilities.firesTouchEvents;
      this.menu_open = item._el.is_menu && !item.disabled ? (touch ? true : !this.menu_open) : false;
    },
    get_component(is) {
      if(is && !Array.isArray(is) && typeof is == "object") return is; // if component
      else if(typeof is == "string") return "bar-"+is;
      else return "bar-button-generic";
    }
  },

  mounted () {
    document.addEventListener("click", this.clickaway);
  },
  beforeUnmount () {
    document.removeEventListener("click", this.clickaway);
  }
}
</script>

<style lang="scss" scoped>
  @import "./imports/bar-default-styles.scss";
</style>
