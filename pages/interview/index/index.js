// pages/interview/index/index.js
import request from '../../../utils/request';
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain: 'https://xyclientnew.ai-fox.net/',
     interviewList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    this.setData({
      domain: app.globalData.domain
    })

     request.getRequest("/interview/interviewlist", {}, function (res) {

       _this.setData({
         interviewList: res.Data
       })
     }, (err) => {
       console.log(err);
     });
  },
  nwview_tap: function (e) { 
    wx.navigateTo({
      url: '../view/view',
    })
  },
})