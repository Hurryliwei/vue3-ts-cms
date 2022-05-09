import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupStore } from './store'
import registerProperties from '@/global/register-properties'
import ElementPlus from 'element-plus'
import * as ElIcons from '@element-plus/icons'
import 'element-plus/dist/index.css'
import 'normalize.css'
import './assets/css/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)
for (const name in ElIcons) {
  app.component(name, (ElIcons as any)[name])
}
setupStore()

app
  .use(store)
  .use(router)
  .use(ElementPlus, {
    locale: zhCn
  })
  .use(registerProperties)

app.mount('#app')
