import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
// General Font
import 'vfonts/Lato.css'
// Monospace Font
import 'vfonts/FiraCode.css'
// then it works

import {
  // create naive ui
  create,
  // component
  NButton,
  NInputGroup,
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
  NAlert,
  NIcon,
  NDropdown,
  NRadioButton,
  NRadioGroup,
  NSelect,
  NDynamicTags,
  NLayout,
  NCard,
  NRadio,
  NTimePicker,
  NTimeline,
  NTimelineItem,
  NProgress
} from 'naive-ui'
// Custom css
import './assets/css/app.min.css'

const naive = create({
  components: [
    NButton,
    NGrid,
    NGridItem,
    NResult,
    NInputGroup,
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
    NAlert,
    NIcon,
    NDropdown,
    NLayout,
    NRadioButton,
    NRadio,
    NTimePicker,
    NInputGroup,
    NRadioGroup,
    NSelect,
    NDynamicTags,
    NCard,
    NLayout,
    NTimeline,
    NTimelineItem,
    NProgress
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
