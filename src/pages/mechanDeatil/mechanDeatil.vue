<template>
  <div class="container">
    <img class="banner" :src="info.imgurl">
    <!-- <van-swipe class="banner" :autoplay="3000" indicator-color="#5aa967" v-if="info.imgurl">
      <div v-for="(image, index) in info.imgurl" :key="index">
        <van-swipe-item v-if="image">
          <img :src="image" />
        </van-swipe-item>
      </div>
    </van-swipe> -->
    <!-- <img class="banner" src="./../../assets/img/nopic.jpg" v-if="!banner[0]" /> -->
    <div class="titleWrapper col">
      <div class="row j-b a-c" style="width:100%">
        <div>
          <div class="name">{{info.orgname}}</div>
          <div class="startWrapper row  a-c">
            <div class="tip">服务指数</div>
            <van-rate v-model="star" allow-half void-icon="star" void-color="#eee" color="#f2af48" size="15" />
            <div class="grade">{{star}}分</div>
          </div>
        </div>
        <img class="phone" style="width:30px;height:30px" src="./../../assets/img/phoneBig.png" alt="" @click.stop="callPhone">
      </div>
      <div class="btmWrapper row a-c j-b">
        <div class="address row a-c">
          <img src="../../assets/img/dingwei.png" alt="">
          <div class="des row j-c a-c" @click="address()">{{info.address}}</div>
        </div>
        <!-- <div class="distance">{{info.distance}}</div> -->
      </div>
    </div>
    <div class="bar"></div>
    <div class="detail">
      <div class="item row">
        <div class="title">联系人</div>
        <div class="des">{{info.owner? info.owner:'暂无数据'}}</div>
      </div>
      <div class="item row">
        <div class="title">加入时间</div>
        <div class="des">{{info.createdate | moment}}</div>
      </div>
      <div class="item row" @click.stop="callPhone">
        <div class="title">联系电话</div>
        <div class="des">{{info.mobile? info.mobile:'暂无数据'}}</div>
      </div>
    </div>
    <div class="detail">
      <div class="item row">
        <div class="title">经营内容</div>
        <div class="des">{{info.intro? info.intro:'暂无数据'}}</div>
      </div>
    </div>

  </div>

</template>
<script type="text/ecmascript-6">
import { shopDetail } from 'api/index'
var wx = require('weixin-js-sdk')
export default {
  data() {
    return {
      star: 0.1,
      score: '',
      info: [],
      banner: []




    }
  },
  mounted() {
    this._shopDetail()



  },
  methods: {
    // 地址
    address() {
      wx.openLocation({
        latitude: this.info.lat, // 纬度，浮点数，范围为90 ~ -90
        longitude: this.info.lon, // 经度，浮点数，范围为180 ~ -180。
        name: '机构位置', // 位置名
        address: this.info.address, // 地址详情说明
        scale: 15, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
      });
    },
    // 详情
    _shopDetail() {
      shopDetail({
        id: this.$route.query.id,
        lat: sessionStorage.getItem('latitude'),
        lon: sessionStorage.getItem('longitude'),
      }).then(res => {
        console.log('商家详情', res)
        this.info = res.data.info
        this.banner = this.info.banner
        this.score = this.info.score
        this.star = parseFloat(this.info.score)

      })
    },
    // 拨打电话
    callPhone() {
      window.location.href = 'tel:' + this.info.mobile
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
  .banner
    width 100%
    height 417px
    img
      width 100%
      height 417px
  .titleWrapper
    background-color #ffffff
    padding 16px 32px 0px
    .name
      color #111111
      font-size 31px
    .startWrapper
      margin 10px 0
      font-size 27px
      .tip
        color #919191
        margin-right 5px
      img
        width 29px
        height 27px
        margin-left 5px
      .grade
        color #a8375d
        margin-left 5px
    .btmWrapper
      height 72px
      border-top 1px solid #f5f5f5
      color #919191
      font-size 27px
      padding 20px 0
      height 100%
      .address
        color #919191
        img
          width 24px
          height 28px
        .des
          margin-left 15px
          margin-right 40px
      .phoneWrapper
        color #919191
        .phone
          width 40px
          height 40px
          margin-right 18px
      .distance
        white-space nowrap
  .bar
    width 100%
    height 11px
    background-color #f5f5f5
  .detail
    padding 25px
    background-color #ffffff
    margin-top 1px
    border-top 1px solid #f5f5f5
    .item
      font-size 30px
      margin-bottom 25px
      .title
        color #919191
        white-space nowrap
        width 130px
      .des
        color #252525
        margin-left 42px
  .btm
    color #5aa967
    font-size 31px
    height 99px
    background-color #ffffff
    margin 17px auto
    img
      width 31px
      margin-right 15px
      margin-top 5px
</style>