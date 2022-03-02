import request from '../../../../utils/request.js';
import util from '../../../../utils/util'
var app = getApp();
var vdomain = app.globalData.domain
Page({
  data: {
    orderHDInfo: [],
    ordercode: '',
    icon: vdomain + 'image/icon10.png',
    qrcodeUrl: "",
    maskdisplay: 'none',
  },
  onLoad: function(options) {
    let that = this
    let data = {}
    that.setData({
      ordercode: options.ordercode
    })
    request.postRequest("/Order/OrderHDList",
      data,
      function(res) {
        if (res.StatusCode == 200) {
          that.setData({
            orderHDInfo: res.Data
          })
        } else {
          wx.showToast({
            title: '网络异常，请稍后重试！',
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
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  tj_tap: function() {
    let that = this
    wx.navigateTo({
      url: 'index?ordercode=' + that.data.ordercode,
    })
  },
  qrcode_tap: function(e) {
    let that = this
    let url = e.currentTarget.dataset.id
    that.setData({
      qrcodeUrl: vdomain + url,
      maskdisplay: 'flex'
    })
  },
  mask_tap: function() {
    let that = this
    that.setData({
      maskdisplay: 'none'
    })
  }
})