<template>
  <div class="container">
    <van-swipe class="banner" :autoplay="3000" indicator-color="#a29076">
      <van-swipe-item v-for="(image, index) in info.banner" :key="index">
        <img :src="image" v-if="image" />
      </van-swipe-item>
    </van-swipe>
    <!-- 筛选下拉 -->
    <!-- <div class="itemWrapper row a-c j-b">
      <div class="itemContent  row a-c j-b">
        <div class="row a-c" v-for="(item,idx) in menu" :key="idx">
          <div class="item " :class="idx==index?'hoverItem':''" @click="son(item.act,idx)">{{item.name}}</div>
          <img src="./select.png" alt="" v-if=" idx==1">
        </div>
      </div>
    </div>
    <van-action-sheet :close-on-click-action="true" v-model="dropdown" :actions="catlist" cancel-text="取消" @select="Select" @cancel="Cancel" /> -->
    <van-list v-model="loading" :finished="finished" :finished-text="finishedtext" @load="onLoad">
      <div class="top row a-c j-b" v-for="(item,index) in list" :key="index">
        <div class="personDetail row a-c" @click="mechanDeatil(item.id,item.iscred)">
          <div class="item col j-b">
            <div class="row">
              <div class="name">{{item.orgname}}</div>
              <!-- <img class="sign" v-if="item.iscred == 1" src="./../../assets/img/union.png" alt="">
              <img class="sign" v-else src="./../../assets/img/nomal.png" alt=""> -->
            </div>
            <!--           
            <div class="labelWrapper row">
              <div class="laberItem" v-for="(tag,index) in item.tags.slice(0, 3)" :key="index">{{tag}} </div>
            </div> -->
            <div class="des row ">{{item.address}}</div>
            <div class="city">{{item.chengshi}}</div>
            <div class="row j-b a-c">
              <div class="mobile" @click.stop="callPhone(item.mobile)">{{item.mobile}}</div>
              <!-- <div class="row a-c" @click.stop="address(item.lat,item.lon,item.orgname,item.address)">
                <img class="address" src="./address.png" alt="">
                <div class="distance">{{item.distance}}</div>
              </div> -->
            </div>
          </div>
        </div>

      </div>
      <noMessage :noinfoShow="noinfoShow" />
    </van-list>
  </div>

</template>
<script type="text/ecmascript-6">
import { shopList, shopItem } from 'api/index'
var wx = require('weixin-js-sdk')
import { Toast } from 'vant'
import noMessage from 'components/noMessage/noMessage'
import { share } from 'assets/js/shareDetail.js'
export default {
  data() {
    return {
      finishedtext: '',
      noinfoShow: false,
      info: '',
      catlist: [],
      menu: [{ name: '全部商家', act: 'nearby' }, { name: '分类', act: 'recom' }, { name: '筛选诚商', act: '' }],
      dropdownRankList: [{ name: '评价最高', act: 'praise' }, { name: '离我最近', act: 'nearby' }],
      index: 0,
      dropdown: false,
      list: [],
      act: '',
      loading: false,
      finished: false,
      page: 1,
      size: 10,
      count: '',
      catid: '',
      dropdownRank: false,
      cred: 1





    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    share('点击查看当地联盟商家', 'http://wx.app.jzb768.com/#/mechan', '家族宝联盟商家', 'http://wx.app.jzb768.com/picture/shareUser.jpg')
    this._shopList()
    this._shopItem()

  },
  methods: {

    // 地址
    address(latitude, longitude, name, address) {
      wx.openLocation({
        latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
        longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
        name: name, // 位置名
        address: address, // 地址详情说明
        scale: 15, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
      });
    },
    // 分类列表
    _shopList() {

      shopList({
        catid: this.catid,
        lat: sessionStorage.getItem('latitude'),
        lon: sessionStorage.getItem('longitude'),
        page: this.page,
        size: this.size,
        cred: this.cred
      }
      ).then(res => {
        console.log('商家', res)
        this.list = this.list.concat(res.data.list)
        this.count = res.data.count
        this.page = res.data.page
        if (this.count == 0) {
          this.noinfoShow = true
          this.finishedtext = ''
        } else {
          this.noinfoShow = false
          this.finishedtext = '没有更多数据了'
        }

      })
    },
    // 分类数据
    _shopItem() {
      shopItem().then(res => {
        console.log('分类', res)
        this.catlist = res.data.catlist
        this.info = res.data.info

      })
    },

    onLoad() {
      setTimeout(() => {
        // 加载状态结束
        this._shopList()
        this.loading = false;
        if (this.list.length >= this.count) {
          this.finished = true;
        }

      }, 1000);

    },
    // 拨打电话

    callPhone(telephone) {
      console.log(telephone)
      window.location.href = 'tel:' + telephone
    },
    // 详情
    mechanDeatil(id, iscred) {
      if (iscred == 1) {
        this.$router.push({
          path: './mechanDeatil',
          query: {
            id: id,
          }
        })
      } else {
        Toast('暂时无法查看商家详细信息')


      }

    },
    // 清除下拉加载状态
    loadState() {
      this.list = []
      this.page = 1
      this.finished = false
      this.loading = false

    },

    // 切换导航
    son(act, idx) {
      this.index = idx;
      this.act = act
      // 分类
      if (idx == 1) {
        this.dropdown = true
        // 全部
      } else if (idx == 0) {
        this.loadState()
        this.catid = ""
        this.cred = ""
        this._shopList()
        // 城商
      } if (idx == 2) {
        this.loadState()
        this.cred = 1
        this.catid = ""
        this._shopList()
      }

    },
    // 选择分类
    Select(item) {
      this.loadState()
      console.log(item.id);
      this.catid = item.id
      this.act = ""
      this._shopList()
    },
    Cancel() {
    },




  },
  components: {
    noMessage

  }
}
</script>
<style scoped lang="stylus">
>>>.van-list
  margin-top 10px
.container
  position absolute
  top 0px
  width 100%
  height 100%
  bottom 0
  .banner
    width 100%
    height 420px
    img
      width 100%
      height 420px
  .itemWrapper
    height 90px
    background-color #ffffff
    border-bottom 1px solid #f5f5f5
    padding-right 29px
    font-size 28px
    .itemContent
      width 100%
      padding-left 32px
      height 57px
      padding-right 10px
      .hoverItem
        color #a8375d
        font-size 32px
        border-bottom 3px solid #a8375d
        padding-bottom 2px
      img
        width 22px
        height 11px
        position relative
        left 20px
    img
      width 29px
      height 29px
  .dropdown
    position absolute
    left 20%
    z-index 100
    background-color #ffffff
    font-size 28px
    width 247px
    .item
      padding 20px
      border-bottom 1px solid #f5f5f5
      width 100%
  .top
    padding 21px 35px 28px 18px
    background-color #ffffff
  .dropdownRank
    position absolute
    left 40%
    z-index 100
    background-color #ffffff
    font-size 28px
    width 247px
    .item
      padding 20px
      border-bottom 1px solid #f5f5f5
      width 100%
  .top
    padding 29px 35px 38px 32px
    background-color #ffffff
    border 2px solid #000000
    margin 14px 24px
    width 703px
    .personDetail
      .personCont
        position relative
        height 205px
      .item
        width 600px
        margin-left 19px
        min-height 189px
        .row
          .name
            color #969696
            font-size 28px
            overflow hidden
            display -webkit-box
            -webkit-box-orient vertical
            -webkit-line-clamp 1
            text-overflow ellipsis
          .sign
            width 98px
            height 35px
            margin-left 5px
        .startWrapper, .tip
          color #919191
          font-size 27px
          margin-right 5px
        .grade
          color #252525
          margin-left 2px
        .labelWrapper
          .laberItem
            color #919191
            font-size 27px
            border 1px solid #d3d3d3
            padding 3px 8px
            margin-right 21px
        .des
          color #000000
          font-size 24px
          overflow hidden
          display -webkit-box
          -webkit-box-orient vertical
          -webkit-line-clamp 1
          text-overflow ellipsis
        .city
          color #919191
          font-size 26px
        .row
          .mobile
            color #000000
            font-size 26px
          .row
            .address
              width 24px
              height 28px
              margin-right 10px
            .distance
              color #919191
              font-size 27px
    .phoneWrapper
      color #919191
      font-size 27px
      .phone
        width 75px
        height 75px
        margin-bottom 20px
</style>