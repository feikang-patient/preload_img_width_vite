import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import router from './router'
import resetMessage from './utils/resetMessage'; 
const app = createApp(App)
app.config.globalProperties.$msg = resetMessage; // 挂载
app.use(createPinia())
app.use(router)

app.mount('#app')
