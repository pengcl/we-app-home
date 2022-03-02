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
    helperIcon: [],
    activeordercode:''
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
    let ordercode = that.data.orderCode
    let vtitle = ''
    vtitle = "助力有礼！" + userinfo.nickName + "@您，新世界中国全心惠您！"
    return {
      title: vtitle,
      path: 'pages2/activity/activity20201114/assist/assist?activCode=' + order + "&orderCode=" + ordercode + "&activeordercode=" + that.data.activeordercode,
      imageUrl: vdomain + '/image/activity/activity20201114/share.jpg',
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
      OrderCode: that.data.orderCode, //按原来的，取orderCode，不用activOrderCode
      helperName: that.data.userInfo.nickName,
      helperIcon: that.data.userInfo.avatarUrl,
      activOrderCode: that.data.activeordercode,
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

              let activCode = that.data.activCode
              if (activCode=="AT20004") //云逸
              {
                wx.redirectTo({
                  url: '../cj/yy/detail/detail?orderCode=' + that.data.orderCode
                })
              }
              if (activCode=="AT20005") //广佛
              {
                wx.redirectTo({
                  url: '../cj/gf/detail/detail?orderCode=' + that.data.orderCode
                })
              }
              if (activCode=="AT20006") //凯粤湾
              {
                wx.redirectTo({
                  url: '../cj/kyw/detail/detail?orderCode=' + that.data.orderCode
                })
              }
              if (activCode=="AT20007") //广汇
              {
                 
              }
              if (activCode=="AT20008") //清远
              {
                wx.redirectTo({
                  url: '../cj/qy/detail/detail?orderCode=' + that.data.code
                })
              }
              if (activCode=="AT20009") //肇庆
              {
                
              }



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
    let activOrderCode = that.data.activeordercode
    
    let projName = "";
    if (isStart) {
      wx.showToast({
        title: '您已参与活动',
        icon: 'none',
        duration: 1500
      })
    } else {

      if (activCode=="AT20004") //云逸
      {
        projName = 'YY';
      }
      if (activCode=="AT20005") //广佛
      {
        projName = 'GF';
      }
      if (activCode=="AT20006") //凯粤湾
      {
        projName = 'KYW';
      }
      if (activCode=="AT20007") //广汇
      {
        projName = 'ZC';
      }
      if (activCode=="AT20008") //清远
      {
        projName = 'QY';
      }
      if (activCode=="AT20009") //肇庆
      {
        projName = 'ZQ';
      }


      //插入活动参与表
      let data1 = {
        activCode: that.data.activCode,
        actorName: that.data.userInfo.actorName,
        actorIcon: that.data.userInfo.avatarUrl,
        actorPhone: that.data.phoneNumber,
        activOrderCode : activOrderCode,
        projName:projName
      }
      request.postRequest("/Activity/InsertActivityOrderFourteen",
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
    var activeordercode = options.activeordercode;
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
      activeordercode:activeordercode,
      userInfo: wx.getStorageSync('UserInfo'),
      phoneNumber: wx.getStorageSync('PhoneNum'),
    })

    that.AddUserWXLogin();

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
                        helperIcon: that.data.helperIcon.concat(helperinfo),
                        activeordercode:res.data.Data.activOrderCode,
                      })
                    } else {
                      helperinfo.icon = vdomain + 'image/icon9.png';
                      helperinfo.name = ''
                      that.setData({
                        helperIcon: that.data.helperIcon.concat(helperinfo),
                        activeordercode:res.data.Data.activOrderCode,
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
  },
  AddUserWXLogin: function () {
    var ProjectGID = '';
    let activCode = this.data.activCode;
    if (activCode=="AT20004") //云逸
    {
      ProjectGID = '152E7F4B-55F0-4E2C-BBD3-684AF00CB499';
    }
    if (activCode=="AT20005") //广佛
    {
      ProjectGID = '96328AF6-05F8-4492-8E0F-B7DABA179635';
    }
    if (activCode=="AT20006") //凯粤湾
    {
      ProjectGID = '852FA663-9EA1-44F9-A109-1C8990266D92';
    }
    if (activCode=="AT20007") //广汇
    {
      ProjectGID = 'FDD35F63-EA2D-4D8A-A02D-CCA9798C7FB6';
    }
    if (activCode=="AT20008") //清远
    {
      ProjectGID = 'F5A0ACB0-6914-4B3C-B53B-82BD33627788';
    }
    if (activCode=="AT20009") //肇庆
    {
      ProjectGID = 'D8834E95-AE3B-4A92-B503-DDB73B0C74D8';
    }
    var PhoneNum = wx.getStorageSync('PhoneNum');
    var comecode = wx.getStorageSync('comecode');
    var userinfo = wx.getStorageSync('UserInfo')
    console.log("ProjectGID", ProjectGID);
    let data1 = {
      "nickname": userinfo.nickName,
      "avatarUrl": userinfo.avatarUrl,
      "gender": userinfo.gender,
      "province": userinfo.province,
      "city": userinfo.city,
      "country": userinfo.country,
      "comefrom": 'projectindex',
      "comecode": comecode,
      "ProjectGID": ProjectGID,
      "UserPhone": PhoneNum
    }

    request.postRequest("/User/UserWXLogin",
      data1,
      function (res) {
        console.log("res111", res);
      });

  }
})