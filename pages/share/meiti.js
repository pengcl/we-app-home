// pages/share/meiti.js
import request from '../../utils/request';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain: '',
    comecode:'',
    //pid:'',
    UserInfo:[],
    PhoneNum:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    if (options.scene){
      var scene = decodeURIComponent(options.scene);
      //let sid = scene.split("-")[0];
      //let pid = scene.split("-")[1];
      let comecode = scene;

      this.setData({
        comecode:comecode,
        //pid:pid,
        UserInfo: wx.getStorageSync('UserInfo'),
        PhoneNum: wx.getStorageSync('PhoneNum'),
      })
      
      wx.setStorageSync('comecode', comecode);
      
      console.log("userInfo",wx.getStorageSync('UserInfo'));

      let data = {
        "city": that.data.UserInfo.city,
        "province": that.data.UserInfo.province,
        "nickname": that.data.UserInfo.nickName,
        "country": that.data.UserInfo.country,
        "avatarUrl": that.data.UserInfo.avatarUrl,
        "gender": that.data.UserInfo.gender,
        "UserPhone": that.data.PhoneNum,
        //"pid": that.data.pid,
        "comecode": that.data.comecode,
        "comefrom": "share_meiti"
      }
      console.log("data",data);
      
      request.postRequest("/User/UserWXLogin", 
      data, 
      function (res) {
        console.log("res1",res);
      
      }, (err) => {
        console.log(err);
      });

      wx.redirectTo({
        url: '/pages2/index/index'
      });

    }
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