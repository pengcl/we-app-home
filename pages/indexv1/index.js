import request from '../../utils/request';



//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    current: 'homepage',
    domain: 'https://xyclientnew.ai-fox.net/',
    redian: [],
    tuijian: []
  },
  //事件处理函数
  bindViewTap: function () {

  },
  onLoad: function () {
    //Track.Page.init();
   
    
    let _this = this;

  
    this.setData({
      domain: app.globalData.domain
    })

    request.getRequest("/index/redian", {}, function (res) {
      _this.setData({
        redian: res.Data
      })
    });

    request.getRequest("/index/tuijian", {}, function (res) {
      _this.setData({
        tuijian: res.Data
      })
    });

  },
  // 热点点击事件
  redian_tap: function (e) {
    console.log("redian_tap", e.currentTarget.dataset.id);
    //TODO:热点点击跳转
  },
  redian_more_tap: function (e) {
    console.log("redian_more_tap");
    //TODO:热点更多
  },

})