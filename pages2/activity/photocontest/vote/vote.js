import request from "../../../../utils/request.js"
var app = getApp();
var vdomain = app.globalData.domain
Page({
  data: {
    contestCode: '',
    contestInfo: {},
    works: [],
    pageSize: 10,
    typeimg1: vdomain + 'image/activity/PhotoContest/yy/Y11-2.png',
    typeimg2: vdomain + 'image/activity/PhotoContest/yy/Y21-1.png',
    typeimg3: vdomain + 'image/activity/PhotoContest/yy/Y31-1.png',
    bgimage: vdomain + 'image/activity/PhotoContest/yy/bgtp2.jpg',
    bgimage1: vdomain + 'image/activity/PhotoContest/yy/bgtp1.png',
    icon: vdomain + 'image/activity/PhotoContest/yy/button5.png',
    windowHeight: '',
    typeList: [{
      id: 'Y11',
      name: '都会璀璨组'
    }, {
      id: 'Y21',
      name: '健康生态组'
    }, {
      id: 'Y31',
      name: '亲融人文组'
    }],
    photoType: 'Y11',
    icon1: vdomain + '/image/activity/PhotoContest/yy/icon6.png'
  },
  onLoad: function (options) {
    let that = this;
    let contestCode = options.contestCode
    that.setData({
      contestCode: contestCode,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })

    //第一次加载默认显示第一组的作品
    if (app.globalData.appIsOnload) {
      that.loadPhoto("Y11");
    } else {
      app.appIsOnloadCallback = () => {
        that.loadPhoto("Y11");
      }
    }
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {
    this.pullLoadInfo()
  },
  onShareAppMessage: function () {},
  loadPhoto: function (phototype) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    let that = this
    let data = {
      sContestCode: that.data.contestCode,
      sPhotoType: phototype,
      iFrom: 0,
      iTo: 10
    }

    let data1 = {
      contestCode: that.data.contestCode
    }
    request.getRequest("/Activity/PhotoContestInfo",
      data1,
      function (res) {
        if (res.data.StatusCode == 200) {
          that.setData({
            contestInfo: res.data.Data
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

    request.getRequest("/Activity/PhotoWorksInfo",
      data,
      function (res) {
        wx.hideLoading({
          complete: (res) => {},
        })
        if (res.data.StatusCode == 200) {
          var info = res.data.Data;
          that.setData({
            works: info
          })
          // that.showImg();
        } else {
          wx.showToast({
            title: '抱歉，网络异常，请稍后重试！',
            icon: 'none',
            duration: 2000
          })
        }
      });

  },
  vote_tap: function (e) {
    let that = this;
    let vcontestCode = that.data.contestCode;
    let vworkCode = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;

    wx.showLoading({
      title: '加载中...',
      mask: true
    })

    let istime = that.data.contestInfo.IsVoteDate;
    if (istime == true) {
      let data = {
        ContestCode: vcontestCode,
        WorkCode: vworkCode
      }
      request.postRequest("/Activity/PhotoVote",
        data,
        function (res) {
          if (res.StatusCode == 200) {
            wx.hideLoading({
              complete: (res) => {},
            })
            if (res.Data == "1") {
              that.data.works[index].VoteNum += 1;
              that.setData({
                works: that.data.works
              })
              //判断是否留咨，是否已抽奖：
              let data1 = {
                sProject: 'YY'
              }
              request.getRequest("/Activity/HasLottery",
                data1,
                function (res) {
                  if (res.data.StatusCode == 200) {
                    var info = res.data.Data;
                    var toUrl = ''
                    //1：未抽奖且未留咨，2：未抽奖但已留咨，3：已抽奖
                    if (info == 1) {
                      toUrl = '../userInfo/userInfo'
                    } else if (info == 2) {
                      toUrl = '../../activity01/cj/yy/index/index'
                    } else if (info == 3) {
                      wx.showToast({
                        title: '投票成功！',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                    if (toUrl != '') {
                      wx.showModal({
                        title: '提示',
                        content: '投票成功，是否参与抽奖',
                        confirmText: '前往抽奖',
                        success(res) {
                          if (res.confirm) {
                            wx.navigateTo({
                              url: toUrl,
                            })
                          } else if (res.cancel) {

                          }
                        }
                      })
                    }
                  } else {
                    wx.showToast({
                      title: '抱歉，网络异常，请稍后重试！',
                      icon: 'none',
                      duration: 2000
                    })
                  }
                });
            } else if (res.Data == "2") {
              wx.showToast({
                title: '当前作品当天您已投票！',
                icon: 'none',
                duration: 2000
              })
            } else if (res.Data = "3") {
              wx.showToast({
                title: '当天只能投3票!',
                icon: 'none',
                duration: 2000
              })
            } else if (res.data == "0") {
              wx.showToast({
                title: '网络异常，请稍后重试！',
                icon: 'none',
                duration: 2000
              })
            }

          } else {
            wx.hideLoading({
              complete: (res) => {},
            })
            wx.showToast({
              title: '网络异常，请稍后重试！',
              icon: 'none',
              duration: 2000
            })
          }
        }, (err) => {
          wx.hideLoading({
            complete: (res) => {},
          })
          wx.showToast({
            title: '网络异常，请稍后重试！',
            icon: 'none',
            duration: 2000
          })
        });
    } else {
      wx.hideLoading({
        complete: (res) => {},
      })
      wx.showToast({
        title: '投票已结束！',
        icon: 'none',
        duration: 1500
      })
    }
  },
  showImg: function () {
    let that = this
    let height = this.data.windowHeight // 页面的可视高度

    // wx.createSelectorQuery().selectAll('.view').boundingClientRect((ret) => {
    //   ret.forEach((item, index) => {
    //     if (item.top <= height) {
    //       //判断是否在显示范围内
    //       works[index].show = true // 根据下标改变状态
    //     }
    //   })
    //   this.setData({
    //     works
    //   })
    // }).exec()

    wx.createSelectorQuery().select('#mainview').boundingClientRect((ret) => {
      console.log("bottomtest", ret.bottom, height);
      if (ret.bottom <= height + 1) {
        that.tolower_tap();
      }

    }).exec()
  },
  onPageScroll: function (e) {
    // let that = this
    // that.showImg();
  },
  pullLoadInfo: function () {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    let that = this
    let pageSize = that.data.works.length

    let data = {
      sContestCode: that.data.contestCode,
      sPhotoType: that.data.photoType,
      iFrom: pageSize,
      iTo: 10
    }
    request.getRequest("/Activity/PhotoWorksInfo",
      data,
      function (res) {
        wx.hideLoading({
          complete: (res) => {},
        })
        if (res.data.StatusCode == 200) {
          var info = res.data.Data;
          that.setData({
            works: that.data.works.concat(info),
            pageSize: that.data.works.length + 10
          })
          // that.showImg();
        } else {
          wx.showToast({
            title: '抱歉，网络异常，请稍后重试！',
            icon: 'none',
            duration: 2000
          })
        }
      });
  },
  preview: function (e) {
    let url = e.currentTarget.dataset.url
    let urls = []
    urls.push(url)
    wx.previewImage({
      urls: urls,
    })
  },
  changeType_tap: function (e) {
    let type = e.currentTarget.dataset.id
    let that = this

    switch (type) {
      case 'Y11':
        that.setData({
          typeimg1: vdomain + 'image/activity/PhotoContest/yy/Y11-2.png',
          typeimg2: vdomain + 'image/activity/PhotoContest/yy/Y21-1.png',
          typeimg3: vdomain + 'image/activity/PhotoContest/yy/Y31-1.png',
          pageSize: 10,
          photoType: type
        })
        that.loadPhoto(type)
        break;
      case 'Y21':
        that.setData({
          typeimg1: vdomain + 'image/activity/PhotoContest/yy/Y11-1.png',
          typeimg2: vdomain + 'image/activity/PhotoContest/yy/Y21-2.png',
          typeimg3: vdomain + 'image/activity/PhotoContest/yy/Y31-1.png',
          pageSize: 10,
          photoType: type
        })
        that.loadPhoto(type)
        break;
      case 'Y31':
        that.setData({
          typeimg1: vdomain + 'image/activity/PhotoContest/yy/Y11-1.png',
          typeimg2: vdomain + 'image/activity/PhotoContest/yy/Y21-1.png',
          typeimg3: vdomain + 'image/activity/PhotoContest/yy/Y31-2.png',
          pageSize: 10,
          photoType: type
        })
        that.loadPhoto(type)
        break;
      default:
        that.setData({
          typeimg1: vdomain + 'image/activity/PhotoContest/yy/Y11-2.png',
          typeimg2: vdomain + 'image/activity/PhotoContest/yy/Y21-1.png',
          typeimg3: vdomain + 'image/activity/PhotoContest/yy/Y31-1.png',
          pageSize: 10,
          photoType: type
        })
        that.loadPhoto('Y11')
        break;
    }
  }
})