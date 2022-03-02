// pages2/Live/index/index.js
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
    wx.setStorageSync('url_type', "0");
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let roomId = 3; // 填写具体的房间号，可通过下面【获取直播房间列表】 API 获取
    let customParams = encodeURIComponent(JSON.stringify({ path: 'pages/index/index', pid: 1 })) // 开发者在直播间页面路径上携带自定义参数（如示例中的path和pid参数），后续可以在分享卡片链接和跳转至商详页时获取，详见【获取自定义参数】、【直播间到商详页面携带参数】章节（上限600个字符，超过部分会被截断） 


    var temp = wx.getStorageSync('url_type');
    if (temp == "2") {
        wx.redirectTo({
          url: '/pages2/index/index'
        })
    }
    else{
      let phonenum = wx.getStorageSync('PhoneNum');
      if (phonenum==""|| phonenum=="undefined"){
        wx.setStorageSync('url_type', "-1"); //未授权
        wx.navigateTo({
          url: "/pages2/permission/phone/phone"
        });
        
      }
      else{
        wx.setStorageSync('url_type', "2");
        wx.navigateTo({
        url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${roomId}&custom_params=${customParams}`
       });
      }

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

  }
})