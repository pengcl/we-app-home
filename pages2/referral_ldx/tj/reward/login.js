// pages2/referral/tj/reward/Login.js
Page({

  data: {

  },

  onLoad: function (options) {
    // var vPhoneNum = wx.getStorageSync('PhoneNum');
    // if(vPhoneNum != ''){
    //   //跳转至奖励页面
    //   wx.redirectTo({
    //     url: 'reward',
    //   })
    // }
    // else{
    //   wx.navigateTo({
    //     url: '/pages2/permission/phone/phone'
    //   })
    // }

    wx.hideShareMenu();
  },



  onShow: function () {
    var vPhoneNum = wx.getStorageSync('PhoneNum');
    if(vPhoneNum != ''){
      //跳转至奖励页面
      wx.redirectTo({
        url: 'reward',
      })
    }
    else{
      wx.navigateTo({
        url: '/pages2/permission/phone/phone'
      })
    }
  },


  onHide: function () {},

  onUnload: function () {},

  onPullDownRefresh: function () {},

  onReachBottom: function () {},

  onShareAppMessage: function () {}
})