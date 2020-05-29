<template>
  <div class="container col">
    <div class="bannerWrapper">
      <img class="banner" src="./banner.png" alt="" />
      <!-- <div class="avertwraper row a-c ">
        <img :src="userinfo.headimgurl" alt="">
        <div>{{userinfo.nickname}}</div>
      </div>
      <div class="shadow"></div>
      <div class="center  row a-c j-c" @click="shopAdmin">赋予爱商家入口</div> -->
    </div>
    <div class="item-wrapper row f-w j-c a-c">
      <div class="item col j-c a-c border-right" @click="intro()">
        <img src="./intro.png" alt="" />
        <div>公司介绍</div>
      </div>
      <div class="item col j-c a-c  " @click="yiJing()">
        <img src="./yijing.png" alt="" />
        <div>易经泰斗</div>
      </div>
      <div class="item col j-c a-c border-right" @click="brand()">
        <img src="./brand.png" alt="" />
        <div>品牌故事</div>
      </div>
      <div class="item col j-c a-c " @click="mechan()">
        <img src="./union.png" alt="" />
        <div>联盟商家</div>
      </div>
    </div>
    <div class="bar"></div>
    <div class="btm  col j-c a-c">
      <img src="./btm.png" alt="" />
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import {  selfDetail } from 'api/index'
export default {
  data() {
    return {
      userinfo: ''


    }
  },
  mounted() {
    // this._selfDetail()

  },
  methods: {
    shopAdmin() {
      window.location.href = "http://b.fuyulove.com/3g/login.aspx"
    },
    _selfDetail() {
      selfDetail().then(res => {
        console.log('信息', res)
        if (res.code == 0) {
          this.userinfo = res.data.info
        } 
        // else {
        //   this.$router.push({
        //     path: '/login',
        //   })
        // }

      })

    },
    // _getuserinfo() {
    //   getuserinfo().then(res => {
    //     console.log('用户信息', res)
    //     if (res.code == 0) {
    //       this.userinfo = res.data.userinfo
    //     } else {
    //       this.$router.push({
    //         path: '/login',
    //       })
    //     }
    //   })

    // },
    yiJing() {
      this.$router.push({ path: '/yiJing' })
    },
    brand() {
      this.$router.push({ path: '/brand' })
    },
    mechan() {
      this.$router.push({ path: '/mechan' })
    },
    intro() {
      this.$router.push({ path: '/intro' })
    },
    personalCenter() {
      this.$router.push({ path: '/personalCenter' })
    },

  },
  components: {

  }
}
</script>
<style scoped lang="stylus">
.container
  position absolute
  top 0px
  width 100%
  height 100%
  background-color #b2a189
  .bannerWrapper
    position relative
    .banner
      width 100%
      height 420px
      vertical-align bottom
    .avertwraper
      position absolute
      color #ffffff
      bottom 40px
      left 43px
      z-index 1
      font-size 35px
      img
        border-radius 50%
        width 139px
        height 139px
        border 1px solid #ffffff
        margin-right 16px
    .shadow
      position absolute
      height 141px
      background rgba(0, 0, 0, 0.5)
      bottom 0
      width 100%
    .center
      position absolute
      width 270px
      height 50px
      background-color #a9365d
      border-radius 25px
      right 13px
      bottom 25px
      color #ffffff
      font-size 30px
  .item-wrapper
    color #ffffff
    font-size 30px
    margin-top 30px
    height 500px
    .border-right
      border-right 2px solid rgba(255, 255, 255, 0.2)
    .border-bottom
      border-bottom 2px solid rgba(255, 255, 255, 0.2)
    .item
      width 48%
      height 100px
      img
        width 57px
        margin-bottom 15px
  .bar
    width 100%
    height 96px
  .btm
    background-color #797062
    position fixed
    bottom 0
    width 100%
    height 96px
    img
      width 152px
</style>
