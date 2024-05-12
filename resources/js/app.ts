import './bootstrap'
import '@/assets/main.css'
import 'vue-base-tooltip/style.css'
import '@fontsource/clear-sans/300.css'
import '@fontsource/clear-sans/400.css'
import '@fontsource/clear-sans/500.css'
import '@fontsource/clear-sans/700.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { localize, setLocale } from '@vee-validate/i18n'
import { configure, defineRule } from 'vee-validate'
import VueBaseTooltip from 'vue-base-tooltip'
import de from '@vee-validate/i18n/dist/locale/de.json'
import App from './App.vue'
import router from './router'
import { required, email, min } from '@vee-validate/rules'
import VueMitter from '@nguyenshort/vue3-mitt'

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)

configure({
  generateMessage: localize({
    de
  })
})

setLocale('de')

const app = createApp(App)

app.config.errorHandler = (err, instance, info) => {
  console.log('ERROR HANDLER', err, instance, info)
}

app.use(createPinia())
app.use(VueBaseTooltip)
app.use(VueMitter)
app.use(router)
app.mount('#app')
