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
    let vlotterygid = options.lotterygid
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
      sProject: 'KYW'
    }
    request.getRequest("/Lottery/LotteryRecord",
      data,
      function (res) {
        if (res.data.StatusCode == 200) {
          
          that.setData({
            lotteryInfo: res.data.Data,
            bgimag: vdomain + res.data.Data.awardModel.image1,
            qrcodeURL: vdomain + res.data.Data.qrcodeURL
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
  }
})