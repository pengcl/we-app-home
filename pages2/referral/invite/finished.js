import request from "../../../utils/request"

var app = getApp();
var vdomain = app.globalData.domain

Page({
  data: {
    bgimg:'',
    invitesuccess:'',
    gid:'',
    salername:'',
    salerphone:'',
    detail:'',
    viewGID:''
  },

  onLoad: function (options) {
    let that = this;
    var gid=options.gid;
    var viewGID = options.viewGID;
    console.log("gid1",gid);
    that.setData({
      bgimg: vdomain + "image/referral/invite_bg.png",
      invitesuccess: vdomain + "image/referral/invite_finished.png",
      gid: gid,
      viewGID :viewGID
    });
    
    that.SetValue(that.data.gid)
  },

  SetValue : function(gid){
    console.log("gid1",gid);
    let that = this
    let data = {
      gid: gid
    }
    request.postRequest("/TJ/TJCUserTDetail",data,
        function(res){
          that.setData({
            salername : res.Data.salerusername,
            salerphone : res.Data.salerusercode,
            detail: res.Data.yxtimeShow
          })
        }
     )
  },
  finish_tap : function()
  {
    wx.redirectTo({
      url: '/pages2/index/index',
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

  }
})