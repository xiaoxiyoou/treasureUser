<template>
  <div class="container">
    <div class="top col j-c a-c">
      <img class="check" src="./check.png" alt="">
      <div class="text">追思纪念堂创建成功</div>
    </div>
    <div class="content">
      <div class="tip">您现在可以：</div>
      <div class="item">
        <div class="title row j-b a-c van-hairline--bottom" @click="modify">
          <div>编辑完善信息</div>
          <van-icon name="arrow" />
        </div>
        <div class="text">上传逝者头像、生前照片等信息</div>
        <div class="text">之后您也可以在“我的追思纪念堂”中点击“功能设置”
          进行修改。</div>
      </div>
      <div class="item">
        <div class="title row j-b a-c van-hairline--bottom" @click="show">
          <div>进入追思纪念堂</div>
          <van-icon name="arrow" />
        </div>
        <div class="text">马上进入逝者追思纪念堂进行怀念与祭拜</div>
        <div class="text">之后您也可以搜索微信公众号“抚顺殡葬——服务——线
          上追思——我的追思纪念堂”中点击找到追思纪念堂。</div>
      </div>

    </div>
  </div>

</template>
<script type="text/ecmascript-6">

export default {
  data() {
    return {



    }
  },
  mounted() {



  },
  methods: {
    modify() {
      this.$router.push({
        path: './modify',
        query: {
          carid: this.$route.query.carid,
        }
      })
    },
    show() {
      this.$router.push({
        path: '/show',
        query: {
          carid: this.$route.query.carid,
        }
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
  bottom 0
  .top
    width 100%
    height 284px
    background-color #ffffff
    font-size 38px
    color #484848
    .check
      width 105px
      height 105px
      margin-bottom 15px
  .content
    padding 28px 45px
    color #484848
    font-size 25px
    .tip
      font-size 25px
    .item
      background-color #ffffff
      padding 0 18px 18px
      border-radius 10px
      margin-top 28px
      .title
        color #000000
        font-size 31px
        height 70px
      .text
        margin-top 16px
        line-height 44px
</style>