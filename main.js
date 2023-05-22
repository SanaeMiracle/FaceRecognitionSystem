// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import '@/utils/request.js'
// 解决百度地图跨域问题
// 2.25.4
import {
	VueJsonp
} from 'vue-jsonp'
Vue.use(VueJsonp)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif