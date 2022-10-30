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

<style scoped>
.bar {
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  flex-wrap: wrap;
  color: var(--bar-font-color, rgba(0, 0, 0, 0.7));
  font-family: var(--bar-font-family, Avenir, Helvetica, Arial, sans-serif);
  font-size: var(--bar-font-size, 16px);
  font-weight: var(--bar-font-weight, 500);
  font-style: var(--bar-font-style);
  letter-spacing: var(--bar-letter-spacing);
  margin: var(--bar-margin);
  padding: var(--bar-padding);
  border: var(--bar-border);
  border-radius: var(--bar-border-radius);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  user-select: none;
  cursor: default;
}
.bar :deep(::-webkit-scrollbar) {
  width: 16px;
  height: 16px;
}
.bar :deep(::-webkit-scrollbar-track),
.bar :deep(::-webkit-scrollbar-corner) {
  display: none;
}
.bar :deep(::-webkit-scrollbar-thumb) {
  background-color: rgba(0, 0, 0, 0.5);
  border: 5px solid transparent;
  border-radius: 16px;
  background-clip: content-box;
}
.bar :deep(::-webkit-scrollbar-thumb):hover {
  background-color: rgba(0, 0, 0, 0.8);
}
.bar :deep(.ellipsis) {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.bar :deep(.bar-button) {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--bar-button-padding, 7px);
  border-radius: var(--bar-button-radius, 3px);
  white-space: nowrap;
}
.bar :deep(.bar-button).active {
  color: var(--bar-button-active-color, #41b883);
  background: var(--bar-button-active-bkg, #eaf7f4);
}
.bar :deep(.bar-button).open:hover {
  color: var(--bar-button-open-color, #41b883);
  background: var(--bar-button-open-bkg, #eaf7f4);
}
.bar :deep(.bar-button).disabled {
  color: var(--bar-button-disabled-color, rgba(0, 0, 0, 0.3));
  background: var(--bar-button-disabled-bkg);
}
.bar :deep(.bar-button):not(.active):not(.open):not(.disabled):hover {
  color: var(--bar-button-hover-color);
  background: var(--bar-button-hover-bkg, #f1f3f4);
}
.bar :deep(.bar-button) > .label {
  display: flex;
  align-items: center;
  padding: var(--bar-button-label-padding, 0 3px);
}
.bar :deep(.bar-button) > .icon,
.bar :deep(.bar-button) > .emoji {
  font-display: block;
  width: 1em;
  font-size: var(--bar-button-icon-size, 24px);
  margin: var(--bar-button-icon-margin);
}
.bar :deep(.bar-button) > .chevron {
  font-display: block;
  width: 1em;
  margin: var(--bar-button-chevron-margin, 0 -5px 0 0);
}
.bar :deep(.bar-button) > .menu {
  position: absolute;
  left: 0;
  top: 100%;
  display: none;
  z-index: 1000;
}
.bar :deep(.bar-button) > .menu.align-left {
  left: 0;
}
.bar :deep(.bar-button) > .menu.align-center {
  left: auto;
}
.bar :deep(.bar-button) > .menu.align-right {
  left: auto;
  right: 0;
}
.bar :deep(.bar-button).open:hover > .menu {
  display: block;
}
.bar :deep(.bar-menu) {
  position: relative;
  white-space: normal;
}
.bar :deep(.bar-menu) > .extended-hover-zone {
  position: absolute;
  top: 0;
  left: -100px;
  right: -100px;
  bottom: -40px;
}
.bar :deep(.bar-menu) > .bar-menu-items {
  position: relative;
  min-width: var(--bar-menu-min-width, 160px);
  color: var(--bar-menu-color, rgba(0, 0, 0, 0.7));
  background: var(--bar-menu-bkg, white);
  padding: var(--bar-menu-padding, 5px 0);
  box-shadow: var(--bar-menu-shadow, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px);
  border: var(--bar-menu-border);
  border-radius: var(--bar-menu-border-radius);
}
@supports (backdrop-filter: var(--bar-menu-backdrop-filter)) {
  .bar :deep(.bar-menu) > .bar-menu-items {
    backdrop-filter: var(--bar-menu-backdrop-filter);
    background: var(--bar-menu-backdrop-filter-bkg, var(--bar-menu-bkg, white));
  }
}
.bar :deep(.bar-menu) > .bar-menu-items > .bar-menu-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: var(--bar-menu-item-font-size);
  padding: var(--bar-menu-item-padding, 8px 15px);
}
.bar :deep(.bar-men) > .bar-menu-items > .bar-menu-item.active {
  color: var(--bar-menu-item-active-color);
  background: var(--bar-menu-item-active-bkg, #e7e8e9);
}
.bar :deep(.bar-menu) > .bar-menu-items > .bar-menu-item.disabled {
  color: var(--bar-menu-item-disabled-color, rgba(0, 0, 0, 0.3));
}
.bar :deep(.bar-menu) > .bar-menu-items > .bar-menu-item:not(.active):not(.disabled):hover {
  color: var(--bar-menu-item-hover-color);
  background: var(--bar-menu-item-hover-bkg, #f1f3f4);
}
.bar :deep(.bar-menu) > .bar-menu-items > .bar-menu-item > .label {
  display: flex;
  align-items: center;
  flex-grow: 1;
}
.bar :deep(.bar-menu) > .bar-menu-items > .bar-menu-item > .icon,
.bar :deep(.bar-menu) > .bar-menu-items > .bar-menu-item > .emoji {
  font-display: block;
  width: 1em;
  font-size: var(--bar-menu-item-icon-size, 24px);
  margin: var(--bar-menu-item-icon-margin, 0 10px 0 0);
}
.bar :deep(.bar-menu) > .bar-menu-items > .bar-menu-item > .chevron {
  font-display: block;
  width: 1em;
  margin: var(--bar-menu-item-chevron-margin, 0 -6px 0 0);
}
.bar :deep(.bar-menu) > .bar-menu-items > .bar-menu-item > .menu {
  position: absolute;
  left: 100%;
  top: 0;
  display: none;
  z-index: 1000;
}
.bar :deep(.bar-menu) > .bar-menu-items > .bar-menu-item:hover > .menu {
  display: block;
}
.bar :deep(.bar-menu) > .bar-menu-items > .bar-menu-item > .bar-menu {
  border-radius: var(--bar-sub-menu-border-radius);
}
.bar :deep(.bar-menu) > .bar-menu-items > .bar-menu-item > .bar-menu > .extended-hover-zone {
  top: -100px;
  left: 0;
  bottom: -100px;
}
.bar :deep(.bar-menu) > .bar-menu-items > .bar-menu-separator {
  height: var(--bar-menu-separator-height, 1px);
  margin: var(--bar-menu-separator-margin, 5px 0);
  background-color: var(--bar-menu-separator-color, rgba(0, 0, 0, 0.1));
}
.bar :deep(.bar-separator) {
  width: var(--bar-separator-width, 2px);
  margin: var(--bar-separator-margin, 5px);
  background-color: var(--bar-separator-color, rgba(0, 0, 0, 0.1));
}
.bar :deep(.bar-spacer) {
  flex-grow: 1;
}
</style>
