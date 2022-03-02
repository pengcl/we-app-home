// pages2/referral/tj/reward/caixingh5.js
Page({

  data: {
    recruitID:'',
    //mobile:'',
    thirdUserID:'',
    withdrawID:'',
    withdrawAmonut:'',
    invoice:'',
    projectName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var vRecruitID = options.recruit_id;
    //var vMobile = options.phone;
    var vThirdUserID = options.thirduser_id;
    var vWithdrawID = options.withdraw_id;
    var vWithdrawAmonut = options.withdraw_amount;
    var vInvoice = options.invoice;
    var vProjectName = options.project;

    this.setData({
      recruitID:vRecruitID,
      //mobile:vMobile,
      thirdUserID:vThirdUserID,
      withdrawID:vWithdrawID,
      withdrawAmonut:vWithdrawAmonut,
      invoice : encodeURIComponent(vInvoice),
      projectName : encodeURIComponent(vProjectName),
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