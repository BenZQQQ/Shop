<template>
  <div class="msite">
    <!--首页头部-->
    <Header :title="address.name">
      <router-link to="/search" class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link :to="userInfo._id ? '/userinfo': '/login'" class="header_login" slot="right">
        <span class="header_login_text" v-if="!userInfo._id">
          登录|注册
        </span>
        <span class="header_login_text" v-else>
           <i class="iconfont icon-person"></i>
        </span>
      </router-link>
    </Header>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(item, index) in categorys" :key="index">
              <div class="food_container">
                <img :src="baseImageUrl + item.image_url">
              </div>
              <span>{{item.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList :shops="shops"></ShopList>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.css'
  import Header from '../../components/Header/Header'
  import ShopList from '../../components/ShopList/ShopList'
  import {mapActions, mapState} from 'vuex'

  export default {
    name: 'MSite',
    data() {
      return {
        baseImageUrl: 'https://fuss10.elemecdn.com'
      }
    },
    components: {
      Header,
      ShopList
    },
    computed: {
      ...mapState(['address', 'categorys', 'shops', 'userInfo']),
      // 将categorys拆成长度为8的二维数组
      categorysArr() {
        const {categorys} = this
        // 准备一个二维空数组
        const arr = []
        // 准备一个空数组，将存入二维数组
        let miniArr = []
        categorys.forEach(item => {
          miniArr.push(item)
          if(miniArr.length === 8) {
            arr.push(miniArr)
            miniArr = []
          }
        })
        return arr
      }
    },
     mounted () {
      this.getAddress()
      this.getCategorys()
      this.getShops()
      this.$store.dispatch('getShopGoods')
    },
    methods: {
      ...mapActions(['getAddress', 'getCategorys', 'getShops'])
    },
    watch: {
      categorys (value) { // categorys数组中有数据了, 在异步更新界面之前执行
        // 界面更新就立即创建Swiper对象
        this.$nextTick(() => {// 一旦完成界面更新, 立即调用(此条语句要写在数据更新之后)
          // 创建一个Swiper实例对象, 来实现轮播
          new Swiper('.swiper-container', {
            loop: true, // 可以循环轮播
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination'
            }
          })
        })

      }
    },
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  &.msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
</style>
