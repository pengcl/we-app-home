import request from '../../../../../../utils/request.js';
var app = getApp();
var vdomain = app.globalData.domain
Page({
  data: {
    //iscj,
    //cjimg,
  },
  onLoad: function (options) {
    let that = this;
    let gid = 'ab111119-0000-0000-0000-000000000000';
    that.loadInfo(gid)
    that.AddUserWXLogin()
  },
  
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  loadInfo: function (gid) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    let that = this
    let data = {
      sLotteryID: gid,
      sProject: 'ZC'
    }
    //request.getRequest("/Lottery/LotteryRecord", data, function (res) {
    //  if (res.data.StatusCode == 200) {
    //    let record = res.data.Data;
    //    if (record != "" && record.awardName != '谢谢参与') {
    //      wx.redirectTo({
    //        url: '../detail/detail?lotterygid=' + gid
    //     })
    //    } else {

    //    }
    // }
    //});

    wx.redirectTo({
      url: '../detail/detail?lotterygid=' + gid + '&orderCode='
    })
  },
  AddUserWXLogin: function () {
    var ProjectGID = 'FDD35F63-EA2D-4D8A-A02D-CCA9798C7FB6';
    var PhoneNum = wx.getStorageSync('PhoneNum');
    var comecode = wx.getStorageSync('comecode');
    console.log("ProjectGID", ProjectGID);
    let data1 = {
      "nickname": '',
      "avatarUrl": '',
      "gender": '',
      "province": '',
      "city": '',
      "country": '',
      "comefrom": 'projectindex',
      "comecode": comecode,
      "ProjectGID": ProjectGID,
      "UserPhone": PhoneNum
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
        console.log("res111", res);
      });

  }
})