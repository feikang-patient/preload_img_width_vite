import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from './router';
// import { preloadImages } from './utils/preloadImages';
import _ from 'lodash';
import './auto-upddate';
console.log(_);
// preloadImages();
const app = createApp(App);
app.use(ElementPlus);
app.use(createPinia())
app.use(router)

app.mount('#app')
