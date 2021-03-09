import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';
import './assets/styles/styles.scss';
import router from './router/router';

createApp(App)
  .use(store)
  .use(VueAxios, axios)
  .use(router)
  .mount('#app');
