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
  NSwitch
} from 'naive-ui'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
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
    NDatePicker
  ]
})
const app = createApp(App).use(store).use(router).use(VueSweetalert2).use(naive)

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
