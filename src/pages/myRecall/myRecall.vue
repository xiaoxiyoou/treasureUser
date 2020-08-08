<template>
  <div class="container">
    <img class="noinfo" src="./created.png" alt="" v-if="noinfo">
    <div class="wrapper ">
      <div class="itemWrapper  row van-hairline--bottom" v-for="(item,index) in list" :key="index">
        <div class="previewCon  row a-c" @click="show(item.id)">
          <div class="preview">预览</div>
          <div class="previewTip"></div>
        </div>
        <div class="titleImgCon">
          <img class="titleImg" :src="item.imgurl" alt="" v-if="item.tempid != 0">
          <img class="titleImg" :src="item.tempurl" alt="" v-else>
          <div class="titleText  row a-c j-c" @click="modify(item.id)">编辑</div>
        </div>
        <div class="itemCont col j-a">
          <div class="row">
            <div class="item  col" v-for="(itemTwo,indexTwo) in item.renlist" :key="indexTwo">
              <div class="name">{{itemTwo.name}}</div>
              <div class="age">{{itemTwo.age}}岁</div>
              <div class="text">{{itemTwo.lstr  }}</div>
            </div>
          </div>
          <div class="flowerCon  row a-c">
            <img class="flower" src="./flower.png" alt="">
            <div>{{item.flower}}</div>
            <img class="msg" src="./msg.png" alt="">
            <div>{{item.msgcount}}</div>
            <img class="msg" src="./look.png" alt="">
            <div>{{item.look}}</div>
          </div>
          <div class="row">
            <div class="diary  row a-c j-c" @click="diary(item.id)">追思日记</div>
            <div class="setting  row a-c j-c" @click="setting(item.id)">功能设置</div>
          </div>
        </div>
      </div>
      <div class="barBtm"></div>
    </div>
    <div class="btmCon  row j-c ">
      <div class="btm  row j-c a-c" @click="create">创建追思纪念堂</div>
    </div>
    <div class="bar"></div>
  </div>

</template>
<script type="text/ecmascript-6">
import { Toast } from 'vant'
import { list } from 'api/index'
export default {
  data() {
    return {
      list: [],
      noinfo: false



    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this._list()


  },
  created() {
    Toast.loading({
      forbidClick: true,
      duration: 0, // 持续展示 toast
    })
  },
  methods: {

    create() {
      this.$router.push({
        path: '/create',
        query: {
          sid: this.$route.query.sid || sessionStorage.getItem('sid')
        }
      })
    },
    // 编辑
    modify(id) {
      this.$router.push({
        path: '/modify',
        query: {
          carid: id
        }
      })
    },

    // 预览
    show(carid) {
      this.$router.push({
        path: '/show',
        query: {
          carid: carid
        }
      })
    },
    // 日记
    diary(carid) {
      this.$router.push({
        path: '/diary',
        query: {
          carid: carid
        }
      })
    },
    // 设置
    setting(carid) {
      this.$router.push({
        path: '/setting',
        query: {
          carid: carid
        }
      })
    },
    _list() {
      list({
        action: 'list'
      }).then(res => {
        console.log('追思卡', res)
        this.list = res.data.list
        if (!this.list.length) {
          this.noinfo = true
        }
        Toast.clear();
      })
    },

  },
  components: {

  }
}
</script>
<style scoped  lang="scss">
.container {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
}
.noinfo {
  width: 535px;
  height: 956px;
  display: block;
  margin: 0 auto;
  margin-top: 20px;
}

.itemWrapper:first-child {
  padding-top: 20px;
}
.banner {
  width: 100%;
  height: auto;
  display: none;
}
.wrapper {
  background-color: #f5f5f5;
}
.itemWrapper {
  width: 100%;
  padding: 25px 0;
  background-color: #ffffff;
  position: relative;
  margin-bottom: 20px;
}

.previewCon {
  position: absolute;
  right: 24px;
  top: 15px;
  color: $color;
  font-size: 28px;
}
.previewTip {
  width: 16px;
  height: 16px;
  border-top: 2px solid $color;
  border-right: 2px solid $color;
  transform: rotate(45deg);
}

.barBtm {
  width: 100%;
  height: 226px;
  background-color: #ffffff;
}
.bar {
  height: 18px;
  position: fixed;
  bottom: 0;
  width: 750px;
  background-color: #ffffff;
}
.titleImgCon {
  position: relative;
  padding-left: 30px;
}
.titleImg {
  width: 162px;
  height: 226px;
}
.titleText {
  position: absolute;
  bottom: 0;
  width: 162px;
  height: 41px;
  background-color: rgba(0, 0, 0, 0.6);
  font-size: 32px;
  color: #ffffff;
}
.itemCont {
  height: 226px;
}
.item {
  padding-left: 25px;
  position: relative;
  width: 240px;
  letter-spacing: 0;
}
.item > .name {
  font-size: 30px;
  color: #0f0f0f;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
}
.item > .text {
  font-size: 25px;
  color: #909090;
  white-space: nowrap;
  margin-bottom: 10px;
}
.item > .age {
  font-size: 28px;
  color: #909090;
}
.flowerCon {
  color: $color;
  font-size: 28px;
  padding-left: 25px;
}
.flower {
  width: 24px;
  height: 28px;
  margin-right: 10px;
}
.msg {
  height: 21px;
  margin-left: 45px;
  margin-right: 10px;
}
.diary {
  width: 198px;
  height: 50px;
  border-radius: 5px;
  background-color: $color;
  color: #ffffff;
  font-size: 28px;
  margin-left: 25px;
}
.setting {
  width: 198px;
  height: 50px;
  border-radius: 5px;
  background-color: $color;
  color: #ffffff;
  font-size: 28px;
  margin-left: 42px;
}
.btmCon {
  width: 100%;
  background-color: #ffffff;
  z-index: 1;
  position: fixed;
  bottom: 18px;
}
.btm {
  width: 690px;
  height: 94px;
  color: #ffffff;
  background-color: $color;
  border-radius: 10px;
  font-size: 35px;
}
</style>