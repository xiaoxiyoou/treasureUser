<template>
  <div class="container" v-if="container" v-wechat-title="title">
    <img class="bg" :src="imgbg" alt="" />
    <div class="top row j-b a-c">
      <div class="item row a-c" @click="visitShow(true)">
        <img class="eye" src="./eye.png" alt="" />
        <div>{{info.look}}</div>
      </div>
      <div class="item row a-c">
        <img class="news" src="./newsing.png" alt="" @click="shareMsg" v-if="info.userid == localuserid && sharemsgCount" />
        <img class="news" src="./news.png" alt="" @click="shareMsg" v-if="info.userid == localuserid && sharemsgCount == 0" />
        <Music :musicSrc="musicSrc" />
      </div>
    </div>
    <!-- <upImg :showCrop="showCrop"/> -->
    <!-- 最新消息 -->
    <transition name="slide-fade">
      <div class="msg  row a-c j-b" v-if="slideshow && visitCon.length">
        <div class="row a-c">
          <img class="" :src="visitCon[msgIndex].headimgurl" alt="" />
          <div class="text row"><span class="slidename">{{visitCon[msgIndex].nickname}}</span>{{visitCon[msgIndex].title}}</div>
        </div>
        <div class="time">{{visitCon[msgIndex].createdate}}</div>
      </div>
    </transition>
    <div class="personWrapper">
      <!-- 点灯 -->
      <transition name="fade">
        <img class="light" src="./light.gif" v-if="light" />
      </transition>
      <div class="personContent">
        <div class="person row a-c" @click="pesonShow" v-for="(item,index) in list" :key="index">
          <img class="portrait" :src="item.imgurl" alt="" v-if="item.imgurl" />
          <img class="portrait" src="./person.png" alt="" v-else />
          <div class="item">
            <div class="name">{{item.name}}</div>
            <div class="age">{{item.shengri}}-{{item.jiri}}</div>
            <div class="des">{{item.lstr}}</div>
            <div class="add row a-c">
              <img class="" src="./location.png" alt="" />
              <div class="address" v-if="item.buryaddr">安葬地：{{item.buryaddr}}</div>
              <div v-else>安葬地：暂未完善</div>
            </div>
          </div>
        </div>
        <div class="persondetail col a-c" v-if="!peson">
          <div style="width:100%">
            <div class="infolife" v-if="info.life">逝者生平：{{info.life}}</div>
            <div class="fallname" style="text-align:right;margin-top:10px" v-if="info.fallname">追思人：{{info.fallname}}</div>
          </div>
          <img class="memory" src="./memory.png" alt="" v-if="info.imglist">
          <div class="imgList">
            <ul class="left-waterfall" ref="left">
              <li class="item" v-for="(item,index) in leftItems" :key="index">
                <img :src="item" alt="" @click="imgPrew(item)">
              </li>
            </ul>
            <ul class="right-waterfall" ref="right">
              <li class="item" v-for="(item,index) in rightItems" :key="index">
                <img :src="item" alt="" @click="imgPrew(item)">
              </li>
            </ul>
          </div>
          <div class="clear"></div>
          <img class="memory" src="./shop.png" alt="">
          <div class="shop-wrapper">
            <div class="title">{{shop.shopname}}</div>
            <div class="item row a-c">
              <img class="badge" src="./jzb_icon.png" alt="" v-if="zizhi == 4">
              <img class="badge" src="./zizuan_icon.png" alt="" v-if="shop.shopgrade_id == 7">
              <div class="tip">---为您提供全程殡葬礼仪服务</div>
            </div>
            <div class="content row a-c">
              <img class="shopimg" :src="shop.imgurl" alt="">
              <div class="item">
                <div>{{shop.category}}</div>
                <div class="row a-c">
                  <div>服务指数</div>
                  <img class="star" src="./starOne.png" alt="" v-for="(index) in point" :key="index">
                  <img class="star" src="./starTwo.png" alt="" v-for="(index) in pointlow" :key="index +'1'">
                </div>
                <div>{{shop.address}}</div>
              </div>
            </div>
            <div class="more" @click="shopDetail">查看更多服务商家信息>></div>
          </div>
          <img class="logo" :src="shop.imglogo" alt="">
          <img class="code" src="./code.png" alt="">
          <div class="tipTitle">讣语Love温馨提示</div>
          <div class="tipText">尽孝要趁早，挚爱等不了。希望所有浏览这封讣告的朋友们，在离开页面之后，一定不要忘了，给自己的父母打一个电话发一条微信，表达你的爱，或直接去到他的面前，别辜负时光，因为尽孝等不了。
          </div>
          <div style="baccground:#eeeeee;width:100%">
            <van-notice-bar color="#b9a484" background="#eeeeee" speed='50' left-icon="http://wx.app.jzb768.com/picture/tip.png">
              和父母一起锻炼身体，越早越好！ 父母虽然坚强，其实很想和你谈谈心，别让他们憋在心里！ 定期为爸妈预约体检，不做一定会后悔! 没有什么灵丹偏方，该吃的药提醒他们按时吃！ 有空常回家，看看他们都吃些什么，是否健康！ 为年迈的父母洗头，就像你小时候他们为你做的一样！ 好好陪父母做一顿饭，享受温情的时光！
            </van-notice-bar>
          </div>
        </div>
      </div>
    </div>
    <div class="series row j-b">
      <div class="item col a-c" @click="cleanShow()">
        <img class="" src="./clean.png" alt="" />
        <div class="text">{{info.sao}}</div>
      </div>
      <div class="item col a-c" @click="lightShow()" v-if="!light">
        <img class="" src="./candle.png" alt="" />
        <div class="text">{{info.deng}}</div>
      </div>
      <div class="item col a-c" v-if="light">
        <img class="" src="./candleHover.png" alt="" />
        <div class="text">{{info.deng}}</div>
      </div>
      <div class="item col a-c" @click="flowerShow(true)">
        <img class="" src="./flower.png" alt="" />
        <div class="text">{{info.hua}}</div>
      </div>
      <div class="item col a-c" @click="tributeShow(true)">
        <img class="" src="./tribute.png" alt="" />
        <div class="text">{{info.liwu}}</div>
      </div>
      <div class="item col a-c" @click="msgShow(true)">
        <img class="" src="./liuyan.png" alt="" />
        <div class="text">{{msgList.length}}</div>
      </div>
    </div>
    <div class="btm row j-a a-c">
      <div class="item col a-c" @click="edit" v-if="info.userid == localuserid">
        <img class="" src="./set.png" alt="" />
        <div class="text">设置</div>
      </div>
      <div class="item col a-c" @click="create" v-else>
        <img class="" src="./make.png" alt="" />
        <div class="text">我要制作</div>
      </div>
      <div class="item col a-c" @click="notoShareShow()" v-if="info.userid == localuserid">
        <img class="" src="./noshare.png" alt="" />
        <div class="text" style="color:#b0b0b0">申请共享</div>
      </div>
      <div class="item col a-c" @click="toShareShow(true)" v-else>
        <img class="" src="./toshare.png" alt="" />
        <div class="text">申请共享</div>
      </div>

      <div class="item col a-c" @click="share">
        <img class="" src="./share.png" alt="" />
        <div class="text">转发分享</div>
      </div>
    </div>
    <!-- 申请共享 -->
    <van-popup v-model="show" class="shareWrapper col a-c">
      <div class="title row a-c j-c">共享纪念堂申请</div>
      <div class="text row a-c j-c" v-if="sharemsgCount">嗨～您收到{{sharemsgCount}}条来自亲友的共享纪念堂申请</div>
      <div class="text row a-c j-c" v-else>您暂时未收到新的共享纪念堂申请消息</div>
      <div class="text row a-c j-c" v-if="sharemsgCount">请尽快审核</div>
      <div class="check row a-c j-c">共享后亲友也可以收到纪念日提醒功能</div>
      <div class="btn row a-c j-c" @click="look">查看</div>
    </van-popup>
    <!-- 祭祀流程 -->
    <van-popup v-model="remind" class="remindWrapper col a-c">
      <div class="titlewhite row a-c j-c">祭奠流程</div>
      <div class="text">1.清扫祭奠区域</div>
      <div class="text">2.上香烛</div>
      <div class="text">3.献花</div>
      <div class="text">4.敬献贡品</div>
      <div class="text">5.留言</div>
      <div class="text" style="margin-bottom:15px">6.行礼</div>
      <div class="check van-hairline--top" style="padding-top:15px;padding-bottom:8px">祭奠须知</div>
      <div class="check">1、祭奠时请端正您的姿态</div>
      <div class="check">
        2、祭奠前请放下与祭奠无关的工作，如吃东西、喝水、吸烟等
      </div>
      <div class="check" style="margin-bottom:8px">3、祭奠后如方便，请叩拜或起立默哀一分钟</div>
      <div class="btn row a-c j-c" @click="remindShow">知道了</div>
    </van-popup>
    <!-- 留言 -->
    <van-popup v-model="msg" position="bottom" class="msgWrapper col a-c" closeable>
      <div class="title">留言</div>
      <!-- <div class="close" @click="msgShow(false)">关闭</div> -->
      <div class="noInfoMsg" v-if="!msgList.length">暂无留言内容~</div>
      <div class="itemWrapper">
        <div class="item  row j-b" v-for="(item, index) in msgList" :key="index">
          <img class="avater" :src="item.headimgurl" alt="" />
          <div class="info">
            <div class="msgname">
              <div class="row a-c j-b">
                <div class="name">{{item.nickname}}</div>
                <div class="date" v-if="info.userid != localuserid">{{item.createdate}}</div>
              </div>
              <div class="text">
                {{item.remark}}
              </div>
            </div>
            <div class="btmItem  row a-c" v-if="info.userid == localuserid">
              <div class="date">{{item.createdate |moment}}</div>
              <div class="dalete" v-if="info.userid == localuserid" @click="_msgdel(item.id)">删除留言</div>
              <div class="btn  row j-c a-c" v-if="info.userid == localuserid && !item.reply" @click="_msgreply(item.id)">回复</div>
            </div>
            <div class="replay" v-if="item.reply">
              <div class="text">
                回复： {{item.reply}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bar"></div>
      <div class="btn row a-c j-c" @click="_msgadd">写留言</div>
    </van-popup>
    <!-- 来访记录 -->
    <van-popup v-model="visit" position="bottom" class="visit col a-c" closeable>
      <div class="title">来访记录</div>
      <!-- <div class="close" @click="visitShow(false)">关闭</div> -->
      <div class="item-wrapper">
        <div class="noInfoMsg" v-if="!visitCon.length">暂无来访记录~</div>
        <div class="item row a-c j-b" v-for="(item, index) in visitCon" :key="index">
          <img class="avater" :src="item.headimgurl" alt="" />
          <div class="name">{{item.nickname}}</div>
          <div class="des">{{item.title}}</div>
          <div class="time">{{item.createdate}}</div>
        </div>
      </div>
      <div class="bar"></div>
    </van-popup>
    <!-- 共享 -->
    <van-popup v-model="toShare" position="bottom" class="toShare col a-c" closeable>
      <div class="title">申请共享追思纪念堂</div>
      <!-- <div class="close" @click="toShareShow(false)">关闭</div> -->
      <div class="btmMsg van-hairline--top">
        <div class="item row j-b a-c">
          <div class="text">逝者生平</div>
          <div class="btn row a-c j-c" @click="lifeSelect">选择生平模板</div>
        </div>
        <textarea class="life" name="life" v-model="sharelife" @blur="getHeight"></textarea>
        <div class="item row j-b a-c">
          <div class="text">追思人姓名</div>
          <input name="fallname" v-model="sharename" type="text" placeholder="请输入追思人姓名" />
        </div>
        <div class="headImgCon  row j-b a-c">
          <div class="text">美好回忆</div>
          <img class="headImg" id="ImageUp" src="./headUp.png" alt="" @click="goodImg" />
        </div>
        <div class="lifeImg row f-w j-b">
          <div class="item" v-for="(item,index) in lifeImg" :key="index">
            <img class="delect" src="./delect.png" alt="" @click="delect(index)">
            <img class="" :src="item" alt="">
            <!-- 调试用 -->
            <!-- <img class="" src="http://cdn.fuyulove.com/Upload/userimg/2020/4/20/04c78b8d960844848c4bea5505182ae8.jpg" alt=""> -->
          </div>
        </div>
        <div class="btmCon col j-c a-c" @click="_shareCard()">
          <div class="sharebtm row j-c a-c">提交</div>
        </div>
      </div>
    </van-popup>
    <!-- 花 -->
    <van-popup v-model="flower" position="bottom" class="flowerWrapper col a-c" :close-on-click-overlay="false" closeable @closed="closed()">
      <div class="title">献花</div>
      <!-- <div class="close" @click="flowerShow(false)">关闭</div> -->
      <div class="content row j-b f-w">
        <div class="item col a-c j-c" v-for="(item, index) in flowerCon" :key="index" @click="flowerSlecet(index)" :class="{ active: isActive == index }">
          <img class="" :src="item.imgurl" alt="" />
          <div class="text">{{ item.proname }}</div>
        </div>
      </div>

      <div class="flowerbtn row j-b">
        <div class="row item">
          <div class="money">收费 :</div>
          <div class="num"><span>￥</span>2</div>
        </div>
        <div class="row item">
          <div class="preview row j-c a-c" @click="preview">预览</div>
          <div class="send row j-c a-c" @click="sendflower()">送出</div>
        </div>
      </div>
    </van-popup>
    <!-- 查看鲜花 -->
    <div class="flowerPreview col a-c" v-if="flowerPreview">
      <img class="" :src="flowerImg" />
      <div class="text">鲜花摆件</div>
    </div>
    <!-- 送花 -->
    <transition name="fade">
      <img class="hidetip" :src="flowerImg" v-if="visible" />
    </transition>
    <!-- 送贡品 -->
    <transition name="fade">
      <img class="hidetip" :src="proImg" v-if="visiblepro" />
    </transition>
    <!-- 扫莫 -->
    <transition name="fade">
      <img class="clean" src="./clean.gif" v-if="clean" />
    </transition>

    <!-- 查看贡品-->
    <div class="flowerPreview col a-c" v-if="proPreview">
      <img class="" :src="proImg" />
      <div class="text">贡品摆件</div>
    </div>
    <!-- 献礼 -->
    <van-popup v-model="tribute" position="bottom" class="flowerWrapper col a-c" :close-on-click-overlay="false" closeable @closed="closed()">
      <div class="title">献礼</div>
      <!-- <div class="close" @click="tributeShow(false)">关闭</div> -->
      <div class="content row j-b f-w">
        <div class="item col a-c j-c" v-for="(item, index) in proCon" :key="index" @click="proSlecet(index)" :class="{ active: ispro == index }">
          <img class="" :src="item.imgurl" alt="" />
          <div class="text">{{ item.proname }}</div>
        </div>
      </div>
      <div class="flowerbtn row j-b">
        <div class="row item">
          <div class="money">收费 :</div>
          <div class="num"><span>￥</span>2</div>
        </div>
        <div class="row item">
          <div class="preview row j-c a-c" @click="previewPro">预览</div>
          <div class="send row j-c a-c" @click="sendtribute(false)">送出</div>
        </div>
      </div>
    </van-popup>
    <!-- 写留言 -->
    <van-popup v-model="msgadd" class="remindWrapper col a-c">
      <div class="title row a-c j-c">请输入留言赠与</div>
      <textarea class="msgadd" placeholder="请输入内容" v-model="remark" @blur="getHeight"></textarea>
      <div class="sendbtn row j-b">
        <div class="sendbtntip" @click="sendbtntip">点我换一句</div>
        <div class="sendcustom" @click="sendcustom">自定义留言</div>
      </div>
      <div class="sendNum">{{remark.length}}/50</div>
      <div class="btn row a-c j-c" @click="msgaddBtn">提交</div>
    </van-popup>
    <!-- 回复留言 -->
    <van-popup v-model="msgreply" class="remindWrapper col a-c">
      <div class="title row a-c j-c">请输入回复内容</div>
      <textarea class="msgadd" placeholder="请输入内容" v-model="reply" @blur="getHeight"></textarea>
      <div class="sendNum" style="margin-top:10px">{{reply.length}}/50</div>
      <div class="btn row a-c j-c" @click="msgreplyBtn">提交</div>
    </van-popup>
    <!-- 逝者生平 -->
    <van-popup v-model="lifeshow" position="bottom" :style="{ height: '80%' }" close-icon="close" closeable>
      <div class="lifeTpl">
        <div class="tplTitle">
          <span>生平模板选用</span>
        </div>
        <div class="tplList">
          <div class="tplItem" v-for="(item,index) in lifelist" :key="index">
            <div class="itemTitle">{{item.title}}</div>
            <div class="itemText">
              {{item.desn}}
            </div>
            <div class="selectedTpl" @click="tempSelect(index)">选用此模板</div>
          </div>
        </div>
      </div>
    </van-popup>

  </div>
</template>
<script type="text/ecmascript-6">
import Music from 'components/Music/Music'
// import upImg from 'components/upImg/upImg'
var wx = require('weixin-js-sdk')
import { msglist, sharemsg, shareCard, msgreply, msgdel, msgadd, view, prolist, giveflower, getip, opera } from 'api/index'
import axios from 'axios'
import { Toast, ImagePreview } from 'vant'
export default {
  data() {
    return {
      title: '',
      imgbg: '',
      lifeImg: [],
      showCrop: true,
      sharelife: '',
      sharename: '',
      sharemsgCount: 0,
      slideshow: true,
      msgid: '',
      msgreply: false,
      reply: '',
      remark: '',
      msgadd: false,
      localuserid: localStorage.getItem('userid'),
      msgList: [],
      pointlow: '',
      imgsArr: [],
      leftItems: [],
      rightItems: [],
      zizhi: '',
      point: 4,
      shop: '',
      proproid: '',
      visitCon: [
        // {
        //   title: "",
        //   headimgurl: '',
        //   createdate: '',

        // },
      ],
      info: '',
      flowerproid: [],
      carid: '',
      list: [],
      light: false,
      peson: true,
      clean: false,
      visiblepro: false,
      visible: false,
      show: false,
      remind: false,
      msg: false,
      visit: false,
      toShare: false,
      flower: false,
      tribute: false,
      flowerPreview: false,
      proPreview: false,
      musicSrc: 'http://sanhe.made.fg1413.com/UpLoadImg/UpLoadPic//2019/2019-11-16/bg2.mp3',
      flowerCon: [
        {
          imgUrl: require('./small (1).png'),
          name: '鲜花摆件1'
        },
        {
          imgUrl: require('./small (2).png'),
          name: '鲜花摆件2'
        },
        {
          imgUrl: require('./small (3).png'),
          name: '鲜花摆件3'
        },
        {
          imgUrl: require('./small (4).png'),
          name: '鲜花摆件4'
        },
        {
          imgUrl: require('./small (5).png'),
          name: '鲜花摆件5'
        },
        {
          imgUrl: require('./small (6).png'),
          name: '鲜花摆件6'
        },
        {
          imgUrl: require('./small (7).png'),
          name: '鲜花摆件7'
        },
        {
          imgUrl: require('./small (8).png'),
          name: '鲜花摆件8'
        },
        {
          imgUrl: require('./small (9).png'),
          name: '鲜花摆件9'
        },
        {
          imgUrl: require('./small (10).png'),
          name: '鲜花摆件10'
        },


      ],
      proCon: [
        {
          imgUrl: require('./proSmall (1).png'),
          name: '贡品摆件1'
        },
        {
          imgUrl: require('./proSmall (2).png'),
          name: '贡品摆件2'
        },
        {
          imgUrl: require('./proSmall (3).png'),
          name: '贡品摆件3'
        },
        {
          imgUrl: require('./proSmall (4).png'),
          name: '贡品摆件4'
        },
        {
          imgUrl: require('./proSmall (5).png'),
          name: '贡品摆件5'
        },
        {
          imgUrl: require('./proSmall (6).png'),
          name: '贡品摆件6'
        },
        {
          imgUrl: require('./proSmall (7).png'),
          name: '贡品摆件7'
        },
        {
          imgUrl: require('./proSmall (8).png'),
          name: '贡品摆件8'
        },
        {
          imgUrl: require('./proSmall (9).png'),
          name: '贡品摆件9'
        },
        {
          imgUrl: require('./proSmall (10).png'),
          name: '贡品摆件10'
        },

      ],
      isActive: 0,
      ispro: 0,
      imgArr: ['big (1).png', 'big (2).png', 'big (3).png', 'big (4).png', 'big (5).png', 'big (6).png', 'big (7).png', 'big (8).png', 'big (9).png', 'big (10).png'],
      proArr: ['proBig (1).png', 'proBig (2).png', 'proBig (3).png', 'proBig (4).png', 'proBig (5).png', 'proBig (6).png', 'proBig (7).png', 'proBig (8).png', 'proBig (9).png', 'proBig (10).png'],
      msgIndex: 0,
      lifeshow: false,
      lifelist: [

        {
          title: '妈妈',
          desn: "亲爱的妈妈，每当我在心里喊出这句话，总是忍不住红了眼眶。\n就像歌里唱的“世上只有妈妈好”，这是童年时光里必唱的歌谣，越长大才越明白妈妈。\n委屈的泪花，你来擦；下雨的泥泞，你来遮；爱吃的食物，你来做；沉重的书包，你来拿。你给了我生命，给了我一个温暖的家。\n我第一次离开家去上大学的时候，你哭红了眼睛，跟我千叮咛万嘱咐，每天你的电话从不迟到，你总说孩子，还好吗？从一开始认真回答你，到后来慢慢敷衍，甚至生气跟你说，我不是小孩子了，你总是在电话那头笑笑，包容着我。\n工作后，有一次发烧特别厉害，本想发给舍友让帮忙带退烧药，结果发到您的手机上，从南到北的距离，您花了三个小时出现在我的宿舍门口，拿着温热的粥和药，着急的眼神到现在我都一直记得。\n直到你离开我才知道，再没有人可以像你这样给我温暖的爱，也没有人可以这样时刻等候着我，只要我有需要，你一定会陪着我，相信我鼓励我，以我为骄傲，以我为世界。妈妈，我想你，每一天。\n借着你的爱，我长大了，成熟了，慢慢面对世界的风风雨雨，知道这不容易，但是我一定会努力，请你也相信我，为我加油。\n每一年的母亲节，我都会到街上买一束康乃馨，包扎得很漂亮，放在你遗照前，跟你说一声母亲节快乐，我知道你一定听得见。\n有一天，我们总会天上相见，再跟您诉说我的思念，我的爱。 "
        },
        {
          title: '爸爸',
          desn: "敬爱的爸爸，你好。\n还记得小时候，我总爱爬上你的肩头，那是我登过最高的地方，你不爱说话，看着我懂事会笑，我任性的时候巴掌会落下来。我对你又爱又怕。\n记忆里，你总是很忙，妈妈说你像拉牛的车，任劳任怨，勤勤恳恳，不能停下来，只能不停工作，你肩上有很多的压力，上有老下有小。那时候我不懂，后来才知道原本也是男孩的你需要承受多少生活的重担。\n总是习惯向你伸手，却忘记对你认真说声谢谢。每次离开的时候，妈妈哭红眼，你在一旁还要生气凶妈妈，好像很轻松，巴不得我离开一样。\n时光太快了，快得我都忘了怎么像小时候那样牵着你的手，撒娇。\n和你吵过太多次架了，我觉得你不爱我，心里有恨。记得中学时候有一个很喜欢的玩具，是自己亲手用木头一块块做起来的天桥建筑，花了很多时间，有时候功课都忘记做，你非常生气，一下子就把它砸得粉碎，无情地对待我，我当时哭闹了很久，后来和你隔阂越来越深了，面对你只有沉默。\n有一天，妈妈和我坐在院子里回忆，从箱子里拿出了一个玩具，很旧很破，充满了修补的痕迹，妈妈说，你后来非常后悔，也落泪了。\n我内心受到了很大的冲击，原来我并不了解我的爸爸。\n一生要强的你老了，直到你离开那刻我才意识到，原来无坚不摧的爸爸，也会有这样一天。我是你的骄傲吗，你还在为我而担心吗？\n遇到再多困难的时候，我都会想起你风淡云轻的笑，你总说，一切都会过去了的，什么都会好起来的。\n那么现在的你，好吗？"
        },
        {
          title: '爷爷',
          desn: "爷爷，你好吗？\n记得小时候，你总是喜欢陪着我。\n总跟在我后面，一个劲叫我名字，也喜欢牵着我的手走在乡间小路上去买好吃的，不管我喜欢吃什么，你都笑眯眯地掏钱买，回到家后，爸妈不让我吃，你总是板着脸对他们说，难得我疼我孙子，你们管得着嘛！霸气的样子想起来都觉得很温暖。\n你不会说故事，也不会唱歌，总是静静地笑着陪着我，我累了不想走路，你总是背着我走，不管前面路多远。\n暑假的时候，我总是回到您身边，房间的氛围很温暖，摆着我爱吃的东西，你会陪着我做功课，把电视调成静音，如今想起来很怀念。\n那时候你总说，不知道我什么时候长大，不知道能不能参加我的婚礼，抱上曾孙子，那时候的我总觉得一定可以实现的，可是没有想到这样简朴的愿望抵不过命运。\n工作以后，我越来越忙，很难得能回去看你一眼，有天听姑姑说你病了，总是喊着我的名字，我却来不及看你，那是我最深的遗憾。\n你对我那么好，我却只是喊你一声爷爷而已。\n我很想念你，我可爱的爷爷。\n现在的我长大了，有了自己的小家庭，像你说的要好好生活，要存积蓄，正在不断努力中。\n你最担心的孙子，一切都好，希望另一个世界的你也一样，好好的。"
        },
        {
          title: '父母',
          desn: "亲爱的父亲XX，母亲XX：\n天堂的你们，好吗？ \n时间过得太快了，思念却好像静止了。如今，我还时常有恍惚，好像你们都还在我身边，陪着我，不管我遇到多大风雨，有多无助，只要一扭头，你们就会在我身后伸出双手接住我。\n从不放弃，总在那里，默默付出，不求回报，这样无私的感情，天地间，只有你们给予我。\n小时候，我总盼着快点长大，好像长大了就可以主宰世界，不用你们的庇护了，时间很快，我马不停蹄地离开你们，去了很远的城市生活，自由的空气让我非常惬意，慢慢忽视来自你们的关心，电话漏接不回，短信收到不回，仗着你们绝对不会对我生气的包容，有恃无恐。\n这样的傲慢让我看不见你们被岁月染白的鬓毛，看不见你们为我担心的日日夜夜，看不见你们期盼我常回家看看的愿望。 \n没有父母，就没有来时路。儿时看过的一句话，现在才明白。没有了你们，再没有庇护，没有了家，没有了故乡，我只能自己面对前路的艰辛，当我难受的时候，更多是独自抚慰的孤独。 \n在失去你们的日子里，我过得不好，思念和后悔占据了一心，可是渐渐地我好起来了，在往后生活里，你们并没有离开我，曾经教导我的点滴变得越发清晰，呈现在我眼前，慢慢改变我，帮助我过上更好的生活。\n爱，从不会随着逝去而消失，只会越来越强大。\n也许未来的路还很长，也许充满曲折和荆棘，但是你们总会为我引路，和我相扶，谢谢你们，我亲爱的父母。"
        },
        {
          title: '祖辈',
          desn: "亲爱的爷爷XXX，奶奶XXX：\n俗话说：“人老隔辈亲，爷奶疼小孙，人间天伦乐。”\n从小，最疼我的就是你们。\n多想回到20年前那个洒满月光的晚上，跟着爷爷的脚步，踏着地上的脚印，慢慢走在田埂上，只要喊一声，就会有一张大大的笑脸回头看我，他总说不论我去哪，他都会骑着车去接我回家。\n多想回到15年前的暑假，奶奶会在家里面煮上很多好吃的食物，香味飘散一屋子，勾出我肚子里的小馋虫，不停跟我说，快吃，多吃点。牵着我的手到街上买东西，不管我喜欢什么零食和玩具，一定会给我买。\n现在推开驳杂的大门，我好像还可以看见门后独自坐在院落里，茶香隐语，爷爷笑得腼腆而安静，我蹲在一旁问何时可以给我讲个故事和拉二胡，奶奶在一旁唠唠叨叨地说话，笑出满脸褶子，看起来那么漂亮。\n那时候，你们总说常回家看看你们。我都满嘴答应好的，心想多么容易的事情，不成想，在后来的时光里，连这样简单的期待都没能满足，而你们总不会怪罪，总是等着我。\n亲爱的爷爷奶奶，我很后悔，现在也只能后悔，我知道只有我拥有好的生活，你们才能满足，我一定会好好生活，过出自己的精彩，天上的你们是不是也笑着点点头，相信我呢？\n希望思念可以通过这封信飘到云端飘到你们那里，希望你们知道，我从不曾遗忘你们，因为爱，总有美满，谢谢你们的爱。"
        },

      ],
      ismsg: 0,
      sid: 0,
      container: false,
      msgRandom: [
        "追忆曾经，历历在目，谢谢你来过我的生命，留下如此美丽的故事。",

        "回忆像说书的人，用充满乡音的口吻，每当想起你，时光总是那么叫人怀念！ ",

        "遗忘才是真正的死亡，我们都在这里追思，你不曾离去，只是换种形式存在。",

        "借由这里，托去我的思念，愿另一个世界的你，一切安好。",

        "我敲打键盘的声音，是我为你祈祷的心，我在想你。",

        "在我心里，你是永恒的美好，灿烂温暖，值得我念念不忘。",
      ]
    }
  },
  computed: {
    flowerImg: function () {
      return require("./" + this.imgArr[this.isActive])
    },
    proImg: function () {
      return require("./" + this.proArr[this.ispro])
    },


  },
  // 清除控制提示的隐藏与显示缓存
  beforeRouteLeave(to, from, next) {
    sessionStorage.setItem('remind', false)
    next();
  },
  mounted() {
    // 控制提示的隐藏与显示
    if (sessionStorage.getItem('remind') == 'false') {
      sessionStorage.setItem('remind', false)
      this.remind = false
    } else {
      sessionStorage.setItem('remind', true)
      this.remind = true
    }
    // 初始化留言的值
    this.remark = this.msgRandom[0]


    document.body.scrollTop = document.documentElement.scrollTop = 0
    this._prolist()
    this._proCon(1)
    this._view()
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
  },
  //监听
  watch: {
    remark() {
      if (this.remark.length > 50) {
        Toast('最多输入50字')
      }
    },
    reply() {
      if (this.reply.length > 50) {
        Toast('最多输入50字')
      }
    },
  },
  methods: {
    // 图片预览
    imgPrew(flag) {
      ImagePreview({
        images: [flag],
        closeable: true,
        showIndex: false
      });
    },
    // 分享

    wxShare() {
      let link = 'http://b.fuyulove.com/wisdom/#' + localStorage.getItem('fromUrl')
      axios.get('http://b.fuyulove.com/Action/CacheData.aspx?action=jssdk', {
        params: {
          url: location.href.split('#')[0],
          t: Math.random()
        }
      })
        .then(res => {
          console.log('授权', res)
          config(res.data.data.data)
        })
        .catch(function (error) {
          console.log(error);
        });
      const config = (data) => {
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: data.appid, // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature, // 必填，签名，见附录1
          jsApiList: [
            'getLocation',
            'onMenuShareAppMessage',
            'onMenuShareTimeline',
            'chooseImage',
            'uploadImage',
            'downloadImage',
            'previewImage',
            'startRecord',
            'stopRecord',
            'playVoice',
            'uploadVoice',
            'getLocalImgData'
          ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
        wx.ready(() => {
          wx.onMenuShareAppMessage({
            title: this.title,
            link: link,
            desc: "您的好友邀请您来一同追思",
            imgUrl: 'http://b.fuyulove.com/wisdom/img/share.jpg',
          })
        })
        wx.onMenuShareTimeline({
          title: this.title,
          link: link,
          desc: "您的好友邀请您来一同追思",
          imgUrl: 'http://b.fuyulove.com/wisdom/img/share.jpg',
        })
        wx.error(function () { })
      }


    },

    // 自定义留言
    sendcustom() {
      this.remark = ''

    },

    // 取随机数
    sendbtntip() {
      this.remark = this.msgRandom[Math.floor(Math.random() * 5)]

    },
    // 选择生平模板
    tempSelect(index) {
      this.sharelife = this.lifelist[index].desn
      this.lifeshow = false

    },
    // 逝者生平
    lifeSelect() {
      this.lifeshow = true

    },
    // 解决输入框高度bug不稳定问题
    getHeight() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    // 删除{美好回忆图片
    delect(flag) {
      this.lifeImg.splice(flag, 1)

    },
    // 美好回忆
    goodImg() {
      wx.chooseImage({
        count: 9,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          console.log('微信返回', res)
          let localIds = res.localIds;
          console.log(localIds.length)
          for (var i = 0; i < localIds.length; i++) {
            this.syncUpload(localIds[i]);

          }
        }
      });
    },
    syncUpload(localId) {
      wx.uploadImage({
        localId: localId,
        success: (res) => {
          console.log('微信上传', res)
          this.wxImgDown(res.serverId);

        }
      });

    },
    wxImgDown(id) {
      axios({
        method: "post",
        url: 'http://cdn.fuyulove.com/action/wxImgDown.ashx',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          media_id: id,
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then((res) => {
        console.log('本地下载', res)
        this.lifeImg = this.lifeImg.concat(res.data.msg)
        console.log('this.lifeImg', this.lifeImg)
      }).catch(function (error) {
        console.log(error);
      });

    },
    // 是否有纪念堂消息
    _sharemsg(carid) {
      sharemsg({
        carid: carid
      }).then(res => {
        console.log('是否有纪念堂消息', res)
        // Toast(res.msg)
        this.sharemsgCount = res.data.count
      })
    },

    // 申请共享纪念堂
    _shareCard() {
      let imglist = this.lifeImg.join("|")
      shareCard({
        life: this.sharelife,
        carid: this.carid,
        imglist: imglist,
        fallname: this.sharename
      }).then(res => {
        console.log('申请共享纪念堂', res)
        Toast(res.msg)
        this.toShare = !this.toShare
      })
    },
    // 回复留言
    _msgreply(msgid) {
      this.msgreply = !this.msgreply
      this.msgid = msgid

    },
    // 提交回复内容
    msgreplyBtn() {
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
        reply: this.reply
      }).then(res => {
        if (res.code == 0) {
          console.log('回复留言成功', res)
          this._msglist(this.carid)
          this.msgreply = !this.msgreply
          this.reply = ''
        }
      })

    },
    // 删除留言
    _msgdel(msgid) {
      msgdel({
        msgid: msgid,
        carid: this.carid,
      }).then(res => {
        if (res.code == 0) {
          console.log('删除留言成功', res)
          this._msglist(this.carid)

        }
      })
    },
    // 留言
    msgaddBtn() {
      if (this.ismsg == 1) {
        Toast('用户已关闭留言功能')
        return false
      }
      if (this.remark == '') {
        Toast('请输入留言内容')
        return false
      }
      if (this.remark.length > 50) {
        Toast('最多输入50字')
        return false
      }
      msgadd({
        remark: this.remark,
        carid: this.carid,
      }).then(res => {
        if (res.code == 0) {
          console.log('留言成功', res)
          this._msglist(this.carid)
          this.msgadd = !this.msgadd
          // this.remark = ''


        }
      })

    },
    // 留言
    _msgadd() {
      this.msgadd = !this.msgadd

    },

    // 查看更多商家信息
    shopDetail() {
      location.href = 'http://wx.fuyulove.com/Merch/detail?sid=' + this.info.sid
    },
    // 美好回忆图片
    updateWaterfall() {
      const leftHeight = this.$refs.left.clientHeight
      const rightHeight = this.$refs.right.clientHeight
      let item = this.imgsArr.shift()

      if (item == null) {
        return
      }
      if (leftHeight <= rightHeight) {
        this.leftItems.push(item)
      } else {
        this.rightItems.push(item)
      }
      this.$nextTick(function () {
        this.updateWaterfall()

      })

    },
    // 点灯
    _opera() {
      opera({
        o: 1,
        carid: this.carid,
      }).then(res => {
        if (res.code == 0) {
          console.log('点灯', res)
          this.info.deng++
          this._getip(this.carid)

        }

      })
    },
    // 打扫
    _operaclean() {
      opera({
        o: 0,
        carid: this.carid,
      }).then(res => {
        if (res.code == 0) {
          console.log('打扫', res)
          this.info.sao++
          this._getip(this.carid)
        }

      })
    },
    // 获取来访记录
    _getip(carid) {
      getip({
        carid: carid,
      }).then(res => {
        console.log('来访记录', res)
        this.visitCon = res.data.list
        this.msgIndex = 0

      })
    },
    // 获取留言
    _msglist(carid) {
      msglist({
        action: "msglist",
        carid: carid
      }).then(res => {
        console.log('获取留言', res);
        this.msgList = res.data.list
      })

    },

    // 送花
    _giveflower(proid, o) {
      giveflower({
        o: o,
        carid: this.carid,
        proid: proid,
        number: 1
      }).then(res => {
        console.log('送花', res)
        if (res.code == 0) {
          if (o == 2) {
            this.info.hua++
          } else {
            this.info.liwu++
          }
          this._getip(this.carid)
        }
      })
    },
    // 获取鲜花
    _prolist() {
      prolist({
        cate: 0
      }).then(res => {
        console.log('鲜花', res)
        this.flowerCon = res.data.list
        this.flowerproid = this.flowerCon.map(function (item) {
          return item.id;
        });
      })
    },
    _proCon() {
      axios({
        method: "post",
        url: 'http://wx.fuyulove.com/Action/MemorApi?action=prolist&cate=1',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
      }).then((res) => {
        console.log('贡品', res)
        this.proCon = res.data.data.list
        this.proproid = this.proCon.map(function (item) {
          return item.id;
        });

      })


    },
    // 详情
    _view() {
      view({
        action: 'view',
        carid: this.$route.query.carid
      }).then(res => {
        console.log('纪念堂详情', res)
        if (res.code == 0) {
          this.list = res.data.list
          this.info = res.data.info
          this.imgbg = this.info.imgbg
          this.container = true
          this.shop = res.data.shop
          this.point = parseInt(this.shop.point)
          this.pointlow = 5 - this.point
          this.zizhi = this.shop.zizhi.split(',')[0]
          if (this.info.imglist != '') {
            this.imgsArr = this.info.imglist.split('|')
          }
          this.musicSrc = this.info.musicurl
          this.ismsg = this.info.ismsg
          this.sid = this.info.shopid
          sessionStorage.setItem('sid', this.sid)
          this.carid = this.info.id
          this.title = this.info.title + '的纪念堂'
          this._msglist(this.carid)
          this._getip(this.carid)
          this._sharemsg(this.carid)
          this.wxShare()

        } else if (res.code == 1) {
          this.$router.push({
            path: '/delete',
          })

        }
      })

    },
    pesonShow() {
      this.peson = !this.peson
      setTimeout(() => {
        if (this.imgsArr.length) {
          this.updateWaterfall()
        }
      }, "200");


    },
    share() {
      this.$router.push({
        path: '/share',
        query: {
          carid: this.$route.query.carid,
        }

      })
    },

    look() {
      this.$router.push({
        path: '/news',
        query: {
          carid: this.carid
        }
      })
    },
    shareMsg() {
      this.show = true

    },
    remindShow() {
      this.remind = false

    },
    closed() {
      this.flowerPreview = false
      this.proPreview = false

    },
    msgShow(flag) {
      this.msg = flag

    },
    visitShow(flag) {
      this.visit = flag

    },
    toShareShow(flag) {
      this.toShare = flag
    },
    notoShareShow() {
      Toast('您已拥有该纪念堂')

    },
    // 开关鲜花
    flowerShow(flag) {
      this.flower = flag
      if (!flag) {
        this.flowerPreview = flag
      }
    },
    // 选择花
    flowerSlecet(flag) {
      this.isActive = flag

    },
    // 送花
    sendflower() {
      this.flower = false
      this.flowerPreview = false
      this.visible = true
      let proid = this.flowerproid[this.isActive]
      this._giveflower(proid, 2)
      setTimeout(() => {
        this.visible = false
      }, "2000");
    },
    // 清扫
    cleanShow() {
      this.clean = true
      setTimeout(() => {
        this.clean = false
      }, "2000");
      this._operaclean()
    },
    lightShow() {
      this.light = true
      this._opera()
    },
    // 送贡品
    sendtribute() {
      this.tribute = false
      this.proPreview = false
      this.visiblepro = true
      let proid = this.proproid[this.ispro]
      this._giveflower(proid, 3)
      setTimeout(() => {
        this.visiblepro = false
      }, "2000");
    },
    // 选贡品
    proSlecet(flag) {
      this.ispro = flag
    },
    // 开关贡品
    tributeShow(flag) {
      this.tribute = flag
      if (!flag) {
        this.proPreview = flag
      }
    },
    create() {
      this.$router.push({
        path: '/create',
        query: {
          sid: this.sid,
        }
      })
    },
    edit() {
      this.$router.push({
        path: '/setting',
        query: {
          carid: this.carid
        }
      })

    },

    preview() {
      this.flowerPreview = true
    },
    previewPro() {
      this.proPreview = true
    }


  },
  components: {
    Music,
    // upImg

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
  .bg
    width 100%
    height auto
    position absolute
    z-index -1
  .top
    color #ffffff
    margin-top 24px
    padding 0 24px
    font-size 28px
    .item
      .eye
        width 33px
        height 23px
        margin-right 10px
      .news
        width 29px
        height 35px
        margin-right 24px
      .music
        width 44px
        height 44px
        margin-left 24px
  .msg
    color #ffffff
    border-radius 30px
    background-color rgba(0, 0, 0, 0.2)
    width 492px
    // height 59px
    padding 5px 10px
    margin-top 30px
    margin-left 20px
    font-size 28px
    .slidename
      max-width 120px
      overflow hidden
      display -webkit-box
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
  .personWrapper
    position fixed
    bottom 309px
    left 50%
    transform translate(-50%, 0%)
    .light
      width 198px
      margin-bottom 20px
    .personContent
      background-color #ffffff
      border-radius 10px
      .person
        width 684px
        height 207px
        border-radius 10px
        padding 0 18px
        margin-top 8px
        background-color #ffffff
        .portrait
          position relative
          padding 6px
          border 1px solid #f5f5f5
          background-color #ffffff
          bottom 20px
          width 177px
          height 208px
        .item
          font-size 25px
          margin-left 25px
          .name
            font-size 30px
            color #0f0f0f
            overflow hidden
            display -webkit-box
            -webkit-box-orient vertical
            -webkit-line-clamp 1
            text-overflow ellipsis
          .age
            color #909090
            font-size 26px
          .des
            color #909090
          .add
            img
              width auto
              height 24px
              margin-right 5px
            .address
              overflow hidden
              display -webkit-box
              -webkit-box-orient vertical
              -webkit-line-clamp 1
              text-overflow ellipsis
      .persondetail
        border-radius 10px
        background-color #ffffff
        color #909090
        height 400px
        width 684px
        overflow hidden
        overflow-y scroll
        font-size 27px
        padding 26px
        padding-bottom 140px
        .infolife
          white-space pre-wrap
        .memory
          width 266px
          height 40px
          margin 50px auto
        .imgList
          width 100%
          box-sizing border-box
          // margin 20px auto
          .left-waterfall
            float left
            .item
              width 100%
              img
                height auto
                margin-top 10px
                width 300px
                border-radius 10px
          .right-waterfall
            float right
            .item
              width 100%
              img
                height auto
                margin-top 10px
                width 300px
                border-radius 10px
        .clear
          clear both
  .series
    position fixed
    bottom 126px
    color #ffffff
    padding 0 50px
    width 100%
    .item
      img
        width 93px
        height auto
      .text
        margin-top 15px
  .btm
    position fixed
    bottom 0
    height 96px
    background-color #ffffff
    width 100%
    color #5aa967
    font-size 25px
    img
      width 34px
      height 34px
    .text
      margin-top 5px
  .shareWrapper
    width 648px
    border-radius 20px
    .title
      width 100%
      height 80px
      background-color #5aa967
      color #ffffff
      font-size 32px
      margin-bottom 90px
    .text
      font-size 34px
      line-height 42px
      color #0f0f0f
    .check
      margin-top 80px
      color #909090
      margin-bottom 25px
      font-size 27px
    .btn
      width 600px
      height 91px
      background-color #5aa967
      border-radius 10px
      margin-bottom 19px
      color #ffffff
      font-size 36px
  .remindWrapper
    width 648px
    border-radius 20px
    .title
      width 100%
      height 80px
      background-color #5aa967
      color #ffffff
      font-size 32px
      margin-bottom 26px
    .titlewhite
      width 100%
      font-weight 700
      color #1f1f1f
      font-size 40px
      margin-top 29px
      margin-bottom 50px
    .text
      font-size 34px
      line-height 42px
      color #1f1f1f
      width 600px
      margin-bottom 15px
    .check
      color #909090
      width 600px
      font-size 30px
    .btn
      margin-top 27px
      width 600px
      height 91px
      background-color #5aa967
      border-radius 10px
      margin-bottom 19px
      color #ffffff
      font-size 36px
      letter-spacing 2px
    .sendbtn
      width 600px
      margin-top 20px
      .sendbtntip
        color #5aa967
        font-size 27px
        border-bottom 1px solid #5aa967
      .sendcustom
        border 1px solid #5aa967
        font-size 27px
        color #5aa967
        border-radius 10px
        padding 5px
    .sendNum
      color #909090
      font-size 27px
  .visit
    padding 0 26px 0 46px
    height 620px
    .title
      margin 19px auto
    .close
      position absolute
      right 27px
      top 19px
      color #b6b6b6
      font-size 30px
    .item-wrapper
      width 100%
      .noInfoMsg
        color #909090
        font-size 25px
        display block
        margin 0 auto
        margin-top 150px
        text-align center
      .item
        border-bottom 1px solid #e5e5e5
        height 121px
        white-space nowrap
        width 100%
        font-size 30px
        .avater
          width 82px
          border-radius 50%
        .name
          width 33%
          overflow hidden
          // display -webkit-box
          -webkit-box-orient vertical
          -webkit-line-clamp 1
          text-overflow ellipsis
        .des
          width 25%
          color #5aa967
        .time
          width 25%
          color #b8b8b8
      .bar
        width 100%
        height 100px
  .msgWrapper
    padding-bottom 100px
    .noInfoMsg
      color #909090
      font-size 25px
      margin-top 150px
    .close
      position absolute
      right 27px
      top 19px
      color #b6b6b6
      font-size 30px
    .btn
      color #5aa967
      width 710px
      height 90px
      border-radius 10px !important
      border 1px solid #5aa967
      position fixed
      bottom 1px
      background-color #ffffff
  .toShare
    height 666px
    .title
      margin 19px auto
    .close
      position absolute
      right 27px
      top 19px
      color #b6b6b6
      font-size 30px
    .item
      input
        text-align right
    .btmCon
      position fixed
      bottom 0
      width 690px
      height 104px
      background-color #ffffff
      .sharebtm
        width 690px
        height 90px
        background-color #5aa967
        border-radius 10px
        color #ffffff
        margin-bottom 14px
        font-size 35px
        position fixed
        bottom 0
  .flowerWrapper
    height 620px
    .title
      margin 19px auto
    .close
      position absolute
      right 27px
      top 19px
      color #b6b6b6
      font-size 30px
    .content
      padding 0 25px
      width 100%
      // overflow-x scroll
      // overflow-y hidden
      .active
        border 1px solid #b9a484 !important
      .item
        margin-bottom 50px
        // margin-right 10px
        border 1px solid #eaeaea
        width 134px
        height 178px
        color #b8b8b8
        font-size 22px
        border-radius 10px
        img
          width 114px
          height 126px
    .flowerbtn
      width 100%
      padding 0 25px
      font-size 28px
      .item
        .num
          margin-left 10px
          color #5aa967
          span
            font-size 22px
        .preview
          width 107px
          height 43px
          border-radius 10px
          border 1px solid #5aa967
          color #5aa967
        .send
          margin-left 31px
          width 107px
          height 43px
          border-radius 10px
          background-color #5aa967
          color #ffffff
  .flowerPreview
    z-index 3000
    position relative
    top -50px
    color #ffffff
    img
      width 368px
      height auto
      margin-bottom 20px
</style>
<style scoped>
.clean {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 246px;
  height: auto;
}
.hidetip {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: auto;
}

@keyframes fadeio {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-moz-keyframes fadeio {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-webkit-keyframes fadeio {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-o-keyframes fadeio {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.fadenum {
  animation: fadeio 2s infinite;
  -webkit-animation: fadeio 2s infinite;
  -moz-animation: fadeio 2s infinite;
  -o-animation: fadeio 2s infinite;
}
.msgWrapper > .itemWrapper {
  width: 100%;
}
.msgWrapper > .itemWrapper > .item {
  padding: 30px 19px;
  border-bottom: 1px solid #f5f5f5;
}
.msgWrapper > .itemWrapper > .item > .avater {
  width: 82px;
  height: 82px;
  border-radius: 50%;
  display: block;
  margin-right: 5px;
}
.msgWrapper > .itemWrapper > .item > .info {
  width: 614px;
  font-size: 25px;
}
.msgWrapper > .itemWrapper > .item > .info > .msgname > .row > .name {
  font-size: 30px;
}
.msgWrapper > .itemWrapper > .item > .info > .msgname > .row > .date {
  color: #b8b8b8;
}
.msgWrapper > .itemWrapper > .item > .info > .msgname > .text {
  font-size: 28px;
  margin-top: 15px;
  color: #494949;
}
.msgWrapper > .itemWrapper > .item > .info > .btmItem {
  position: relative;
  margin-top: 30px;
  font-size: 25px;
}
.msgWrapper > .itemWrapper > .item > .info > .btmItem > .dalete {
  color: #5aa967;
  margin-left: 20px;
}
.msgWrapper > .itemWrapper > .item > .info > .btmItem > .date {
  color: #b8b8b8;
}
.msgWrapper > .itemWrapper > .item > .info > .btmItem > .btn {
  position: absolute;
  right: 0;
  height: 47px;
  width: 83px;
  border-radius: 5px;
  background-color: #5aa967;
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
.replay > .text {
  word-wrap: break-word;
}
.ownName {
  color: #5aa967;
}
.msgWrapper {
  height: 570px;
}
.msgWrapper > .btn {
}
.msgWrapper > .title {
  margin-top: 20px;
}
.msgWrapper > .bar {
  height: 100px;
  width: 100px;
}
/* 共享 */
.btmMsg {
  background-color: #ffffff;
  border-radius: 0.1rem;
  font-size: 31px;
  color: #000000;
  width: 690px;
}
.btmMsg > .item {
  height: 0.96rem;
  margin-top: 10px;
}
.btmMsg > .item > .btn {
  width: 214px;
  height: 55px;
  background-color: #5aa967;
  color: #ffffff;
  font-size: 30px;
  border-radius: 26px;
  white-space: nowrap;
}
.life {
  width: 100%;
  height: 150px;
  color: #000000;
  font-size: 31px;
  padding: 10px;
  border: 1px solid #f2f2f2;
  margin-top: 10px;
}
.msgadd {
  width: 90%;
  height: 300px;
  color: #000000;
  font-size: 31px;
  padding: 10px;
  border: 1px solid #f2f2f2;
}
.headImg {
  width: 122px;
  height: 122px;
  position: absolute;
  right: 0;
}
.headImgCon {
  height: 160px;
  color: #000000;
  font-size: 31px;
  position: relative;
}
.lifeImg {
  padding: 30px 0 100px;
}
.lifeImg > .item {
  width: 48%;
  border: 1px solid #f5f5f5;
  position: relative;
  margin-bottom: 25px;
}
.lifeImg > .item > .delect {
  position: absolute;
  right: -20px;
  top: -20px;
  width: 40px;
  height: 40px;
  display: block;
}
.lifeImg > .item > img {
  width: 100%;
  height: 300px;
  border-radius: 10px;
}
</style>
<style >
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
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
.van-notice-bar {
  width: 100%;
  margin-top: 30px;
  height: 27.5px !important;
  background-color: #eeeeee !important;
  padding: 0 !important;
}
.van-notice-bar__left-icon {
  width: 27.5px;
  height: 27.5px;
}
.van-notice-bar__left-icon > img {
  width: 27.5px;
  height: 27.5px;
}
</style>
<style  lang="scss" scoped>
.shop-wrapper {
  width: 100%;

  background-color: rgba(255, 255, 255, 0.7);
}

.shop-wrapper > .title {
  color: #333333;
  font-size: 29px;
  font-weight: 700;
  margin-bottom: 20px;
}

.shop-wrapper > .item {
  margin-bottom: 20px;
}

.shop-wrapper > .item > .badge {
  width: 38px;
  height: 42px;
}

.shop-wrapper > .item > .tip {
  color: $color;
  font-size: 27px;
  margin-left: 20px;
}

.shop-wrapper > .content > .shopimg {
  width: 150px;
  height: 150px;
  border-radius: 10px;
}

.shop-wrapper > .content > .item {
  margin-left: 26px;
  color: #666666;
}

.shop-wrapper > .content > .item > div > img {
  margin-left: 10px;
}

.shop-wrapper > .more {
  text-align: center;
  margin-top: 28px;
  color: $color;
}

.logo {
  margin: 50px 0;
  width: 48%;
}

.code {
  margin-top: 40px;
  width: 231px;
  height: 231px;
}

.star {
  width: 28px;
}

.tipTitle {
  margin-top: 60px;
  color: #666666;
  font-size: 28px;
}

.tipText {
  width: 627px;
  margin-top: 25px;
  color: #666666;
}

.remind {
  width: 690px;
  margin-bottom: 186px;
  margin-top: 45px;
}
</style>
<style scoped>
/* 生平模板样式 */
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 99;
  pointer-events: auto;
}

.lifeTpl {
  width: 100%;
  height: 100%;
  z-index: 101;
  background-color: #f5f5f5;
}

.tplTitle {
  height: 1.3rem;
  line-height: 1.3rem;
  padding-left: 1rem;
  font-size: 33px;
  color: #333333;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.3rem;
}

.tplList {
  margin-bottom: 100px;
}

.tplItem {
  position: relative;
}

.itemTitle {
  height: 60px;
  line-height: 60px;
  font-size: 30px;
  color: #333333;
  padding-left: 0.3rem;
  background-color: #f5f5f5;
}

.itemText {
  padding: 0.3rem;
  padding-bottom: 1rem;
  font-size: 28px;
  color: #666666;
  background-color: #ffffff;
  white-space: pre-line;
}

.selectedTpl {
  padding: 0.15rem 0.5rem;
  background-color: #5aa967;
  border-radius: 2rem;
  position: absolute;
  right: 0.3rem;
  bottom: 0.15rem;
  color: #ffffff;
  font-size: 25px;
}

.closeIcon {
  width: 0.38rem;
  height: 0.38rem;
}
.layui-layer-dialog {
  border-radius: 0.2rem;
}
.layui-layer-btn .layui-layer-btn0 {
  border-color: #6a6198 !important;
  background-color: #6a6198 !important;
}
</style>
<style lang="scss" scoped>
.container .msgWrapper .btn,
.container .flowerWrapper .flowerbtn .item .preview,
.container .visit .item-wrapper .item .des,
.container .flowerWrapper .flowerbtn .item .num ,
.container .btm,
.container .remindWrapper .sendbtn .sendcustom,
.container .remindWrapper .sendbtn .sendbtntip,
.msgWrapper > .itemWrapper > .item > .info > .btmItem > .dalete{
  color: $color;
}
.container .msgWrapper .btn,
.container .flowerWrapper .flowerbtn .item .preview,
.container .remindWrapper .sendbtn .sendcustom
 {
  border: 1px solid $color;
}
.container .remindWrapper .sendbtn .sendbtntip{
  border-bottom: 1px solid $color;
}
.container .shareWrapper .title,
.container .shareWrapper .btn,
.container .remindWrapper .btn,
.container .flowerWrapper .flowerbtn .item .send,
.container .remindWrapper .title,
.msgWrapper > .itemWrapper > .item > .info > .btmItem > .btn,
.btmMsg > .item > .btn,
.container .toShare .btmCon .sharebtm{
  background-color: $color;
}
</style>