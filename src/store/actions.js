/*
Vuex中actions处理模块
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_SHOPS,
  RECEIVE_CATEGORYS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART
} from './mutations-type'
import {
  reqFoodCategorys,
  reqShops,
  reqAddress,
  reqUserInfo,
  reqLogout,
  reqShopRatings,
  reqShopGoods,
  reqShopInfo
} from '../api'

export default {
  // 异步获取地址
  async getAddress({commit, state}) {
    // 异步发送ajax请求
    const geohash = state.latitude + ',' +state.longitude
    const result = await reqAddress(geohash)
    // 提交mutations请求
    if(result.code === 0){
      const address = result.data
      commit(RECEIVE_ADDRESS, address)
    }
  },
  // 异步获取食品分类轮播信息
  async getCategorys({commit}) {
    const result = await reqFoodCategorys()
    const foodsCategorys = result.data
    if(result.code === 0){
      commit(RECEIVE_CATEGORYS, foodsCategorys)
    }
  },
  // 异步获取商家列表信息
  async getShops({commit, state}) {
    const result = await reqShops(state.longitude, state.latitude)
    const shops = result.data
    if(result.code === 0){
      commit(RECEIVE_SHOPS, shops)
    }
  },
  // 接受用户信息
  recordUser({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, userInfo)
  },
  // 根据会话获取用户信息
  async getReqUserInfo({commit}) {
    const result = await reqUserInfo()
    if(result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, userInfo)
    }
  },
  // 发起用户退出请求
  async logout({commit}) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USER_INFO)
    }
  },
  // 请求mock中的goods数据
  async getShopGoods({commit}, callback) {
    const result = await reqShopGoods()
    const goods = result.data
    if (result.code === 0) {
      console.log('go!')
      commit(RECEIVE_GOODS, goods)
    }
    callback && callback()
  },
  // 请求mock中的shopRating数据
  async getShopRatings({commit}, callback) {
    const result = await reqShopRatings()
    const ratings = result.data
    if (result.code === 0) {
      commit(RECEIVE_RATINGS, ratings)
    }
    callback && callback()
  },
  // 请求mock中的info数据
  async getShopInfo({commit}) {
    const result = await reqShopInfo()
    const info = result.data
    if (result.code === 0) {
      commit(RECEIVE_INFO, info)
    }
  },
  // 同步更新food中的count值
  updateFoodCount({commit}, {isAdd, food}) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT, {food})
    } else {
      commit(DECREMENT_FOOD_COUNT, {food})
    }
  },
  // 同步清空购物车
  clearCart({commit}) {
    commit(CLEAR_CART)
  }

}
