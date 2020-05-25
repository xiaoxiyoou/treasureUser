<template>
  <div class="btmCon col a-c">
    <div class="line"></div>
    <div class="btm row a-c j-b">
      <img class="logoBtm" src="./logo.png" alt="">
      <div>
        <div class="">识别二维码</div>
        <div class="">关注我们</div>
      </div>
      <img class="qrcode" src="./qrcode.png" alt="">

    </div>
    <div class="weight1" >聚财·纳福·保平安</div>
    <div class="text1" style="margin-bottom:30px">致力于传承中国优秀传统文化</div>
  </div>
</template>

<script>
export default {
  name: "btm",
  props: {
  }
};
</script>

<style scoped lang="stylus">
.btmCon
  margin-top 58px
  .line
    width 663px
    border 1px dotted #544434
  .btm
    font-size 25px
    width 623px
    margin-top 45px
    margin-bottom 50px
    .logoBtm
      width 298px
      height 111px
    .qrcode
      width 150px
      height 150px
  .weight1
    font-weight 700
    font-size 30px
    color #343233
    line-height 41px
  .text1
    font-size 27px
    line-height 41px
    margin-top 10px
</style>
