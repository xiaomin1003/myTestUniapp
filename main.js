import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.mixin({ //全局混入
	data() {
		return {
		   timeout: null,
		   timer: null,
		   flag: null
		}
	},
	methods: {
		debounce(func, wait = 500, immediate = false) {
			//防抖是指在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时。
		    // 清除定时器
		    if (this.timeout !== null) clearTimeout(this.timeout)
		    // 立即执行，此类情况一般用不到
		    if (immediate) {
		        const callNow = !this.timeout
		        this.timeout = setTimeout(() => {
		            this.timeout = null
		        }, wait)
		        if (callNow) typeof func === 'function' && func()
		    } else {
		        // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
		        this.timeout = setTimeout(() => {
		            typeof func === 'function' && func()
		        }, wait)
		    }
		},
		throttle(func, wait = 500, immediate = true) {
			//节流是指在规定时间内只执行一次函数。如果在这个时间内再次触发事件，不会执行该事件，直到过了规定时间后才再次执行。
		    if (immediate) {
		        if (!this.flag) {
		            this.flag = true
		            // 如果是立即执行，则在wait毫秒内开始时执行
		            typeof func === 'function' && func()
		            this.timer = setTimeout(() => {
		                this.flag = false
		            }, wait)
		        }
		    } else if (!this.flag) {
		        this.flag = true
		        // 如果是非立即执行，则在wait毫秒内的结束处执行
		        this.timer = setTimeout(() => {
		            this.flag = false
		            typeof func === 'function' && func()
		        }, wait)
		    }
		}
	}
})

const app = new Vue({
    ...App
})

app.$mount()
