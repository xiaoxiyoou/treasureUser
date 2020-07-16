<template>
  <div class="container">
    <div class="item-wrapper row  a-c j-b van-hairline--bottom" v-for="(item,index) in list" :key="index" @click="viewDetail(item.url)">
      <div>
        <img class="" :src="item.img" alt="">
      </div>
      <div class="item col j-b ">
        <div class="name" v-if="item.title">{{item.title}}</div>
        <div class="name" v-else>暂无标题</div>
        <div class="detail row j-b a-c">
          <div class="sale">{{item.createdate}}</div>
        </div>
      </div>
    </div>
    <noMessage :noinfoShow="noinfoShow" />
 
  </div>

</template>
<script type="text/ecmascript-6">
import { getCollect } from 'api/index'
import noMessage from 'components/noMessage/noMessage'
export default {
  data() {
    return {
      list: [],
      noinfoShow: false



    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this._getCollecte()



  },
  methods: {
    viewDetail(flag) {
      window.location.href = flag
    },
    _getCollecte() {
      getCollect().then(res => {
        console.log('收藏记录', res)
        this.list = res.data.list
        if (res.data.list.length) {
          this.noinfoShow = false
        } else {
          this.noinfoShow = true
        }

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
  background-color #ffffff
  padding-top 15px
  .item-wrapper
    padding-left 20px
    width 700px
    height 200px
    img
      width 135px
      height 135px
      border-radius 5px
      display block
    .item
      width 500px
      height 135px
      .name
        font-size 27px
        color #111111
      .des
        font-size 24px
        color #919191
      .detail
        margin-top 20px
        .value
          color #ab4062
          .cell
            font-size 25px
          .num
            font-size 32px
        .sale
          font-size 24px
          color #919191
</style>