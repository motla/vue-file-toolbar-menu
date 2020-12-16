<template>
  <div class="bar-menu">
    <div class="extended-hover-zone"></div>
    <div class="bar-menu-items" :style="{ 
        width: width+'px',
        minWidth: width+'px',
        maxHeight: height+'px',
        overflow: height ? 'auto' : 'visible'
      }">
      <component v-for="(item, index) in menu"
      :is="get_component(item.is)"
      :item="item"
      :class="item.class"
      :id="item.id"
      :key="'menu-'+index" />
    </div>
  </div>
</template>

<script>
import BarMenuItem from './BarMenuItem.vue'
import BarMenuSeparator from './BarMenuSeparator.vue'

export default {

  components: {
    BarMenuItem,
    BarMenuSeparator
  },

  props: {
    menu: {
      type: Array,
      required: true
    },
    width: Number,
    height: Number
  },

  methods: {
    get_component(is) {
      if(typeof is == "object") return is;
      else if(typeof is == "string") return 'bar-menu-'+is;
      else return 'bar-menu-item';
    }
  }
}
</script>