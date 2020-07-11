<template>
  <div class="container">
    <form action="/">
      <van-search v-model="value" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" />
    </form>
    <div class="hot-wrap">
      <div class="title-wrap row j-b">
        <div class="title">热门搜索</div>
      </div>
      <div class="item-wrap row f-w ">
        <div class="hot-item col j-c a-c">李文亮</div>
        <div class="hot-item col j-c a-c">李文亮</div>
        <div class="hot-item col j-c a-c">科比</div>
        <div class="hot-item col j-c a-c">李文亮</div>
        <div class="hot-item col j-c a-c">科比</div>
        <div class="hot-item col j-c a-c">李文亮</div>
      </div>
    </div>
    <div class="hot-wrap">
      <div class="title-wrap row j-b">
        <div class="title">搜索历史</div>
        <img class="delect" src="./delect.png" alt="">
      </div>
      <div class="item-wrap row f-w ">
        <div class="hot-item col j-c a-c">李文亮</div>

      </div>
    </div>
  </div>

</template>
<script type="text/ecmascript-6">
import { Toast } from 'vant';
export default {
  data() {
    return {
      value: '',

    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0


  },
  methods: {
    onSearch(val) {
      Toast(val);
    },
    onCancel() {
      Toast('取消');
    },

  },
  components: {
  }
}
</script>
<style scoped lang="stylus">
>>>.van-search__content
  border-radius 30px
.container
  position absolute
  top 0px
  width 100%
  height 100%
  bottom 0
  .hot-wrap
    padding 0 30px
    margin-bottom 40px
    margin-top 10px
    .title-wrap
      .title
        color #757575
        font-size 25px
        font-weight 700
      .delect
        width 22px
        margin-right 10px
        height 22px
    .item-wrap
      .hot-item
        height 49px
        padding 0 20px
        border-radius 21px
        border 1px solid #cccccc
        color #333333
        font-size 28px
        background #fafafa
        margin-top 16px
        margin-right 22px
</style>