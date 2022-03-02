import request from '../../../utils/request';
const app = getApp();
var vdomain = app.globalData.domain
Page({
  data: {
    bookInfo: []
  },
  onLoad: function(options) {
    var id = options.id
    let _this = this;
    request.getRequest("/my/myCollect", {}, function(res) {
      _this.setData({
        bookInfo: res.Data
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
  onShareAppMessage: function() {},
  prjView: function(e) {
    wx.navigateTo({
      url: '../../community/detail/detail',
    })
  },
  houseView: function(e) {
    wx.navigateTo({
      url: '../../housType/housType',
    })
  }
})