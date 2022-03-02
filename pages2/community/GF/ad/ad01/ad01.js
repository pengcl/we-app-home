// pages2/community/GF/ad/ad01/ad01.js

import util from '../../../../../utils/util.js';
import request from '../../../../../utils/request';

let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ProjectCommunity_Gid: "96328AF6-05F8-4492-8E0F-B7DABA179635",
    currCode: "",
    detailList: [
      {
        id: 1,
        img: "https://xyclientnew.ai-fox.net/image/gf/ad/ad01/tiaozhuan.jpg"
    },
    ]
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.AddUserWXLogin();
  },

  AddUserWXLogin:function()
  {
    var ProjectGID = this.data.ProjectCommunity_Gid;
    var PhoneNum=wx.getStorageSync('PhoneNum');
    var comecode=wx.getStorageSync('comecode');
    console.log("ProjectGID",ProjectGID);
    let data1 = {
        "nickname": '',
        "avatarUrl": '',
        "gender": '',
        "province": '',
        "city": '',
        "country": '',
        "comefrom": 'projectad01',
        "comecode":comecode,
        "ProjectGID":ProjectGID,
        "UserPhone":PhoneNum
    }

    request.postRequest("/User/UserWXLogin",
        data1,
        function (res) {
            // if (res.StatusCode == 200) {
            //     let vpageUrl = that.data.pageUrl
            //     wx.redirectTo({
            //         url: vpageUrl,
            //     })
            // }
            console.log("res111",res);
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

  }
})