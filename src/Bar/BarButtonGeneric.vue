<template>
  <div class="bar-button" :class="button_class" :title="title"
    @mousedown="(e) => e.preventDefault()"
    @click="(e) => (item.click && !item.disabled) ? item.click(e) : e.stopPropagation()">
    
    <template v-if="item.icon">
      <component v-if="typeof item.icon == 'object'" class="icon" :is="item.icon"></component>
      <span v-else class="material-icons icon">{{ item.icon }}</span>
    </template>
    <span v-if="item.emoji" class="emoji">{{ get_emoji(item.emoji) }}</span>
    <span v-if="item.text" class="label">{{ item.text }}</span>
    <span v-if="item.html" class="label" v-html="item.html"></span>

    <span v-if="item.chevron === true" class="material-icons chevron">expand_more</span>
    <span v-else-if="item.chevron" class="chevron" v-html="item.chevron"></span>

    <component class="menu" v-if="item.menu"
      :is="get_component(item.menu)"
      :menu="item.menu"
      :class="item.menu_class"
      :id="item.menu_id"
      :width="item.menu_width"
      :height="item.menu_height" />

  </div>
</template>

<script>
import emoji from 'node-emoji/lib/emoji.json';
import BarMenu from './BarMenu.vue'
import hotkey_manager from './imports/bar-hotkey-manager.js'

export default {
  mixins: [ hotkey_manager ],

  components: {
    BarMenu
  },

  props: {
    item: {
      type: Object,
      required: true
    },
    is_open: Boolean
  },

  computed: {
    is_menu () { return this.item.menu ? true : false; },
    button_class () {
      const open = this.is_open && this.is_menu;
      const active = this.item.active;
      const disabled = this.item.disabled;
      return { open, active, disabled };
    },
    title () {
      if(this.item.title){
        let title = this.item.title;
        if(this.hotkey) title += " ("+this.hotkey+")";
        return title;
      }
      else return null;
    }
  },

  methods: {
    get_emoji: emoji_name => (emoji_name in emoji) ? emoji[emoji_name] : "",
    get_component (is) {
      if(is && !Array.isArray(is) && typeof is == "object") return is; // if component
      else return "bar-menu";
    }
  }
}
</script>