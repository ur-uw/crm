import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
// General Font
import 'vfonts/Lato.css'
// Monospace Font
import 'vfonts/FiraCode.css'
// Custom css
import './assets/css/app.min.css'

import { naive } from './use/useNaiveUi'

const app = createApp(App).use(store).use(router).use(naive)

// ? GLOBAL DIRECTIVES
app.directive('focus', {
  // When the bound element is mounted into the DOM...
  mounted(el: HTMLElement) {
    // Focus the element
    console.info('test')
    el.focus()
  }
})
app.config.performance = true
app.mount('#app')
