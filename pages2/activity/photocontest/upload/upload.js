import request from "../../../../utils/request.js";
var app = getApp();
var vdomain = app.globalData.domain
Page({
  data: {
    contestCode: '',
    icon: vdomain + 'image/icon8.png',
    icon1: vdomain + 'image/activity/PhotoContest/yy/icon5.png',
    button1: vdomain + 'image/activity/PhotoContest/yy/button1.png',
    button2: vdomain + 'image/activity/PhotoContest/yy/button2.png',
    bgImg: vdomain + 'image/activity/PhotoContest/yy/bgupload.jpg',
    pics: [],
    picsthumb: [],
    username: '',
    userphone: '',
    workName: '',
    workIntro: '',
    index: 0,
    typeList: [{
      id: '',
      name: '请选择作品类型'
    }, {
      id: 'Y11',
      name: '都会璀璨组'
    }, {
      id: 'Y21',
      name: '健康生态组'
    }, {
      id: 'Y31',
      name: '亲融人文组'
    }],
    photoType: '',
    deleteVisible: "none",
    uploadVisible: "block"
  },
  onLoad: function (options) {
    let that = this;
    let contestCode = options.contestCode;
    let name = options.name;
    if (typeof (name) != "undefined") {
      that.setData({
        username: name
      })
    }

    that.setData({
      contestCode: contestCode
    })
  },
  onReady: function () {},
  onShow: function () {
    let that = this
    var PhoneNum = wx.getStorageSync('PhoneNum');
    that.setData({
      userphone: PhoneNum,
    })
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  chooseImage() {
    const self = this
    var pics = self.data.pics
    var picsthumb = self.data.picsthumb
    if (pics.length < 1) {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album'],
        success(res) {
          wx.showLoading({
            title: '上传中,请稍等...',
            mask: true
          })
          console.log('chooseImage success, temp path is', res.tempFilePaths)
          var imgsrc = res.tempFilePaths;
          wx.uploadFile({
            url: vdomain + 'api/Activity/UploadPhoto',
            filePath: imgsrc[0],
            name: 'file',
            formData: null,
            success: (resp) => {
              wx.hideLoading({
                complete: (res) => {},
              })
              let result = JSON.parse(resp.data)
              if (result.StatusCode == 200) {
                let pics1 = result.Data.split(',');
                let pic = pics1[0];
                let picthumb = pics1[1]

                self.setData({
                  pics: pics.concat(pic),
                  picsthumb: picsthumb.concat(picthumb),
                  deleteVisible: "block",
                  uploadVisible: 'none'
                })
              } else if (result.StatusCode == 900) {
                wx.showToast({
                  title: result.Info,
                  icon: 'none',
                  duration: 1000
                })
              }
            },
            fail: (resp) => {
              wx.hideLoading({
                complete: (res) => {},
              })
              wx.showToast({
                title: '网络异常，请稍后重试！',
                icon: 'none',
                duration: 1000
              })
            },
          })
        },
        fail({
          errMsg
        }) {
          console.log('chooseImage fail, err is', errMsg)
        }
      })
    }
  },
  bindusername: function (e) {
    let that = this;
    that.setData({
      username: e.detail.value
    })
  },
  binduserphone: function (e) {
    let that = this;
    that.setData({
      userphone: e.detail.value
    })
  },
  bindWorksName: function (e) {
    let that = this;
    that.setData({
      workName: e.detail.value
    })
  },
  bindWorkIntro: function (e) {
    let that = this;
    that.setData({
      workIntro: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    let index = e.detail.value
    let that = this
    that.setData({
      photoType: that.data.typeList[index].id,
      index: index
    })
  },
  photoContest_tap: function (e) {
    let that = this

    if (that.data.username.trim() == "") {
      wx.showToast({
        title: '请填写姓名',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if (that.data.userphone.trim() == "") {
      wx.showToast({
        title: '请填写手机号',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if (that.data.workName.trim() == "") {
      wx.showToast({
        title: '请填写作品主题',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if (that.data.workIntro.trim() == "") {
      wx.showToast({
        title: '请填写作品简介',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if (that.data.photoType.trim() == "") {
      wx.showToast({
        title: '请选择作品类型',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if (that.data.pics.length <= 0) {
      wx.showToast({
        title: '请上传作品',
        icon: 'none',
        duration: 1000
      })
      return;
    }

    wx.showLoading({
      title: '正在提交...',
      mask: true
    })

    let data = {
      PlayerName: that.data.username.trim(),
      PlayerPhone: that.data.userphone.trim(),
      PhotoName: that.data.workName.trim(),
      PhotoIntro: that.data.workIntro.trim(),
      PhotoType: that.data.photoType,
      ContestCode: that.data.contestCode,
      PhotoUrl: that.data.pics[0],
      PhotoThumbUrl: that.data.picsthumb[0]
    }

    request.postRequest("/Activity/InsertPhotoWork",
      data,
      function (res) {
        if (res.StatusCode == 200) {
          wx.hideLoading({
            complete: (res) => {},
          })
          wx.showToast({
            title: '报名成功！',
            icon: 'none',
            duration: 1000,
            success: function (e) {
              setTimeout(function () {
                wx.redirectTo({
                  url: 'upload?contestCode=' + that.data.contestCode + "&name=" + that.data.username,
                })
              }, 1000)
            }
          })
        } else if (res.StatusCode == 505) {
          wx.hideLoading({
            complete: (res) => {},
          })
          wx.showToast({
            title: '当前作品类型您已投稿！',
            icon: 'none',
            duration: 1000
          })
        } else {
          wx.hideLoading({
            complete: (res) => {},
          })
          wx.showToast({
            title: '网络异常，请稍后重试！',
            icon: 'none',
            duration: 1000
          })
        }
      }, (err) => {
        wx.hideLoading({
          complete: (res) => {},
        })
        wx.showToast({
          title: '网络异常，请稍后重试！',
          icon: 'none',
          duration: 2000
        })
      });
  },
  delete_tap: function (e) {
    let that = this

    that.setData({
      pics: [],
      picsthumb: [],
      deleteVisible: "none",
      uploadVisible: "block"
    })
  },
  preview_tap: function (e) {
    let that = this
    wx.previewImage({
      urls: that.data.pics,
    })
  }
})