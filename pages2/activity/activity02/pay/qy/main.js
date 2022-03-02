import request from '../../../../../utils/request.js';
var app = getApp();
var vdomain = app.globalData.domain
Page({
  data: {
    pcode: "002-qy",
    productdetaildata: "",
    pic1: "",
    pic2: "",
    pic3: "",
    pic4: "",
    pic5: "",
    a: false,
    ProjectCommunity_Gid: 'F5A0ACB0-6914-4B3C-B53B-82BD33627788'
  },
  onLoad: function (options) {
    let that = this
    if (app.globalData.appIsOnload) {
      that.loadProductDetailData();
    } else {
      app.appIsOnloadCallback = () => {
        that.loadProductDetailData();
      }
    }
    that.AddUserWXLogin();
  },
  AddUserWXLogin: function () {
    var ProjectGID = this.data.ProjectCommunity_Gid;
    var PhoneNum = wx.getStorageSync('PhoneNum');
    var comecode = wx.getStorageSync('comecode');
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
        console.log("AddUserWXLogin", res);
      });

  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {
    return {
      title: "买家至上 88买好房 生活不打烊",
      path: 'pages2/activity/activity02/pay/qy/main',
      imageUrl: vdomain + 'image/activity/activity02/share1.jpg',
    }
  },
  loadProductDetailData: function () {
    wx.showLoading({
      title: '',
    })
    var that = this;
    var code = that.data.pcode;
    console.log("pcode", code);
    let data = {
      "code": code
    }

    request.postRequest("/Product/ProductDetail",
      data,
      function (res) {
        wx.hideLoading();
        if (res.StatusCode == 200) {
          let dataList = res.Data;
          if (dataList.isBuy) {
            wx.redirectTo({
              url: '../../paydetail/detail?pcode=' + code,
            })
          } else {


            //判断活动是否过期
            if (dataList.isOvertime) {
              wx.showToast({
                title: '抱歉，该活动已过期！',
                icon: 'none',
                duration: 1000,
                success: function (res) {
                  setTimeout(function () {
                    wx.redirectTo({
                      url: '../../../../index/index',
                    })
                  }, 1000)
                }
              })
            } else {
              var pic1 = dataList.pay2pic;
              var pic2 = dataList.pay3pic;
              var pic3 = dataList.pay4pic;
              var pic4 = dataList.pay5pic;
              var pic5 = dataList.pay6pic;
              if (dataList != null) {
                that.setData({
                  productdetaildata: dataList,
                  pic1: pic1,
                  pic2: pic2,
                  pic3: pic3,
                  pic4: pic4,
                  pic5: pic5,
                  a: true
                });
              }
            }
          }
        } else {
          wx.showToast({
            title: '网络异常，请稍后重试！',
            icon: 'none',
            duration: 1500
          })
        }
      });
  },
  pay_tap: function () {
    let that = this
    let pcode = that.data.pcode
    let productdetaildata = that.data.productdetaildata
    if ((wx.getStorageSync('PhoneNum') || "") == "") {
      let _this = this;
      if (!_this.data.PhoneNumStatus) {
        wx.navigateTo({
          url: '/pages2/permission/phone/phone'
        })
      }
    } else {
      if (productdetaildata.isBuy) {
        wx.navigateTo({
          url: '../../paydetail/detail?pcode=' + pcode,
        })
      } else {
        wx.navigateTo({
          url: '../pay?pcode=' + pcode,
        })
      }
    }
  }
})