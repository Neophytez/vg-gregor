import { createApp } from 'vue'
import App from './App.vue'
import TopBar from './components/elements/TopBar.vue';

import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App)

app.component('TopBar', TopBar)

app.mount('#app')