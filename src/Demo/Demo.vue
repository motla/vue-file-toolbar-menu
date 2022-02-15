<template>
  <div class="main">
    <div class="title">vue-file-toolbar-menu</div>
    <div class="subtitle">
        <svg class="github" width="20" height="20" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <path d="M500,10C236.3,10,22.6,229.4,22.6,500c0,270.6,213.8,490,477.4,490c263.7,0,477.4-219.4,477.4-490C977.4,229.4,763.7,10,500,10z M643.3,940.1c-23,4.6-31.1-9.9-31.1-22.3c0-15.2,0.5-65.2,0.5-127.2c0-43.3-14.5-71.6-30.7-86c100.8-11.4,206.5-50.7,206.5-228.8c0-50.6-17.5-92.1-46.5-124.5c4.6-11.7,20.2-58.8-4.5-122.7c0,0-37.9-12.5-124.3,47.6c-36.1-10.3-74.8-15.5-113.2-15.7c-38.5,0.2-77.2,5.3-113.2,15.7c-86.4-60-124.4-47.6-124.4-47.6c-24.6,63.9-9.1,111-4.4,122.7c-28.9,32.4-46.5,73.8-46.5,124.5c0,177.7,105.6,217.5,206,229.2c-12.9,11.6-24.6,32-28.7,62c-25.8,11.8-91.3,32.3-131.6-38.6c0,0-23.9-44.5-69.3-47.8c0,0-44.2-0.6-3.1,28.2c0,0,29.7,14.2,50.2,67.8c0,0,26.6,90.2,152.4,62.2c0.2,38.7,0.6,67.9,0.6,78.9c0,12.3-8.2,26.6-30.9,22.3c-179.8-61.3-309.3-235.1-309.3-440C47.7,244,250.2,36.4,500,36.4c249.8,0,452.3,207.6,452.3,463.8C952.3,705,822.8,878.7,643.3,940.1z"/>
        </svg>
        <a href="https://github.com/motla/vue-file-toolbar-menu">view docs on github</a>
    </div>
    <div class="styles">
      <select v-model="theme">
        <option value="default">Default style (Vue.js)</option>
        <option value="google-docs">"Google Docs"-like style</option>
        <option value="mac-os">"macOS"-like style</option>
      </select>
    </div>
    <!-- v-style component is defined in main.js, and serves to activate/deactivate stylesheets using v-if -->
    <v-style v-if="theme == 'google-docs'">
      body {
        background-color: rgb(248, 249, 250);
        box-shadow: none;
      }
      ::selection {
        background-color: rgb(186, 212, 253);
      }
      :root {
        --demo-font-color: #222;
        --demo-bars-bkg: rgb(255, 255, 255);
        --demo-bars-shadow: 0 1px 3px 1px rgba(60, 64, 67, 0.15);
        --demo-bars-padding: 5px;
        --demo-bars-border-radius: 1px;
        --demo-text-bkg-color: white;
        --demo-text-box-shadow: 0 1px 3px 1px rgba(60, 64, 67, 0.15);

        --bar-font-color: rgb(32, 33, 36);
        --bar-font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
        --bar-font-size: 15px;
        --bar-font-weight: 500;
        --bar-letter-spacing: 0.2px;
        --bar-padding: 3px;
        --bar-button-icon-size: 20px;
        --bar-button-padding: 4px 6px;
        --bar-button-radius: 4px;
        --bar-button-hover-bkg: rgb(241, 243, 244);
        --bar-button-active-color: rgb(26, 115, 232);
        --bar-button-active-bkg: rgb(232, 240, 254);
        --bar-button-open-color: rgb(32, 33, 36);
        --bar-button-open-bkg: rgb(232, 240, 254);
        --bar-menu-bkg: white;
        --bar-menu-border-radius: 0 0 3px 3px;
        --bar-menu-item-chevron-margin: 0;
        --bar-menu-item-hover-bkg: rgb(241, 243, 244);
        --bar-menu-item-padding: 5px 8px 5px 35px;
        --bar-menu-item-icon-size: 15px;
        --bar-menu-item-icon-margin: 0 9px 0 -25px;
        --bar-menu-padding: 6px 1px;
        --bar-menu-shadow: 0 2px 6px 2px rgba(60, 64, 67, 0.15);
        --bar-menu-separator-height: 1px;
        --bar-menu-separator-margin: 5px 0 5px 34px;
        --bar-menu-separator-color: rgb(227, 229, 233);
        --bar-separator-color: rgb(218, 220, 224);
        --bar-separator-width: 1px;
        --bar-sub-menu-border-radius: 3px;
      }
      .bars > .bar:first-child {
        border-bottom: 1px solid rgb(218, 220, 224);
        margin-bottom: 3px;
      }
    </v-style>
    <v-style v-else-if="theme == 'mac-os'">
      body {
        background-color: rgb(215, 215, 215);
        box-shadow: none;
      }
      ::selection {
        background-color: rgb(179, 215, 255);
      }
      :root {
        --demo-font-color: #222;
        --demo-bars-bkg: rgb(239, 239, 239);
        --demo-bars-shadow: none;
        --demo-bars-padding: 0 0 2px 0;
        --demo-text-bkg-color: rgba(0, 0, 0, 0.04);

        --bar-font-color: rgba(0, 0, 0, 0.75);
        --bar-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        --bar-font-size: 15.5px;
        --bar-button-icon-size: 20px;
        --bar-button-padding: 4px 7px 5px 7px;
        --bar-button-radius: 0;
        --bar-button-hover-bkg: none;
        --bar-button-active-color: white;
        --bar-button-active-bkg: rgba(41, 122, 255, 0.9);
        --bar-button-open-color: white;
        --bar-button-open-bkg: rgba(41, 122, 255, 0.9);
        --bar-menu-bkg: rgba(255, 255, 255, 0.95);
        --bar-menu-backdrop-filter: saturate(180%) blur(20px);
        --bar-menu-backdrop-filter-bkg: rgba(255, 255, 255, 0.3);
        --bar-menu-border: solid 1px #BBB;
        --bar-menu-border-radius: 0 0 6px 6px;
        --bar-menu-item-chevron-margin: 0;
        --bar-menu-item-hover-color: white;
        --bar-menu-item-hover-bkg: rgba(41, 122, 255, 0.9);
        --bar-menu-item-padding: 1px 12px 2px 25px;
        --bar-menu-item-icon-size: 16px;
        --bar-menu-item-icon-margin: 0 4px 0 -20px;
        --bar-menu-padding: 3px 0;
        --bar-menu-shadow: 0 6px 13px 0 rgba(60, 60, 60, 0.4);
        --bar-menu-separator-height: 2px;
        --bar-menu-separator-margin: 5px 0;
        --bar-menu-separator-color: rgba(0, 0, 0, 0.08);
        --bar-separator-color: rgba(0, 0, 0, 0.1);
        --bar-separator-width: 2px;
        --bar-separator-margin: 5px 7px;
        --bar-sub-menu-border-radius: 6px;
      }
      .bars > .bar:not(:first-child) {
        padding: 5px;
      }
      .bars > .bar:first-child {
        border-bottom: solid 1px #CCC;
        margin-bottom: 3px;
      }
      .bars > .bar:first-child > .bar-button:first-child {
        margin-left: 10px;
      }
    </v-style>
    <div class="experiment">
      <div class="bars">
        <vue-file-toolbar-menu v-for="(content, index) in bars_content" :key="'bar-'+index" :content="content" />
      </div>
      <div ref="text" class="text" :contenteditable="edit_mode" spellcheck="false" v-html="initial_html"></div>
    </div>
  </div>
</template>

<script>
import VueFileToolbarMenu from '../Bar/Bar.vue' // set from 'vue-file-toolbar-menu' in your application
import DemoCustomButton from './DemoCustomButton.vue'
import DemoCustomMenuItem from './DemoCustomMenuItem.vue'

export default {
  components: { VueFileToolbarMenu },

  data () {
    return {
      initial_html: "Try me! Here is some <strong>contenteditable</strong> &lt;div&gt; for the demo.",
      color: "rgb(74, 238, 164)",
      font: "Avenir",
      theme: "default",
      edit_mode: true,
      check1: false,
      check2: false,
      check3: true
    }
  },

  computed: {

    // Read the API documentation about the available menu content options

    bars_content () {
      const mac_os_menus = (this.theme == "mac-os") ? [
        {
          html: '<svg width="16" height="16" viewBox="0 0 16 16" style="fill: var(--bar-font-color, black)" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"/></svg>',
          menu: [{ text: "Log Out", hotkey: "shift+command+q", click: () => alert("No way!") }]
        },
        {
          html: '<span style="font-weight:700">YourApp</span>',
          menu: [{ text: "Quit", hotkey: "command+q", click: () => alert("No way!") }]
        }
      ] : [];

      return [
        [
          ...mac_os_menus,
          {
            text: "File",
            menu: [
              { text: "New", click: () => { this.$refs.text.innerHTML = this.initial_html; this.focus_text(); } },
              { text: "Save...", click: () => alert("You're amazing, "+(prompt("What's your name?")||"friend")+"!") },
              { is: "separator" },
              { text: "Print...", click: () => window.print() },
              { is: "separator" },
              { text: "Close", click () { if(confirm("Do you want to close the page?")) window.close(); } },
            ]
          },
          {
            text: "Edit",
            menu: [
              { text: "Cut", click: () => document.execCommand("cut") },
              { text: "Copy", click: () => document.execCommand("copy") },
              { text: "Paste", click () { navigator.clipboard.readText().then(text => { document.execCommand("insertText", false, text) }) } }
            ]
          },
          {
            text: "Formats",
            menu: [
              { text: "Basic" },
              { text: "Disabled", disabled: true },
              {
                text: "Sub-menus",
                custom_chevron: this.theme != "default" ? "►" : false,
                menu: [
                  { text: "Hello!" },
                  {
                    text: "I'm a sub-menu",
                    custom_chevron: this.theme != "default" ? "►" : false,
                    menu: [
                      {
                        text: "And I'm another sub-menu!",
                        click: () => console.log("Sub-menu clicked!")
                      },
                    ],
                    menu_width: 240
                  }
                ],
                menu_width: 200
              },
              {
                text: "Hotkey",
                hotkey: this.isMacLike ? "command+e" : "ctrl+e",
                click () {
                  alert("Hotkey menu triggered either via clicking or shortcut.");
                }
              },
              { text: "Material icon", icon: "shopping_cart", click: () => window.open("https://material.io/resources/icons", "_blank") },
              { text: "Platform emoji", emoji: "call_me_hand", click: () => window.open("https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json", "_blank") },
              { text: "Menu text is wrapped when it is too long" },
              { is: DemoCustomMenuItem, text: "Your component", click: () => alert("Your custom action!") },
              { is: "separator" },
              {
                text: "Option 1",
                icon: this.check1 ? "radio_button_unchecked" : "radio_button_checked",
                click: (e) => {
                  e.stopPropagation(); // prevent menu close when clicking
                  this.check1 = false;
                }
              },
              {
                text: "Option 2",
                icon: this.check1 ? "radio_button_checked" : "radio_button_unchecked",
                click: (e) => {
                  e.stopPropagation(); // prevent menu close when clicking
                  this.check1 = true;
                }
              },
              { is: "separator" },
              {
                text: "Option 3",
                icon: this.check2 ? "check_box" : "check_box_outline_blank",
                click: (e) => {
                  e.stopPropagation(); // prevent menu close when clicking
                  this.check2 = !this.check2;
                }
              },
              {
                text: "Option 4",
                icon: this.check3 ? "check_box" : "check_box_outline_blank",
                click: (e) => {
                  e.stopPropagation(); // prevent menu close when clicking
                  this.check3 = !this.check3;
                }
              }
            ],
            menu_width: 220
          },
          {
            text: "Help",
            menu: [
              { text: "About", icon: "help", click: () => alert("vue-file-toolbar-menu\nhttps://github.com/motla/vue-file-toolbar-menu\nby @motla\nMIT License") },
              { is: "separator" },
              { text: "Repository", icon: "exit_to_app", click: () => window.open("https://github.com/motla/vue-file-toolbar-menu") },
              { text: "API", icon: "exit_to_app", click: () => window.open("https://github.com/motla/vue-file-toolbar-menu/blob/master/API.md") },
              { text: "Report Issue", icon: "exit_to_app", click: () => window.open("https://github.com/motla/vue-file-toolbar-menu/issues") },
              { text: "Release Notes", icon: "exit_to_app", click: () => window.open("https://github.com/motla/vue-file-toolbar-menu/blob/master/CHANGELOG.md") }
            ],
            menu_width: 220
          },
          { is: "spacer" },
          { icon: this.edit_mode ? "lock_open" : "lock", title: "Toggle edit mode", active: !this.edit_mode, click: () => { this.edit_mode = !this.edit_mode } }
        ],
        [
          { icon: "format_align_left", title: "Align left", hotkey: this.isMacLike ? "shift+command+l" : "ctrl+shift+l", click: () => document.execCommand("justifyLeft") },
          { icon: "format_align_center", title: "Align center", hotkey: this.isMacLike ? "shift+command+e" : "ctrl+shift+e", click: () => document.execCommand("justifyCenter") },
          { icon: "format_align_right", title: "Align right", hotkey: this.isMacLike ? "shift+command+r" : "ctrl+shift+r", click: () => document.execCommand("justifyRight") },
          { icon: "format_align_justify", title: "Justify content", hotkey: this.isMacLike ? "shift+command+j" : "ctrl+shift+j", click: () => document.execCommand("justifyFull") },
          { is: "separator" },
          { icon: "format_bold", title: "Bold", hotkey: this.isMacLike ? "command+b" : "ctrl+b", click: () => document.execCommand("bold") },
          { icon: "format_italic", title: "Italic", hotkey: this.isMacLike ? "command+i" : "ctrl+i", click: () => document.execCommand("italic") },
          { icon: "format_underline", title: "Underline", hotkey: this.isMacLike ? "command+u" : "ctrl+u", click: () => document.execCommand("underline") },
          { icon: "format_strikethrough", title: "Strike through", click: () => document.execCommand("strikethrough") },
          {
            is: "button-color",
            type: "compact",
            menu_class: "align-center",
            stay_open: false,
            color: this.color,
            update_color: (new_color) => { this.color = new_color; document.execCommand('foreColor', false, new_color.hex8); }
          },
          { is: "separator" },
          {
            html: '<div class="ellipsis" style="width: 80px; font-size: 95%;">'+this.font+'</div>',
            title: "Font",
            chevron: true,
            menu: this.font_menu,
            menu_height: 200
          },
          { is: "separator" },
          { icon: "format_list_numbered", title: "Numbered list", click: () => document.execCommand("insertOrderedList") },
          { icon: "format_list_bulleted", title: "Bulleted list", click: () => document.execCommand("insertUnorderedList") },
          { is: "separator" },
          { icon: "format_indent_increase", title: "Increase indent", click: () => document.execCommand("indent") },
          { icon: "format_indent_decrease", title: "Decrease indent", click: () => document.execCommand("outdent") },
          { is: "separator" },
          { is: DemoCustomButton, text: "Your component", click: () => alert("Your custom action!") },
          { is: "separator" },
          { html: "<b>H1</b>", title: "Header 1", click: () => document.execCommand('formatBlock', false, '<h1>') },
          { html: "<b>H2</b>", title: "Header 2", click: () => document.execCommand('formatBlock', false, '<h2>') },
          { html: "<b>H3</b>", title: "Header 3", click: () => document.execCommand('formatBlock', false, '<h3>') },
          { icon: "format_clear", text: "Clear", title: "Clear format", click () { document.execCommand('removeFormat'); document.execCommand('formatBlock', false, '<div>'); } }
        ]
      ]
    },
    isMacLike: () => /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform),
    font_menu () {
      return this.font_list.map(font => {
        return {
          html: '<span class="ellipsis" style="font-family:'+font+'">'+font+'</span>',
          icon: (this.theme != "default" && this.font == font) ? 'check' : false,
          active: (this.font == font),
          height: 20,
          click: () => {
            document.execCommand("fontName", false, font);
            this.font = font;
          }
        };
      });
    },
    font_list: () => ["Arial", "Avenir", "Courier New", "Garamond", "Georgia", "Impact", "Helvetica", "Palatino", "Roboto", "Times New Roman", "Verdana"],
    is_touch_device: () => ("ontouchstart" in window) || (window.navigator.msMaxTouchPoints > 0)
  },

  methods: {
    focus_text () {
      this.$refs.text.focus();
      document.execCommand('selectAll', false, null);
      document.getSelection().collapseToEnd();
    }
  },

  mounted () {
    if(!this.is_touch_device) this.focus_text();
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap');
:root {
  --demo-font-color: rgb(74, 238, 164);
}
html {
  height: 100%;
  overflow-y: scroll;
  background-color: rgb(74, 238, 164);
  transition-delay: .5s;
}
body {
  margin: 0;
  min-height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--demo-font-color);
  background-color: rgb(36, 44, 41);
  box-shadow: inset 0 0 30vw 15vw black;
  transition: color .3s, background-color .3s, box-shadow .5s;
}
::selection {
  background-color: rgba(74, 238, 164, 0.2);
}
</style>

<style scoped>
a {
  color: inherit;
}
svg.github {
  fill: var(--demo-font-color);
  margin-right: 5px;
}
*[contenteditable=true] {
  outline: none;
}
select {
  outline: none;
}

.main {
  width: 100%;
  height: 100%;
}
.title {
  text-align: center;
  font-size: 50px;
  padding-top: 30px;
}
.subtitle {
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 50px;
}
.experiment {
  width: 95%;
  margin: auto;
  max-width: 1150px;
}
.bars {
  background-color: var(--demo-bars-bkg, white);
  border-radius: var(--demo-bars-border-radius, 5px);
  box-shadow: var(--demo-bars-shadow, 0 0 20px black);
  padding: var(--demo-bars-padding, 8px);
  transition: .5s;
}
::v-deep(.bars) * {
  transition: font-size .1s linear, padding .1s linear, margin .1s linear;
}
.styles {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 1;
}
.text {
  font-family: var(--bar-font-family);
  width: 90%;
  margin: 30px auto;
  font-size: 20px;
  min-height: 250px;
  background-color: var(--demo-text-bkg-color);
  background-image: var(--demo-text-bkg-img, url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23FFFFFF30' stroke-width='2' stroke-dasharray='15' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e"));
  border: var(--demo-text-border);
  box-shadow: var(--demo-text-box-shadow);
  padding: 10px 15px;
  transition: .5s;
}
</style>