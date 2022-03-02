import request from '../../../../utils/request';
import upload from '../../../../utils/Upload'
const app = getApp();
var vdomain = app.globalData.domain
Page({
  data: {
    content: '',
    fontCount: '0',
    uploadFileUrl: vdomain + 'api/UploadFile/UploadImg',
    pics: [],
    icon: vdomain + 'image/icon8.png',
    isSee: true,
    viewClass1: 'viewFalse',
    viewClass2: 'viewTrue',
    fontclass1: 'fontFalse',
    fontclass2: 'fontTrue'
  },
  onLoad: function(options) {},
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {},
  inputInfo: function(e) {
    var info = e.detail.value
    var length = info.length
    this.setData({
      content: info,
      fontCount: length
    })
  },
  chooseImage() {
    const self = this
    var pics = self.data.pics
    if (pics.length < 9) {
      wx.chooseImage({
        count: 9 - pics.length,
        sizeType: ['compressed'],
        sourceType: ['album'],
        success(res) {
          // wx.showLoading({
          //   title: '上传中,请稍等...',
          // })
          console.log('chooseImage success, temp path is', res.tempFilePaths)
          var imgsrc = res.tempFilePaths;
          pics = pics.concat(imgsrc);
          self.setData({
            pics: pics
          });
        },
        fail({
          errMsg
        }) {
          console.log('chooseImage fail, err is', errMsg)
        }
      })
    }
  },
  submit: function() {
    var vpics = this.data.pics;
    var vurl = this.data.uploadFileUrl
    var reUrl = "add"
    if (vpics.length <= 0) {
      wx.showToast({
        title: '提交成功！',
        duration: 2000,
        success: function() {
          wx.redirectTo({
            url: "add",
          })
        }
      })
    } else {
      upload.uploadimg({
        url: vurl,
        path: vpics,
        tips: true,
        redirectUrl: reUrl
      })
    }
  },
  seeHouse: function(e) {
    var status = e.currentTarget.dataset.id
    if (status == "no") {
      this.setData({
        isSee: false,
        viewClass1: 'viewTrue',
        viewClass2: 'viewFalse',
        fontclass1: 'fontTrue',
        fontclass2: 'fontFalse'
      })
    } else {
      this.setData({
        isSee: true,
        viewClass1: 'viewFalse',
        viewClass2: 'viewTrue',
        fontclass1: 'fontFalse',
        fontclass2: 'fontTrue'
      })
    }
  }
})