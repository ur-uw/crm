import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store';
import axios from 'axios';
import './assets/css/app.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(fas);
axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';
const app = createApp(App)
    .use(store)
    .use(router)
    .component('fa', FontAwesomeIcon);
app.config.performance = true;
app.mount('#app');
