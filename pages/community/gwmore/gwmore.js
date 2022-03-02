// pages/community/gwmore/gwmore.js
import request from '../../../utils/request';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain: 'https://xyclientnew.ai-fox.net/',
    ZhiYeGuWenFaBu: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;

    this.setData({
      domain: app.globalData.domain
    })

    //置业顾问发布
    request.getRequest("/Community/ZhiYeGuWenFaBu", {}, function (res) {
      console.log("置业顾问发布", res);
      _this.setData({
        ZhiYeGuWenFaBu: res.Data
      })
    }, (err) => {
      console.log(err);
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

  }
})