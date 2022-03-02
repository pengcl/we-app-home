import request from '../../../../utils/request.js';
import util from '../../../../utils/util'
var app = getApp();
var vdomain = app.globalData.domain
Page({
  data: {
    banner1:'',
    mergeTempImg: ''
  },
  onLoad: function (options) {
    var qr = options.qr;
    var url = vdomain + qr;
    console.log("qr",url);
    this.setData({
      banner1: url
    });
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},

  saveImg: function() {
    let that = this

    wx.getImageInfo({
      src : that.data.banner1,
      success(res) {
        console.log("res",res)
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
    console.log("f",tempFilePath);
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
    }
})