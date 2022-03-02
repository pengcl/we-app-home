import request from '../../../utils/request.js';
const app = getApp();
Page({
  data: {
    pageUrl: '../../activity/assist/index/index?gid=7982164D-FAB8-4B1E-BA02-994A9EB9DD7D' //授权成功后跳转页面
  },
  onLoad: function(options) {
    let vpageUrl = options.pageUrl
    this.setData({
      pageUrl: vpageUrl
    })
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {},
  bindGetUserInfo(e) {
    let that = this;
    //第二种。用户点击取消授权的情况
    if (e.detail.userInfo == null) { //授权失败，取消授权
      console.log("授权失败，取消授权");
      wx.showModal({
        title: '未授权',
        content: '为了不影响您的使用，请开启相应的权限哦~',
        showCancel: false,
        success: res => {
          if (res.confirm) {
            //点击取消，重新获取授权
            wx.openSetting({
              success: data => {
                console.log(data)
                if (data.authSetting["scope.userInfo"] == true) { //判断是否授权
                  //重新获取用户数据
                  wx.getUserInfo({
                    success: function(res) {
                      //授权后将app.js中的userinfo重新赋值。
                      var vUserInfo = res.userInfo;
                      getApp().globalData.userInfo = vUserInfo;
                      wx.setStorage({
                        key: "UserInfo",
                        data: vUserInfo
                      });
                      var comecode=wx.getStorageSync('comecode');
                      let data1 = {
                        "nickname": vUserInfo.nickName,
                        "avatarUrl": vUserInfo.avatarUrl,
                        "gender": vUserInfo.gender,
                        "province": vUserInfo.province,
                        "city": vUserInfo.city,
                        "country": vUserInfo.country,
                        "comefrom": 'UserWXLogin_permission',
                        "comecode":comecode
                      }
                      request.postRequest("/User/UserWXLogin",
                        data1,
                        function(res) {
                          if (res.StatusCode == 200) {
                            let vpageUrl = that.data.pageUrl
                            wx.redirectTo({
                              url: vpageUrl,
                            })
                          }
                        });
                    }
                  })
                }
              },
              fail: function() {
                console.info("操作失败，请稍后重试");
              }
            });
          }
        }
      });
    } else {
      //第一种。用户点击授权的情况
      var vUserInfo = e.detail.userInfo;
      getApp().globalData.userInfo = vUserInfo;
      wx.setStorage({
        key: "UserInfo",
        data: vUserInfo
      });
      var comecode=wx.getStorageSync('comecode');
      let data1 = {
        "nickname": vUserInfo.nickName,
        "avatarUrl": vUserInfo.avatarUrl,
        "gender": vUserInfo.gender,
        "province": vUserInfo.province,
        "city": vUserInfo.city,
        "country": vUserInfo.country,
        "comefrom": 'UserWXLogin_permission',
        "comecode":comecode
      }
      request.postRequest("/User/UserWXLogin",
        data1,
        function(res) {
          if (res.StatusCode == 200) {
            let vpageUrl = that.data.pageUrl
            wx.redirectTo({
              url: vpageUrl,
            })
          }
        });
    }
  }
})