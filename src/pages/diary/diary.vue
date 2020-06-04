<template>
  <div class="container">
    <div class="detailCon">
      <div class="detail row j-b a-c" @click="contentDetail(item.remark,item.date,item.id,item.dtype,item.audurl)" v-for="(item,index) in list" :key="index">
        <div class="item row a-e">
          <div class="mouth">{{item.date}}</div>
          <div class="wek">{{item.week}}</div>
        </div>
        <div class="btn">
          <div class="text">查看</div>
        </div>
      </div>
    </div>
    <!-- 文本弹出框 -->
    <div class="contentCon" v-if="contentCon">
      <div class="mask" @click="contentConShow(false)"></div>
      <div class="content">
        <div class="item row a-e">
          <div class="mouth">{{date}}</div>
        </div>
        <textarea class="msgCon" v-model="remarkDetail" @blur="getHeight"> </textarea>
        <div class="" style="text-align: right;">
          <div class="delect" @click="_diarydel">删除</div>
        </div>
        <img class="close" src="img/guan.png" alt="">
      </div>
    </div>
    <!-- 音频弹出框 -->
    <div class="audioMask" v-if="audioMask">
      <div class="mask" @click="audioShow(false)"></div>
      <div class="audioWrapper">
        <div class="item row a-e">
          <div class="day daycopy"></div>
          <div class="wek wekcopy"></div>
        </div>
        <audio controls class="audio" :src="audurl"></audio>
        <div class="delect" style="text-align: center;" @click="_diarydel">删除</div>
        <img class="close" src="img/guan.png" alt="">
      </div>
    </div>
    <!-- 底部 -->
    <div class="btm col a-c">
      <div class="title  row">
        <div class="text  row j-c a-c" v-for="(item,index) in title" :key="index" :class="{'textHover':isActive == index}" @click="activeNav(index)">{{item}}</div>

      </div>
      <div class="textCon" v-if="isActive">
        <div class="btn  row j-b a-c">
          <div class="cancel">取消</div>
          <div class="confirm row j-c a-c" @click="confirm">发布</div>
        </div>
        <textarea id="textarea" v-model="remark" @blur="getHeight"></textarea>
      </div>
      <div class="audioCon" v-if="!isActive">
        <div class="item startAudio col j-c a-c">
          <div class="row">
            <img class="side" src="./left.gif" alt="" v-if="!startRecord" />
            <div class="time" v-if="startRecord">点击录制</div>
            <div class="time" v-if="!startRecord">{{audiotime}}</div>
            <img class="side" src="./right.gif" alt="" v-if="!startRecord" />
          </div>
          <img class="audioImg audioImgStart" src="./begin.png" alt="" @click="_startRecord" v-if="startRecord" />
          <img class="audioImg audioImgStop" src="./ongoing.png" alt="" @click="_stopRecord" v-if="!startRecord" />
        </div>
      </div>
    </div>
  </div>

</template>
<script type="text/ecmascript-6">
import { diaryadd, diarylist, diarydel } from 'api/index'
import { Toast } from 'vant'
var wx = require('weixin-js-sdk')
export default {
  data() {
    return {
      audioMask: false,
      contentCon: false,
      title: ['音频日记', '文本日记'],
      isActive: 0,
      remark: '',
      list: [],
      remarkDetail: '',
      date: '',
      diaid: '',
      startRecord: true,
      audiotime: 0,
      timer: null,
      audurl: '',
      recording: false //记录录音状态



    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this._diarylist()


  },
  beforeDestroy() {
    this.$once('hook:beforeDestroy', () => {
      clearInterval(this.timer);
    })
    if (this.recording) {
      wx.stopRecord({
        success: (res) => {
          console.log(res)
        }
      })
    }

  },
  methods: {
    // 解决输入框高度bug不稳定问题
    getHeight() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },

    // 定时器
    interval() {
      this.timer = window.setInterval(() => {
        this.audiotime++
        this.audiotime = (Array(2).join(0) + this.audiotime).slice(-2)
        if (this.audiotime == 60) {
          this._stopRecord()
        }
      }, 1000);


    },
    // 结束录音
    _stopRecord() {
      wx.stopRecord({
        success: (res) => {
          window.clearInterval(this.timer);
          this.timer = null
          this.startRecord = !this.startRecord
          this.audiotime = 0
          this.recording = false
          console.log(res)
          var localId = res.localId;
          wx.uploadVoice({
            localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: (res) => {
              var serverId = res.serverId; // 返回音频的服务器端ID
              this._diaryadd(serverId, 1);
            }
          });
        }
      })

    },
    // 开始录音
    _startRecord() {
      wx.startRecord({
        success: (res) => {
          this.startRecord = !this.startRecord
          this.interval()
          this.audiotime = 0
          console.log('开始录音', res)
          this.recording = true

        },
        cancel: function () {
          Toast('您已拒绝授权录音');
        }
      })
    },
    // 删除
    _diarydel() {
      diarydel({
        diaid: this.diaid
      }).then(res => {
        console.log('删除', res)
        if (res.code == 0) {
          this._diarylist()
          Toast('删除成功')
          this.contentCon = false
          this.audioMask = false
        }

      })
    },
    // 获取日记
    _diarylist() {
      diarylist({
        carid: this.$route.query.carid,
        action: 'diarylist'
      }).then(res => {
        console.log('日记列表', res)
        this.list = res.data.list

      })
    },
    // 确认留言
    confirm() {
      this._diaryadd(this.remark, 0)
    },
    _diaryadd(remark, dtype) {
      if (!this.remark && dtype == 0) {
        Toast('请输入留言内容')
        return false
      }
      diaryadd({
        carid: this.$route.query.carid,
        dtype: dtype,
        remark: remark
      }).then(res => {
        console.log('添加', res)
        if (res.code == 0) {
          Toast('留言成功')
          this._diarylist()
          this.remark = ''
        } else {
          Toast(res.msg)
        }
      })
    },
    // 切换语音和日记
    activeNav(flag) {
      this.isActive = flag

    },
    // 关闭留言详情
    contentConShow(flag) {
      this.contentCon = flag
    },
    // 关闭音频
    audioShow(flag) {
      this.audioMask = flag
    },
    // 查看留言
    contentDetail(remark, date, diaid, dtype, audurl) {

      this.date = date
      this.dtype = dtype
      this.diaid = diaid
      if (this.dtype == 1) {
        this.audioMask = true
        this.audurl = audurl
      } else if (this.dtype == 0) {
        this.contentCon = true
        this.remarkDetail = remark
      }

    }

  },
  components: {

  }
}
</script>
<style lang="scss" scoped>
html {
  background-color: #ffffff;
}
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}
.detailCon {
  margin-bottom: 550px;
}

.detail {
  height: 123px;
  border-bottom: 1px solid #f5f5f5;
  padding: 0 0.31rem 0 0.56rem;
  font-size: 30px;
}

.detail > .item > .mouth {
  color: $color;
}
.separate {
  color: $color;
}
.content > .item > .mouth {
  font-size: 30px;
  color: $color;
}

.day {
  color: $color;
}

.wek {
  margin-left: 0.24rem;
}

.detail > .btn {
  color: #848484;
}

.contentCon {
  /* display: none; */
}

.contentCon > .content {
  width: 690px;
  background-color: #ffffff;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 0.1rem;
  z-index: 1002;
  position: fixed;
  padding: 0.3rem;
}
.close {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
  bottom: -1rem;
  width: 0.67rem;
  height: 0.67rem;
}
.msgCon {
  margin-top: 20px;
  width: 100%;
  min-height: 400px;
  max-height: 600px;
  border: 1px solid #f5f5f5;
  padding: 15px;
  margin-bottom: 0.2rem;
  font-size: 28px;
  color: #494949;
  line-height: 40px;
  font-family: PingFang-SC-Medium;
}

.delect {
  color: #ff5a5a;
  font-size: 30px;
}

.save {
  color: #6a6199;
  font-size: 0.3rem;
}

.mask {
  width: 100%;
  height: 100%;
  background-color: #000;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  opacity: 0.3;
}

.previewTip {
  width: 0.16rem;
  height: 0.16rem;
  border-top: 2px solid #848484;
  border-right: 2px solid #848484;
  transform: rotate(45deg);
}

.audioMask {
}

.audioWrapper {
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  background-color: #ffffff;
  padding: 0.36rem 0.22rem 0.27rem 0.56rem;
  width: 100%;
  position: fixed;
}

.audio {
  height: 2rem;
  width: 660px;
  padding: 0.5rem 0;
}

.btm {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 488px;
  background-color: #ffffff;
}

.btm > .title {
  width: 100%;
}

.btm > .title > .text {
  width: 50%;
  height: 88px;
  color: #ffffff;
  background-color: #b9b1a5;
}

.btm > .title > .textHover {
  width: 50%;
  height: 88px;
  background-color: $color;
  color: #ffffff;
}

.textCon > .btn {
  padding: 0 0.2rem;
  height: 1.08rem;
  width: 100%;
}

.textCon {
  height: 4rem;
}

.audioCon {
  height: 4rem;
}

.audioCon > .item {
  width: 100%;
  height: 100%;
}

.audioImg {
  width: 1.46rem;
  height: 1.46rem;
  margin-top: 0.65rem;
}

.audioImgStop {
  /* display: none; */
}

.side {
  width: 0.39rem;
  height: 0.37rem;
  /* display: none; */
}

.time {
  padding: 0 0.3rem;
  font-size: 28px;
  color: #494949;
}

.textCon > .btn > .confirm {
  width: 1.4rem;
  height: 0.6rem;
  border-radius: 0.1rem;
  background-color: $color;
  color: #ffffff;
  font-size: 27px;
}
.cancel{
  font-size: 27px;

}
#textarea {
  width: 710px;
  height: 257px;
  padding: 10px;
  background-color: #f5f5f5;
  font-size: 28px;
}
</style>