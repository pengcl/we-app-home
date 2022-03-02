import request from "../../../../utils/request.js"
var app = getApp()
var vdomain = app.globalData.domain
Page({
  data: {
    info: ""
  },
  onLoad: function(options) {
    let that = this
    request.getRequest("/Live/Liveyyleju", {}, function(res) {
      if (res.statusCode == 200) {
        that.setData({
          info: res.data
        })
      } else {
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
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  errorLoad: function(e) {
    console.log("web-view加载失败" + e)
  },
  load: function(e) {
    console.log("web-view加载成功" + e)
  }
})