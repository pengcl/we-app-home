// union/authorize/test3.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    opid:"",
    wxid:"",
    unid:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    let phone = _this.options.phone;
    let opid = _this.options.openid;
    let wxid = _this.options.openid;
    let unid = _this.options.unionid;
    let signature = _this.options.signature;
    _this.setData({
      phone: phone,
      opid:opid,
      wxid:wxid,
      unid:unid,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    
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

  }
})