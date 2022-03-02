import request from '../../../../utils/request.js';
var app = getApp();
var vdomain = app.globalData.domain
Page({
  data: {
    userInfo: app.globalData.userInfo,
    activCode: '',
    activityInfo: {},
    phoneNumber: '',
    button: '',
    button1: '',
    button2: ''
  },
  onShow: function () {
    let that = this
    let vUserInfo = wx.getStorageSync('UserInfo')
    let vPhoneNum = wx.getStorageSync('PhoneNum')
    that.setData({
      userInfo: vUserInfo,
      phoneNumber: vPhoneNum,
    })
    that.LoadInfo('AT20003')
  },
  onLoad: function (options) {
    let that = this
    let code = ''
    if (app.globalData.appIsOnload) {
      that.LoadInfo('AT20003')
    } else {
      app.appIsOnloadCallback = () => {
        that.LoadInfo('AT20003')
      }
    }
    that.AddUserWXLogin()
  },
  onReady: function () {},
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
  createOrder: function (e) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    //插入活动参与表
    let that = this
    let activInfo = that.data.activityInfo
    let data1 = {
      activCode: that.data.activCode,
      actorName: that.data.userInfo.nickName,
      actorIcon: that.data.userInfo.avatarUrl,
      actorPhone: that.data.phoneNumber
    }
    if (activInfo.IsOverTime) {
      if (activInfo.isStart && activInfo.IsComplete) {
        wx.hideLoading()
        if (activInfo.IsAward == true) {
          wx.navigateTo({
            url: '../assist/assistaward?orderCode=' + activInfo.OrderCode + '&activCode=' + activInfo.code
          })
        } else {
          wx.navigateTo({
            url: '../assist/detail?orderCode=' + activInfo.OrderCode + '&activCode=' + activInfo.code
          })
        }
      } else {
        wx.hideLoading();
        wx.showToast({
          title: '抱歉，该活动不在开放时间段！',
          icon: 'none',
          duration: 1000,
          success: function (e) {
            setTimeout(function () {
              wx.redirectTo({
                url: '../../../../pages2/index/index'
              })
            }, 1000)
          }
        })
      }
    } else {
      if (activInfo.isStart) {
        if (activInfo.IsAward == true) {
          wx.hideLoading()
          wx.navigateTo({
            url: '../assist/assistaward?orderCode=' + activInfo.OrderCode + '&activCode=' + activInfo.code
          })
        } else {
          wx.navigateTo({
            url: '../assist/detail?orderCode=' + activInfo.OrderCode + '&activCode=' + activInfo.code
          })
        }
      } else {
        request.postRequest("/Activity/InsertActivityOrderWYY",
          data1,
          function (res) {
            if (res.StatusCode == 200) {
              let vOrderCode = res.Data
              wx.navigateTo({
                url: '../assist/detail?orderCode=' + vOrderCode + "&activCode=" + that.data.activCode,
              })
              wx.hideLoading();
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
              console.log(res.errMsg)
            }
          }, (err) => {
            wx.hideLoading();
            console.log(err);
          });
      }
    }
  },
  LoadInfo: function (code) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    let that = this
    let data = {
      "code": code,
      "productCode": '001'
    }
    request.getRequest("/Activity/ActivityInfoWYY",
      data,
      function (res) {
        wx.hideLoading({
          complete: (res) => {},
        })
        if (res.statusCode == 200) {

          var info = res.data.Data;

          let vUserInfo = wx.getStorageSync('UserInfo')
          let vPhoneNum = wx.getStorageSync('PhoneNum')
          that.setData({
            activityInfo: info,
            activCode: code,
            userInfo: vUserInfo,
            phoneNumber: vPhoneNum,
            button: info.activBanner5,
            button1: info.activBanner6,
            button2: info.activBanner4
          })
          // if (res.data.Data.isStart) {
          //   wx.redirectTo({
          //     url: '../assist/detail?orderCode=' + res.data.Data.OrderCode + '&activCode=' + res.data.Data.code
          //   })
          // }
        }
      });
  },
  AddUserWXLogin: function () {
    var ProjectGID = '152E7F4B-55F0-4E2C-BBD3-684AF00CB499';
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

  },
  lntj_tap: function () {
    wx.showLoading({
      title: '',
      mask: true
    })
    let that = this
    let activInfo = that.data.activityInfo
    let data = {
      sOrderCode: activInfo.OrderCode
    }
    request.getRequest("/Order/OrderHDWYY",
      data,
      function (res) {
        wx.hideLoading({
          complete: (res) => {},
        })
        if (res.statusCode == 200) {
          if (res.data.Data != null && res.data.Data != "") {
            wx.navigateTo({
              url: '../tj/tjaward?orderCode=' + activInfo.OrderCode,
            })
          } else {
            if (activInfo.IsOverTime) {
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
                      url: '../../../../pages2/index/index'
                    })
                  }, 1000)
                }
              })
            } else {
              if (activInfo.IsComplete) {
                wx.navigateTo({
                  url: '../tj/tj?orderCode=' + activInfo.OrderCode,
                })
              } else {
                wx.hideLoading({
                  complete: (res) => {},
                })
                wx.showToast({
                  title: '请先参与并完成助力活动哦！',
                  icon: 'none',
                  duration: 1500
                })
              }
            }
          }
        }
      });
  },
  lnwyy_tap: function () {
    wx.navigateTo({
      url: '../wyy/h5',
    })
  }
})