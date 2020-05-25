import Vue from 'vue'
// import { getSdkData  } from 'api/index'
// import axios from 'axios'
import $ from 'jquery'
var wx = require('weixin-js-sdk')
export default function wxShare({
  title,
  desc,
  link,
  imgUrl
} = {}) {

  var data = {
    url: window.location.href,
    t: Math.random()
  };

  var _getWechatSignUrl = 'http://b.fuyulove.com/Action/CacheData.aspx?action=jssdk';
  $.ajax({
    url: _getWechatSignUrl,
    data: data,
    success: function (res) {
      console.log('签名',res)
      console.log('签名',res.data.data.appid)
      if (res.code == 1) {
        config(res.data.data.appid, res.data.data.timestamp, res.data.data.nonceStr, res.data.data.signature);
      }
    }
  });
  function config (_appId, _timestamp, _nonceStr, _signature){
    wx.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: _appId,
      timestamp: _timestamp,
      nonceStr: _nonceStr,
      signature: _signature,
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
        title: title,
        link: link,
        desc: desc,
        imgUrl: 'http://b.fuyulove.com/ShopActity/deathbed/' + imgUrl,
      })
    })
    wx.error(function () {})
  }


}
// 为Vue的原型对象添加该方法，则所有vue实例都能继承该方法
Vue.prototype.$wxShare = wxShare