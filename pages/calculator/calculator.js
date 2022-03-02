// pages/calculator/calculator.js
import request from '../../utils/request';
let app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    TabList:['商业贷款','公积金贷款','组合贷款']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id
    })
  }
})