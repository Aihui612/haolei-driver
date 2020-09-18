import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
Vue.prototype.imgUrl = 'https://haolei-shenche.oss-cn-beijing.aliyuncs.com/'; 
 
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
