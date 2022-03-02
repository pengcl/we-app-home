import request from '../../../utils/request';
const app = getApp();
var vdomain = app.globalData.domain
Page({
  data: {
    bookInfo: {}
  },
  onLoad: function(options) {
    var id = options.id
    let _this = this;
    request.getRequest("/YuYue/GetYuYue", {}, function(res) {
      if (res.data.StatusCode==200){
        _this.setData({
          bookInfo: res.data.Data
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
  onShareAppMessage: function() {},
  gwchat: function(e) {
    wx.navigateTo({
      url: '../../im/imview/imview',
    })
  },
  prjView: function(e) {
    wx.navigateTo({
      url: '../../community/detail/detail',
    })
  }
})