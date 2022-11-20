<div align="center">
  <img src="https://github.com/motla/vue-file-toolbar-menu/raw/master/img/logo.png" alt="vue-file-toolbar-menu" width="305">
</div>
<div align="center">
  <img src="https://github.com/motla/vue-file-toolbar-menu/raw/master/img/preview.png" width="794">
</div>

## Features
### :rocket: [See live demo](https://motla.github.io/vue-file-toolbar-menu)
- Synced menu content (stored in Vue.js computed/data fields, not in `<template>`)
- Easy styling
- Add your own custom components for menus and buttons
- Uses standard [Material Icons](https://material.io/resources/icons/)
- Hotkey support
- Touch-device compatible
- Easy multi-language implementation ([vue-i18n](https://github.com/kazupon/vue-i18n))
- Migrated to Vue.js 3.x (to use with Vue 2.x, select library version 1.x)

###### :speech_balloon: If you plan to build a document editor, also check out [vue-document-editor](https://github.com/motla/vue-document-editor)

## Installation
##### In your Vue.js 3.x project:

```
npm install vue-file-toolbar-menu
```

##### In your Vue.js 2.x project:

```
npm install vue-file-toolbar-menu@1
```

###### :speech_balloon: If you prefer static files, import assets from the `dist` folder

## Basic example
###### MyComponent.vue
```Vue
<template>
  <div> <vue-file-toolbar-menu :content="my_menu" /> </div>
</template>

<script>
import VueFileToolbarMenu from 'vue-file-toolbar-menu'

export default {
  components: { VueFileToolbarMenu },

  data () { return { happy: false } },

  computed: {
    my_menu () {
      return [
        { text: "My Menu", menu: [
          { text: "Item 1", click: () => alert("Action 1") },
          { text: "Item 2", click: () => alert("Action 2") }
        ] }, {
          text: "My Button",
          active: this.happy,
          icon: this.happy ? "sentiment_very_satisfied" : "sentiment_satisfied",
          click: () => { this.happy = !this.happy }
        }
      ]
    }
  }
}
</script>
```
Should render this:

<img src="https://github.com/motla/vue-file-toolbar-menu/raw/master/img/basic-example.png" width="201">

<details>
<summary><small>same example using static files loaded with a CDN (Vue 3)</small></summary>

```HTML
<html>
<head>
  <script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.prod.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue-file-toolbar-menu@2/dist/VueFileToolbarMenu.umd.min.js"></script>
  <link href="https://cdn.jsdelivr.net/npm/vue-file-toolbar-menu@2/dist/VueFileToolbarMenu.css" rel="stylesheet">
</head>
<body>
  <div id="app">
    <vue-file-toolbar-menu :content="my_menu" />
  </div>
  <script>
  const app = Vue.createApp({
    components: { VueFileToolbarMenu },

    data () { return { happy: false } },

    computed: {
      my_menu () {
        return [
          { text: "My Menu", menu: [
            { text: "Item 1", click: () => alert("Action 1") },
            { text: "Item 2", click: () => alert("Action 2") }
          ] }, {
            text: "My Button",
            active: this.happy,
            icon: this.happy ? "sentiment_very_satisfied" : "sentiment_satisfied",
            click: () => { this.happy = !this.happy }
          }
        ]
      }
    }
  }).mount('#app');
  </script>
</body>
</html>
```

</details>
<details>
<summary><small>same example using static files loaded with a CDN (Vue 2)</small></summary>

```HTML
<html>
<head>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue-file-toolbar-menu@1/dist/VueFileToolbarMenu.umd.min.js"></script>
  <link href="https://cdn.jsdelivr.net/npm/vue-file-toolbar-menu@1/dist/VueFileToolbarMenu.css" rel="stylesheet">
</head>
<body>
  <div id="app">
    <vue-file-toolbar-menu :content="my_menu" />
  </div>
  <script>
  var app = new Vue({
    el: '#app',
    components: { VueFileToolbarMenu },

    data () { return { happy: false } },

    computed: {
      my_menu () {
        return [
          { text: "My Menu", menu: [
            { text: "Item 1", click: () => alert("Action 1") },
            { text: "Item 2", click: () => alert("Action 2") }
          ] }, {
            text: "My Button",
            active: this.happy,
            icon: this.happy ? "sentiment_very_satisfied" : "sentiment_satisfied",
            click: () => { this.happy = !this.happy }
          }
        ]
      }
    }
  })
  </script>
</body>
</html>
```

</details>

## Complete example
See the [Demo.vue](src/Demo/Demo.vue) file corresponding to the [live demo](https://motla.github.io/vue-file-toolbar-menu). **:blue_book: Also read the [API](API.md)**.

## Styling

Styling can be done either by writing CSS variables or by overloading CSS properties using [`!important`](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity#How_!important_can_be_used).

**:blue_book: Check the CSS variables list and default values in the [stylesheet](src/Bar/Bar.vue#L70).**

###### :speech_balloon: If you need some variables that are missing, edit the stylesheet then submit a PR.

#### Some styling examples:

- #### Docs-like theme:

<img src="https://github.com/motla/vue-file-toolbar-menu/raw/master/img/docs-theme.png" width="319">
<details><summary>View specific CSS variables for this theme</summary>

```css
:root {
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
```
</details>

- #### macOS-like theme:
<img src="https://github.com/motla/vue-file-toolbar-menu/raw/master/img/macos-theme.png" width="332">
<details>
<summary>View specific CSS variables for this theme</summary>

```css
:root {
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
```
</details>

## Project development
- `npm run serve` compiles and hot-reloads demo for development
- `npm run build` compiles and minifies production files and demo

## Dependencies
- [hotkeys-js](https://github.com/jaywcjlove/hotkeys) by Kenny Wong, MIT License
- [material-icons](https://github.com/marella/material-icons) by Ravindra Marella and Google, Apache-2.0 License
- [node-emoji](https://github.com/omnidan/node-emoji) by Daniel Bugl, MIT License
- [vue-color](https://github.com/xiaokaike/vue-color) by xiaokaike, MIT License

## Licensing
Copyright (c) 2020 Romain Lamothe, [MIT License](LICENSE)