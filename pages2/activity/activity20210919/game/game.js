// pages2/activity/activity20210919/game/game.js
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
    let phonenum = wx.getStorageSync('PhoneNum');
    if (phonenum==""|| phonenum=="undefined")
		{
			wx.navigateTo({
				url: "/pages2/permission/phone/phone"
			});
		}
		else{
      this.setData({
        visible :true
      })
    }
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

    var app = getApp();
    var vdomain = app.globalData.domain;

    return {
      title: "金秋送爽，海量福利大收获!",
      path: 'pages2/activity/activity20210919/game/game',
      imageUrl: vdomain + 'image/activity/activity20210919/gamefm.jpg',

    }
  }
})