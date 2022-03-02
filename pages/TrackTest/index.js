// pages/TrackTest/index.js
const Track = require('../../utils/Track.js')
import request from '../../utils/request';

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

    console.log("page onLoad", options)
    
    const query = wx.createSelectorQuery()
     query.select('#aas').node((res) => {
      console.log("node", res);


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

  },
  go_tap: function (e) {
    wx.navigateTo({
      url: 'a1?id=111',
    })
  },
  test_tap:function(e){
    request.postRequest("/APPMenu/MenuList", {}, function (res) {
      console.log("11111", res)
     
    }, (err) => {
      console.log(err);
    });
  }
})