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
    helperMaskDisplay: 'none',
    proPercent: '',
    progress: '',
    actorNametemp: '',
    countdown: {
      day: '',
      hour: '',
      minute: '',
      second: ''
    },
    phoneNumber: '',
    helperIcon: []
  },
  onLoad: function (options) {
    let that = this
    that.setData({
      helperIcon: []
    })
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
    let vUserIndo = wx.getStorageSync('UserInfo')
    let vPhoneNum = wx.getStorageSync('PhoneNum')
    that.setData({
      userInfo: vUserIndo,
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
    let vtitle = ''
    vtitle = "助力有礼！" + userinfo.nickName + "@您，仲夏缤纷生活大赏齐FUN享！"
    return {
      title: vtitle,
      path: 'pages2/activity/lnwyy/main/main',
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
  assist_tap: function () {
    //插入活动助力表
    let that = this
    let data = {
      activCode: that.data.activCode,
      OrderCode: that.data.orderCode,
      helperName: that.data.userInfo.nickName,
      helperIcon: that.data.userInfo.avatarUrl
    }
    request.postRequest("/Activity/InsertActivityHelper",
      data,
      function (res) {
        if (res.StatusCode == 200) {
          var info = res.Data;
          that.setData({
            activityOrder: info,
            helperMaskDisplay: 'none'
          })
          let actInfo = that.data.activityInfo
          that.setData({
            helperIcon: []
          })
          for (var i = 0; i < actInfo.needHelperNum; i++) {
            var helperinfo = {
              'icon': '',
              'name': ''
            }
            if (res.Data.activityHelperlst[i] != null) {
              helperinfo.icon = res.Data.activityHelperlst[i].helperIcon == null || res.Data.activityHelperlst[i].helperIcon == '' ? vdomain + 'image/icon9.png' : res.Data.activityHelperlst[i].helperIcon;
              helperinfo.name = res.Data.activityHelperlst[i].helperName == null ? '' : res.Data.activityHelperlst[i].helperName.length > 2 ? res.Data.activityHelperlst[i].helperName.substring(0, 2) + '..' : res.Data.activityHelperlst[i].helperName
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
        } else {
          console.log(res.errMsg)
          wx.showToast({
            title: '网络异常，请稍后重试！',
            icon: 'none',
            duration: 1000
          })
        }
      }, (err) => {
        console.log(err);
      });
  },
  createOrder: function () {
    let that = this
    let orderInfo = that.data.activityOrder
    let isStart = that.data.activityInfo.isStart
    if (isStart) {
      wx.showToast({
        title: '您已参与活动',
        icon: 'none',
        duration: 1500
      })
    } else {
      //插入活动参与表
      let data1 = {
        activCode: that.data.activCode,
        actorName: that.data.userInfo.actorName,
        actorIcon: that.data.userInfo.avatarUrl,
        actorPhone: that.data.phoneNumber
      }
      request.postRequest("/Activity/InsertActivityOrderWYY",
        data1,
        function (res) {
          if (res.StatusCode == 200) {
            let vOrderCode = res.Data
            wx.redirectTo({
              url: '../assist/detail?orderCode=' + vOrderCode + "&activCode=" + that.data.activCode,
            })
          } else if (res.StatusCode == 900) {
            wx.showToast({
              title: '抱歉，助力活动已截止！',
              icon: 'none',
              duration: 1500
            })
          } else {
            wx.hideLoading();
            wx.showToast({
              title: '抱歉，网络异常，请稍后重试！',
              icon: 'none',
              duration: 1500
            })
          }
        }, (err) => {
          console.log(err);
        });
    }
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
          if (info.IsOverTime) {
            wx.hideLoading({
              complete: (res) => {},
            })
            wx.showToast({
              title: '抱歉，该活动不在开放时间段！',
              icon: 'none',
              duration: 1000,
              success: function (e) {
                setTimeout(function () {
                  wx.redirectTo({
                    url: '../../../../pages2/index/index',
                  })
                }, 1000)
              }
            })
          } else {
            request.getRequest("/Activity/ActivityOrder",
              dataOrder,
              function (res) {
                if (res.statusCode == 200) {
                  wx.hideLoading({
                    complete: (res) => {},
                  })
                  var order = res.data.Data;
                  var isHelper = res.data.Data.isHelper
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
                    helperMaskDisplay: isHelper ? 'none' : 'flex'
                  })
                }
              });
            var vEndtime = that.data.activityInfo.activEndTime
            that.startCountdown(vEndtime);
          }
        }
      });
  }
})