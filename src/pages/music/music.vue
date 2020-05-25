<template>
  <div class="container">
    <van-radio-group v-model="radio">
      <van-cell-group>
        <van-cell :title="item.name" clickable @click="radionum(item.url)" v-for="(item,index) in list" :key="index">
          <template #right-icon>
            <van-radio :name="item.url" checked-color="#b9a484" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
  </div>
</template>
<script type="text/ecmascript-6">
import { musiclist, upmusic, setinfo } from 'api/index'
import { Toast } from 'vant'
export default {
  data() {
    return {
      radio: 0,
      list: [],
      musicurl: []



    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this._setinfo()
    this._musiclist()
  },
  methods: {
    // 设置详情
    _setinfo() {
      setinfo({
        action: 'info',
        carid: this.$route.query.carid,
      }).then(res => {
        console.log('设置', res)
        this.radio = res.data.info.musicurl
        this.musicurl = res.data.info.musicurl

      })
    },
    // 选择音乐
    radionum(url) {
      this.radio = url
      this.musicurl = url
      this._upmusic()
    },
    // 获取模板
    _musiclist() {
      musiclist({
        action: 'musiclist'
      }).then(res => {
        console.log('音乐', res)
        this.list = res.data.list
      })
    },
    _upmusic() {
      upmusic({
        carid: this.$route.query.carid,
        musicurl: this.musicurl

      }).then(res => {
        console.log('模板', res)
        Toast(res.msg)

      })
    },

  },
  components: {

  }
}
</script>
<style scoped lang="stylus">
.container
  position absolute
  top 0px
  width 100%
  height 100%
  font-size 27px
  bottom 0
</style>
