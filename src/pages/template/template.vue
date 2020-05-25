<template>
  <div class="container">

    <div class="template row f-w">
      <div class="template-wrapper" v-for="(item,index) in list" :key="index" @click="select(item.id)">
        <img class="tip" src="./selected.png" alt="" v-if="item.id == isActive">
        <img class="tip" src="./noSelect.png" alt="" v-else>
        <div class="item">
          <img class="banner" :src="item.imgurl" alt="">
          <div class="text">{{item.title}}</div>
        </div>
      </div>
    </div>
    <div class="btm row">
      <div class="preview row j-c a-c" @click="show2">预览模板</div>
      <div class="confirm row j-c a-c" @click="_uptemplate">确认模板</div>
    </div>
  </div>

</template>
<script type="text/ecmascript-6">
import { setinfo, templist, uptemplate } from 'api/index'
import { Toast } from 'vant'
export default {
  data() {
    return {
      list: [],
      isActive: 0,
      tempid: '',
      tempidselcted: ''



    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this._templist()
    this._setinfo()


  },
  methods: {
    // 切换
    select(tempid) {
      this.isActive = tempid
      this.tempid = tempid

    },
    // 获取模板
    _templist() {
      templist({
        action: 'templist'
      }).then(res => {
        console.log('模板', res)
        this.list = res.data.list
      })
    },
    // 换模板
    _uptemplate() {
      uptemplate({
        carid: this.$route.query.carid,
        tempid: this.tempid
      }).then(res => {
        console.log('选择模板', res)
        if (res.code == 0) {
          this.tempidselcted = this.tempid
          Toast('确认模板成功')
        }
      })
    },
    // 设置详情
    _setinfo() {
      setinfo({
        action: 'info',
        carid: this.$route.query.carid,
      }).then(res => {
        console.log('设置', res)
        this.isActive = res.data.info.tempid
        this.tempid = res.data.info.tempid
        this.tempidselcted = res.data.info.tempid

      })
    },
    // 预览
    show2() {
      if (this.tempidselcted != this.tempid) {
        Toast('请先点击确认模板在预览')
        return false
      }
      this.$router.push({
        path: '/show',
        query: {
          carid: this.$route.query.carid
        }
      })
    },

  },
  components: {

  }
}
</script>
<style lang="scss"  scoped>
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #ffffff;
}
.top {
  height: 94px;
  padding: 0 19px 0 29px;
}
.top > .text {
  color: #909090;
  font-size: 28px;
  white-space: nowrap;
}
.top > .btn {
  color: #ffffff;
  font-size: 24px;
  width: 134px;
  height: 40px;
  background-color: #6a6198;
  border-radius: 20px;
}
.bar {
  height: 26px;
  width: 100%;
  background-color: #f5f5f5;
}
.template {
  margin-top: 35px;
}
.template-wrapper {
  position: relative;
  width: 214px;
  text-align: center;
  margin-left: 28px;
}

.template-wrapper > .item > .banner {
  width: 214px;
  height: 297px;
}
.template-wrapper > .item > .text {
  margin: 16px auto;
  color: #909090;
  font-size: 28px;
}
.tip {
  position: absolute;
  width: 47px;
  height: 47px;
  left: 0;
}
.btm {
  position: fixed;
  bottom: 0;
  height: 86px;
  font-size: 33px;
  width: 100%;
  border-top: 1px solid #f2f2f2;
}
.btm > .preview {
  color: $color;
  width: 50%;
  height: 100%;
}
.btm > .confirm {
  color: #ffffff;
  background-color: $color;
  width: 50%;
  height: 100%;
}
</style>