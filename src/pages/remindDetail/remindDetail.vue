<template>
  <div class="container">
    <div class="top row a-c j-b">
      <div class="text">此功能在公众号中提醒，请持续关注我们</div>
      <div class="btn row j-c a-c" @click="qrWrapperShow(true)">+关注</div>
    </div>
    <div class="bar"></div>
    <div class="template  row j-b a-c">
      <div class="text">逝者忌日提醒</div>
      <van-switch v-model="checked1" size="18px" active-color="#b9a484" inactive-color="#eaeaea" @change="onChange('rem_jr')" />
    </div>
    <div class="template row j-b a-c">
      <div class="text">逝者生日提醒</div>
      <van-switch v-model="checked2" size="18px" active-color="#b9a484" inactive-color="#eaeaea"  @change="onChange('rem_sr')" />
    </div>
    <div class="template  row j-b a-c">
      <div class="text">清明节提醒</div>
      <van-switch v-model="checked3" size="18px" active-color="#b9a484" inactive-color="#eaeaea" @change="onChange('rem_qm')"/>
    </div>
    <div class="template  row j-b a-c">
      <div class="text">中元节提醒</div>
      <van-switch v-model="checked4" size="18px" active-color="#b9a484" inactive-color="#eaeaea" @change="onChange('rem_zy')"/>
    </div>
    <div class="template  row j-b a-c">
      <div class="text">寒衣节提醒</div>
      <van-switch v-model="checked5" size="18px" active-color="#b9a484" inactive-color="#eaeaea" @change="onChange('rem_hy')" />
    </div>
    <div class="template  row j-b a-c">
      <div class="text">春节提醒</div>
      <van-switch v-model="checked6" size="18px" active-color="#b9a484" inactive-color="#eaeaea" @change="onChange('rem_cj')"/>
    </div>

    <div class="qrWrapper" v-if="qrWrapper">
      <div class="mask" @click="qrWrapperShow(false)"></div>
      <div class="item col j-c a-c">
        <img class="" src="./QRcode.png" alt="">
        <div>长按识别二维码关注我们</div>
      </div>
    </div>

  </div>

</template>
<script type="text/ecmascript-6">
import { setinfo, upset } from 'api/index'
import { Toast } from 'vant'
export default {
  data() {
    return {
      checked1: true,
      checked2: true,
      checked3: true,
      checked4: true,
      checked5: true,
      checked6: true,
      qrWrapper: false,
      info: []

    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this._setinfo()


  },
  methods: {
    // 设置
    _upset(item, value) {
      upset({
        value: value,
        carid: this.$route.query.carid,
        item: item
      }).then(res => {
        console.log('设置', res)
        Toast(res.msg)
      })
    },
    // 开关设置
    onChange(flag) {

      if (this.info[flag] == 0) {
        this.info.flag = 1
      } else {
        this.info.flag = 0
      }
      this._upset(flag, this.info.flag)
    },
    //  显示隐藏二维码
    qrWrapperShow(flag) {
      this.qrWrapper = flag
    },
    // 设置详情
    _setinfo() {
      setinfo({
        action: 'info',
        carid: this.$route.query.carid,
      }).then(res => {
        console.log('设置', res)
        this.info = res.data.info
        if (this.info.rem_jr == 0) {
          this.checked1 = true
        } else {
          this.checked1 = false
        }
        if (this.info.rem_sr == 0) {
          this.checked2 = true
        } else {
          this.checked2 = false
        }
        if (this.info.rem_qm == 0) {
          this.checked3 = true
        } else {
          this.checked3 = false
        }
        if (this.info.rem_zy == 0) {
          this.checked4 = true
        } else {
          this.checked4 = false
        }
        if (this.info.rem_hy == 0) {
          this.checked5 = true
        } else {
          this.checked5 = false
        }
        if (this.info.rem_cj == 0) {
          this.checked6 = true
        } else {
          this.checked6 = false
        }
      })
    },

  },
  components: {

  }
}
</script>
<style  lang="scss" scoped >
.top {
  height: 94px;
  padding: 0 32px 0 60px;
}
.top > .text {
  color: #ff5a5a;
  font-size: 28px;
}
// .top > .btn {
//   color: #ffffff;
//   font-size: 24px;
//   width: 99px;
//   height: 40px;
//   background-color: #6a6198;
//   border-radius: 20px;
// }
.template {
  margin-left: 61px;
  height: 104px;
  padding-right: 32px;
  color: #909090;
  font-size: 28px;
  border-bottom: 1px solid #dfe0e5;
}
.switch {
  width: 72px;
  height: 44px;
}
.defalut {
  width: 16px;
  height: 16px;
  border-top: 1px solid #848484;
  border-right: 1px solid #848484;
  transform: rotate(45deg);
}
.bar {
  height: 26px;
  width: 100%;
  background-color: #f5f5f5;
}
.top > .btn {
  color: #ffffff;
  font-size: 24px;
  width: 99px;
  height: 40px;
  background-color:  $color;
  border-radius: 20px;
}
.qrWrapper {
  color: #ffffff;
}
.qrWrapper > .item {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
}
.qrWrapper > .item > img {
  width: 80%;
  border-radius: 0.1rem;
  margin-bottom: 0.2rem;
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
</style>