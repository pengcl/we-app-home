import request from '../../../../utils/request'
var app = getApp();
var vdomain = app.globalData.domain
Page({
  data: {
    contestCode: '',
    typeimg1: vdomain + 'image/activity/PhotoContest/yy/Y11-2.png',
    typeimg2: vdomain + 'image/activity/PhotoContest/yy/Y21-1.png',
    typeimg3: vdomain + 'image/activity/PhotoContest/yy/Y31-1.png',
    bgimage: vdomain + 'image/activity/PhotoContest/yy/bghj.jpg',
    photoType: 'Y11',
    infos: []
  },
  onLoad: function (options) {
    let that = this;
    let contestCode = options.contestCode
    that.setData({
      contestCode: contestCode
    })

    //第一次加载默认显示第一组的作品
    if (app.globalData.appIsOnload) {
      that.loadPhoto("Y11");
    } else {
      app.appIsOnloadCallback = () => {
        that.loadPhoto("Y11");
      }
    }
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  loadPhoto: function (phototype) {
    let that = this
    let data = {
      sContestCode: that.data.contestCode,
      sPhotoType: phototype
    }

    wx.showLoading({
      title: '加载中...',
      mask: true
    })


    request.getRequest("/Activity/PhotoVoteRank",
      data,
      function (res) {
        wx.hideLoading({
          complete: (res) => {},
        })
        if (res.data.StatusCode == 200) {
          var info = res.data.Data;
          that.setData({
            infos: info
          })
          // that.showImg();
        } else {
          wx.showToast({
            title: '抱歉，网络异常，请稍后重试！',
            icon: 'none',
            duration: 2000
          })
        }
      });
  },
  changeType_tap: function (e) {
    let type = e.currentTarget.dataset.id
    let that = this

    switch (type) {
      case 'Y11':
        that.setData({
          typeimg1: vdomain + 'image/activity/PhotoContest/yy/Y11-2.png',
          typeimg2: vdomain + 'image/activity/PhotoContest/yy/Y21-1.png',
          typeimg3: vdomain + 'image/activity/PhotoContest/yy/Y31-1.png',
          pageSize: 10,
          photoType: type
        })
        that.loadPhoto(type)
        break;
      case 'Y21':
        that.setData({
          typeimg1: vdomain + 'image/activity/PhotoContest/yy/Y11-1.png',
          typeimg2: vdomain + 'image/activity/PhotoContest/yy/Y21-2.png',
          typeimg3: vdomain + 'image/activity/PhotoContest/yy/Y31-1.png',
          pageSize: 10,
          photoType: type
        })
        that.loadPhoto(type)
        break;
      case 'Y31':
        that.setData({
          typeimg1: vdomain + 'image/activity/PhotoContest/yy/Y11-1.png',
          typeimg2: vdomain + 'image/activity/PhotoContest/yy/Y21-1.png',
          typeimg3: vdomain + 'image/activity/PhotoContest/yy/Y31-2.png',
          pageSize: 10,
          photoType: type
        })
        that.loadPhoto(type)
        break;
      default:
        that.setData({
          typeimg1: vdomain + 'image/activity/PhotoContest/yy/Y11-2.png',
          typeimg2: vdomain + 'image/activity/PhotoContest/yy/Y21-1.png',
          typeimg3: vdomain + 'image/activity/PhotoContest/yy/Y31-1.png',
          pageSize: 10,
          photoType: type
        })
        that.loadPhoto('Y11')
        break;
    }
  },
  preview: function (e) {
    let url = e.currentTarget.dataset.url
    let urls = []
    urls.push(url)
    wx.previewImage({
      urls: urls,
    })
  }
})