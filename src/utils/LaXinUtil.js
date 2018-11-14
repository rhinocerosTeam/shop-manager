/**
 * Created by VULCAN on 2017/5/23.
 */
import Local from "utils/local";
import Log from 'utils/log';
import base64 from 'utils/base64';
import {HTML_LINK} from 'api/config';

class LaXinUtil {
  static shareApp(shareTitle, shareDesc, shareLink = '', awardId = '0',shareImg = 'share.jpg') {
    let hv = Local.getItem("hv");
    let userId = Local.getItem("userId");
    let token = Local.getItem("token");
    let consume = Local.getItem("consume");
    let actfrom = Local.getItem("actfrom");
    let sort = [
      ["returnType", "11"],
      ["activityName", "天天有喜 欢乐有你"],
      ["shareTitle", shareTitle],
      ["shareDesc", shareDesc],
      ["shareImg", HTML_LINK + "luckdraw/img/" + shareImg],
      ["shareLink", HTML_LINK + `luckdraw/?userId=${userId}&token=${token}&consume=${consume}&awardId=${awardId}&actfrom=web&shareLink=${shareLink}`]
    ];

    if (hv == 0) {
      sort.unshift(["isEncodeURI", "0"]);
    }
    h5gotoAppVerson(hv, sort);
  };

  /*
   allPeople:可参与人数
   alreadyPeople:已参与人数
   qiDate:活动当前期日期
   qiHh:活动当前期具体时间-小时

   未开始返回'ready',进行中返回'start',已结束返回'over'
   */
  static getStatus(allPeople, alreadyPeople, qiDate, qiHh,systemTime) {

    let peopleNum = alreadyPeople < allPeople ? true : false;
    let str = '';
    let actStatus = 0;
    if(qiDate){
      str = qiDate.slice(0, 4) + '/' + qiDate.slice(4, 6) + '/' + qiDate.slice(6, 8) + ' ' + qiHh + ':00:00';
    }
    Log.debug('getStatus/str', str);


    let dateObj = new Date(systemTime.replace(/-/g,"/"));
    let actTime = (new Date(str)).getTime();//活动时间
    let nowTime = (dateObj).getTime();//当前时间

    let endTime = new Date(dateObj.getFullYear()+"/"+(dateObj.getMonth()+1)+"/"+dateObj.getDate() +" 20:00:00").getTime();//活动结束时间当天20点

    if (actTime < nowTime) {
      peopleNum ? actStatus = 1 : actStatus = 2;
    } else {
      actStatus = 0;
    }

    if(nowTime>endTime){
      actStatus=2;
    }

    if (actStatus === 0) {
      return 'ready';
    } else if (actStatus === 1) {
      return 'start';
    } else {
      return 'over';
    }
  }

  static shareWx() {

    let actfrom = Local.getItem("actfrom");
    if(actfrom=='web'){
      let token = Local.getItem("token");
      let consume = Local.getItem("consume");

      var title = "悟空：师父这可是千载难逢的好机会呀！"; // 分享给朋友 标题
      var desc = "来看看什么是公平透明的抽奖活动！定制充电宝、酷我耳机、京东购物卡、小米手环等着你。"; // 分享给朋友 文案
      var shareUrl = HTML_LINK + `luckdraw/#/home?token=${token}&consume=${consume}&actfrom=web`; // 分享链接
      var shareImgUrl = HTML_LINK + 'luckdraw/img/share.jpg'; // 分享图片

      commonShare(title, desc, shareUrl, shareImgUrl); //在index.html引入
    }
  }

  static qqShare(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/QQ/i) == "qq"){
        let token = Local.getItem("token");
        let consume = Local.getItem("consume");

        var title = "悟空：师父这可是千载难逢的好机会呀！"; // 分享给朋友 标题
        var desc = "来看看什么是公平透明的抽奖活动！定制充电宝、酷我耳机、京东购物卡、小米手环等着你。"; // 分享给朋友 文案
        var shareUrl = HTML_LINK + `luckdraw/#/home?token=${token}&consume=${consume}&actfrom=web`; // 分享链接
        var shareImgUrl = HTML_LINK + 'luckdraw/img/share.jpg'; // 分享图片

        shareQQ(title, desc, shareImgUrl, shareUrl); //在index.html引入
    }
  }



  static routerQuery() {
    let hv = Local.getItem("hv");
    let userId = Local.getItem("userId");
    let token = Local.getItem("token");
    let consume = Local.getItem("consume");
    let actfrom = Local.getItem("actfrom");
    return {
      hv, userId, token, consume, actfrom
    }
  }

}


function shareQQ(share_title,share_desc,img_url,share_url){

  let appId = Local.getItem("appId");
  let timestamp = Local.getItem("timestamp");
  let nonceStr = Local.getItem("nonceStr");
  let signature = Local.getItem("signature");

  setShareInfo({
    title: share_title,       // 分享标题
    summary: share_desc,      // 分享内容
    pic: img_url,   // 分享图片
    url: share_url,      // 分享链接
    // 微信权限验证配置信息，若不在微信传播，可忽略
    WXconfig: {
      swapTitleInWX: false, // 是否标题内容互换（仅朋友圈，因朋友圈内只显示标题）
      appId: appId, // 必填，公众号的唯一标识
      timestamp: timestamp, // 必填，生成签名的时间戳
      nonceStr: nonceStr, // 必填，生成签名的随机串
      signature: signature,// 必填，签名，见附录1
    }
  });
}


// 公用分享代码
function commonShare(share_title, share_desc, share_url, img_url) {

  share_url = share_url.indexOf("http") == -1 ? (apiConf.starLink + share_url) : share_url;
  img_url = img_url.indexOf("http") == -1 ? (apiConf.starLink + img_url) : img_url;

  let _localHost = window.location.href;

  var ua = navigator.userAgent.toLowerCase();

  if(ua.match(/MicroMessenger/i)=="micromessenger") {

    _localHost=window.location.href.split('#')[0];

  }else if(ua.match(/QQ/i) == "qq"){

    let _index1 = _localHost.indexOf("#");
    let _index2 = _localHost.indexOf("?");
    if((_index1>0&&_index2>0)&&(_index2<_index1)){
      _localHost = _localHost.split('?')[0]
    }else{
      _localHost = _localHost.split('#')[0]
    }

  }

  $.ajax({
    type: "POST",
    url: "http://wap.hefantv.com/initPage.do" + "?" + "timeStamp=" + new Date().getTime(),
    data: {
      url: _localHost
    },
    async: false,
    dataType: "json",
    success: function (data) {

      Local.setItem("appId", data.appId);
      Local.setItem("timestamp", data.timestamp);
      Local.setItem("nonceStr", data.nonceStr);
      Local.setItem("signature", data.signature);



      setShareInfo({
        title: share_title,       // 分享标题
        summary: share_desc,      // 分享内容
        pic: img_url,   // 分享图片
        url: share_url,      // 分享链接
        // 微信权限验证配置信息，若不在微信传播，可忽略
        WXconfig: {
          swapTitleInWX: false, // 是否标题内容互换（仅朋友圈，因朋友圈内只显示标题）
          appId: data.appId, // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature,// 必填，签名，见附录1
        }
      });

      /**
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appId, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      wx.ready(function () {
        wx.checkJsApi({
          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
          ],
          success: function (res) {

          }
        });

        //朋友圈
        wx.onMenuShareTimeline({
          title: share_title, // 分享标题
          link: share_url, // 分享链接
          imgUrl: img_url, // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });

        //分享给朋友
        wx.onMenuShareAppMessage({
          title: share_title, // 分享标题
          desc: share_desc, // 分享描述
          link: share_url, // 分享链接
          imgUrl: img_url, // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });
      });

      //config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的
      //debug模式查看，
      //也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      wx.error(function (res) {
      });

       */
    }
  });

}

export default LaXinUtil;
