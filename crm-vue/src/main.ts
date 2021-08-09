import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import {
  // create naive ui
  create,
  // component
  NButton,
  NDatePicker,
  NForm,
  NFormItem,
  NGrid,
  NGridItem,
  NInput,
  NModal,
  NResult,
  NSkeleton,
  NSpace,
  NSpin,
  NSwitch,
  NDialog,
  NAlert
} from 'naive-ui'
// Custom css
import './assets/css/app.min.css'

const naive = create({
  components: [
    NButton,
    NGrid,
    NGridItem,
    NResult,
    NSpace,
    NSpin,
    NSkeleton,
    NSwitch,
    NModal,
    NForm,
    NFormItem,
    NInput,
    NDatePicker,
    NDialog,
    NAlert
  ]
})
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
