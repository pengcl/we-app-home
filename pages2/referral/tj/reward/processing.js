var app = getApp();
var vdomain = app.globalData.domain
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: vdomain + 'image/referral/audting.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var img = '';
    var type = options.type;
    switch(type){
      case '举证审核中': img = vdomain +'image/referral/audting.png'; break;
      case '签约失败': img = ''; break;
      case '推荐人待确认中': img = ''; break;
      case '结算失败': img = ''; break;
    }

    this.setData({
      imgUrl : img
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
  submit_tap: function (e) {
    wx.redirectTo({
      url: 'reward',
    })
  }
})