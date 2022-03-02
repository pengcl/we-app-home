// test/test.js

import request from "../utils/request";

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
    let data = {
      //"XM":"aaa"
      //"warndate":"2021/12/3 0:00:00",
      //"createtime":"2021/12/3 0:00:00",
      //"goodsguid":"4e20c682-b2e6-4834-95af-10dc87dff2ae",
      //"goodsname":"华南测试商品1",

      //"userphone":"18307499659",
      //"kdpnumber":"18307499659",

      //"crmnumber":"020003971451",
      //"goodscount":1,
      //"effectday":30,
      //"deadline":"2021/12/3 0:00:00",
      //"partnercode":"NWCL066",
      //"partnershowname":"广粤会",
      //"exchangeaddress":"广粤会某地;;广粤会某地2",
      //"totalkdppoints":123,
      //"createuser":"18307499659",
      //"exchangetype":"01",
      //"regioncode":"SC",

      //"orderno":"11",
      //"status":"1",
      //"statusdes":"1",
      //"qrcode":"11",
      //"goodsno":"11",
      //"snapshotdata":"111"
    }
    //request.postRequest("/KDPMall/SubmitOrder",data,function(res) {
    //  if (res.StatusCode == 200) {
    //    console.log('testtest111', res);
    //  } 
    //  }
    //)
    var t1 = Date.parse("2017/11/22 0:0");
    var t2 = Date.parse("2017/11/22 0:3"); 
    var tp = t2-t1;
    console.log("aabbcc",tp);
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
  c1: function () {
    let that = this
			wx.navigateTo({
				url: "/pages2/activity/activity20211122/index",
			});
  },
  c2: function () {
    let that = this
			wx.navigateTo({
				url: "/pages2/activity/activity20211122/main",
			});
  },
})