<template>
  <div class="container">
    <form action="/">
      <van-search v-model="value" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" />
    </form>
    <div class="hot-wrap" v-if="searchRecord">
      <div class="title-wrap row j-b">
        <div class="title">热门搜索</div>
      </div>
      <div class="item-wrap row f-w " v-if="remitem.length">
        <div class="hot-item col j-c a-c" v-for="(item,index) in remitem" :key="index" @click="historyCon(item.keyword)">{{item.keyword}}</div>
      </div>
      <div class="item-wrap row f-w " v-else>
        <div class="hot-item col j-c a-c">暂无~</div>
      </div>
    </div>
    <div class="hot-wrap" v-if="searchRecord">
      <div class="title-wrap row j-b">
        <div class="title">搜索历史</div>
        <img class="delect" src="./delect.png" alt="" @click="_delsearch()">
      </div>
      <div class="item-wrap row f-w "  v-if="history.length">
        <div class="hot-item col j-c a-c" v-for="(item,index) in history.slice(0, 8)" :key="index" @click="historyCon(item.keyword)">{{item.keyword}}</div>
      </div>
      <div class="item-wrap row f-w " v-else>
        <div class="hot-item col j-c a-c">暂无~</div>
      </div>
    </div>
    <div class="conwrapper " v-if="!searchRecord">
      <noMessage :noinfoShow="noinfoShow" />
      <div class="itemWrapper  row van-hairline--bottom" v-for="(item,index) in searchList" :key="index"  @click="show(item.id)">
        <div class="previewCon  row a-c">
          <div class="preview">预览</div>
          <div class="previewTip"></div>
        </div>
        <div class="titleImgCon">
          <img class="titleImg" :src="item.imgurl" alt="" v-if="item.imgurl">
          <img class="titleImg" src="./noInfo.png" alt="" v-else>
        </div>
        <div class="itemCont col j-a">
          <div class="row">
            <div class="item  col j-b">
              <div class="name">{{item.name}}</div>
              <div class="age">创建日期{{item.createdate}}</div>
            </div>
          </div>

        </div>
      </div>
      <!-- <div class="barBtm col a-c j-c"></div> -->
    </div>
  </div>

</template>
<script type="text/ecmascript-6">
import { search, getsearch, delsearch } from 'api/index'
// import { Toast } from 'vant';
import noMessage from 'components/noMessage/noMessage'
export default {
  data() {
    return {
      noinfoShow: false,
      searchRecord: true,
      value: '',
      searchList: [],
      history: [],
      remitem: []
    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this._getsearch()


  },
  methods: {
    _delsearch() {
      delsearch({
      }).then(res => {
        console.log('清空', res)
        this._getsearch()

      })
    },
    // 预览
    show(carid) {
      this.$router.push({
        path: '/show',
        query: {
          carid: carid
        }
      })
    },
    // 点击搜索记录
    historyCon(keyword) {
      this._search(keyword)
      this.value = keyword
    },
    _getsearch() {
      getsearch({
      }).then(res => {
        console.log('搜索历史', res)
        this.history = res.data.history
        this.remitem = res.data.remitem

      })
    },
    // 点击搜索
    _search(key) {
      search({
        key: key
      }).then(res => {
        console.log('搜索', res)
        console.log('搜索', key)
        this.searchRecord = false
        if (res.data.list.length) {
          this.searchList = res.data.list
          this.noinfoShow = false
        } else {
          this.noinfoShow = true
          this.searchList = []


        }


      })
    },
    onSearch(val) {
      this._search(val)
    },
    onCancel() {
      this.searchRecord = true
      this._getsearch()
    },

  },
  components: {
    noMessage
  }
}
</script>
<style scoped lang="stylus">
>>>.van-search__content
  border-radius 30px
.container
  position absolute
  top 0px
  width 100%
  height 100%
  bottom 0
  .hot-wrap
    padding 0 30px
    margin-bottom 40px
    margin-top 10px
    .title-wrap
      .title
        color #757575
        font-size 25px
        font-weight 700
      .delect
        width 22px
        margin-right 10px
        height 22px
    .item-wrap
      .hot-item
        height 49px
        padding 0 20px
        border-radius 21px
        border 1px solid #cccccc
        color #333333
        font-size 28px
        background #fafafa
        margin-top 16px
        margin-right 22px
</style>
<style scoped>
.conwrapper {
  background-color: #ffffff;
  height: 100%;
  width: 100%;
  position: absolute;
}
.itemWrapper {
  width: 100%;
  padding: 25px 0;
  background-color: #ffffff;
  position: relative;
  /* margin-bottom: 20px; */
}

.previewCon {
  position: absolute;
  right: 24px;
  top: 15px;
  color: #5aa967;
  font-size: 28px;
}
.previewTip {
  width: 16px;
  height: 16px;
  border-top: 2px solid #5aa967;
  border-right: 2px solid #5aa967;
  transform: rotate(45deg);
}

.barBtm {
  width: 100%;
  height: 126px;
  background-color: #ffffff;
}
.bar {
  height: 18px;
  position: fixed;
  bottom: 0;
  width: 750px;
  background-color: #ffffff;
}
.titleImgCon {
  position: relative;
  padding-left: 30px;
}
.titleImg {
  width: 162px;
  height: 190px;
}
.titleText {
  position: absolute;
  bottom: 0;
  width: 162px;
  height: 41px;
  background-color: rgba(0, 0, 0, 0.6);
  font-size: 32px;
  color: #ffffff;
}
.itemCont {
  height: 190px;
}
.item {
  padding-left: 25px;
  position: relative;
  height: 190px;
  letter-spacing: 0;
}
.item > .name {
  font-size: 30px;
  color: #0f0f0f;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
}
.item > .text {
  font-size: 25px;
  color: #909090;
  white-space: nowrap;
  margin-bottom: 10px;
}
.item > .age {
  font-size: 28px;
  color: #909090;
}
.flowerCon {
  color: #5aa967;
  font-size: 28px;
  padding-left: 25px;
}
.flower {
  width: 24px;
  height: 28px;
  margin-right: 10px;
}
.msg {
  height: 21px;
  margin-left: 45px;
  margin-right: 10px;
}
.diary {
  width: 198px;
  height: 50px;
  border-radius: 5px;
  background-color: #5aa967;
  color: #ffffff;
  font-size: 28px;
  margin-left: 25px;
}
.setting {
  width: 198px;
  height: 50px;
  border-radius: 5px;
  background-color: #5aa967;
  color: #ffffff;
  font-size: 28px;
  margin-left: 42px;
}
.btmCon {
  width: 100%;
  background-color: #ffffff;
  z-index: 1;
  position: fixed;
  bottom: 18px;
}
.btm {
  width: 690px;
  height: 94px;
  color: #ffffff;
  background-color: #5aa967;
  border-radius: 10px;
  font-size: 35px;
}
</style>