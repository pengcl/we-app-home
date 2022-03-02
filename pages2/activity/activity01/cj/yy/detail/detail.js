import request from '../../../../../../utils/request.js';
var app = getApp();
var vdomain = app.globalData.domain
Page({
  data: {
    lotterygid: '',
    lotteryInfo: '',
    qrcodeURL: '',
    bgimag: ''
  },
  onLoad: function (options) {
    let that = this
    let vlotterygid = options.gid
    that.setData({
      lotterygid: vlotterygid
    })
    that.loadInfo(vlotterygid);
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  loadInfo: function (gid) {
    let that = this
    let data = {
      sLotteryID: gid,
      sProject: 'YY'
    }
    request.getRequest("/Lottery/LotteryRecord",
      data,
      function (res) {
        if (res.data.StatusCode == 200) {
          if (res.data.Data == "") {
            wx.showToast({
              title: '抱歉，您未参与抽奖！',
              icon: 'none',
              duration: 1500,
              success: function (e) {
                setTimeout(() => {
                  wx.redirectTo({
                    url: '../../../../photocontest/main/main',
                  })
                }, 1500);
              }
            })
          } else {
            that.setData({
              lotteryInfo: res.data.Data,
              bgimag: vdomain + res.data.Data.awardModel.image1,
              qrcodeURL: vdomain + res.data.Data.qrcodeURL
            })
          }
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
  }
})