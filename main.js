import App from './App'
import store from './store'
import config from '@/app.config.js'
import myUtils from './utils/myUtils'
import RechargeTemplate from '@/common/rechargeTemplate' //充值模板
import RechargeDescription from '@/common/rechargeTemplate/rechargeDescription' //充值说明
import ScreencapState from '@/common/screencapState'
import HeaderTitle from '@/common/headerTitle' //自定义头部标题
import My from '@/common/my/my.vue' //自定义头部标题
import NoData from '@/common/noData' //无数据先去看剧
import uView from '@/node_modules/uview-ui'
import BallSpin from '@/common/ballSpin'

Vue.use(uView)

Vue.component('ScreencapState', ScreencapState)
Vue.component('RechargeTemplate', RechargeTemplate)
Vue.component('RechargeDescription', RechargeDescription)
Vue.component('HeaderTitle', HeaderTitle)
Vue.component('My', My)
Vue.component('NoData', NoData)
Vue.component('BallSpin', BallSpin)

import api from './api/api.js';
Vue.prototype.$api = api
Vue.prototype.$myUtils = myUtils

// 让页面的 onLoad 在 onLaunch 之后执行
Vue.prototype.$onLaunched = new Promise(resolve => {
    Vue.prototype.$isResolve = resolve
})


// #ifndef VUE3
import Vue from 'vue'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
});

app.$mount();
// #endif


// #ifdef VUE3
import {
    createSSRApp
} from 'vue'

export function createApp() {
    const app = createSSRApp(App)
    // 引入vuex
    app.use(store)
    return {
        app
    }
}
// #endif