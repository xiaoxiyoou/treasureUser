<template>
  <div class="container">
    <div class="top row j-b">
      <div class="left row a-c">
        <img class="avart" :src="userinfo.headimgurl" alt="" />
        <div>
          <div class="name">{{userinfo.nickname}}</div>
          <div class="row a-c" @click="myEdit">
            <div class="edit" style="">编辑</div>
            <van-icon name="arrow" color="#969799" />
          </div>
        </div>
      </div>
      <!-- <div class="right col j-b">
        <div class="saoCon">
          <img class="sao" src="./sao.png" alt="" />
        </div>
        <div class="intro" @click="guestLogin" v-if="isfyl">执宾入口</div>
      </div> -->
    </div>
    <div class="navbar row j-a">
      <div class="item col a-c j-c" @click="myCollection">
        <div>
          <img class="" src="./collction.png" alt="" />
        </div>
        <div class="text">我的收藏</div>
      </div>
      <div class="item col a-c j-c" @click="myBrowsing">
        <div>
          <img class="" src="./eye.png" alt="" />
        </div>
        <div class="text">最近浏览</div>
      </div>
      <!-- <div class="item col a-c j-c" @click="myEvaluate">
        <div>
          <img class="" src="./comment.png" alt="" />
        </div>
        <div class="text">评价记录</div>
      </div> -->
      <div class="item col a-c j-c" @click="myMessage">
        <div>
          <img class="" src="./msg.png" alt="" />
        </div>
        <div class="text">留言管理</div>
      </div>
      <div class="item col a-c j-c" @click="deathManage">
        <img class="" src="./remind.png" alt="" />
        <div class="text">忌日管理</div>
      </div>
    </div>
    <div class="title">纪念堂管理</div>
    <van-cell title="创建追思纪念堂" is-link to="create" />
    <van-cell title="我的追思纪念堂" is-link to="myRecall" />
    <div v-if="isfyl">
      <div class="title">讣告管理</div>
      <van-cell title="我发布的讣告" is-link url="http://wx.fuyulove.com/mySelf/myObit" />
      <van-cell title="我转发的讣告" is-link url="http://wx.fuyulove.com/mySelf/myObit/?index=1" />
    </div>
    <div v-if="isfyl">
      <div class="title">账户管理</div>
      <van-cell title="助孝基金" is-link url="http://wx.fuyulove.com/mySelf/myFinalist" />
      <van-cell class="van-hairline--bottom" title="爱心积分" is-link url="http://wx.fuyulove.com/mySelf/myFinalist?act=1" />
    </div>
    <div class="bar"></div>
    <!-- <van-cell value="编辑修改" is-link to="personModify" v-if="emcee">
      <template #title>
        <span class="custom-title">执殡信息</span>
      </template>
    </van-cell>
    <van-cell value="编辑修改" is-link to="mechanModify" v-if="company">
      <template #title>
        <span class="custom-title">机构信息</span>
      </template>
    </van-cell> -->

  </div>
</template>
<script type="text/ecmascript-6">
import { personCenterlimit, getuserinfo,selfDetail } from 'api/index'
export default {
  data() {
    return {

      userinfo: '',
      isfyl: 0,
      emcee: 0,
      company: 0




    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
     this._selfDetail()
    this._personCenterlimit()

  },
  methods: {
    _getuserinfo() {
      getuserinfo({
        action: 'getuserinfo',
        shopid: 10
      }).then(res => {
        console.log('用户信息', res)
        this.userinfo = res.data.userinfo
      })

    },
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
    _personCenterlimit() {
      personCenterlimit({
      }).then(res => {
        console.log('个人中心功能', res)
        this.company = res.data.company
        this.emcee = res.data.emcee
        this.isfyl = res.data.info.isfyl
        if (this.isfyl == 0) {
          this.isfyl = 0
        }
      })

    },
    guestLogin() {
      this.$router.push({ path: '/guestLogin' })
    },
    myEdit() {
      this.$router.push({ path: '/myEdit' })
    },
    myEvaluate() {
      this.$router.push({ path: '/myEvaluate' })
    },
    myCollection() {
      this.$router.push({ path: '/myCollection' })
    },
    myBrowsing() {
      this.$router.push({ path: '/myBrowsing' })
    },
    myMessage() {
      this.$router.push({ path: '/myMessage' })
    },
    deathManage() {
      this.$router.push({ path: '/deathManage' })
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
  bottom 0
  background-color #f5f5f5
  .top
    height 167px
    background-color #ffffff
    padding 20px 0 40px 38px
    .left
      .avart
        width 102px
        height 102px
        margin-right 20px
        border-radius 50%
      .name
        font-size 31px
        margin-bottom 10px
      .row
        .edit
          font-size 27px
          margin-bottom 3px
          color #969799
    .right
      .saoCon
        width 132px
        text-align right
        .sao
          width 37px
          height 37px
          margin-right 24px
      .intro
        line-height 45px
        width 132px
        height 45px
        border-bottom-left-radius 23px
        border-top-left-radius 23px
        background-color #5aa967
        color #ffffff
        font-size 28px
        text-align right
  .navbar
    font-size 23px
    color #6f6f6f
    background-color #ffffff
    border-radius 20px
    width 100%
    height 181px
    margin-top 15px
    .item
      img
        width 64px
        height 64px
        margin-bottom 20px
  .title
    margin 32px
    font-size 31px
    color #6f6f6f
  .bar
    background-color #f5f5f5
    height 18px
    width 100%
</style>
