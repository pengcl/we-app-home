import request from '../../../../utils/request.js';
const app = getApp();
var vdomain = app.globalData.domain
Page({
  data: {
    bgImg: '',
    activityOrder: {},
    qrcode: '',
    activCode: '',
    code: '',
    icon_invite: '',
    activityInfo: {}
  },
  onLoad: function (options) {
    let that = this
    var vactivCode = options.activCode;
    var vorderCode = options.orderCode;
    let dataOrder = {
      sActivCode: vactivCode,
      code: vorderCode
    }
    let data = {
      code: vactivCode,
      productCode: '001'
    }
    request.getRequest("/Activity/ActivityOrder",
      dataOrder,
      function (res) {
        if (res.data.StatusCode == 200) {
          var order = res.data.Data;
          that.setData({
            activityOrder: order,
            qrcode: vdomain + order.qrcodeurl,
            activCode: vactivCode,
            code: vorderCode
          })
          request.getRequest("/Activity/ActivityInfoWYY",
            data,
            function (res) {
              if (res.statusCode == 200) {
                var info = res.data.Data;
                that.setData({
                  activityInfo: info,
                  icon_invite: vdomain + 'image/activity/activity_lnwyy/icon1.png',
                  bgImg: info.activBanner8
                })
              }
            })
        }
      });
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  assit_tj_tap: function () {
    let that = this
    let activInfo = that.data.activityInfo
    let data = {
      sOrderCode: that.data.code
    }
    request.getRequest("/Order/OrderHDWYY",
      data,
      function (res) {
        if (res.statusCode == 200) {
          if (res.data.Data != null && res.data.Data != "") {
            wx.redirectTo({
              url: '../tj/tjaward?orderCode=' + that.data.code
            })
          } else {
            if (activInfo.IsOverTime) {
              wx.showToast({
                title: '抱歉，该活动不在开放时间段',
                icon: 'none',
                duration: 1500
              })
            } else {
              wx.redirectTo({
                url: '../tj/tj?orderCode=' + that.data.code
              })
            }
          }
        }
      });
  }
})