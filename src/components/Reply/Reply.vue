<template>
  <!-- 回复留言 -->
  <div class="remindWrapper" v-if="msgreply">
    <div class="mask" @click="msgreplyShow(false)"></div>
    <div class="item col a-c">
      <div class="title row a-c j-c">请输入回复内容</div>
      <textarea class="msgadd" placeholder="请输入内容" v-model="reply" @blur="getHeight"></textarea>
      <div class="sendNum" style="margin-top:10px">{{reply.length}}/50</div>
      <div class="btn row a-c j-c" @click="msgreplyBtn">提交</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Reply",
  data() {
    return {
      reply: ''

    }
  },
  props: {
    msgreply: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 解决输入框高度bug不稳定问题
    getHeight() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    // 点击确定
    msgreplyBtn() {
      this.$emit("msgreplyBtn",this.reply);
      this.reply = ''
    },
    // 点击遮罩层
    msgreplyShow(flag) {
      this.$emit("msgreplyShow", flag);
    }

  }
};
</script>

<style  scoped lang="stylus">
.remindWrapper
  width 648px
  border-radius 20px
  .mask
    width 100%
    height 100%
    background-color #000
    position fixed
    top 0
    left 0
    z-index 1000
    opacity 0.5
    bottom 0
  .item
    position fixed
    top 50%
    width 648px
    border-radius 10px
    left 50%
    transform translate(-50%, -50%)
    z-index 1001
    background-color #ffffff
    overflow hidden
    .title
      width 100%
      height 80px
      background-color #a29076
      color #ffffff
      font-size 32px
      margin-bottom 26px
    .msgadd
      width 90%
      height 300px
      color #000000
      font-size 31px
      padding 10px
      border 1px solid #f2f2f2
    .btn
      margin-top 27px
      width 600px
      height 91px
      background-color #a29076
      border-radius 10px
      margin-bottom 19px
      color #ffffff
      font-size 36px
      letter-spacing 2px
    .sendbtn
      width 600px
      margin-top 20px
    .sendNum
      color #909090
      font-size 27px
</style>
