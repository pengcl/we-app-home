import request from "../../../../utils/request.js"
var app = getApp();
var vdomain = app.globalData.domain
Page({
  data: {
    bgimg: vdomain + 'image/referral/main5.jpg',
    bgimg1: vdomain + 'image/referral/main6.png',
    icon1: '',
    icon2: '',
    icon3: '',
    icon4: '',
    icon5: '',
    icon6: '',
    icon7: '',
    ytjColor: '#CAA461',
    ydfColor: '#BFBFBF',
    yrgColor: '#BFBFBF',
    ysxColor: '#BFBFBF',
    tabType: 'ytj',
    phone: '',
    infoList: {},
    userInfo: {},
    count: []
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    let that = this
    let phone = wx.getStorageSync('PhoneNum')
    let phoneNumSignText = ""
    let phoneNumSign1 = wx.getStorageSync('phoneNumSignText')
    let phoneNumSign2 = wx.getStorageSync('PhoneNumSign')
    if (phoneNumSign1 != "") {
      phoneNumSignText = phoneNumSign1
    } else if (phoneNumSign2 != "") {
      phoneNumSignText = phoneNumSign2
    }
    let data = {
      phone: phone
    }
    request.postRequest("/LDXWH/LDXEUserInfo",
      data,
      function (res) {
        if (res.StatusCode == 200) {
          that.setData({
            userInfo: res.Data
          })
        } else {
          wx.hideLoading({
            success: (res) => {},
          })
          wx.showToast({
            title: res.Data,
            icon: 'none',
            duration: 2000
          })
        }
      }, (err) => {
        wx.hideLoading({
          success: (res) => {},
        })
        wx.showToast({
          title: '网络异常，请稍后重试！',
          icon: 'none',
          duration: 2000
        })
      });

    let data1 = {
      PhoneNum: phone,
      phoneNumSignText: phoneNumSignText
    }
    request.postRequest("/LDXWH/MyLDXListCount",
      data1,
      function (res) {
        if (res.StatusCode == 200) {
          that.setData({
            count: res.Data,
            phone: phone
          })
          //默认获取已推荐列表：
          that.GetTJList('已推荐', phone)
        } else {
          wx.hideLoading({
            success: (res) => {},
          })
          wx.showToast({
            title: res.Data,
            icon: 'none',
            duration: 2000
          })
        }
      }, (err) => {
        wx.hideLoading({
          success: (res) => {},
        })
        wx.showToast({
          title: '网络异常，请稍后重试！',
          icon: 'none',
          duration: 2000
        })
      });
    that.setData({
      icon1: vdomain + 'image/referral/icon6.png',
      icon2: vdomain + 'image/referral/icon7.png',
      icon3: vdomain + 'image/referral/icon8.png',
      icon4: vdomain + 'image/referral/icon10.png',
      icon5: vdomain + 'image/referral/icon12.png',
      icon6: vdomain + 'image/referral/icon13.png',
      icon7: vdomain + 'image/activity/activity_TJ/Reward/wallet.png',
    })
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  insure_tap: function (e) {
    wx.showLoading({
      title: '加载中...'
    })
    let value = e.currentTarget.dataset.value
    let that = this
    switch (value) {
      case "ytj":
        that.setData({
          tabType: 'ytj',
          ytjColor: '#CAA461',
          ydfColor: '#BFBFBF',
          yrgColor: '#BFBFBF',
          ysxColor: '#BFBFBF'
        })
        that.GetTJList('已推荐', that.data.phone)
        break;
      case "ydf":
        that.setData({
          tabType: 'ydf',
          ytjColor: '#BFBFBF',
          ydfColor: '#CAA461',
          yrgColor: '#BFBFBF',
          ysxColor: '#BFBFBF'
        })
        that.GetTJList('已到访', that.data.phone)
        break;
      case "yrg":
        that.setData({
          tabType: 'yrg',
          ytjColor: '#BFBFBF',
          ydfColor: '#BFBFBF',
          yrgColor: '#CAA461',
          ysxColor: '#BFBFBF'
        })
        that.GetTJList('已成功', that.data.phone)
        break;
      case "ysx":
        that.setData({
          tabType: 'ysx',
          ytjColor: '#BFBFBF',
          ydfColor: '#BFBFBF',
          yrgColor: '#BFBFBF',
          ysxColor: '#CAA461'
        })
        that.GetTJList('已失效', that.data.phone)
        break;
    }
  },
  GetTJList(status, phone) {
    let that = this
    let phoneNumSignText = ""
    let phoneNumSign1 = wx.getStorageSync('phoneNumSignText')
    let phoneNumSign2 = wx.getStorageSync('PhoneNumSign')
    if (phoneNumSign1 != "") {
      phoneNumSignText = phoneNumSign1
    } else if (phoneNumSign2 != "") {
      phoneNumSignText = phoneNumSign2
    }
    let data = {
      status: status,
      PhoneNum: phone,
      phoneNumSignText: phoneNumSignText
    }
    request.postRequest("/LDXWH/MyLDXList",
      data,
      function (res) {
        if (res.StatusCode == 200) {
          that.setData({
            infoList: res.Data
          })
        } else {
          that.setData({
            infoList: {}
          })
          wx.showToast({
            title: res.Data,
            icon: 'none',
            duration: 2000
          })
        }
      }, (err) => {
        that.setData({
          infoList: {}
        })
        wx.showToast({
          title: '网络异常，请稍后重试！',
          icon: 'none',
          duration: 2000
        })
      });
    wx.hideLoading({
      success: (res) => {},
    })
  },
  submit_tap: function (e) {
    wx.navigateTo({
      url: '../tj/index',
    })
  },
  tjdetail_tap: function (e) {
    let gid = e.currentTarget.dataset.value
    wx.navigateTo({
      url: '../tjdetail/detail?gid=' + gid,
    })
  },
  rule_tap: function (e) {
    wx.navigateTo({
      url: '../../regist/rule/rule',
    })
  },

  //reward_tap: function (e) {
  //  wx.navigateTo({
  //    url: '../reward/reward',
  //  })
  //}
})