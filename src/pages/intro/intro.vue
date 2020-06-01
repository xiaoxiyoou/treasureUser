<template>
  <div class="container col a-c">
    <img class="logo" src="./logo2.png" alt="">
    <img class="banner" src="./banner.png" alt="">
    <div class="toptext row a-c">
      <span class="weight1" style="white-space:nowrap" >尊重、安抚、传承</span>
      <div>让我们一起献给亲人永恒的爱</div>
      <div class="spot" style="margin-left:5px"></div>
    </div>
    <div class="row a-c">
      <div class="spot"></div>
      <div class="weight">这是家族宝的初心和坚持</div>
    </div>
    <div class="text">孝子部落集团，一个花大把时间做创新时代殡葬
      的品牌系统，独立原创，家族宝科技有限公司及家族
      宝风水文化工作室便是其分部。</div>
    <img class="person3" style="margin-top:10px" src="./person3.png" alt="">
    <div class="row a-c" style="margin-top:10px">
      <div class="spot"></div>
      <div class="weight">源于对生活的真心</div>
    </div>
    <div class="text"> 做有传统文化底蕴、有仪式感、有文化自信、有
      温度情怀、能安抚逝者家属的殡葬产品。</div>
    <img class="person" src="./person.png" alt="">
    <div class="intro1">孝道文化作者</div>
    <div class="intro1">杜丽琳老师</div>
    <div class="text"> 家族宝文化风水盒是系列产品，由易经泰斗廖
      墨香先生亲自研发，孝道文化作者杜丽琳老师撰写文
      案。</div>
    <img class="person3" style="margin-top:10px" src="./person4.png" alt="">
    <div class="text"> 中国优秀殡葬传统文化传承人刘福龙老师助力
      研发家族宝周边产品，资深殡葬行业产品设计师梁
      毅先生全程监督研发，享有国宝圣物陀罗尼经被专
      版授权（感恩收藏者樊麒麟先生）。</div>
    <img class="person" src="./person2.png" alt="">
    <div class="intro1">中国优秀殡葬传统文化传承人</div>
    <div class="intro1">刘福龙老师</div>
    <div class="text" style="margin-top:30px"> 主张聚财纳福保平安，尽孝传承扬文化。家族宝
      销售为线上线下统一价格，不仅产品，配套服务完善：
      孝子臻藏手册（殡葬相关内容详解）；微信服务号（包
      含产品的寓意、文化、说明及使用流程）；免费的殡
      仪治丧策划案、安葬策划案、临终关怀沟通方案等提
      供；亲情云讣告（支持微信转发及分享）、线上追思
      （内容详实，图文并茂）。</div>
    <img class="person3" style="margin-top:30px" src="./obituary.png" alt="">
    <div class="weight1" style="margin-top:30px">绿色文明、以人为本、规范服务</div>
    <div class="text1">提供产品及服务配套一体的一站式治丧服务</div>

    <btm />
  </div>

</template>
<script type="text/ecmascript-6">
import btm from 'components/btm/btm'
export default {
  data() {
    return {


    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0


  },
  methods: {

  },
  components: {
    btm
  }
}
</script>
<style scoped lang="stylus">
.container
  top 0px
  width 100%
  height 100%
  bottom 0
  background url('./bg.png')
  background-size 100% 100%
  .logo
    width 279px
    margin-top 147px
  .banner
    position absolute
    z-index 1
    right 28px
    top 43px
    width 139px
  .toptext
    width 623px
    color #909090
    margin-top 35px
    font-size 27px
    margin-bottom 20px
  .weight
    font-weight 700
    font-size 30px
    color #343233
    width 623px
    line-height 41px
  .weight1
    font-weight 700
    font-size 30px
    color #343233
    line-height 41px
  .text
    font-size 27px
    width 623px
    line-height 41px
    text-indent 54px
    margin-top 10px
  .text1
    font-size 27px
    line-height 41px
    margin-top 10px
  .spot
    width 10px
    height 10px
    background-color #a9365d
    margin-right 5px
  .person3
    width 662px
    margin-top 10px
  .person
    width 315px
    margin-top 10px
  .intro1
    color #534334
    font-size 22px


</style>