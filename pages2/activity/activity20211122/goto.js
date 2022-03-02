var app = getApp();
var vdomain = app.globalData.domain;
import request from "../../../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    //audting: vdomain + 'image/referral/regok1.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkpass();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.checkpass();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.checkpass();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  submit_tap: function (e) {
    wx.redirectTo({
      //url: '../../../../pages2/index/index',
      //url: "../../../../../../referral/tj/tj/index",
    })
  },

  checkpass: function () {
    let that = this
    var phone = wx.getStorageSync("PhoneNum");
    if (phone == "") {
      //wx.showToast({
      //  title: '请授权手机号！',
      //  icon: 'none',
      //  duration: 1000
      //})
      wx.navigateTo({
				url: "../../permission/phone/phone",
      });
      //that.getPhoneNumber(e);
      return;
    }
    let data = {
      phone: phone,
    }
    request.postRequest("/TJ/TJEUserCheckPass",
      data,
      function (res) {
        //console.log("aafdsafa",res)
        if (res.StatusCode == 200) {
          //console.log("aafdsafa",res.Data);
          wx.navigateTo({
            url: "../../../../../../referral/tj/tj/index",
          });
        } else {
          wx.navigateTo({
            url: "reg",
          });
        }
      }, (err) => {
        wx.showToast({
          title: '网络异常，请稍后重试！',
          icon: 'none',
          duration: 2000
        })
      });
  },

})