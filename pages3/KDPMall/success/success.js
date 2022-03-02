import kSvc from "../service";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    userPhone: null,
    current: 0,
    order: null,
    codes: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ orderno: options.orderno });
  },

  link(e) {
    wx.redirectTo({
      url: e.currentTarget.dataset.url,
    })
  },

  getMeta() {
    const userInfo = wx.getStorageSync("UserInfo");
    const userPhone = wx.getStorageSync("PhoneNum");
    this.setData({
      userInfo,
      userPhone
    });
  },

  getData(orderno) {
    this.getCodes(orderno);
  },

  swiperChange(e) {
    this.setData({ current: e.detail.current });
  },
  getCodes(orderno) {
    kSvc.getCodes(orderno, codes => {
      const order = codes[0];
      console.log(codes);
      let usedCount = this.data.usedCount;
      codes.forEach((item, index) => {
        item.qrcodeurl = item.qrcodeurl.replace(/\\/gi, '/');
        if (item.status === '已使用') {
          usedCount = usedCount + 1;
        }
        item.qrcodeurl = item.qrcodeurl.replace(/\\/gi, '/');
        this.setData({ codes });
      });
      this.setData({ codes, usedCount,order });
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
    if (app.globalData.appIsOnload) {
      this.getMeta();
      this.getData(this.data.orderno);
    } else {
      app.appIsOnloadCallback = () => {
        this.getMeta();
        this.getData(this.data.orderno);
      };
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

  }
})