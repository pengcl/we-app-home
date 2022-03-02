var app = getApp();
var vdomain = app.globalData.domain
import request from "../../../utils/request";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //img: '',
    btnSource : '',
    zfSource : '',
    pageData: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      //img : vdomain + "image/activity/activity_TJ/TJ_Detail.jpg",
      btnSource : vdomain + "image/activity/activity_TJ3/20211209/TJ_Button.png",
      //zfSource : vdomain + "image/activity/activity_TJ3/20211209/zf.jpg"
      zfSource : vdomain + "image/activity/activity_TJ3/20211214/zf.jpg"
    });

    request.getRequest(
      "/Page/activityTJ_WH", {},
      function (res) {
        that.setData({
          pageData: res.data,
        });
      }
    );


  },

  banner_tap:function()
  {
    wx.navigateTo({
      url: '../../referral_ldxwh/main/main'
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
    let that = this;
		return {
			title: "全民薪动季，一推赢万金",
			imageUrl: that.data.zfSource + "?" + Math.random() / 99999,
		};
  }
})