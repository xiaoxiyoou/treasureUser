<template>
  <div class="container">
    <van-cell title="头像" center size="large">
      <template #right-icon>
        <img class="avate" :src="userinfo.headimgurl" alt="" @click=" cropShow(true)">
        <van-icon name="arrow" color="#969799" />
      </template>
    </van-cell>
    <van-field v-model="userinfo.nickname" label="昵称" placeholder="请输入昵称" size="large" input-align="right" right-icon="arrow" />
    <van-field v-model="userinfo.realname" label="真实姓名" placeholder="请输入姓名" size="large" input-align="right" right-icon="arrow" />
    <van-field v-model="userinfo.mobile" label="手机号码" placeholder="请输入手机号码" size="large" input-align="right" right-icon="arrow" />
    <van-field v-model="address" label="地址" placeholder="请输入地址" size="large" input-align="right" right-icon="arrow" @click="areaShowList" :readonly="true" />

    <div class="btn row j-c a-c" @click="confirm(true)">确认修改</div>
    <upImg :showCrop="showCrop" @cropShow="cropShow" @photoUp="photoUp" />
    <!-- 城市选择 -->
    <van-popup v-model="areaShow" position="bottom">
      <van-area :area-list="areaList" title="请选择地址" @confirm="adConfirm" @cancel="adcancel" :columns-num="2"/>
    </van-popup>
  </div>

</template>
<script type="text/ecmascript-6">
import upImg from 'components/upImg/upImg'
import {  selfDetail, saveself } from 'api/index'
import { Toast } from 'vant'
import area from 'assets/js/area';
export default {
  data() {
    return {
      userinfo: '',
      showCrop: false,
      areaList: area,
      address: '',
      areaShow: false,



    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this._selfDetail()

  },
  methods: {
    areaShowList() {
      this.areaShow = true
    },
    adcancel() {
      this.areaShow = false
    },
    // 地址选择
    adConfirm(value) {
      console.log(value)
      this.userinfo.city = value[0].name
      this.userinfo.province = value[1].name
      let result = value.map(function (item) {
        return item.name;
      }).join("");
      this.address = result
      this.areaShow = false
    },
    cropShow(flag) {
      this.showCrop = flag
    },

    // 选图
    photoUp(flag) {
      Toast.clear();
      this.userinfo.headimgurl = flag
    },
    confirm(flag) {
      this.popShow = flag
      this._saveself()
    },

    _selfDetail() {
      selfDetail().then(res => {
        console.log('信息', res)
        this.userinfo = res.data.info
        this.address = this.userinfo.province + this.userinfo.city

      })

    },
    _saveself() {
      if (this.userinfo.headimgurl == '') {
        Toast('请输上传您的头像')
        return false
      } else if (this.userinfo.nickname == '') {
        Toast('请输入您的昵称')
        return false
      } else if (this.userinfo.realname == '') {
        Toast('请输入您的姓名')
        return false
      } else if (this.userinfo.mobile == '') {
        Toast('请输入您的手机号')
        return false
      } else if (this.address == '') {
        Toast('请输入您的城市')
        return false
      } else {
        saveself({
          headimgurl: this.userinfo.headimgurl,
          nickname: this.userinfo.nickname,
          realname: this.userinfo.realname,
          mobile: this.userinfo.mobile,
          city: this.userinfo.city,
          province: this.userinfo.province,
        }).then(res => {
          console.log('修改', res)
          if (res.code == 0) {
            Toast('编辑成功')
          } else {
            Toast(res.msg)
          }
        })
      }

    },

  },
  components: {
    upImg

  }
}
</script>
<style scoped lang="stylus">
>>>.van-field__control
  font-size 16px !important
>>>.avate
  width 102px
  height 102px
  border-radius 50%
>>>.van-cell
  padding 16px !important
.container
  position absolute
  top 0px
  width 100%
  height 100%
  bottom 0
  background-color #f5f5f5
  .btn
    width 690px
    height 90px
    background-color #a29076
    border-radius 10px
    color #ffffff
    margin 110px auto 20px
    font-size 35px
</style>