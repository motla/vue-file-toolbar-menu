<template>
  <div class="bar-menu-item"
    @mousedown="(e) => e.preventDefault()"
    @click="click"
    :class="{ disabled: item.disabled, active: item.active }"
    :title="item.title"
    :style="{ height: item.height+'px' }">

    <template v-if="item.icon">
      <component v-if="typeof item.icon == 'object'" class="icon" :is="item.icon"></component>
      <span v-else class="material-icons icon">{{ item.icon }}</span>
    </template>
    <span v-if="item.emoji" class="emoji">{{ get_emoji(item.emoji) }}</span>
    <span v-if="item.text" class="label">{{ item.text }}</span>
    <span v-if="item.html" class="label" v-html="item.html"></span>
    <span v-if="item.hotkey" class="hotkey">{{ hotkey }}</span>
    
    <span v-if="item.menu && item.custom_chevron" class="chevron" v-html="item.custom_chevron"></span>
    <span v-else-if="item.menu" class="material-icons chevron">chevron_right</span>

    <component ref="menu" class="menu" v-if="item.menu"
      :is="get_component(item.menu)"
      :menu="item.menu"
      :class="item.menu_class"
      :id="item.menu_id"
      :width="item.menu_width"
      :height="item.menu_height" />

  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import emoji from 'node-emoji/lib/emoji.json';
import hotkey_manager from './imports/bar-hotkey-manager.js'

export default {
  mixins: [ hotkey_manager ],

  components: {
    BarMenu: defineAsyncComponent(() => import('./BarMenu.vue')) // because of circular reference
  },

  props: {
    item: {
      type: Object,
      required: true
    }
  },

  methods: {
    click (e) {
      if(this.item.click && !this.item.disabled) this.item.click(e);
      else if(!this.$refs.menu || !e.composedPath || !e.composedPath().includes(this.$refs.menu.$el)) {
        e.stopPropagation(); // prevent menu close for touch devices
      }
    },
    get_emoji: emoji_name => (emoji_name in emoji) ? emoji[emoji_name] : "",
    get_component (is) {
      if(is && !Array.isArray(is) && typeof is == "object") return is; // if component
      else return "bar-menu";
    }
  }
}
</script>