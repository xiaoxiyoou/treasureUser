<template>
  <div class="container">
    <News :visitCon="visitCon" />
    <div>
      <img class="pic" src="./pic16.png">
    </div>
    <div class="top col a-c j-a">
      <div class="col a-c">
        <img class="peopleNum" src="./pic8.png">
        <div class="num-wrapper row j-c">
          <div class="num col a-c j-c" v-for="(item,index) in total" :key="index">{{item}}</div>
        </div>
      </div>
    </div>
    <!-- 视频 -->
    <div class="videoCon col a-c">
      <img v-show="!videoShow" class="videoImg" src="./poster.png" alt="">
      <video v-show="videoShow" class="video" id="video" ref="video" poster="./poster.jpg" webkit-playsinline="true" x-webkit-airplay="true" playsinline="true" x5-video-orientation="h5" x5-video-player-fullscreen="true" x5-playsinline preload="auto" controlslist="nodownload" controls="false" :src="FilePath">
        <source id="source" :src="FilePath" type="video/mp4">
      </video>
      <div class="viode-dec">
        <div class="video-btm">孝子必修的五句话</div>
        <div class="video-text">您知道您的亲人最想听的5句话是什么吗？</div>
        <div class="video-text"> 亲人最希望您做的3件事是什么？</div>
      </div>
      <div class="video-select row j-b">
        <div class="video-select-item row a-c j-c" :class="{'video-select-item-hover ':isActive == index}" v-for="(item,index) in videoList" :key="index" @click="videoChange(item.FilePath,index)">{{item.Title.substring(item.Title.length-3)}}</div>
      </div>
    </div>
    <div class="content col a-c" ref="pronbit">
      <div class="item col a-c">
        <div class="freetitle">免费领取临终关怀辅导资格</div>
        <input class="name com" type="text" placeholder="请输入您的姓名" v-model="name">
        <input class="tel com" type="number" placeholder="请输入手机号码" v-model="mobile">
        <input class="address com" placeholder="请选择您所在的城市" v-model="address" @click="areaShowList" readonly="readonly">
        <div class="receive row a-c">
          <img class="" src="./noselect.png" v-if="select" @click="selectShow(false)">
          <img class="" src="./select.png" v-if="!select" @click="selectShow(true)">
          <div class="text" v-if="select">我已阅读并接受《服务须知》《隐私政策》</div>
          <div class="text textHover" v-if="!select">我已阅读并接受《服务须知》《隐私政策》</div>
        </div>
        <div class="tip">为了您的权益，您的隐私将被严格保密。</div>
        <div class="textbtn row j-c a-c" @click="_serviceapi(1)">立即申请</div>
      </div>
    </div>
    <img class="pic" src="./pic17.png">
    <img class="pic" src="./pic15.png">

    <div class="bar"></div>
    <div class="btmFix row a-c j-c" v-if="showBtn"></div>
    <div class="btn row j-c a-c" v-if="showBtn" @click="scrollIntoView">立即申请</div>
    <!-- 城市选择 -->
    <van-popup v-model="areaShow" position="bottom">
      <van-area :area-list="areaList" title="请选择地址" @confirm="adConfirm" @cancel="adcancel" />
    </van-popup>
    <van-popup v-model="popupshow" close-icon="close" closeable :close-on-popstate="true" @close="close">
      <div class="content col a-c" style="background:#ffffff;">
        <div class="item col a-c" style="background:#ffffff;">
          <div class="freetitle">免费领取临终关怀辅导资格</div>
          <input class="name com" style="background:#ffffff" type="text" placeholder="请输入您的姓名" v-model="name">
          <input class="tel com" style="background:#ffffff" type="number" placeholder="请输入手机号码" v-model="mobile">
          <input class="address com" style="background:#ffffff" placeholder="请选择您所在的城市" v-model="address" @click="areaShowList" readonly="readonly">
          <div class="receive row a-c">
            <img class="" src="./noselect.png" v-if="select" @click="selectShow(false)">
            <img class="" src="./select.png" v-if="!select" @click="selectShow(true)">
            <div class="text" v-if="select">我已阅读并接受《服务须知》《隐私政策》</div>
            <div class="text textHover" v-if="!select">我已阅读并接受《服务须知》《隐私政策》</div>
          </div>
          <div class="tip">为了您的权益，您的隐私将被严格保密。</div>
          <div class="textbtn row j-c a-c" @click="_serviceapi(2)">立即申请</div>
        </div>
      </div>
    </van-popup>
  </div>

</template>
<script type="text/ecmascript-6">
import { Toast } from 'vant'
import News from 'components/News/News'
import { serviceapi, serviceGetapply, videoList } from 'api/index'
import area from 'assets/js/area';
export default {
  data() {
    return {
      reged: 0,
      popupshow: false,
      videoShow: true,
      videoLength: localStorage.getItem("videoLength") || 0,
      FilePath: 'http://edu.fg1413.com/VideoUpload/20190722/jzblzgh-1.mp4',
      videoList: [],
      servicetotal: "",
      total: "",
      visitCon: [],
      areaShow: false,
      name: '',
      select: true,
      video: false,
      mobile: '',
      areaList: area,
      isActive: 0,
      address: '',
      // 防止被弹起
      showBtn: true,
      clientHeight: document.documentElement.clientHeight,


    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this._serviceGetapply()
    this._videoList()
    // 防止被弹起
    window.onresize = () => {
      if (this.clientHeight > document.documentElement.clientHeight) {
        this.showBtn = false
      } else {
        this.showBtn = true
      }
    }


  },
  methods: {
    close() {
      this.videoShow = true
    },
    // 监听视频播放
    VideoStart() {
      this.$refs.video.addEventListener('play', () => {
        console.log('播放')
        if (this.videoLength == 2 && this.reged == 0) {
          this.videoShow = false
          this.popupshow = true
          setTimeout(() => {
            this.$refs.video.pause()
          }, "500");
        }
      })
    },
    // 监听播放结束
    VideoEnded() {
      this.$refs.video.addEventListener('ended', () => {
        console.log('结束')
        this.videoLength = parseInt(localStorage.getItem("videoLength") || 0);
        this.videoLength = this.videoLength + 1;
        localStorage.setItem("videoLength", this.videoLength);


      })
    },
    // 切换视频
    videoChange(FilePath, index) {
      this.isActive = index
      this.$refs.video.src = FilePath
      this.$refs.video.play()
    },
    // 视频地址
    _videoList() {
      videoList({
        userId: localStorage.getItem('userid'),
        pageIndex: 1,
        pageSize: 20,
        orderCate: "0",
        cateId: 13,
        dateStr: ""
      }).then(res => {
        console.log('视频', res)
        this.videoList = res.Data
        this.VideoStart()
        this.VideoEnded()


      })
    },
    // 申请记录
    _serviceGetapply() {
      serviceGetapply({
        type: 2
      }).then(res => {
        console.log('申请', res)
        this.visitCon = res.data.list
        this.servicetotal = res.data.servicetotal
        this.total = res.data.total.toString()
        this.reged = res.data.reged

      })
    },
    // 地址选择
    areaShowList() {
      this.areaShow = true
    },
    adcancel() {
      this.areaShow = false
    },
    // 地址选择
    adConfirm(value) {
      console.log(value)
      let result = value.map(function (item) {
        return item.name;
      }).join("");
      this.address = result
      this.areaShow = false
    },
    // 提交
    _serviceapi(flag) {
      if (this.name == '') {
        Toast('请输入您的姓名')
        return false
      } else if (this.mobile == '') {
        Toast('请输入您的电话')
        return false
      } else if (!(/^1[345789]\d{9}$/.test(this.mobile))) {
        Toast('请输入正确电话号码')
        return false
      } else if (this.address == '') {
        Toast('请选择您所在的城市')
        return false
      } else if (this.select) {
        Toast('请先阅读并接受《服务须知》《隐私政策》')
        return false
      } else {
        serviceapi({
          title: '临终关怀策划书',
          type: 2,
          name: this.name,
          mobile: this.mobile,
          address: this.address
        }).then(res => {
          console.log('申请', res)
          if (res.code == 0) {
            Toast('申请成功！')
            this._serviceGetapply()
            this.name = ""
            this.mobile = ""
            this.address = ""
            // 看视频提交
            if (flag == 2) {
              this.videoShow = true
              this.popupshow = false
            }
          } else {
            Toast('申请失败，请重试！')
          }

        })
      }

    },
    scrollIntoView() {
      this.$refs.pronbit.scrollIntoView({
        behavior: "smooth",  // 平滑过渡
        block: "start"  // 上边框与视窗顶部平齐。默认值
      });

    },
    // 勾选同意协议
    selectShow(flag) {
      this.select = flag
    },



  },
  components: {
    News

  }
}
</script>
<style scoped>
.videoCon {
  background-color: #f3e9e3;
  margin-top: 60px;
}

#video,
.videoImg {
  width: 690px;
  height: 515px;
}
.viode-dec {
  width: 690px;
  text-align: left;
}
.video-text {
  color: #000000;
  font-size: 28px;
  line-height: 40px;
}

.video-select {
  width: 690px;
  margin: 30px 0 35px;
}

.video-select-item {
  color: #897f71;
  font-size: 25px;
  width: 128px;
  height: 96px;
  border-radius: 10px;
  background-color: #e1d7cc;
  text-align: center;
}

.video-select-item-hover {
  color: #ffffff;
  background-color: #897f71;
}
.video-btm {
  color: #897f71;
  font-size: 35px;
  margin: 25px auto 15px;
  font-weight: 700;
}
</style>
<style scoped lang="stylus">
.container
  position absolute
  top 0px
  width 100%
  height 100%
  bottom 0
  background-color #f3e9e3
  .pic
    width 100%
    height auto
    background-color #f3e9e3
    display block
  .pic7
    position absolute
    left 10px
    top 60px
    width 500px
  .bg
    position absolute
    width 100%
    height auto
  .top
    position relative
    left 50%
    transform translateX(-50%)
    background-color #f3e9e3
    color #52aa5e
    font-size 38px
    .col
      position relative
      .peopleNum
        width 680px
        height 161px
      .num-wrapper
        position absolute
        top 113px
        width 680px
        .num
          width 62px
          height 91px
          background url('./numBg.png')
          background-position center center
          font-family 'FandolSong-B2189554dd020853'
          background-size contain
          background-repeat no-repeat
          font-size 68px
          color #ffffff
          padding-top 5px
          margin 0 5px
    .banner
      width 600px
      height auto
      vertical-align bottom
    .play
      width 107px
      height 107px
  .content
    background-color #f3e9e3
    color #a7a7a7
    .title
      width 535px
      margin 40px auto
    .item
      border 2px solid #000000
      width 681px
      padding-bottom 20px
      .freetitle
        color #897f71
        font-weight 700
        font-size 35px
        margin-top 36px
      .com
        width 592px
        height 78px
        border-radius 39px
        margin-top 40px
        padding-left 20px
        font-size 30px
        background-color #f3e9e3
        border 2px solid #000000
      .receive
        margin-top 28px
        img
          width 30px
          height 30px
          margin-right 10px
        .text
          font-size 25px
      .textHover
        color #000000
      .tip
        font-size 25px
        margin-bottom 30px
        margin-top 30px
      .textbtn
        width 600px
        height 91px
        border-radius 10px
        background-color #897f71
        color #ffffff
        font-size 36px
  .servicetotalCon
    background-color #e6e6e6
    .servicetotal
      position absolute
      z-index 10
      bottom 322px
      text-align center
      width 100%
      color #52aa5e
      font-size 30px
      font-family 'FandolSong-B2189554dd020853'
      .num
        font-size 70px
        font-family 'FandolSong-B2189554dd020853'
    .process
      width 679px
      margin 40px auto
    .personWraper
      padding 0 32px 100px
      width 100%
      background-color #52aa5e
      .item
        width 336px
        position relative
        height 100%
        box-shadow 0px 0px 10px rgba(0, 0, 0, 0.28)
        border-radius 10px
        margin-top 22px
        overflow hidden
        .phone
          position absolute
          width 50px
          height 50px
          z-index 100
          right 11px
          top 9px
        .personImg
          width 100%
          height 331px
        .name
          color #111111
          font-size 31px
          margin-top 14px
        .des
          color #919191
          font-size 27px
          border 1px solid #919191
          border-radius 16px
          width 197px
          height 35px
          margin-top 8px
          white-space nowrap
        .startWrapper
          margin-top 10px
          margin-bottom 20px
          img
            width 29px
            height 27px
            margin-left 5px
          .grade
            color #1ead55
            font-size 27px
            margin-left 2px
  .video
    width 100%
  .bar
    height 200px
    background-color #f3e9e3
  .btmFix
    position fixed
    bottom 0
    width 100%
    background-color #897f71
    opacity 0.6
    height 136px
  .btn
    position fixed
    bottom 18px
    width 600px
    height 91px
    border-radius 10px
    background-color #ffffff
    color #897f71
    font-size 36px
    font-weight 700
    left 50%
    transform translateX(-50%)
</style>