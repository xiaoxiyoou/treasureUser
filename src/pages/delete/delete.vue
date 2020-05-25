<template>
  <div class="container">
    <img class="" src="./delete.png" alt="">
    <div class="btmCon row ">
      <div class="mine row a-c j-c" @click="myRecall">我的追思纪念堂</div>
      <div class="created row a-c j-c" @click="create">创建追思纪念堂</div>
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
    document.body.scrollTop = document.documentElement.scrollTop = 0


  },
  methods: {
    myRecall() {
      this.$router.replace({
        path: '/myRecall'
      })

    },
    create() {
      this.$router.replace({
        path: '/myRecall'
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
  img
    width 486px
    height 912px
    margin 0 auto
    display block
    margin-top 20px
  .btmCon
    position fixed
    width 100%
    bottom 0
    height 90px
    border-top 1px solid #eaeaea
    .mine
      width 40%
      height 100%
      color #5aa967
    .created
      width 60%
      height 100%
      background-color #5aa967
      color #ffffff
</style>
<style lang="scss" scoped>
.container .btmCon .mine {
  color: $color;
}
.container .btmCon .created {
  background-color: $color;
}

</style>
