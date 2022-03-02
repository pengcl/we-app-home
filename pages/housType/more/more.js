import request from '../../../utils/request';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    domain: 'https://xyclientnew.ai-fox.net/',
    housTypeList: {},

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this;
    let id = options.id;
    this.setData({
      id: id,
      domain: app.globalData.domain
    })
    request.getRequest("/housType/housTypeList", {}, function(res) {

      _this.setData({
        housTypeList: res.Data
      })
    }, (err) => {
      console.log(err);
    });
  },
  book_tap: function(e) {
    wx.navigateTo({
      url: '../../book/seeHouse/seehouse',
    })
  },
  houseType_tap: function(e) {
    wx.navigateTo({
      url: '../housType',
    })
  }
})