<template>
  <div class="container">
    <div class="title-wrapper row van-hairline--bottom">
      <div class="item row col a-c j-c" v-for="(item,index) in title" :key="index" :class="{'active':isActive==index}" @click="Active(index)">{{item}}</div>
    </div>
    <!--我的留言  -->
    <div class="msgWrapper" v-if="isActive">
      <div class="item  row j-b" v-for="(item,index) in list" :key="index">
        <img class="avater" :src="item.headimgurl" alt="" />
        <div class="info">
          <div class="msgname">
            <div class="name">{{item.nickname}}</div>
            <div class="text">
              {{item.remark}}
            </div>
          </div>
          <div class="btmItem  row j-b">
            <div class="date">{{item.createdate |moment}}</div>
            <div class="dalete" @click="deleteWrapperShow(true,item.id,item.carid)">删除留言</div>
          </div>
          <div class="replay " v-if="item.reply">
            <div class="text">
              回复：{{item.reply}}
            </div>
          </div>
          <div class="row a-c showname van-hairline--top">
            <img class="hand" src="./hand.png" alt="">
            <div class="" @click="show(item.carid)">{{item.memname}}的追思纪念堂</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 给我留言 -->
    <div class="msgWrapper" v-if="!isActive">
      <div class="item  row j-b" v-for="(item,index) in list" :key="index">
        <img class="avater" :src="item.headimgurl" alt="" />
        <div class="info">
          <div class="msgname">
            <div class="name">{{item.nickname}}</div>
            <div class="text">
              {{item.remark}}
            </div>
          </div>
          <div class="btmItem  row">
            <div class="date">{{item.createdate |moment}}</div>
            <div class="dalete" @click="deleteWrapperShow(true,item.id,item.carid)">删除留言</div>
            <div class="btn  row j-c a-c" @click="msgreplyShow(true,item.id,item.carid)" v-if="!item.reply">回复</div>
          </div>
          <div class="replay " v-if="item.reply">
            <div class="text">
              回复：{{item.reply}}
            </div>
          </div>
          <div class="row a-c showname van-hairline--top">
            <img class="hand" src="./hand.png" alt="">
            <div class="" @click="show(item.carid)">{{item.memname}}的追思纪念堂</div>
          </div>
        </div>
      </div>
    </div>

    <noMessage :noinfoShow="noinfoShow" />
    <Delete :deleteWrapper="deleteWrapper" :tip="tip" @delcard="delcard" @deleteWrapperShow="deleteWrapperShow" />
    <Reply :msgreply="msgreply" @msgreplyBtn="msgreplyBtn" @msgreplyShow="msgreplyShow" />
  </div>

</template>
<script type="text/ecmascript-6">
import Delete from 'components/Delete/Delete'
import Reply from 'components/Reply/Reply'
import noMessage from 'components/noMessage/noMessage'
import { getmsg, msgdel, msgreply } from 'api/index'
import { Toast } from 'vant'
export default {
  data() {
    return {
      title: ['给我留言', '我的留言'],
      isActive: 0,
      deleteWrapper: false,
      tip: "确定删除本条留言?",
      msgreply: false,
      type: 0,
      list: [],
      msgid: '',
      carid: '',
      reply: '',
      noinfoShow: false



    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this._getmsg(this.type)


  },
  methods: {
    // 预览
    show(carid) {
      this.$router.push({
        path: '/show',
        query: {
          carid: carid
        }
      })
    },
    // 留言列表
    _getmsg(type) {
      getmsg({
        type: type
      }).then(res => {
        console.log('留言', res)
        this.list = res.data.list
        if (res.data.count == 0) {
          this.noinfoShow = true
        } else {
          this.noinfoShow = false
        }

      })
    },

    // 切换
    Active(flag) {
      this.isActive = flag
      this.type = flag
      this._getmsg(this.type)
      console.log(this.type)

    },

    // 点击删除
    deleteWrapperShow(flag, msgid, carid) {
      if (msgid) {
        this.msgid = msgid
      }
      if (carid) {
        this.carid = carid
      }
      this.deleteWrapper = flag
    },
    // 确定删除
    delcard() {
      this._msgdel(this.msgid, this.carid)
      // Toast('删除成功')
      this.deleteWrapper = false
    },
    // 删除留言
    _msgdel(msgid, carid) {
      msgdel({
        msgid: msgid,
        carid: carid,
      }).then(res => {
        Toast(res.msg)
        console.log('删除留言', res)
        if (res.code == 0) {
          this._getmsg(this.type)

        }
      })
    },
    // 点击回复
    msgreplyShow(flag, msgid, carid) {
      if (msgid) {
        this.msgid = msgid
      }
      if (carid) {
        this.carid = carid
      }
      this.msgreply = flag
    },
    //确定回复
    msgreplyBtn(flag) {
      console.log(flag)

      this.reply = flag
      this.msgreplyB(this.reply)
    },

    // 提交回复内容
    msgreplyB(reply) {
      if (this.reply == '') {
        Toast('请输入回复内容')
        return false
      }
      if (this.reply.length > 50) {
        Toast('最多输入50字')
        return false
      }
      msgreply({
        msgid: this.msgid,
        carid: this.carid,
        reply: reply
      }).then(res => {
        this.msgreply = false
        console.log('回复留言', res)
        console.log('msgid', this.msgid)
        console.log('msgid', this.carid)
        console.log('reply', reply)
        Toast(res.msg)
        if (res.code == 0) {
          this._getmsg(this.type)
          this.reply = ''
        }
      })

    },

  },
  components: {
    Delete,
    Reply,
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
  .title-wrapper
    .item
      width 50%
      color #a29076
      height 88px
    .active
      background-color #a29076
      color #ffffff
  .item-content
    margin-bottom 25px
    width 614px
    margin-left 119px
    .item-wrapper
      background-color #ffffff
      padding 23px 50px 23px 0px
      .pic
        width 135px
        height 135px
        border-radius 5px
        margin-right 26px
      .list
        height 135px
      .name
        font-size 31px
        color #111111
      .des
        font-size 28px
        color #919191
      .detail
        .item
          color #a29076
          font-size 28px
          margin-right 45px
          width 100px
          img
            width 35px
            // height 28px
            margin-right 13px
</style>
<style scoped>
.msgWrapper > .item {
  padding: 30px 19px;
}
.msgWrapper > .item > .avater {
  width: 82px;
  height: 82px;
  border-radius: 50%;
  display: block;
  margin-right: 5px;
}
.msgWrapper > .item > .info {
  width: 614px;
}
.msgWrapper > .item > .info > .msgname > .name {
  font-size: 30px;
  color: #a29076;
}
.msgWrapper > .item > .info > .msgname > .text {
  font-size: 28px;
  color: #494949;
}
.msgWrapper > .item > .info > .btmItem {
  position: relative;
  margin-top: 45px;
  font-size: 25px;
}
.hand {
  width: 40px;
  height: 40px;
  transform: rotate(90deg);
}
.showname {
  font-size: 28px;
  color: #b8b8b8;
  padding-top: 10px;
  margin-top: 15px;
}
.msgWrapper > .item > .info > .btmItem > .dalete {
  color: #a29076;
  margin-left: 20px;
}
.msgWrapper > .item > .info > .btmItem > .date {
  color: #b8b8b8;
}
.msgWrapper > .item > .info > .btmItem > .btn {
  position: absolute;
  right: 0;
  height: 47px;
  width: 83px;
  border-radius: 5px;
  background-color: #a29076;
  color: #ffffff;
  font-size: 28px;
  bottom: 0;
}
.replay {
  background-color: #f2f2f2;
  padding: 10px;
  font-size: 25px;
  margin-top: 20px;
}
.ownName {
  color: #5aa967;
}
</style>