import request from "../../../utils/request.js"
var app = getApp();
var vdomain = app.globalData.domain
Page({
  data: {

  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })


  },
  onReady: function () {},
  onShow: function () {

    let that = this
    let phoneNum = wx.getStorageSync('PhoneNum');
    if (phoneNum == "" || typeof (phoneNum) == "undefinded") {
      wx.navigateTo({
        url: '../../permission/phone/phone',
      })
    } else {
      if (app.globalData.appIsOnload) {
        that.LoadInfo(phoneNum);
      } else {
        app.appIsOnloadCallback = () => {
          that.LoadInfo(phoneNum);
        }
      }
      that.AddUserWXLogin();
    }
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  AddUserWXLogin: function () {
    var ProjectGID = '';
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

  LoadInfo: function (PhoneNum) {
    var phonenum = wx.getStorageSync('PhoneNum')
    let phoneNumSignText=""
    let phoneNumSign1 = wx.getStorageSync('phoneNumSignText')
    let phoneNumSign2 = wx.getStorageSync('PhoneNumSign')
    if (phoneNumSign1 != "") {
      phoneNumSignText = phoneNumSign1
    } else if (phoneNumSign2 != "") {
      phoneNumSignText = phoneNumSign2
    }
    if (phonenum != "") {
      let data = {
        PhoneNum: phonenum,
        phoneNumSignText: phoneNumSignText
      }
      request.postRequest("/TJ/TJEUserCheck",
        data,
        function (res) {
          if (res.StatusCode == 200) {
            let status = res.Data
            switch (status) {
              case "审核通过":
                wx.redirectTo({
                  url: '../tj/main/main',
                })
                break;
              case "正在审核":
                wx.redirectTo({
                  url: '../regist/audit/auditting',
                })
                break;
              case "可注册":
                wx.redirectTo({
                  url: '../regist/main/main',
                })
                break;
            }
          } else {
            wx.showToast({
              title: res.Data,
              icon: 'none',
              duration: 2000
            })
          }
        }, (err) => {
          wx.showToast({
            title: '网络异常，请稍后重试！',
            icon: 'none',
            duration: 2000
          })
        });
    }
  }
})