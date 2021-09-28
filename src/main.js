import { createApp, h } from 'vue'
import Demo from './Demo/Demo.vue'

const app = createApp(Demo);

// enable devtools for the demo
app.config.devtools = true;

// create selectable style for dynamic css variables
app.component("v-style", {
  render () { return h("style", {}, this.$slots.default()); }
});

app.mount('#app');