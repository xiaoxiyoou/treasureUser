<template>
  <div class="container col j-b">
    <div class="bannerWrapper" @click="personalCenter">
      <img class="banner" src="./banner.png" alt="">
      <div class="avertwraper row a-c ">
        <img :src="userinfo.headimgurl" alt="">
        <div>{{userinfo.nickname}}</div>
      </div>
      <div class="shadow"></div>
      <div class="center  row a-c j-c" @click="personalCenter">点击进入个人中心</div>
    </div>
    <div class="itemWrapper row f-w j-b a-c">
      <div class="item col j-c a-c border-right " @click="info()">
        <img src="./icon1.png" alt="" />
        <div class="text-wrap">
          <div class="text1">安葬策划</div>
          <div class="text2">BURIAL PLOT</div>
        </div>
      </div>
      <div class="item col j-c a-c  " @click="person()">
        <img src="./icon2.png" alt="" />
        <div class="text-wrap">
          <div class="text1">殡仪策划</div>
          <div class="text2">FUNERAL PLANNING</div>
        </div>
      </div>
      <div class="item col j-c a-c border-right" @click="mechan()">
        <img src="./icon3.png" alt="" />
        <div class="text-wrap">
          <div class="text1">临终关怀</div>
          <div class="text2">HOSPICE CARE</div>
        </div>
      </div>
      <div class="item col j-c a-c " @click="comment()">
        <img src="./icon4.png" alt="" />
        <div class="text-wrap">
          <div class="text1">线上追思</div>
          <div class="text2">ONLINE MEMORIAL</div>
        </div>
      </div>

    </div>
    <div class="bar"></div>
    <div class="btm  col j-c a-c">
      <img src="./../../assets/img/btm.png" alt="">
    </div>

  </div>
</template>
<script type="text/ecmascript-6">
import { selfDetail } from 'api/index'
export default {
  data() {
    return {
      userinfo: ''


    }
  },
  mounted() {
    this._selfDetail()
    document.body.scrollTop = document.documentElement.scrollTop = 0
    console.log('sid', this.$route.query.sid)
    sessionStorage.setItem('sid', this.$route.query.sid)

  },
  methods: {
    _selfDetail() {
      selfDetail().then(res => {
        console.log('信息', res)
        if (res.code == 0) {
          this.userinfo = res.data.info
        } else {
          this.$router.push({
            path: '/login',
          })
        }

      })

    },

    person() {
      this.$router.push({ path: '/funeralPlanning' })
    },
    mechan() {
      this.$router.push({ path: '/deathbed' })
    },
    comment() {
      this.$router.push({
        path: '/memorial',
        query: {
          sid: this.$route.query.sid,
        }

      })
    },
    info() {
      this.$router.push({ path: '/burialPlanning' })
    },
    personalCenter() {
      this.$router.push({ path: '/personalCenter' })
    },
    shopAdmin() {
      window.location.href = "http://wx.fuyulove.com/mySelf/index"
      
    }


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
  .bannerWrapper
    position relative
    .banner
      width 100%
      height 549px
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
      background-color #a29076
      border-radius 25px
      right 13px
      bottom 25px
      color #ffffff
      font-size 26px
  .itemWrapper
    color #ffffff
    padding 30px 35px
    font-size 30px
    height auto
    overflow scroll
    position absolute
    width 100%
    bottom 96px
    top 549px
    .border-right
      border-right 2px solid rgba(255, 255, 255, 0.2)
    .border-bottom
      border-bottom 2px solid rgba(255, 255, 255, 0.2)
    .item
      position relative
      width 48%
      height 45%
      border-radius 10px
      background-color #a29076
      .text-wrap
        position absolute
        top 20px
        left 20px
        .text1
          font-size 30px
        .text2
          font-size 13px
      img
        width 115px
        position absolute
        bottom 0
        right 0
  .bar
    width 100%
    height 96px
  .btm
    background-color #a29076
    position fixed
    bottom 0
    width 100%
    height 96px
    img
      width 152px
</style>