import request from '../../../utils/request.js';
import UserInfo from '../../../utils/UserInfo';
var app = getApp();

Page({
  data: {
    gourl: "../../index/index",
    domain: 'https://xyclientnew.ai-fox.net/',
    statusBarHeight: 0,
    log: "",
    UserInfoStatus: true,
    PhoneNumStatus: true
  },
  onLoad: function(options) {
    let _this = this;
    this.setData({
      domain: app.globalData.domain,
      statusBarHeight: app.globalData.statusBarHeight,
      UserInfoStatus: (wx.getStorageSync('UserInfo') || "") != "",
      PhoneNumStatus: (wx.getStorageSync('PhoneNum') || "") != ""
    })

  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  getPhoneNumber: function(e) {
    let _this = this;
    console.log("getPhoneNumber", e);
    var comecode = wx.getStorageSync('comecode');
    wx.login({
      success: function(res) {
        if (res.code != "") {
          let data = {
            code: res.code,
            iv: e.detail.iv,
            encryptedData: e.detail.encryptedData,
            comecode: comecode
          }

          request.postRequest("/User/PhoneNumberInfo",
            data,
            function(res) {

              if (res.StatusCode == 200) {
                wx.setStorageSync("PhoneNum", res.Data.phoneNumber);
                wx.setStorageSync("PhoneNumSign", res.Data.PhoneNumSignText);
              }
              _this.setData({
                PhoneNumStatus: (wx.getStorageSync('PhoneNum') || "") != ""
              })
            },
            function(e) {
              wx.showToast({
                title: '授权失败，请稍后重试',
                icon: 'none',
                duration: 2000
              })
            });

        } else {

        }
      }
    })
  },
  UserInfo_tap: function (e) {

    console.log("UserInfo_tap", this.data.needUserInfo);

    let _this = this;
    console.log(e);
    UserInfo.GetUserInfo(app, e,
      function (res) {
        _this.setData({
          UserInfoStatus: (wx.getStorageSync('UserInfo') || "") != ""
        })

        var url = getCurrentPages()[getCurrentPages().length - 1];
        console.log("url", url);
      },
      function (res) {
        _this.setData({
          UserInfoStatus: (wx.getStorageSync('UserInfo') || "") != ""
        })
        wx.showModal({
          title: '未授权',
          content: '为了不影响您的使用，请开启相应的权限哦~'
        });
      });


  }
})