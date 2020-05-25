<template>
  <div class="container">
    <van-swipe class="banner" :autoplay="3000" indicator-color="#5aa967">
      <van-swipe-item v-for="(image, index) in info.banner" :key="index">
        <img :src="image" v-if="image" />
      </van-swipe-item>
    </van-swipe>
    <div class="itemWrapper row a-c j-b">
      <div class="itemContent  row a-c j-b">
        <div class="row a-c" v-for="(item,idx) in menu" :key="idx">
          <div class="item " :class="idx==index?'hoverItem':''" @click="son(item.act,idx)">{{item.name}}</div>
          <img src="./select.png" alt="" v-if=" idx==1">
        </div>
      </div>
      <!-- <img src="./search.png" alt="" @click="searchBar"> -->
    </div>

    <van-action-sheet :close-on-click-action="true" v-model="dropdown" :actions="catlist" cancel-text="取消" @select="Select" @cancel="Cancel" />
    <!-- <van-action-sheet :close-on-click-action="true" v-model="dropdownRank" :actions="dropdownRankList" cancel-text="取消" @select="onSelect" @cancel="onCancel" /> -->
    <van-list v-model="loading" :finished="finished" :finished-text="finishedtext" @load="onLoad">
      <div class="top row a-c j-b"  v-for="(item,index) in list" :key="index">
        <div class="personDetail row a-c">
          <div class="personCont" @click="mechanDeatil(item.id,item.iscred)">
            <img class="person" :src="item.imgurl" alt="">
            <div class="personTip row a-c j-c" v-if="item.iscred == 1">点击查看</div>
          </div>
          <div class="item col j-b">
            <div class="row">
              <div class="name">{{item.orgname}}</div>
              <img class="sign" v-if="item.iscred == 1" src="./../../assets/img/union.png" alt="">
              <img class="sign" v-else src="./../../assets/img/nomal.png" alt="">
            </div>
            <!-- <div class="startWrapper row  a-c">
              <div class="tip">服务指数</div>
              <van-rate v-model="item.score" allow-half void-icon="star" void-color="#eee" color="#f2af48" size="18" />
              <div class="grade">{{item.score}}分</div>
            </div> -->
            <div class="labelWrapper row">
              <div class="laberItem" v-for="(tag,index) in item.tags.slice(0, 3)" :key="index">{{tag}} </div>
              <!-- <div class="laberItem">好评第一</div> -->
            </div>
            <div class="btm row a-c" v-if="item.iscred == 1">
              <img src="./../../assets/img/dingwei.png" alt="">
              <div class="des row j-c a-c">{{item.address}}</div>
              <!-- <div class="des row j-c a-c" v-else>暂未完善</div> -->
            </div>
          </div>
        </div>
        <div class="phoneWrapper col j-c a-c" v-if="item.iscred == 1">
          <img class="phone" src="./../../assets/img/phoneBig.png" alt="" @click.stop="callPhone(item.mobile)">
          <div>{{item.distance}}</div>
        </div>
      </div>
      <noMessage :noinfoShow="noinfoShow" />
    </van-list>
  </div>

</template>
<script type="text/ecmascript-6">
import { shopList, shopItem } from 'api/index'
import { Toast } from 'vant'
import noMessage from 'components/noMessage/noMessage'
export default {
  data() {
    return {
      finishedtext: '',
      noinfoShow: false,
      info: '',
      catlist: [],
      // menu: [{ name: '全部商家', act: 'nearby' }, { name: '分类', act: 'recom' }, { name: '排序', act: 'praise' }, { name: '筛选城商', act: '' }],
      menu: [{ name: '全部商家', act: 'nearby' }, { name: '分类', act: 'recom' }, { name: '筛选城商', act: '' }],
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
      cred: ""





    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0

    this._shopList()
    this._shopItem()

  },
  methods: {

    _shopList() {
      shopList({
        catid: this.catid,
        // act: act,
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
    // 选择分类
    personDetail(catid) {
      this.loadState()
      this.cred = ""
      this.catid = catid
      this._shopList()
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
    searchBar() {
      this.$router.push({
        path: './mechanSearch'
      })

    },
    // onCancel() {
    // },
    // onSelect(item) {
    //   this.loadState()
    //   console.log(item.act);
    //   this.act = item.act
    //   this.catid = ""
    //   this._shopList()
    // },
    Cancel() {
    },
    Select(item) {
      this.loadState()
      console.log(item.id);
      this.catid = item.id
      this.act = ""
      this._shopList()
    },


  },
  components: {
    noMessage

  }
}
</script>
<style scoped lang="stylus">
>>>.van-list
  background-color #f5f5f5
.container
  position absolute
  background-color #f5f5f5
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
      // width 663px
      width 100%
      padding-left 32px
      height 57px
      // border-right 1px solid #f5f5f5
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
    // right 83px
    left 20%
    z-index 100
    background-color #ffffff
    font-size 28px
    width 247px
    // padding 10px
    .item
      padding 20px
      border-bottom 1px solid #f5f5f5
      width 100%
  .top
    padding 21px 35px 28px 18px
    background-color #ffffff
  .dropdownRank
    position absolute
    // right 83px
    left 40%
    z-index 100
    background-color #ffffff
    font-size 28px
    width 247px
    // padding 10px
    .item
      padding 20px
      border-bottom 1px solid #f5f5f5
      width 100%
  .top
    padding 21px 35px 28px 18px
    background-color #ffffff
    margin-bottom 9px
    .personDetail
      .personCont
        position relative
        width 189px
        height 189px
        .person
          width 189px
          height 189px
        .personTip
          position absolute
          bottom 0
          width 189px
          height 55px
          font-size 27px
          color #ffffff
          background rgba(0, 0, 0, 0.5)
      .item
        margin-left 19px
        min-height 189px
        width 405px
        .row
          .name
            color #111111
            font-size 30px
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
        .btm
          img
            width 24px
            height 28px
          .des
            color #919191
            font-size 27px
            margin-left 10px
            overflow hidden
            display -webkit-box
            -webkit-box-orient vertical
            -webkit-line-clamp 1
            text-overflow ellipsis
    .phoneWrapper
      color #919191
      font-size 27px
      .phone
        width 75px
        height 75px
        margin-bottom 20px
</style>