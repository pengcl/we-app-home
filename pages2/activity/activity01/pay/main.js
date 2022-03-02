import request from '../../../../utils/request.js';
var app = getApp();
var vdomain = app.globalData.domain
Page({
  data: {
    pcode: "",
    productdetaildata: "",
    pic1: "",
    pic2: "",
    pic3: "",
    pic4: "",
    pic5: "",
    kywimg: vdomain + 'image/kyw/kyw_1_proj.jpg',
    yyimg: vdomain + 'image/gf/gf_1_proj.jpg',
    gfimg: vdomain + 'image/yy/yy_1_proj.jpg',
    zqimg: vdomain + 'image/zq/zq_1_proj.jpg',
    a: false,
    detailimg: vdomain + 'image/activity/activity01/detail.png',
  },
  onLoad: function(options) {
    let that = this
    let pcode = options.pcode;
    if (typeof(pcode) == "undefined") {
      pcode = "001";
    }
    that.setData({
      pcode: pcode
    })
    if (app.globalData.appIsOnload) {
      that.loadProductDetailData();
    } else {
      app.appIsOnloadCallback = () => {
        that.loadProductDetailData();
      }
    }

  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {},
  loadProductDetailData: function() {
    wx.showLoading({
      title: '',
    })
    var that = this;
    var code = that.data.pcode;
    console.log("pcode", code);
    let data = {
      "code": code
    }
    request.getRequest("/Order/OrderIsBuy", data, function(res) {
      if (res.data.StatusCode == 200) {
        let dataList = res.data.Data;
        if (dataList == true) {
          wx.redirectTo({
            url: 'payok'
          })
        } else {
          that.setData({
            a: true
          })
          request.postRequest("/Product/ProductDetail",
            data,
            function(res) {
              if (res.StatusCode == 200) {
                wx.hideLoading();

                let dataList = res.Data;
                //判断活动是否过期
                if (dataList.isOvertime) {
                  wx.showToast({
                    title: '抱歉，该活动已过期！',
                    icon: 'none',
                    duration: 1000,
                    success: function(res) {
                      setTimeout(function() {
                        wx.redirectTo({
                          url: '../../../../pages2/index/index',
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
                      pic5: pic5
                    });
                  }
                }
              } else {}
            });
        }
      }
    });
  },
  pay_tap: function() {
    let that = this
    let pcode = that.data.pcode

    if ((wx.getStorageSync('PhoneNum') || "") == "") {
      let _this = this;
      if (!_this.data.PhoneNumStatus) {
        wx.navigateTo({
          url: '/pages2/permission/phone/phone'
        })
      }
    } else {
      wx.redirectTo({
        url: 'pay?pcode=' + pcode,
      })
    }
  },
  proj_tap: function(e) {
    switch (e.currentTarget.dataset.code) {
      case "YY":
        wx.navigateTo({
          url: '../../../community/YY/index/index',
        })
        break;
      case "GF":
        wx.navigateTo({
          url: '../../../community/GF/index/index',
        })
        break;
      case "KYW":
        wx.navigateTo({
          url: '../../../community/KYW/index/index',
        })
        break;
      case "ZQ":
        wx.navigateTo({
          url: '../../../community/ZQ/index/index',
        })
        break;
    }
    if (e.currentTarget.dataset.code == "YY") {
      wx.navigateTo({
        url: '../../../community/YY/index/index',
      })
    }

    if (e.currentTarget.dataset.code == "GF") {
      wx.navigateTo({
        url: '../../../community/GF/index/index',
      })
    }
    if (e.currentTarget.dataset.code == "KYW") {
      wx.navigateTo({
        url: '../../../community/KYW/index/index',
      })
    }

  },
  detail_tap: function() {
    wx.navigateTo({
      url: 'paydesc'
    })
  }
})