import request from '../../../../utils/request.js';
const app = getApp();
var vdomain = app.globalData.domain
Page({
  data: {
    activCode: '',
    orderCode: '',
    activityInfo: {},
    activityOrder: {},
    userInfo: {},
    proPercent: '',
    progress: '',
    countdown: {
      day: '',
      hour: '',
      minute: '',
      second: ''
    },
    phoneNumber: '',
    helperIcon: [],
    button: ''
  },
  onLoad: function (options) {
    let that = this
    if (app.globalData.appIsOnload) {
      that.LoadInfo(options)
    } else {
      app.appIsOnloadCallback = () => {
        that.LoadInfo(options)
      }
    }
  },
  onReady: function () {},
  onShow: function () {
    let that = this
    let vUserInfo = wx.getStorageSync('UserInfo')
    let vPhoneNum = wx.getStorageSync('PhoneNum')
    that.setData({
      userInfo: vUserInfo,
      phoneNumber: vPhoneNum,
    })
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {
    let that = this;
    let order = that.data.activCode
    let userinfo = that.data.userInfo
    let ordercode = that.data.orderCode
    let vtitle = ''
    vtitle = "助力有礼！" + userinfo.nickName + "@您，仲夏缤纷生活大赏齐FUN享！"
    return {
      title: vtitle,
      path: 'pages2/activity/lnwyy/assist/assist?activCode=' + order + "&orderCode=" + ordercode,
      imageUrl: vdomain + '/image/activity/activity_lnwyy/share.jpg',
    }
  },
  startCountdown: function (endTime) {
    var that = this;
    var millisecond = new Date(endTime).getTime() - new Date().getTime();

    var interval = setInterval(function () {
      millisecond -= 1000;
      if (millisecond <= 0) {
        clearInterval(interval);
        that.setData({
          countdown: {
            day: '00',
            hour: '00',
            minute: '00',
            second: '00'
          }
        });
        return;
      }
      that.transformRemainTime(millisecond);
    }, 1000);
  },
  // 剩余时间(毫秒)处理转换时间
  transformRemainTime: function (millisecond) {
    var that = this;
    var countdownObj = that.data.countdown;
    // 秒数
    var seconds = Math.floor(millisecond / 1000);
    // 天数
    countdownObj.day = that.formatTime(Math.floor(seconds / 3600 / 24));
    // 小时
    countdownObj.hour = that.formatTime(Math.floor(seconds / 3600 % 24));
    // 分钟
    countdownObj.minute = that.formatTime(Math.floor(seconds / 60 % 60));
    // 秒
    countdownObj.second = that.formatTime(Math.floor(seconds % 60));
    that.setData({
      countdown: countdownObj
    });
  },
  //格式化时间为2位
  formatTime: function (time) {
    if (time < 10)
      return '0' + time;
    return time;
  },
  award_tap: function () {
    let that = this
    let data = {
      activeCode: that.data.activCode,
      orderCode: that.data.orderCode,
      awardType: "YYWYY"
    }
    request.postRequest("/Activity/ReceiveAwardWYY",
      data,
      function (res) {
        if (res.StatusCode == 200) {
          wx.showToast({
            title: '领取成功！',
            icon: 'none',
            duration: 1000,
            success: function () {
              setTimeout(function () {
                wx.redirectTo({
                  url: '../assist/assistaward?activCode=' + that.data.activCode + "&orderCode=" + that.data.orderCode,
                })
              }, 1000)
            }
          })
        } else {
          wx.showToast({
            title: '领取失败，请退出重试！',
            icon: 'none',
            duration: 1000
          })
        }
      }, (err) => {
        wx.showToast({
          title: '网络异常，请稍后重试！',
          icon: 'none',
          duration: 1000
        })
      });

  },
  LoadInfo: function (options) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    let that = this

    var vactivCode = options.activCode;
    var vorderCode = options.orderCode;
    let data = {
      code: vactivCode,
      productCode: '001'
    }
    let dataOrder = {
      sActivCode: vactivCode,
      code: vorderCode
    }
    that.setData({
      activCode: vactivCode,
      orderCode: vorderCode,
      userInfo: wx.getStorageSync('UserInfo'),
      phoneNumber: wx.getStorageSync('PhoneNum'),
    })
    request.getRequest("/Activity/ActivityInfoWYY",
      data,
      function (res) {
        if (res.statusCode == 200) {
          var info = res.data.Data;
          that.setData({
            activityInfo: info
          })

          request.getRequest("/Activity/ActivityOrder",
            dataOrder,
            function (res) {
              if (res.statusCode == 200) {
                var order = res.data.Data;
                for (var i = 0; i < info.needHelperNum; i++) {
                  var helperinfo = {
                    'icon': '',
                    'name': ''
                  }
                  if (res.data.Data.activityHelperlst[i] != null) {
                    helperinfo.icon = res.data.Data.activityHelperlst[i].helperIcon == null || res.data.Data.activityHelperlst[i].helperIcon == '' ? vdomain + 'image/icon9.png' : res.data.Data.activityHelperlst[i].helperIcon;
                    helperinfo.name = res.data.Data.activityHelperlst[i].helperName == null ? '' : res.data.Data.activityHelperlst[i].helperName.length > 2 ? res.data.Data.activityHelperlst[i].helperName.substring(0, 2) + '..' : res.data.Data.activityHelperlst[i].helperName
                    that.setData({
                      helperIcon: that.data.helperIcon.concat(helperinfo)
                    })
                  } else {
                    helperinfo.icon = vdomain + 'image/icon9.png';
                    helperinfo.name = ''
                    that.setData({
                      helperIcon: that.data.helperIcon.concat(helperinfo)
                    })
                  }
                }
                that.setData({
                  activityOrder: order,
                  progress: order.helpercount + '/' + info.needHelperNum,
                  proPercent: (order.helpercount / info.needHelperNum) * 100,
                  button: vdomain + 'image/activity/activity_lnwyy/button5.png'
                })
              }
              wx.hideLoading({
                complete: (res) => {},
              })
            });

          var vEndtime = that.data.activityInfo.activEndTime
          that.startCountdown(vEndtime);
        }
      });
  }
})