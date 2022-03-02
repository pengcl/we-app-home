import request from '../../../../../../utils/request.js';
var app = getApp();
var vdomain = app.globalData.domain
Page({
  data: {
    //iscj,
    //cjimg,
    orderCode:""
  },
  onLoad: function (options) {
    let that = this;
    let gid = 'ab222222-3333-0000-0000-000000000000';

    let orderCode = options.orderCode;
    that.setData({
      orderCode: orderCode,
    })

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
      sProject: 'GF'
    }

    request.getRequest("/Lottery/LotteryRecord", data, function (res) {
      if (res.data.StatusCode == 200) {
        console.log('remark111',res);
        let record = res.data.Data;
        if (record != "" && record.awardName != '谢谢参与') {
          console.log('remark111',res.data.Data.remark);
          wx.redirectTo({
            url: '../detail/detail?orderCode=' + res.data.Data.remark
         })
        } else {
          wx.showToast({
            title: '请先参与助力活动',
            icon: 'none',
            duration: 1500
          })
          //wx.navigateBack({ changed: true });
        }
     }
    });

    //let orderCode = that.data.orderCode; 
    //wx.redirectTo({
    //  url: '../detail/detail?lotterygid=' + gid + "&orderCode=" + orderCode
    //})
  },
  AddUserWXLogin: function () {
    var ProjectGID = '96328AF6-05F8-4492-8E0F-B7DABA179635';
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