import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupStore } from './store'
import hyRequest from './service'
import ElementPlus from 'element-plus'
import * as ElIcons from '@element-plus/icons'
import 'element-plus/dist/index.css'
import 'normalize.css'
import './assets/css/index.css'

const app = createApp(App)
for (const name in ElIcons) {
  app.component(name, (ElIcons as any)[name])
}

app.use(router).use(store).use(ElementPlus)
setupStore()

app.mount('#app')
