<template>
  <div class="bar">
    <component v-for="(item, item_idx) in content"
      :is="get_component(item.is)"
      :key="'bar-item-'+item_idx"
      :ref="'bar-item-'+item_idx"
      :item="item"
      :class="item.class"
      :is_open="menu_open"
      @click="(event) => toggle_menu('bar-item-'+item_idx, event)" />
  </div>
</template>

<script>
import BarButtonGeneric from './BarButtonGeneric.vue'
import BarButtonColor from './BarButtonColor.vue'
import BarSeparator from './BarSeparator.vue'
import BarSpacer from './BarSpacer.vue'

import 'material-design-icons/iconfont/material-icons.css'


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
    toggle_menu(name, event) {
      event.stopPropagation();
      const ref = this.$refs[name][0];
      const disabled = ref.item && ref.item.disabled;
      const touch = event.sourceCapabilities && event.sourceCapabilities.firesTouchEvents;
      this.menu_open = ref.is_menu && !disabled ? (touch ? true : !this.menu_open) : false;
    },
    get_component(is) {
      if(is && !Array.isArray(is) && typeof is == "object") return is;
      else if(typeof is == "string") return "bar-"+is;
      else return "bar-button-generic";
    }
  },

  mounted () {
    document.addEventListener("click", this.clickaway);
  },
  beforeDestroy () {
    document.removeEventListener("click", this.clickaway);
  }
}
</script>

<style lang="scss" scoped>
  @import "./imports/bar-default-styles.scss";
</style>
