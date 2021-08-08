import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import axios from 'axios'
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
axios.defaults.baseURL = 'http://127.0.0.1:8000'
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/json'

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

axios.interceptors.response.use(undefined, (error) => {
  let route = { name: 'error', path: 'error' }
  switch (error.response.status) {
    case 401:
      route = { name: 'login', path: '/login' }
      break
    case 404:
      route = {
        name: 'not-found.show',
        path: '/:pathMatch(.*)*'
      }
      break
  }
  // TODO: make sure that url stay the same when it redirects to NotFound page
  router.replace(route)
  return Promise.reject(error)
})

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
