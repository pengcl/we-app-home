import request from '../../../../utils/request.js';
var app = getApp();
var vdomain = app.globalData.domain
Page({
  data: {
    userInfo: app.globalData.userInfo,
    projName: '',
    productCode :'',
    activCode: '',
    activityInfo: {},
    phoneNumber: '',
    button: '',
    button1: '',
    button2: '',
    activeordercode:''
  },
  onShow: function () {
    let that = this
    let vUserInfo = wx.getStorageSync('UserInfo')
    let vPhoneNum = wx.getStorageSync('PhoneNum')
    let projName = that.data.projName
    let activCode = that.data.activCode
    that.setData({
      userInfo: vUserInfo,
      phoneNumber: vPhoneNum,

    })
    that.LoadInfo(activCode, projName)
  },
  onLoad: function (options) {
    let that = this
    that.setData(
      {
        projName : options.projName,
        productCode : options.productCode,
        activCode:options.activCode,
        activeordercode:options.activeordercode
      }
    )

    console.log("activeordercode133",activeordercode);

    let projName = options.projName
    let code = options.activCode

    if (app.globalData.appIsOnload) {
      that.LoadInfo(code,projName)
    } else {
      app.appIsOnloadCallback = () => {
        that.LoadInfo(code,projName)
      }
    }
    
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
    vtitle = "助力有礼！" + userinfo.nickName + "@您，新世界中国全心惠您！"
    return {
      title: vtitle,
      path: 'pages2/activity/activity20201114/assist/assist?activCode=' + order + "&orderCode=" + ordercode,
      imageUrl: vdomain + '/image/activity/activity20201114/share.jpg',
    }
  },
  createOrder: function (e) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    //插入活动参与表
    let that = this
    let projName = that.data.projName
    let productCode = that.data.productCode
    let activInfo = that.data.activityInfo
    let activOrderCode = that.data.activeordercode

    console.log("activeordercode111",activOrderCode);

    let data1 = {
      projName :  that.data.projName,
      activCode: that.data.activCode,
      actorName: that.data.userInfo.nickName,
      actorIcon: that.data.userInfo.avatarUrl,
      actorPhone: that.data.phoneNumber,
      activOrderCode : activOrderCode,
    }
    let activCode=that.data.activCode;
    let data0 =
    {
      projName :  that.data.projName,
      activCode: activCode,
    }

    

    request.getRequest("/Activity/ActivityCanCreate",
        data0,
        function(res) {
        if (res.data.StatusCode != 200) {

              wx.showToast(
                {
                  title: '抱歉，活动奖品库存不足，无法发起活动！',
                  icon: 'none',
                  duration: 1000
                });
                return;            
        }
        else
        {
          if (activInfo.IsOverTime) {
            if (activInfo.isStart && activInfo.IsComplete) {
              wx.hideLoading()

                wx.navigateTo({
                  url: '../assist/detail?orderCode=' + activInfo.OrderCode + '&activCode=' + activInfo.code +'&projName=' +projName + "&productCode=" +productCode + "&activCode=" + activCode + "&activeordercode=" + activOrderCode
                })
        // }
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
                    // url: '../assist/assistaward?orderCode=' + activInfo.OrderCode + '&activCode=' + activInfo.code  +'&projName=' +projName + "&productCode=" +productCode
            
                      url: '../assist/detail?orderCode=' + activInfo.OrderCode + '&activCode=' + activInfo.code +'&projName=' +projName  + "&productCode="+productCode + "&activCode=" + activCode + "&activeordercode=" + activOrderCode
                   })
               } else {
                  wx.navigateTo({
                  url: '../assist/detail?orderCode=' + activInfo.OrderCode + '&activCode=' + activInfo.code +'&projName=' +projName  + "&productCode="+productCode + "&activCode=" + activCode + "&activeordercode=" + activOrderCode
                  })
               }
      } else {
        request.postRequest("/Activity/InsertActivityOrderFourteen",
          data1,
          function (res) {
            if (res.StatusCode == 200) {
              let vOrderCode = res.Data
              wx.navigateTo({
                url: '../assist/detail?orderCode=' + vOrderCode + "&activCode=" + that.data.activCode +'&projName=' +projName  + "&productCode="+productCode + "&activCode=" + activCode + "&activeordercode=" + activOrderCode,
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
      }
    })
  },
  LoadInfo: function (code, projName) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    let that = this
    let data = {
      "activCode": code,
      "projName" : projName
    }
    request.getRequest("/Activity/ActivityInfoFourteen",
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
            projName: projName,
            userInfo: vUserInfo,
            phoneNumber: vPhoneNum,
            // button: info.activBanner5,
            // button1: info.activBanner6,
            // button2: info.activBanner4
          })
          // if (res.data.Data.isStart) {
          //   wx.redirectTo({
          //     url: '../assist/detail?orderCode=' + res.data.Data.OrderCode + '&activCode=' + res.data.Data.code
          //   })
          // }
        }
      });


      that.AddUserWXLogin();
  },
  AddUserWXLogin: function () {
    var ProjectGID = '152E7F4B-55F0-4E2C-BBD3-684AF00CB499';
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
  }
})