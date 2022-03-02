import request from '../../../../utils/request.js';
var app = getApp();
var vdomain = app.globalData.domain
Page({
  data: {
    //iscj,
    //cjimg,
    lotterygid: '',
    projectgid: '',
    projectcode: '',
  },
  onLoad: function (options) {
    let that = this;
    let lotterygid = options.lotterygid;
    let projectgid=options.projectgid;
    let projectcode=options.projectcode;
    that.setData({
      lotterygid: lotterygid,
      projectgid:projectgid,
      projectcode:projectcode
    })
    that.loadInfo()
    that.AddUserWXLogin()
  },
  
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  loadInfo: function () {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    let that = this
    var lotterygid=that.data.lotterygid;
    var projectgid = that.data.projectgid;
    var projectcode = that.data.projectcode;
    //let data = {
    //  sLotteryID: this.data.lotterygid,
    //  sProject: this.data.pcode
    //}
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
      url: '../detail/detail?lotterygid=' + lotterygid + '&projectgid=' + projectgid + '&projectcode=' + projectcode +'&orderCode='
    })
  },
  AddUserWXLogin: function () {
    let that = this
    var ProjectGID = that.data.projectgid;
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
        //console.log("res111", res);
      });

  }
})