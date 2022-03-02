import request from '../../../../../utils/request'
import util from '../../../../../utils/util'
import UserInfo from '../../../../../utils/UserInfo';
var app = getApp();
var vdomain = app.globalData.domain

Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain: '',
    comecode:'',
    UserInfo:[],
    PhoneNum:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let that=this;
      var scene = decodeURIComponent(options.scene);
      let comecode = scene;
      if (comecode==""||comecode=="undefined") comecode=wx.getStorageSync('comecode');
      //console.log("comecode",options);
      this.setData({
        comecode:comecode,
        UserInfo: wx.getStorageSync('UserInfo'),
        PhoneNum: wx.getStorageSync('PhoneNum'),
      })
      wx.setStorageSync('comecode', comecode);
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
    let that = this;
      var phonenum = wx.getStorageSync('PhoneNum');
      console.log("phonenum",phonenum);
      if (phonenum==""||phonenum=="undefined")
      {
        wx.navigateTo({
          url: "/pages2/permission/phone/phone"
        });
      }
      else
      {
        console.warn("dddd",app.globalData,that.data);

        if (app.globalData.appIsOnload) {
          console.warn("aaaa",app.globalData,that.data);
          that.postdata1();
        } else {
          console.warn("eeee",app.globalData,that.data);
          app.appIsOnloadCallback = () => {
            console.warn("bbbb",app.globalData,that.data);
            that.postdata1();
          }
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

  },

  postdata1:function(){
    let that = this;
    console.log("userInfo",wx.getStorageSync('UserInfo'));
    let data = {
      "city": that.data.UserInfo.city,
      "province": that.data.UserInfo.province,
      "nickname": that.data.UserInfo.nickName,
      "country": that.data.UserInfo.country,
      "avatarUrl": that.data.UserInfo.avatarUrl,
      "gender": that.data.UserInfo.gender,
      "UserPhone": that.data.PhoneNum,
      "ProjectGID": that.data.PhoneNum,
      "comecode": that.data.comecode,
      "comefrom": "share"
    }
    console.log("data",data);
    
    request.postRequest("/User/UserWXLoginAndDeCode", 
    data, 
    function (res) {
      console.warn("res1",res);
        let codetype=res.Data.CodeType;
        console.warn("codetype",codetype);
        
        
    }, (err) => {
      console.log(err);
    });

  },


})