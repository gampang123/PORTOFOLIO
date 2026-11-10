import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { magneticDirective, tiltDirective } from './directives/motionDirectives'

const app = createApp(App)

app.directive('magnetic', magneticDirective)
app.directive('tilt', tiltDirective)

app.mount('#app')

