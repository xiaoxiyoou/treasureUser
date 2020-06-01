<template>
  <div class="container">
    <div class="item">
      <img class="banner" src="./banner1.png" alt="">
      <div class="btm row j-b a-c">
        <div class="left ">
          <div class="title">线上追思</div>
          <div class="des">已有<span style="color:#b2a189">12923</span>人制作</div>
        </div>
        <div class="right row ">
          <div class="pre row a-c j-c" @click="show">预览体验</div>
          <div class="make row a-c j-c" @click="recall">立即制作</div>
        </div>
      </div>
    </div>
    <div class="item">
      <img class="banner" src="./banner2.png" alt="">
      <div class="btm row j-b a-c">
        <div class="left ">
          <div class="title">讣告体验</div>
          <div class="des">已有<span style="color:#b2a189">22923</span>人制作</div>
        </div>
        <div class="right row ">
          <div class="pre row a-c j-c" @click="pre">预览体验</div>
          <div class="make row a-c j-c"  @click="nomake">联系诚商</div>
        </div>
      </div>
    </div>
  </div>

</template>
<script type="text/ecmascript-6">
// import { Toast } from 'vant'
export default {
  data() {
    return {


    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0


  },
  methods: {
    recall() {
      this.$router.push({
        path: '/recall',
         query: {
          sid: this.$route.query.sid,
        }

      })
    },
     show() {
      this.$router.push({
        path: '/show',
        query: {
          carid: 62
        }
      })
    },
    pre(){
      window.location.href = 'http://wx.fuyulove.com/Obituary/index?id=xRJdXN5KgJgmtJCBI97Xig=='
    },
    nomake(){
      // Toast('联络诚商免费制作讣告')
      this.$router.push({
        path: '/mechan',
      
      })
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
  bottom 0
  background-color #f5f5f5
  .item
    margin-bottom 17px
    .banner
      height 420px
    .btm
      padding 0 13px 0 28px
      width 100%
      height 140px
      background-color #ffffff
      .left
        .title
          color #2d2d2d
          font-size 35px
        .des
          color #8a898a
          font-size 27px
          margin-top 10px
      .right
        margin-top 10px
        .pre
          width 198px
          height 59px
          border-radius 5px
          border 1px solid #b2a189
          color #b2a189
        .make
          width 198px
          height 59px
          border-radius 5px
          border 1px solid #b2a189
          color #ffffff
          background-color #b2a189
          margin-left 19px
        .nomake
          width 198px
          height 59px
          border-radius 5px
          border 1px solid #e2dbd2
          color #ffffff
          background-color #e2dbd2
          margin-left 19px
</style>