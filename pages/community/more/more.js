// pages/community/more/more.js
import request from '../../../utils/request';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    domain: 'https://xyclientnew.ai-fox.net/',
    CommunityInfo: {},

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
    request.getRequest("/Community/CommunityInfo", {}, function(res) {
      _this.setData({
        CommunityInfo: res.Data
      })
    }, (err) => {
      console.log(err);
    });
  },
  phoneCall: function(e) {
    var num = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: num
    })
  },
  gwChat: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../im/imview/imview',
    })
  },
  yuyue: function(e) {
    wx.navigateTo({
      url: '../../book/seeHouse/seehouse',
    })
  },
  loushu_tap: function(e) {
    wx.navigateToMiniProgram({
      //房天下
      appId: 'wxe3f2203e4292d7c7',
      path: 'pages/Main/Index/Index',
      //房天下

      //搜狐焦点
      // appId: 'wxf7e3def609be52f7',
      // path: '/pages/web-view/main?url=https://m.zhibo.focus.cn/gz/?fromMp=1',
      //搜狐焦点
      envVersion: 'release',
      success(res) {
        // 打开成功
        console.log(1)
      }
    })
  },
  islike_tap: function(e) {
    let CommunityInfo = this.data.CommunityInfo;
    CommunityInfo.islike = !CommunityInfo.islike
    //TODO:向后台更新islike

    //更新data
    this.setData({
      CommunityInfo: CommunityInfo
    })

  }
})