import { createApp } from 'vue'
// import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.vue'

// Activity 4.2: PrimeVue setup
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

app.mount('#app')
