<template>
  <!-- 最新消息 -->
  <transition name="slide-fade">
    <div class="msg  row a-c j-b" v-if="slideshow && visitCon.length">
      <div class="row a-c">
        <img class="" :src="visitCon[msgIndex].headimgurl" alt="" />
        <!-- <div class="text row"><span class="slidename">{{visitCon[msgIndex].nickname}}</span>{{visitCon[msgIndex].title}}</div> -->
        <div class="text row"><span class="slidename">{{visitCon[msgIndex].nickname}}</span>发起申请</div>
      </div>
      <div class="time">{{visitCon[msgIndex].createdate}}</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "News",
  props: {
    visitCon: Array
  },
  data() {
    return {
      msgIndex: 0,
      slideshow: true,
    }
  },
  mounted() {
    // 改变消息对象索引
    window.setInterval(() => {
      if (this.msgIndex < this.visitCon.length - 1) {
        this.msgIndex++
      } else if (this.msgIndex >= this.visitCon.length - 1) {
        this.msgIndex = 0
      }

    }, 3000)
    // 控制消息显示隐藏
    window.setInterval(() => {
      this.slideshow = !this.slideshow
    }, 1500)
  }
};
</script>

<style scoped lang="stylus">
.msg
  color #ffffff
  position absolute
  z-index 1000
  border-radius 30px
  background-color rgba(0, 0, 0, 0.2)
  width 492px
  padding 5px 10px
  margin-top 30px
  margin-left 20px
  font-size 28px
  white-space nowrap
  .slidename
    max-width 120px
    overflow hidden
    // display -webkit-box
    -webkit-box-orient vertical
    -webkit-line-clamp 1
    text-overflow ellipsis
  img
    width 52px
    height 52px
    border-radius 50%
    margin-right 10px
  .time
    // margin-left 100px
</style>
<style>
/* 消息动画 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
