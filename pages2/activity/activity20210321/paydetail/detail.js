import request from '../../../../utils/request.js';
var app = getApp();
var vdomain = app.globalData.domain
Page({
  data: {
    bgimage: '',
    orderInfo: {},
    qrcode: '',
    maskdisplay: 'none',
    icon: ''
  },
  onLoad: function (options) {
    let that = this
    let code = options.pcode

    let data = {
      sProductCode: code
    }
    request.getRequest("/Order/OrderHexiao_MHSH",
      data,
      function (res) {
        if (res.data.StatusCode == 200) {
          let dataList = res.data.Data;
          if (dataList != null) {
            that.setData({
              orderInfo: dataList,
              bgimage: vdomain + 'image/activity/activity20200919/bg.png',
              icon: vdomain + 'image/activity/activity20200919/icon.png'
            });
          }
        } else {
          wx.showToast({
            title: '网络异常，请稍后重试！',
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
  qrcode_tap: function () {
    let that = this
    let ordercode = that.data.orderInfo.OrderCode;
    let data = {
      sOrderCode: ordercode
    }
    request.getRequest("/Order/OrderQRCode",
      data,
      function (res) {
        if (res.data.StatusCode == 200) {
          let dataList = res.data.Data;
          if (dataList != null) {
            that.setData({
              qrcode: dataList,
              maskdisplay: 'flex'
            });
          }
        } else {

        }
      });
  },
  mask_tap: function () {
    let that = this
    that.setData({
      maskdisplay: 'none'
    })
  },
  // qy_tap: function (e) {
  //   let that = this;
  //   let useM = e.currentTarget.dataset.id
  //   let isuse = e.currentTarget.dataset.use
  //   let orderCode = that.data.orderInfo.OrderCode
  //   switch (useM) {
  //     case "5":
  //       if (isuse == 'true' || isuse == true) {
  //         wx: wx.showToast({
  //           title: '您已成功预约滴滴专车！',
  //           icon: 'none',
  //           duration: 1000,
  //           mask: true,
  //           success: function (res) {},
  //         })
  //       } else {
  //         wx.navigateTo({
  //           url: '../bookcar/book?orderCode=' + orderCode,
  //         })
  //       }
  //       break;
  //     case "7":
  //       let enable = e.currentTarget.dataset.enbale
  //       if (enable == "true" || enable == true) {
  //         wx.navigateTo({
  //           url: '../../assist/award/selAward/selAward2',
  //         })
  //       } else {
  //         wx.navigateTo({
  //           url: '../../assist/index/index?code=AT20002',
  //         })
  //       }

  //       break;
  //     case "10":
  //       wx.navigateTo({
  //         url: '../tj/list?ordercode=' + that.data.orderInfo.OrderCode,
  //       })
  //       break;
  //     default:
  //       break;
  //   }
  // }
})