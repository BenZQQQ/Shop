<template>
  <div>
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
  import MSite from './pages/MSite/MSite'
  import Order from './pages/Order/Order'
  import Profile from './pages/Profile/Profile'
  import Search from './pages/Search/Search'
  import FooterGuide from './components/FooterGuide/FooterGuide'
  export default {
    name: 'App',
    components: {
      MSite,
      Order,
      Search,
      Profile,
      FooterGuide
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
</style>
