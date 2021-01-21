import axios from 'axios';
import api from '@/api/api'
import Cookies from 'js-cookie'
import globals from '@/utils/globals' // get token from cookie



// Cookies.get('eshop-426-client-h5_userinfo').open_id

export default {

  wxShowMenu: function (info) {
    console.log(0.24);
    // wx.hideOptionMenu();
    wx.hideMenuItems({
      menuList: [

        'menuItem:share:appMessage', //发送给朋友

        'menuItem:share:timeline' //分享到朋友圈

      ]
    })
    var info = info || {
      title: "crm商城", // 分享标题

      desc: "复活工厂，颠覆消费", //分享描述

      // link: location.origin + location.pathname, // 分享链接
      link: location.href, // 分享链接
      

      imgUrl: `${globals.curBaseUrl}/h5/static/img/1.860b8c69.png` // 分享图标
    }
    let mid = Cookies.get('eshop-426-client-h5_userinfo') && JSON.parse(Cookies.get('eshop-426-client-h5_userinfo')).member_id
    if (info.link.indexOf('?')!=-1) {
      info.link += `&mid=${mid}`
    }else{
      info.link += `?mid=${mid}`
    }
    
    console.log(Cookies.get('eshop-426-client-h5_userinfo'),info, "Cookies.get('eshop-426-client-h5_userinfo')");
    // alert(location.origin+location.pathname+`?mid=${g.mid}`)
    // alert(location.href.split('#')[0])
    api.js_api({
      root_factory_id: '1',
      url: '/'
    }).then(function (res) {

      var getMsg = res.data;
      console.log(getMsg, 'jssdkconfig');
      wx.config({

        debug: false, //生产环境需要关闭debug模式

        appId: getMsg.appId, //appId通过微信服务号后台查看

        timestamp: getMsg.timestamp, //生成签名的时间戳

        nonceStr: getMsg.nonceStr, //生成签名的随机字符串

        signature: getMsg.signature, //签名

        jsApiList: [ //需要调用的JS接口列表

          'onMenuShareTimeline', //分享给好友

          'onMenuShareAppMessage', //分享到朋友圈

          'showMenuItems',

          'hideMenuItems'

        ]

      });

      wx.ready(function () {

        wx.checkJsApi({

          jsApiList: ["showMenuItems"],

          success: function (res) {

            wx.showMenuItems({

              menuList: [

                'menuItem:share:appMessage', //发送给朋友

                'menuItem:share:timeline' //分享到朋友圈

              ]

            });

          }

        });

        //分享到朋友圈

        wx.onMenuShareTimeline(info);



        //分享给朋友

        wx.onMenuShareAppMessage(info);

      });

    })

  }
}