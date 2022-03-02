var app = getApp();
var vdomain = app.globalData.domain

Page({

  /**
   * 页面的初始数据
   */
  data: {
    img1: '',
    img2: '', 
    img3: '',
    btnSource : '',
    shareImg:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      img1 : vdomain + "image/activity/activity_TJ2/01.jpg?" +Math.random() / 9999,
      img2 : vdomain + "image/activity/activity_TJ2/02.jpg?" +Math.random() / 9999,
      img3 : vdomain + "image/activity/activity_TJ2/03.jpg?" +Math.random() / 9999,
      btnSource : vdomain + "image/activity/activity_TJ/TJ_Button.png?" +Math.random() / 9999,
      shareImg : vdomain + "image/activity/activity_TJ2/zf.jpg?" +Math.random() / 9999
    })
  },

  banner_tap:function()
  {
    wx.navigateTo({
      url: '../../referral/main/main'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let _this = this;
		return {
			title: "一“荐”万金",
			imageUrl: _this.data.shareImg,
		};
  }
})