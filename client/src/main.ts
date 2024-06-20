import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
import ToastService from 'primevue/toastservice'
import PrimeVue from "primevue/config"
import router from './router'
//@ts-ignore
import VueKatex from '@hsorby/vue3-katex'
//@ts-ignore
import Lara from '@/presets/lara'
import 'katex/dist/katex.min.css'
import Tooltip from 'primevue/tooltip'
import BadgeDirective from 'primevue/badgedirective'
import ConfirmationService from 'primevue/confirmationservice';
import { GesturePlugin } from '@vueuse/gesture'

const app = createApp(App)
app.use(VueKatex, {
  globalOptions: {}
})

app.use(GesturePlugin)

app.use(PrimeVue, {
  unstyled: true,
  pt: Lara
});


app.use(ToastService)
app.directive('tooltip', Tooltip);
app.directive('badge', BadgeDirective);

app.use(router)


app.use(ConfirmationService);
app.mount('#app')
