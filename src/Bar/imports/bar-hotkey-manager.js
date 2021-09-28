import hotkeys from 'hotkeys-js'

hotkeys.filter = function(){ return true; } // allow hotkeys from every element

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  computed: {
    isMacLike: () => /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform),
    hotkey () {
      let s = this.item.hotkey;
      if(typeof s != "string") return false;
      s = s.toUpperCase();
      s = s.replace(/(shift|⇧)\+/ig, this.isMacLike ? "⇧" : "Shift+");
      s = s.replace(/(control|ctrl|⌃)\+/ig, this.isMacLike ? "⌃" : "Ctrl+");
      s = s.replace(/(option|alt|⌥)\+/ig, this.isMacLike ? "⌥" : "Alt+");
      s = s.replace(/(cmd|command|⌘)\+/ig, this.isMacLike ? "⌘" : "Cmd+");
      return s;
    },
  },

  methods: {
    update_hotkey (new_hotkey, old_hotkey) {
      if(old_hotkey) hotkeys.unbind(old_hotkey, this.hotkey_fn);
      if(new_hotkey) hotkeys(new_hotkey, this.hotkey_fn);
    },
    hotkey_fn (event, handler) {
      event.preventDefault();
      if(this.item.click && !this.item.disabled) this.item.click(event, handler);
    }
  },

  watch: {
    "item.hotkey": {
      handler: "update_hotkey",
      immediate: true
    }
  },

  beforeUnmount () {
    if(this.item.hotkey) hotkeys.unbind(this.item.hotkey, this.hotkey_fn);
  }
}