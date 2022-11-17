<div align="center">
  <img width="305" height="25" src="https://github.com/motla/vue-file-toolbar-menu/raw/master/img/logo.png" alt="vue-file-toolbar-menu">
</div>

# API

```js
my_menu = [

  { // === Button component properties (all fields are optional) ===

    is: String || Object, // Component to display ["button-generic"(default), "button-color", "separator", "spacer", or your own imported Vue component]

    // === button-generic properties ===
    text: String, // Text displayed on the button, if any
    html: String, // Raw HTML to display, if any
    title: String, // Text to display in the button tooltip, if any
    icon: String || Object, // Name of Material icon to display, if any (see https://material.io/resources/icons/), or an icon component (e.g. https://github.com/antfu/unplugin-icons)
    emoji: String, // Name of Emoji to display, if any (from this list: https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json)
    hotkey: String, // Hotkey combination shortcut for the button, if any (use this format: https://github.com/jaywcjlove/hotkeys#supported-keys)
    active: Boolean, // Set to true if the button is toggled
    disabled: Boolean, // Set to true if the button is disabled (it will prevent click event)
    click: Function, // v-on:click event handler function, if any
    class: String || Object, // v-bind:class to apply to the button, if any
    id: String, // Element id to apply to the button, if any

    // if the button-generic should open a menu:
    menu_width: Number, // Custom menu width, if any
    menu_height: Number, // Custom menu maximum height, if any. Setting this activates the scrollbar if content overflows.
    menu_class: String || Object, // v-bind:class to apply to the menu, if any. You can set ["align-left"(default), "align-center", "align-right"]
    menu_id: String, // Element id to apply to the menu, if any
    chevron: Boolean || String, // Set to true if the button should display a chevron. You can also provide the HTML for your custom chevron.
    menu: [ // The menu array of items, or your own imported Vue component
      
      { // === Menu item component properties (all fields are optional) ===
      
        is: String || Object, // Component to display ["item"(default), "separator", or your own imported Vue component]

        // === item properties ===
        text: String, // Text displayed on the menu item, if any
        html: String, // Raw HTML to display, if any
        icon: String || Object, // Name of Material icon to display, if any (see https://material.io/resources/icons/), or an icon component (e.g. https://github.com/antfu/unplugin-icons)
        emoji: String, // Name of Emoji to display, if any (from this list: https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json)
        hotkey: String, // Hotkey combination shortcut for the menu, if any (use this format: https://github.com/jaywcjlove/hotkeys#supported-keys)
        disabled: Boolean, // Set to true if the menu is disabled (it will prevent click event)
        click: Function, // v-on:click event handler function, if any
        class: String || Object, // v-bind:class to apply to the menu item, if any
        id: String, // Element id to apply to the menu item, if any

        // If the menu should open a sub-menu:
        menu_width: Number, // Custom sub-menu width, if any
        menu_height: Number, // Custom sub-menu height, if any. Setting this activates the scrollbar.
        menu_class: String || Object, // v-bind:class to apply to the sub-menu, if any
        menu_id: String, // Element id to apply to the sub-menu, if any
        custom_chevron: String, // HTML of your custom chevron, if any. Set to "" to hide chevron.
        menu: Array || Object // (see button-generic menu property)
      }
    ],

    // === button-color properties ===
    type: String, // Color picker format: ["compact"(default), "material", "swatches", "slider", "sketch", "chrome", "photoshop"] (see https://github.com/xiaokaike/vue-color#live-demo)
    title: String, // Text to display in the button tooltip, if any
    menu_class: String || Object, // Custom v-bind:class to apply to the color picker box, if any. You can set ["align-left"(default), "align-center", "align-right"]
    menu_id: String, // Element id to apply to the color picker box, if any
    stay_open: Boolean, // If set, the color picker will stay open when the user clicks on it
    disabled: Boolean, // Set to true if the color picker is disabled (it will prevent opening)
    color: String || Object, // Current color to display (see compatible formats: https://github.com/xiaokaike/vue-color#usage)
    update_color: function (new_color) { // Callback when user changes the color. 1st argument is an object containing the new color in several formats:
      new_color = {
        a: Number, // color alpha value
        hex: String, // color in hex format "#123456"
        hex8: String, // color in hex8 format (w/ alpha) "#12345678"
        hsl: {
          h: Number, // color hue
          s: Number, // color saturation
          l: Number, // color lightness
          a: Number  // color alpha
        },
        hsv: {
          h: Number, // color hue
          s: Number, // color saturation
          v: Number, // color value
          a: Number  // color alpha
        },
        rgba: {
          r: Number, // color red value
          g: Number, // color green value
          b: Number, // color blue value
          a: Number  // color alpha value
        }
      }
    }
  }
]
```

:warning: As a reminder, be careful to the syntax for the click functions:

- When writing `click (e) { console.log(this) }` : `this` represents the object containing the click function.
- When writing `click: (e) => { console.log(this) }` : `this` represents your component context, so you can access your component data and methods.