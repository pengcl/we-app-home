// pages2/community/TG/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.showmap();
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

  },

  showmap: function () {
    var lat = 23.198042,
      lng = 113.599813,
      vname = "新世界星辉",
      vaddress = "广州增城区新新大道与永宁大道交汇处";
    wx.openLocation({
      type: "gcj02",
      latitude: lat,
      longitude: lng,
      name: vname,
      address: vaddress,
      scale: "10",
      success: function (res) {},
      fail: function (res) {},
    });
 },
})