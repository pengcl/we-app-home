import request from '../../../../utils/request.js';
import util from '../../../../utils/util'
var app = getApp();
var vdomain = app.globalData.domain
Page({
  data: {
    orderInfo: {},
    friendCode: '',
    awardCode: '',
    tjStatus: '',
    bgimg:vdomain+'image/activity/activity_lnwyy/tj_3.jpg'
  },
  onLoad: function (options) {
    let that = this;
    var orderCode = options.orderCode
    that.loadInfo(orderCode);
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  saveImg: function () {
    let that = this

    wx.getImageInfo({
      src: that.data.friendCode,
      success(res) {
        console.log("res", res)
        that.setData({
          mergeTempImg: res.path
        });
      }
    })
    let tempFilePath = that.data.mergeTempImg;
    wx.showLoading({
      title: '正在保存',
      mask: true
    })
    console.log("f", tempFilePath);
    wx.saveImageToPhotosAlbum({
      filePath: tempFilePath,
      success(res) {
        // 修改下载状态
        wx.hideLoading()
        wx.showModal({
          title: '温馨提示',
          content: '图片保存成功，可在相册中查看',
          showCancel: false,
          success(res) {
            wx.clear
            if (res.confirm) {
              that.setData({
                maskDisplay: 'none'
              })
            }
          }
        })
      },
      fail(res) {
        wx.hideLoading()
        wx.showModal({
          title: '温馨提示',
          content: '图片保存失败，请重试',
          showCancel: false
        })
      }
    })
  },
  loadInfo: function (orderCode) {
    let that = this
    let data = {
      sOrderCode: orderCode
    }
    request.getRequest("/Order/OrderHDWYY",
      data,
      function (res) {
        wx.hideLoading();
        if (res.data.StatusCode == 200) {
          console.log("res", res);
          var opresult1 = res.data.Data.opresult1;
          var opresult2 = res.data.Data.opresult2;
          var status = ''
          var awardCode = ''
          if (opresult1 == null) {
            status = "未到访"
          } else if (opresult1 == "有效" && opresult2 == null) {
            status = "已到访"
          } else if (opresult2 == "有效") {
            status = "有效推荐"
            awardCode = vdomain + res.data.Data.qrcodeURL1
          } else if (opresult2 == "无效") {
            status = "无效推荐"
          }

          that.setData({
            orderInfo: res.data.Data,
            friendCode: vdomain + res.data.Data.qrcodeURL,
            tjStatus: status,
            awardCode: awardCode
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