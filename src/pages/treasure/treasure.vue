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
      <div class="grid-item col a-c j-b" @click="box(2)">
        <img class="grid-item-icon" src="./luck.png" alt="">
        <div class="grid-item-text">趋吉避凶</div>
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
      <div class="content row a-c f-w j-b">
        <div class="content-item col a-c j-c " v-for="(item,index) in list" :key="index" @click="Detail(item.id,item.cat_id)">
          <img class="content-item-img" :src="item.imgurl" alt="">
          <div class="content-item-text">{{item.title}}</div>
          <div class="content-item-des" v-if="item.describe">{{item.describe}}</div>
          <div class="content-item-des" v-else>{{item.title}}</div>
        </div>
        <noMessage :noinfoShow="noinfoShow" />
      </div>
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
      catid: 1


    }
  },
  // created() {
  //   Toast.loading({
  //     forbidClick: true,
  //     duration: 0, // 持续展示 toast
  //   })
  // },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this._goodsList(this.catid)


  },
  methods: {
    onLoad() {
      setTimeout(() => {
        // 加载状态结束
        this._goodsList(this.catid)
        this.loading = false;
        if (this.list.length >= this.count) {
          this.finished = true;
        }

      }, 1000);

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

    _goodsList(catid) {
      goodsList({
        page: this.page,
        size: this.size,
        catid: catid,
      }).then(res => {
        console.log('分类产品列表', res)
        this.list = res.data.list
        this.count = res.data.count

        Toast.clear();
        if (this.count == 0) {
          this.noinfoShow = true
          this.finishedtext = ''
        } else {
          this.noinfoShow = false
          this.finishedtext = '没有更多数据了'
        }

      })
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
  .content
    padding 0 50px
    .content-item:nth-of-type(odd)
      border-right 1px solid #f5f5f5
    .content-item
      width 323px
      border-top 1px solid #f5f5f5
      padding 20px 5px
      .content-item-img
        width 163px
        height 163px
      .content-item-text
        color #464646
        font-size 28px
        margin-top 8px
        overflow hidden
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 1
        text-overflow ellipsis
      .content-item-des
        color #bdbcbc
        font-size 26px
        overflow hidden
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 1
        text-overflow ellipsis
        margin-top 8px
</style>