import request from '../../../../utils/request.js';

var app = getApp();
var vdomain = app.globalData.domain
Page({
  data: {
    bgimage: '',
    orderInfo: {},
    qrcode: '',
    maskdisplay: 'none',
    icon: '',
    projName: '',
    productCode :'',
    assistBtn:'',
    activCode:'',
    iszl:0
  },
  onLoad: function (options) {
    let that = this
    let code = options.pcode
    let productCode =code

    let activCode = "";
    let projName = "";
    let iszl = 0;
    
    if (productCode=="005-qy")
    {
      activCode = "AT20008";
      projName = "QY";
      iszl = 1;
    }
    

    that.setData({
      //projName: options.projName,
      projName:projName,
      activCode:activCode,
      iszl:iszl,
      productCode : code
    })

    let data = {
      sProductCode: code
    }
    request.getRequest("/Order/OrderHexiao_QXHN_New",
      data,
      function (res) {
        if (res.data.StatusCode == 200) {
          let dataList = res.data.Data;
          if (dataList != null) {
            that.setData({
              orderInfo: dataList,
              bgimage: vdomain + 'image/activity/activity20201114/bg.png',
              icon: vdomain + 'image/activity/activity20201114/icon.png',
              assistBtn : vdomain + 'image/activity/activity20201114/assist.png'
            });
          }
        } else {
          wx.showToast({
            title: '网络异常，请稍后重试！',
          })
        }
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
  assist_tap: function () {

    let that = this
    let projName = that.data.projName
    let productCode =that.data.productCode
    let activCode = that.data.activCode
    let activeordercode = that.data.orderInfo.OrderCode;

    console.log("activeordercode122",activeordercode);

    let url = "../assist/";

    let data = {
      "activCode": activCode,
      "projName" : projName
    }
    request.getRequest("/Activity/ActivityInfoFourteen", data,
      function (res) {
        if (res.statusCode == 200) {
          var info = res.data.Data;
          if (info.OrderCode !="") {
            wx.redirectTo({
              url: url + 'detail?orderCode=' + info.OrderCode + '&activCode=' + info.code +"&productCode="+ productCode + "&projName=" +projName + "&activCode=" + activCode + "&activeordercode=" + activeordercode
            })
          }
          else {
            wx.navigateTo({
              url: url + 'main?projName=' +projName + "&productCode="+ productCode + "&activCode=" + activCode + "&activeordercode=" + activeordercode
            })
          }
        }
    })
}})