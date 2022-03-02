import request from "../../../../utils/request.js"
var app = getApp();
var vdomain = app.globalData.domain
Page({
  data: {
    bgimg: '',
    icon1: '',
    icon2: '',
    icon3: '',
    icon4: '',
    icon5: '',
    icon6: '',
    icon7: '',
    icon8: '',
    icon9: '',
    icon10: '',
    icon11: '',
    info: {},
    xzurl: ''
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      icon: "none",
      mask: true
    })
    let gid = options.gid
    let that = this
    that.LoadInfo(gid)
    that.setData({
      bgimg: vdomain + 'image/referral/main4.jpg',
      icon1: vdomain + 'image/referral/icon10.png',
      icon2: vdomain + 'image/referral/icon11.png',
      icon3: vdomain + 'image/referral/icon12.png',
      icon4: vdomain + 'image/referral/icon13.png',
      icon5: vdomain + 'image/referral/icon14.png',
      icon6: vdomain + 'image/referral/icon15.png',
      icon7: vdomain + 'image/referral/icon16.png',
      icon8: vdomain + 'image/referral/icon17.png',
      icon9: vdomain + 'image/referral/icon18.png',
      icon10: vdomain + 'image/referral/icon19.png',
      icon11: vdomain + 'image/referral/icon20.png'
    })
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  phonecall_tap: function (e) {
    let value = e.currentTarget.dataset.value
    wx.makePhoneCall({
      phoneNumber: value,
    })
  },
  LoadInfo: function (gid) {
    let that = this
    let data = {
      gid: gid
    }
    request.postRequest("/TJ/TJCUserDetail",
      data,
      function (res) {
        if (res.StatusCode == 200) {
          that.setData({
            info: res.Data
          })
          wx.hideLoading({
            success: (res) => {},
          })
        } else {
          wx.hideLoading({
            success: (res) => {},
          })
          wx.showToast({
            title: res.data.Data,
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
  },
  tjrule_tap: function (e) {
    //let xzurl = this.data.info.XZ
    //wx.navigateTo({
    //  url: '../tjrule/tjrule?url=' + xzurl,
    //})

    let path = this.data.info.XZ;
    wx.downloadFile({
      url: path,
      success: function (res) {
        var filePath = res.tempFilePath;
        console.log(filePath);
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功');
            
          }
        })
      }
    })
  }
})