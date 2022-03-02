// pages/article/test.js
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
    var url = "https://epaper.oeeee.com/epaper/A/html/2021-03/26/content_5976.htm#article";
    var title = "测试";
    url = escape(url);
		wx.navigateTo({
      //url: "view?url=" + url + "&title=" + title + "&projectgid=852FA663-9EA1-44F9-A109-1C8990266D92",
      url: "view?url=" + url + "&title=" + title,
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

  },
  view_tap: function (e) {

		//let url = escape(e.currentTarget.dataset.url);
		//wx.navigateTo({
		//	url: "view?url=" + url,
		//});
	},
})