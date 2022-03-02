import request from '../../../utils/request';
const app = getApp();
Page({
  data: {
    YueDongTi: {}
  },
  onLoad: function(options) {
    let _this = this;
    //悦动态
    request.getRequest("/Community/YueDongTi", {}, function(res) {
      console.log("悦动态", res);
      _this.setData({
        YueDongTi: res.Data
      })
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
  onShareAppMessage: function() {}
})