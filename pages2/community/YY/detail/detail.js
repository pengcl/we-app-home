// pages2/community/YY/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currCode:"",
    detailList:[{
      id:1,
      code:'规划',
      img:"https://xyclientnew.ai-fox.net/image/yy/yy_3_规划.jpg"
    }, {
        id:2,
        code: '配套',
        img: "https://xyclientnew.ai-fox.net/image/yy/yy_3_配套.jpg"
      }, {
        id:3,
        code: '品牌',
        img: "https://xyclientnew.ai-fox.net/image/yy/yy_3_品牌.jpg"
      }, {
        id: 4,
        code: '区位',
        img: "https://xyclientnew.ai-fox.net/image/yy/yy_3_区位.jpg"
      }, {
        id:5,
        code: '智慧人居',
        img: "https://xyclientnew.ai-fox.net/image/yy/yy_3_智慧人居.jpg"
      }, {
        id: 5,
        code: '教育',
        img: "https://xyclientnew.ai-fox.net/image/yy/yy_3_教育.jpg"
      },

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let _this=this;
    _this.setData({
      currCode: options.code
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