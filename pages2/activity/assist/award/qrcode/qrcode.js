import request from '../../../../../utils/request.js';
const app = getApp();
var vdomain = app.globalData.domain
Page({
  data: {
    bgImg: '',
    activityOrder: {},
    qrcode:''
  },
  onLoad: function(options) {
    let that=this
    var vactivCode = options.activCode;
    var vorderCode = options.orderCode;
    var type = options.type;
    let dataOrder = {
      sActivCode: vactivCode,
      code: vorderCode
    }
    request.getRequest("/Activity/ActivityOrder",
      dataOrder,
      function(res) {
        if (res.statusCode == 200) {
          var order = res.data.Data;
          that.setData({
            activityOrder: order,
            qrcode: vdomain + order.qrcodeurl
          })
        }
      });
    switch (type) {
      case 'yy':
        that.setData({
          bgImg: vdomain + '/image/activity/assist/10/qryy.png'
        })
        break;
      case 'kyw':
        that.setData({
          bgImg: vdomain + '/image/activity/assist/10/qrkyw.png'
        })
        break;
      case 'gf':
        that.setData({
          bgImg: vdomain + '/image/activity/assist/10/qrgf.png'
        })
        break;
    }
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {}
})