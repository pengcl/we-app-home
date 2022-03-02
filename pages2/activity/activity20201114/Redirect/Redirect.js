
import request from '../../../../utils/request.js';
var app = getApp();
var vdomain = app.globalData.domain

Page({
  data: {

  },
  onLoad: function (options) {

    //获取用户是否购买权益
    //如果购买了，跳转到相应权益页面
    //如果没购买，跳转到活动页

    let dataPost = {
      sProductCode: ""
    }
    request.getRequest("/Order/OrderList",
        dataPost,
        function(res){
          wx.hideLoading();
          if (res.data.StatusCode == 200) {
            let dataList = res.data.Data;
            if (dataList != null && dataList.length > 0 ) {

              var projName ="";
              var length = dataList.length - 1;
              var code = dataList[length].ProductCode;

              if(code.indexOf('004') !== -1)
              {
                switch(code)
                {
                  case "004-yy" : projName = "YY" ;break;
                  case "004-zc" : projName = "ZC" ;break;
                  case "004-zq" : projName = "ZQ" ;break;
                  case "004-kyw" : projName = "KYW" ;break;
                  case "004-qy" : projName = "QY" ;break;
                  case "004-gf" : projName = "GF" ;break;
                }
                wx.redirectTo({
                  url: '../paydetail/detail?pcode=' + code + "&projName=" +projName,
                })
              }
              else
              {
                wx.redirectTo({
                  url: "/pages2/activity/activity20201114/main/main",
                });
              }
            } 
            else
            {
                wx.redirectTo({
                  url: "/pages2/activity/activity20201114/main/main",
                });
            }
          }
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