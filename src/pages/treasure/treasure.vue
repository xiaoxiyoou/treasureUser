<template>
  <div class="container">
    <img class="title" src="./title.png" alt="">
    <div class="top col a-c" @click="scanQRCode">
      <img class="qrcode" src="./qrcode.png" alt="">
      <div class="tip">不知道选哪个？点我扫码</div>
    </div>
    <div class="grid van-hairline--top-bottom row a-c j-a">
      <div class="grid-item col a-c j-b" @click="box(1)">
        <img class="grid-item-icon" src="./box.png" alt="">
        <div class="grid-item-text">家族宝盒</div>
      </div>
      <div class="grid-item col a-c j-b" @click="box(3)">
        <img class="grid-item-icon" src="./funeral.png" alt="">
        <div class="grid-item-text">殡仪用品</div>
      </div>
      <div class="grid-item col a-c j-b" @click="box(4)">
        <img class="grid-item-icon" src="./candle.png" alt="">
        <div class="grid-item-text">安葬用品</div>
      </div>
      <div class="grid-item col a-c j-b" @click="box(6)">
        <img class="grid-item-icon" src="./love.png" alt="">
        <div class="grid-item-text">孝道用品</div>
      </div>
    </div>

    <van-list v-model="loading" :finished="finished" :finished-text="finishedtext" @load="onLoad">
      <div class="proWrapper row f-w j-b">
        <div class="item" v-for="(item,index) in list" :key="index" @click="Detail(item.id,item.cat_id)">
          <img class="proImg" v-if="item.imgurl" :src="item.imgurl" alt="">
          <img class="proImg" v-else src="./../../assets/img/noMsg.png" alt="">
          <div class="title">{{item.title}}</div>
          <div class="des" v-if="item.describe">{{item.describe}}</div>
          <div class="des" v-else>{{item.title}}</div>
          <div class="value"><span class="price">￥</span>{{item.price}}</div>
        </div>
      </div>
      <noMessage :noinfoShow="noinfoShow" />
    </van-list>
  </div>

</template>
<script type="text/ecmascript-6">
import noMessage from 'components/noMessage/noMessage'
import { goodsList } from 'api/index'
var wx = require('weixin-js-sdk')
import { Toast } from 'vant';
export default {
  data() {
    return {
      list: [],
      noinfoShow: false,
      finishedtext: '',
      loading: false,
      finished: false,
      page: 1,
      size: 10,
      count: '',
      catid: 1,
      listStatus: true,
      onLoadtatus: false

    }
  },
  created() {
    this._goodsList1(1)
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0



  },
  methods: {

    onLoad() {
      if (this.onLoadtatus) {
        setTimeout(() => {
          // 加载状态结束
          this._goodsList(this.catid)
          this.loading = false;
          console.log(this.list.length)
          if (this.list.length >= this.count) {
            this.finished = true;
          }
        }, 1000);

      }
    },
    // 清除下拉加载状态
    loadState() {
      this.list = []
      this.page = 1
      this.finished = false
      this.loading = false

    },
    Detail(id, catId) {
      this.$router.push({
        path: './detail',
        query: { id: id }
      })
      localStorage.setItem("catId", catId)
    },



    _goodsList1(catid) {
      goodsList({
        page: 1,
        size: 100,
        catid: catid,
      }).then(res => {
        console.log('分类产品列表', res)
        this.list = this.list.concat(res.data.list)
        this._goodsList3()

      })
    },
    _goodsList3() {
      goodsList({
        page: 1,
        size: 100,
        catid: 3,
      }).then(res => {
        console.log('分类产品列表', res)
        this.list = this.list.concat(res.data.list)

        this._goodsList4()

      })
    },
    _goodsList4() {
      goodsList({
        page: 1,
        size: 100,
        catid: 4,
      }).then(res => {
        console.log('分类产品列表', res)
        this.list = this.list.concat(res.data.list)

        this._goodsList6()

      })
    },
    _goodsList6() {
      goodsList({
        page: 1,
        size: 100,
        catid: 6,
      }).then(res => {
        console.log('分类产品列表', res)
        this.list = this.list.concat(res.data.list)
        this.finishedtext = '没有更多数据了'
        this.finished = true;
        Toast.clear();

      })
    },
    _goodsList(catid) {
      this.onLoadtatus = true
      if (this.listStatus) {
        this.listStatus = false

        goodsList({
          page: this.page,
          size: this.size,
          catid: catid,
        }).then(res => {
          console.log('分类产品列表', res)
          this.list = this.list.concat(res.data.list)
          this.count = res.data.count
          this.page = res.data.page
          this.listStatus = true
          Toast.clear();
          if (this.count == 0) {
            this.noinfoShow = true
            this.finishedtext = ''
          } else {
            this.noinfoShow = false
            this.finishedtext = '没有更多数据了'
          }

        })
      }
    },
    box(flag) {
      this.loadState()
      Toast.loading({
        forbidClick: true,
        duration: 0, // 持续展示 toast
      })
      this.catid = flag
      this._goodsList(this.catid)
    },
    // 扫一扫
    scanQRCode() {
      wx.scanQRCode({
        needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
          var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          console.log(result)
        }
      });
    }


  },
  components: {
    noMessage
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
  .title
    width 100%
  .top
    width 100%
    margin-top 103px
    .qrcode
      width 101px
      height 101px
    .tip
      color #b8275d
      font-size 27px
      margin-top 26px
  .grid
    height 178px
    margin-top 100px
    .grid-item
      padding 30px 0 40px
      height 100%
      width 20%
      .grid-item-icon
        width 64px
        height 64px
      .grid-item-text
        color #b8275d
        font-size 25px
  .proWrapper
    width 750px
    padding 0 32px
    padding-top 20px
    margin-top 20px
    .noInfo
      width 100%
      height 446px
      margin 60px auto
    .item
      overflow hidden
      box-shadow 0px 0px 10px rgba(0, 0, 0, 0.2)
      height 100%
      margin-bottom 23px
      width 336px
      border-radius 10px
      background-color #ffffff
      .proImg
        width 341px
        height 341px
        border-top-left-radius 10px
        border-top-right-radius 10px
      .title
        color #111111
        font-size 25px
        padding-left 16px
        margin-bottom 15px
        margin-top 15px
        overflow hidden
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 1
        text-overflow ellipsis
      .des
        color #919191
        font-size 22px
        padding-left 16px
        margin-bottom 15px
        overflow hidden
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 1
        text-overflow ellipsis
      .value
        color #b93662
        font-size 33px
        padding-left 16px
        padding-bottom 15px
        .price
          font-size 20px
</style>