var wx = require('weixin-js-sdk')
import Vue from 'vue'
import axios from 'axios'
export const share = (
  title,
  link,
  desc,
  imgUrl
) => {
  axios.get('http://passport.fuyulove.com/action/jssdk', {
      params: {
        sid: 658,
        url: location.href.split('#')[0],
        t: Math.random()
      }
    })
    .then(res => {
      console.log('特殊签名', res)
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
        'getLocalImgData',
        'scanQRCode',
        'openLocation'
      ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
    wx.ready(() => {
      wx.onMenuShareAppMessage({
        title: title,
        link: link,
        desc: desc,
        imgUrl: imgUrl,
      })
    })
    wx.onMenuShareTimeline({
      title: title,
      link: link,
      desc: desc,
      imgUrl: imgUrl,
    })
    // wx.getLocation({
    //   type: 'wgs84',
    //   success: function (res) {
    //     console.log("res", res)
    //     var latitude = res.latitude;
    //     var longitude = res.longitude;
    //     console.log("longitude", longitude)
    //     sessionStorage.setItem("longitude", longitude);
    //     sessionStorage.setItem("latitude", latitude);

    //   }
    // });

    wx.error(function () {

    })
  }


}
// 为Vue的原型对象添加该方法，则所有vue实例都能继承该方法
Vue.prototype.$share = share