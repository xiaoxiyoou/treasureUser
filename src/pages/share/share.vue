<template>
  <div class="container">
    <div class="top-con" ref="imageWrapper">
      <img class="bgImg" :src="flowerImg" alt="" />
      <div class="qrCodeCon col j-c a-c">
        <img class="qrCode" :src="QRcode" alt="">
      </div>
    </div>
    <div class="desc">
      *长按图片发送给朋友
    </div>
    <img class="lastImg" :src="imgUrl" alt="" />
    <div class="img-list">
      <div class="item " v-for="(item, index) in flowerCon" :key="index" @click="flowerSlecet(index)" :class="{ on: isActive == index }">
        <img :src="item.imgUrl" alt="" />
      </div>

    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import html2canvas from 'html2canvas'
import { Toast } from 'vant';

export default {
  data() {
    return {
      flowerCon: [
        {
          imgUrl: require('./zhuisitupian.png'),
        },
        {
          imgUrl: require('./zhuisitupian(2).png'),
        },
        {
          imgUrl: require('./zhuisitupian(3).png'),
        },


      ],
      isActive: 0,
      imgArr: ['zhuisitupian.png', 'zhuisitupian(2).png', 'zhuisitupian(3).png'],
      QRcode:"",
      imgUrl: '',



    }
  },
  computed: {
    flowerImg: function () {
      return require("./" + this.imgArr[this.isActive])
    }

  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this.QRcode = 'http://wx.fuyulove.com/Action/MemorApi?action=shareimg&carid=' + this.$route.query.carid
    this.$nextTick(() => {
      this.createImg()
    })


  },
  methods: {
    flowerSlecet(flag) {
      Toast.loading({
        forbidClick: true,
        duration: 0, // 持续展示 toast
      });
      this.isActive = flag
      setTimeout(() => {
        this.createImg()
      }, "500");

    },
    // 生成canvas图片`
    createImg() {
      html2canvas(this.$refs.imageWrapper, {
        backgroundColor: null,
        useCORS: true, // （图片跨域相关）
        allowTaint: true // 允许跨域（图片跨域相关）
      }).then(canvas => {
        this.imgUrl = canvas.toDataURL('image/png');
        console.log(this.imgUrl)
        Toast.clear();

      });
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
  background-color #ffffff
  .top-con
    position absolute
    top 20px
    left 62px
    right 62px
    width 626px
    height 834px
    .bgImg
      width 626px
      height 834px
    .qrCodeCon
      position absolute
      border 1px solid #f5f5f5
      right 5%
      background-color #ffffff
      width 180px
      height 180px
      bottom 40px
      .qrCode
        width 90%
        height 90%
  .desc
    position absolute
    bottom 200px
    color rgb(119, 119, 119)
    width 100%
    text-align center
  .lastImg
    position absolute
    top 20px
    left 50%
    margin-left -313px
    width 626px
    height 834px
    z-index 99
  .img-list
    position fixed
    bottom 0
    width 100%
    height 190px
    line-height 190px
    padding 0 26px
    border-top 1px solid rgba(0, 0, 0, 0.3)
    box-shadow 0 1px 3px #5aa967
    white-space nowrap
    .item
      display inline-block
      width 126px
      height 150px
      vertical-align middle
      border 1px solid rgb(226, 226, 226)
      margin-right 20px
      z-index 99
      position relative
      background url('./defalut.png') no-repeat right top
      background-size 30px 30px
    .item>img
      position absolute
      margin-left 50%
      margin-top 60%
      transform translate(-50%, -50%)
      width 90px
      height 120px
      z-index 20
    .on
      background url('./hover.png') no-repeat right top
      background-size 30px 30px
      // border 1px solid #5aa967
</style>
<style lang="scss" scoped>
.container .img-list .on {
  border: 1px solid $color;
}
</style>