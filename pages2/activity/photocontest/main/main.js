import request from "../../../../utils/request"
var app = getApp();
var vdomain = app.globalData.domain

Page({
  data: {
    contestCode: '',
    contestInfo: {},
    icon1: vdomain + 'image/activity/PhotoContest/yy/icon2.png',
    icon2: vdomain + 'image/activity/PhotoContest/yy/icon3.png',
    icon3: vdomain + 'image/activity/PhotoContest/yy/icon4.png',
    icon4: vdomain + 'image/activity/PhotoContest/yy/icon7.png'
  },
  onLoad: function (options) {
    let that = this
    //var contestCode = options.contestCode

    if (app.globalData.appIsOnload) {
      that.loadInfo('contest0001');
    } else {
      app.appIsOnloadCallback = () => {
        that.loadInfo('contest0001');
      }
    }
    that.AddUserWXLogin()
  },
  AddUserWXLogin: function () {
    var ProjectGID = this.data.ProjectCommunity_Gid;
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

  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  loadInfo: function (contestCode) {
    let that = this
    let data = {
      contestCode: contestCode
    }
    request.getRequest("/Activity/PhotoContestInfo",
      data,
      function (res) {
        if (res.data.StatusCode == 200) {
          that.setData({
            contestInfo: res.data.Data,
            contestCode: contestCode
          })
        } else {
          wx.showToast({
            title: '网络异常，请稍后重试！',
            icon: 'none',
            duration: 1000
          })
        }
      }, (err) => {
        wx.showToast({
          title: '网络异常，请稍后重试！',
          icon: 'none',
          duration: 2000
        })
      });
  },
  apply_tap: function (e) {
    let that = this
    let istime = that.data.contestInfo.IsUploadDate;
    if (istime == true) {
      wx.navigateTo({
        url: '../upload/upload?contestCode=' + that.data.contestCode,
      })
    } else {
      wx.showToast({
        title: '抱歉，不在开放时间段！',
        icon: 'none',
        duration: 1000
      })
    }
  },
  vote_tap: function (e) {
    let that = this
    let istime = that.data.contestInfo.IsVoteDate;
    if (istime == true) {
      wx.navigateTo({
        url: '../vote/vote?contestCode=' + that.data.contestCode,
      })
    } else {
      wx.showToast({
        title: '抱歉，不在开放时间段！',
        icon: 'none',
        duration: 1000
      })
    }
  },
  result_tap: function (e) {
    let that = this
    let istime = that.data.contestInfo.IsAwardDate;
    if (istime == true) {
      wx.navigateTo({
        url: '../awardList/awardList?contestCode=' + that.data.contestCode,
      })
    } else {
      wx.showToast({
        title: '抱歉，不在开放时间段！',
        icon: 'none',
        duration: 1000
      })
    }
  },
  award_tap: function (e) {
    let that = this
    let istime = that.data.contestInfo.IsAwardDate

    if (istime == true) {
      wx.navigateTo({
        url: '../../activity01/cj/yy/detail/detail?gid=690DD335-126A-46E1-818C-1D144DD4A22E'
      })
    } else {
      wx.showToast({
        title: '抱歉，不在开放时间段！',
        icon: 'none',
        duration: 1000
      })
    }
  }
})