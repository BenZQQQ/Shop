/*
Vuex核心使用模块
 */
import Vue from 'vue'
import Vuex from 'vuex'

// 引入Vuex模块
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import state from './state'
Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  mutations,
  getters,
  state
})


