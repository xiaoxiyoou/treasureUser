<template>
  <div class="container">
    <div class="template  border row j-b a-c" @click="modify">
      <div class="text coleorOne">编辑纪念堂</div>
      <div class="edit  item row a-c">
        <div class="name">修改</div>
        <div class="defalut"></div>
      </div>
    </div>
    <div class="template border row j-b a-c" @click="template">
      <div class="text coleorOne">纪念堂模板</div>
      <div class="formwork item row a-c">
        <div class="name tempname">{{info.tempname}}</div>
        <div class="defalut"></div>
      </div>
    </div>
    <div class="template border row j-b a-c" @click="music">
      <div class="text coleorOne">更换音乐</div>
      <div class="formwork item row a-c">
        <div class="name tempname">{{info.musicname}}</div>
        <div class="defalut"></div>
      </div>
    </div>
    <div class="template  border row j-b a-c" @click="remindDetail">
      <div class="text coleorOne">忌日提醒</div>
      <div class="death  item row a-c">
        <div class="name">默认开启</div>
        <div class="defalut"></div>
      </div>
    </div>
    <div class="template  row j-b a-c" @click="share">
      <div class="text coleorOne">邀请亲友</div>
      <div class="death  item row a-c">
        <div class="name">发送给亲友</div>
        <div class="defalut"></div>
      </div>
    </div>
    <div class="bar"></div>
    <div class="template   row j-b a-c">
      <div class="text coleorOne">线上留言</div>
      <van-switch v-model="checked" size="18px" active-color="#b9a484" inactive-color="#eaeaea" @change="onChange()" />
    </div>
    <!-- <div class="bar"></div> -->

    <div class="bar"></div>
    <div class="mine  coleorOne row j-c a-c" @click="myRecall">我的追思纪念堂</div>
    <div class="bar"></div>
    <div class="delete row j-c a-c" @click="deleteWrapperShow(true)">删除追思纪念堂</div>
    <div class="bar"></div>
    <!-- 删除弹框 -->
    <div class="deleteWrapper" v-if="deleteWrapper">
      <div class="mask" @click="deleteWrapperShow(false)"></div>
      <div class="item">
        <div class="deleteCon col a-c">
          <div class="tip">确认删除此追思纪念堂？</div>
          <div class="confirm col a-c j-c" @click="_delcard">确认删除</div>
          <img class="close" src="./closeTwo.png" alt="" @click="deleteWrapperShow(false)">
        </div>
      </div>
    </div>
  </div>

</template>
<script type="text/ecmascript-6">
import { delcard, setinfo, upset } from 'api/index'
import { Toast } from 'vant'
export default {
  data() {
    return {
      checked: true,
      deleteWrapper: false,
      ismsg: 0,
      info:""



    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this._setinfo()

  },
  methods: {
    // 删除
    _delcard() {
      delcard({
        carid: this.$route.query.carid
      }).then(res => {
        console.log('删除', res)
        if (res.code == 0) {
          this.deleteWrapper = false
          Toast('删除成功')
          setTimeout(() => {
            window.history.go(-1)
          }, "1000");
        } else {
          Toast(res.msg)
        }
      })
    },

    // 开关留言
    onChange() {
      if (this.ismsg == 0) {
        this.ismsg = 1
      } else {
        this.ismsg = 0
      }
      this._upset('ismsg', this.ismsg)

    },
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
    // 设置详情
    _setinfo() {
      setinfo({
        action: 'info',
        carid: this.$route.query.carid,
      }).then(res => {
        console.log('设置', res)
        this.info = res.data.info
        this.ismsg = this.info.ismsg
        if (this.info.ismsg == 0) {
          this.checked = true
        } else {
          this.checked = false
        }
      })
    },

    myRecall() {
      this.$router.replace({ path: '/myRecall' })
    },
    modify() {
      this.$router.push({
        path: '/modify',
        query: {
          carid: this.$route.query.carid,
        }
      })
    },
    template() {
      this.$router.push({
        path: '/template',
        query: {
          carid: this.$route.query.carid,
        }
      })
    },
    music() {
      this.$router.push({
        path: '/music',
        query: {
          carid: this.$route.query.carid,
        }
      })
    },
    remindDetail() {
      this.$router.push({
        path: '/remindDetail',
        query: {
          carid: this.$route.query.carid,
        }
      })
    },
    share() {
      this.$router.push({
        path: '/share',
        query: {
          carid: this.$route.query.carid,
        }
      })
    },
    deleteWrapperShow(flag) {
      this.deleteWrapper = flag
    }

  },
  components: {

  }
}
</script>
<style  lang="scss"  scoped>
html {
  background-color: #ffffff !important;
  height: 100%;
  width: 100%;
}
.top {
  width: 100%;
  height: 450px;
  background-color: #6a6198;
  position: relative;
}

.reflectCon {
  position: absolute;
  right: 10px;
  top: 25px;
  color: #ffffff;
  font-size: 28px;
}

.reflectTip {
  width: 16px;
  height: 16px;
  border-top: 1px solid #ffffff;
  border-right: 1px solid #ffffff;
  transform: rotate(45deg);
}

.banner {
  width: 438px;
  height: auto;
  bottom: 84px;
  position: absolute;
}

.text-wrapper {
  position: absolute;
  width: 438px;
  bottom: 84px;
}

.text-wrapper > .text {
  color: #ffffff;
  font-size: 30px;
}

.text-wrapper > .num {
  color: #ffffff;
  font-size: 73px;
  margin-top: 25px;
}

.text-wrapper > .detail {
  margin-top: 25px;
  color: #ffffff;
  font-size: 30px;
  width: 194px;
  height: 51px;
  border-radius: 26px;
  background-color: #a197d7;
}

.defalut {
  width: 16px;
  height: 16px;
  border-top: 1px solid #848484;
  border-right: 1px solid #848484;
  transform: rotate(45deg);
}

.template {
  margin-left: 32px;
  height: 100px;

  padding-right: 32px;
  color: #6f6f6f;
  font-size: 31px;
}
.template > .item > a > .name {
  color: #909090;
  font-size: 28px;
}
.border {
  border-bottom: 1px solid #dfe0e5;
}

.bar {
  height: 17px;
  width: 100%;
  background-color: #f5f5f5;
}

.switch {
  width: 72px;
  height: 44px;
}
.delete {
  width: 100%;
  height: 103px;
  border-radius: 10px;
  color: #ff5a5a;
  font-size: 31px;
}
.mine {
  width: 100%;
  height: 103px;
  border-radius: 10px;
  font-size: 31px;
}
.coleorOne {
  color: #080808;
}
.colorTwo {
  color: #000000;
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
  bottom: 0;
}
.deleteWrapper > .item {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  background-color: #ffffff;
  width: 648px;
  border-radius: 10px;
}
.deleteCon {
  position: relative;
}
.deleteCon > .tip {
  margin-top: 160px;
  color: $color;
  font-size: 32px;
}
.deleteCon > .confirm {
  margin-top: 116px;
  margin-bottom: 29px;
  width: 600px;
  height: 91px;
  background-color: $color;
  color: #ffffff;
  font-size: 36px;
  border-radius: 10px;
}
.close {
  position: absolute;
  right: 24px;
  top: 16px;
  width: 40px;
  height: 40px;
}
</style>