<template>
  <div class="container">
    <noMessage :noinfoShow="noinfoShow" />
    <div class="conmmetWrapper" v-for="(item, index) in shareList" :key="index">
      <div class="item row">
        <img class="avatar" :src="item.headimgurl" alt="">
        <div class="content">
          <div class="person row j-b">
            <div class="name">{{item.nickname}}</div>
          </div>
          <div class="date">{{item.createdate}}</div>
          <div class="des2" v-html="item.life">追思内容：</div>
          <div class="des">{{item.life}}</div>
          <div class="tip van-hairline--top" v-if="item.fallname">追思人 <span>{{item.fallname}}</span></div>
          <div class="tip van-hairline--top" v-else>追思人 <span>{{item.nickname}}</span></div>
          <div class="des" v-if="item.imglist">美好回忆：</div>
          <div class="imgWrapper row f-w" v-if="item.imglist">
            <img class="comImg" :src="img" alt="" v-for="(img, index) in item.imglist.split('|')" :key="index">
          </div>
        </div>
      </div>
      <div class="btm row j-b">
        <div class="reject row j-c a-c" v-if="item.status == 0" @click="_doshare(item.id,2)">拒绝</div>
        <div class="receive row j-c a-c" v-if="item.status == 0" @click="_doshare(item.id,1)">同意共享</div>
        <div class="alreceive" v-if="item.status == 1">已同意</div>
        <div class="alreject" v-if="item.status == 2">已拒绝</div>
      </div>
    </div>
  </div>

</template>
<script type="text/ecmascript-6">
import { sharelist, doshare } from 'api/index'
import noMessage from 'components/noMessage/noMessage'
import { Toast } from 'vant'
export default {
  data() {
    return {
      shareList: [],
      noinfoShow: false,



    }
  },
  mounted() {
    this._sharelist()
    document.body.scrollTop = document.documentElement.scrollTop = 0


  },
  methods: {
    // 
    _sharelist() {
      sharelist({
        carid: this.$route.query.carid
      }).then(res => {
        console.log('共享列表', res)
        if (res.data.list.length) {
          this.shareList = res.data.list
          this.imglist = this.shareList[0].imglist.split('|')
          console.log(this.shareList)
          console.log(this.imglist)
        } else {
          this.noinfoShow = true
        }
      })
    },
    _doshare(shareid, state) {
      doshare({
        shareid: shareid,
        state: state
      }).then(res => {
        console.log('同意或拒绝', res)
        if (res.code == 0) {
          this._sharelist()
        }

        Toast(res.msg)



      })
    },

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
  .conmmetWrapper
    .item
      padding 47px 23px 20px 20px
      margin-bottom 15px
      background-color #ffffff
      .avatar
        width 69px
        height 69px
        border-radius 50%
        display block
      .content
        margin-left 17px
        width 100%
        .person
          .name
            color #5d5d5d
            font-size 31px
          .startWrapper
            font-size 27px
            .text
              color #919191
              margin-right 3px
            img
              width 23px
              height 23px
              margin-left 4px
            .grade
              margin-left 3px
              color #1ead55
        .date
          color #a9a9a9
          font-size 27px
          margin-top 5px
        .des2
          color #5d5d5d
          margin-top 15px
          font-size 27px
        .des
          margin-top 15px
          color #5d5d5d
          font-size 27px
          padding-bottom 15px
        .imgWrapper
          .comImg
            margin-bottom 15px
            width 200px
            height 136px
            margin-right 5px
        .tip
          color #919191
          font-size 27px
          padding-top 15px
          span
            color #1ead55
  .btm
    padding 30px
    background-color #ffffff
    border-bottom 1px solid #f5f5f5
    // margin-bottom 15px
    .reject
      color #ffffff
      width 246px
      height 90px
      background-color #b9b1a5
      border-radius 10px
    .receive
      color #ffffff
      width 425px
      height 90px
      background-color #5aa967
      border-radius 10px
    .alreject
      width 100%
      text-align right
      border-radius 10px
      color #ff6969
    .alreceive
      width 100%
      text-align right
      border-radius 10px
      color #5aa967
</style>
<style lang="scss" scoped>
.container .conmmetWrapper .item .content .tip span,.container .btm .alreceive{
  color: $color;
}
.container .btm .receive {
  background-color: $color;
}

</style>