import request from '../../../../utils/request.js';
var app = getApp();
var vdomain = app.globalData.domain
Page({
  data: {
    bgimage: vdomain + 'image/activity/activity01/bg.png',
    orderInfo: {},
    qrcode: '',
    maskdisplay: 'none',
    detailimg: vdomain + 'image/activity/activity01/detail.png',
    assit: vdomain + 'image/activity/assist/10/AT20001.png',
    assitview: 'flex',
    pageData: [],
    adModalShow: false,
  },
  onLoad: function (options) {
    let that = this

    that.setData({
      adModalShow: true
    })

    let data = {
      sProductCode: '001'
    }


    request.getRequest("/Order/OrderHexiao",
      data,
      function (res) {
        if (res.data.StatusCode == 200) {
          let dataList = res.data.Data;
          if (dataList != null) {
            that.setData({
              orderInfo: dataList
            });
          }
        } else {

        }
      });

    request.getRequest("/Page/activity01_payok", {}, function (res) {
      that.setData({
        pageData: res.data
      })
    });


  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  qrcode_tap: function () {
    let that = this
    let ordercode = that.data.orderInfo.OrderCode;
    let data = {
      sOrderCode: ordercode
    }
    request.getRequest("/Order/OrderQRCode",
      data,
      function (res) {
        if (res.data.StatusCode == 200) {
          let dataList = res.data.Data;
          if (dataList != null) {
            that.setData({
              qrcode: dataList,
              maskdisplay: 'flex'
            });
          }
        } else {

        }
      });
  },
  mask_tap: function () {
    let that = this
    that.setData({
      maskdisplay: 'none'
    })
  },
  qy_tap: function (e) {
    let that = this;
    let useM = e.currentTarget.dataset.id
    let isuse = e.currentTarget.dataset.use
    let orderCode = that.data.orderInfo.OrderCode
    switch (useM) {
      case "5":
        if (isuse == 'true' || isuse == true) {
          wx: wx.showToast({
            title: '您已成功预约滴滴专车！',
            icon: 'none',
            duration: 1000,
            mask: true,
            success: function (res) {},
          })
        } else {
          wx.navigateTo({
            url: '../bookcar/book?orderCode=' + orderCode,
          })
        }
        break;
      case "7":
        let enable = e.currentTarget.dataset.enbale
        if (enable == "true" || enable == true) {
          wx.navigateTo({
            url: '../../assist/award/selAward/selAward2',
          })
        } else {
          wx.navigateTo({
            url: '../../assist/index/index?code=AT20002',
          })
        }

        break;
      case "10":
        wx.navigateTo({
          url: '../tj/list?ordercode=' + that.data.orderInfo.OrderCode,
        })
        break;
      default:
        break;
    }
  },
  detail_tap: function () {
    wx.navigateTo({
      url: 'paydesc'
    })
  },
  assist_tap: function () {
    let data = {

    }
    request.getRequest("/Activity/GetAssitTen",
      data,
      function (res) {
        if (res.data.StatusCode == 200) {
          let dataList = res.data.Data;
          if (dataList != "") {
            wx.navigateTo({
              url: dataList,
            })
          } else {
            wx: wx.showToast({
              title: '抱歉，该活动已结束！',
              icon: 'none',
              duration: 2000,
            })
          }
        } else {
          wx: wx.showToast({
            title: '网络异常，请稍后重试！',
            icon: 'none',
            duration: 2000,
          })
        }
      });
  },
  hideAdModal: function (e) {
    //console.log("ddaaaaaddd");
    app.globalData.adModalShow = false;
    this.setData({
      adModalShow: app.globalData.adModalShow
    })
  },
  //弹窗广告 点击事件
  admodal_tap: function (e) {

    let type = e.currentTarget.dataset.type;
    let url = e.currentTarget.dataset.url;
    let data = e.currentTarget.dataset.data;

    // console.log(type, url, data);

    if (type === "url") {
      wx.navigateTo({
        url: url
      })
    } else {
      wx.navigateToMiniProgram({
        ...data,
        success(res) {
          // 打开成功
          console.log(1)
        }
      })
    }
  },
  exSideMenu_tap: function (e) {

    let _this = this;
    
    let type = e.currentTarget.dataset.type;
    let url = e.currentTarget.dataset.url;
    let data = e.currentTarget.dataset.data;

    // console.log(type, url, data);

    if (type === "url") {
      wx.navigateTo({
        url: url
      })
    } else {
      wx.navigateToMiniProgram({
        ...data,
        success(res) {
          // 打开成功
          console.log(1)
        }
      })
    }
  },


})