import request from '../../../../utils/request'
var app = getApp();
var vdomain = app.globalData.domain
Page({
  data: {
    bgImg: vdomain + 'image/activity/PhotoContest/yy/bg.jpg',
    name: '',
    phone: '',
    icon1: vdomain + 'image/activity/PhotoContest/yy/button3.png',
    icon2: vdomain + 'image/activity/PhotoContest/yy/button4.png'
  },
  onLoad: function (options) {

  },
  onReady: function () {},
  onShow: function () {
    let that = this
    var PhoneNum = wx.getStorageSync('PhoneNum');
    that.setData({
      phone: PhoneNum,
    })
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  bindusername: function (e) {
    let that = this;
    that.setData({
      name: e.detail.value
    })
  },
  binduserphone: function (e) {
    let that = this;
    that.setData({
      phone: e.detail.value
    })
  },
  userSave_tap: function (e) {
    let that = this
    if (that.data.name.trim() == "") {
      wx.showToast({
        title: '请输入姓名！',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if (that.data.phone.trim() == "") {
      wx.showToast({
        title: '请输入手机号！',
        icon: 'none',
        duration: 1000
      })
      return;
    }


    let data = {
      UserName: that.data.name,
      UserPhone: that.data.phone
    }

    request.postRequest("/Activity/InsertVoteUserInfo",
      data,
      function (res) {
        if (res.StatusCode == 200) {
          if (res.Data = "1") {
            wx.redirectTo({
              url: '../../../activity/activity01/cj/yy/index/index?gid=690DD335-126A-46E1-818C-1D144DD4A22E',
            })
          } else {
            wx.showToast({
              title: '网络异常，请稍后重试！',
              icon: 'none',
              duration: 1000
            })
          }
        } else {
          wx.showToast({
            title: '网络异常，请稍后重试！',
            icon: 'none',
            duration: 1000
          })
        }
      }, (err) => {
        wx.showToast({
          title: '网络异常，请稍后重试！',
          icon: 'none',
          duration: 2000
        })
      });
  },
  back_tap: function (e) {
    wx.navigateBack({
      complete: (res) => {},
    })
  }
})