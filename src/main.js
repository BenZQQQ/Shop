/*
* 入口文件
* */
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import {Button} from 'mint-ui'
import VueLazyload from 'vue-lazyload'
import loading from './common/imgs/loading.gif'
import './filters/index'
Vue.use(VueLazyload)

// with options
Vue.use(VueLazyload, {
  loading
})

import './mock/mockServer' // 加载mockServer即可

Vue.component(Button.name, Button)
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
