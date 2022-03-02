import request from '../../../../../utils/request.js';
const app = getApp();
var vdomain = app.globalData.domain
Page({
  data: {
    activCode: '',
    orderCode: '',
    activityInfo: {},
    icon: vdomain + 'image/activity/assist/10/icon-gou.png',
    statusyy: 'none',
    statuskyw: 'none',
    statusgf: 'none',
    awardType: ''
  },
  onLoad: function(options) {
    let that = this;
    let vactivCode = options.activCode;
    let vorderCode = options.orderCode;
    that.setData({
      activCode: vactivCode,
      orderCode: vorderCode
    })
    let data = {
      code: vactivCode,
      productCode: '001'
    }
    if (app.globalData.appIsOnload) {
      request.getRequest("/Activity/ActivityInfo",
        data,
        function(res) {
          if (res.statusCode == 200) {
            var info = res.data.Data;
            that.setData({
              activityInfo: info
            })
          }
        });
    } else {
      app.appIsOnloadCallback = () => {
        request.getRequest("/Activity/ActivityInfo",
          data,
          function(res) {
            if (res.statusCode == 200) {
              var info = res.data.Data;
              that.setData({
                activityInfo: info
              })
            }
          });
      }
    }
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  award_tap: function(e) {
    let that = this
    let type = that.data.awardType
    if (type == '') {
      wx.showToast({
        title: '请选择您的奖品！',
        icon: 'none',
        duration: 2000
      })
    } else {
      let data = {
        activeCode: that.data.activCode,
        orderCode: that.data.orderCode,
        awardType: type
      }
      request.postRequest("/Activity/ReceiveAward",
        data,
        function(res) {
          if (res.StatusCode == 200) {
            if (res.Data == "over") {
              wx.showToast({
                title: '所选礼品已领完',
                icon: 'none',
                duration: 1000
              })
            } else if (res.Data == "success") {
              wx.redirectTo({
                url: '../qrcode/qrcode?orderCode=' + that.data.orderCode + "&activCode=" + that.data.activCode + "&type=" + that.data.awardType,
              })
            }
          } else {
            wx.showToast({
              title: '领取失败，请退出重试！',
              icon: 'none',
              duration: 1000
            })
          }
        }, (err) => {
          wx.showToast({
            title: '网络异常，请稍后重试！',
            icon: 'none',
            duration: 1000
          })
        });
    }
  },
  selectAward: function(e) {
    let type = e.currentTarget.dataset.id
    switch (type) {
      case 'yy':
        this.setData({
          statusyy: 'flex',
          statuskyw: 'none',
          statusgf: 'none',
          awardType: 'yy'
        })
        break;
      case 'kyw':
        this.setData({
          statusyy: 'none',
          statuskyw: 'flex',
          statusgf: 'none',
          awardType: 'kyw'
        })
        break;
      case 'gf':
        this.setData({
          statusyy: 'none',
          statuskyw: 'none',
          statusgf: 'flex',
          awardType: 'gf'
        })
        break;
    }
  }
})