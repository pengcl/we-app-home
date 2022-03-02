import request from '../../../../utils/request.js';

var app = getApp();
var vdomain = app.globalData.domain
Page({
  data: {
    pcode: '',
    activcode:'',
    precode:'',
    userInfo:{},
    username: '',
    useridcard: '',
    userphone: '',
    orderid: '',
    O_UnifiedOrderParam: {},
    productdetaildata: "",
    vdomain: vdomain,
    pic1: "",
    pic2: '',
    orderCode: '',
    paydisplay: 'none'
  },
  inputusername: function (event) {
    let username = event.detail.detail.value;
    this.setData({
      username: username
    })
  },

  inputuseridcard: function (event) {
    let useridcard = event.detail.detail.value;
    this.setData({
      useridcard: useridcard
    })
  },

  inputuserphone: function (event) {
    let userphone = event.detail.detail.value;
    this.setData({
      userphone: userphone
    })
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '确认支付',
    })
    var that = this;
    let pcode = options.pcode;
    let precode = options.precode;

    this.setData({
      pcode: pcode,
      precode: precode,
    })
    var PhoneNum = wx.getStorageSync('PhoneNum');
    that.setData({
      userphone: PhoneNum
    })
    that.loadProductDetailData();
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  //支付
  pay_tap: function (e) {
    let username = this.data.username;
    let userphone = this.data.userphone;
    let useridcard = this.data.useridcard;
    let pcode = this.data.pcode;
    let pamt = this.data.productdetaildata.amt * 100;
    let pname = this.data.productdetaildata.name;
    if (username.trim() == '' || userphone.trim() == '') {
      wx.showToast({
        title: '请填写姓名与手机号！',
        icon: 'none',
        duration: 2000 //持续的时间
      })
    }
    // else if (useridcard.trim().length != 18) {
    //   wx.showToast({
    //     title: '请填写正确身份证信息',
    //     icon: 'none',
    //     duration: 2000 //持续的时间
    //   })
    // }
    else {
      this.payit(pcode, pamt, pname, username, userphone, useridcard);
      //取消身份证信息
      //this.checkData(pcode, pamt, pname, username, userphone, useridcard);
    }
  },

  payit: function (pcode, amt, pname, username, userphone, useridcard) {
    wx.showLoading({
      title: '',
      mask: 'true'
    })
    var that = this;
    let data = {
      pcode: pcode,
      pname: pname,
      amt: amt,
      username: username,
      userphone: userphone,
      useridcard: useridcard
    }

    //统一支付
    request.postRequest("/WeiXinPay/UnifiedOrder",
      data,
      function (res) {
         console.log("统一支付", res);
        var pay = JSON.parse(res);
        console.log("统一支付", res, pay);
        if (pay.appId != undefined && pay.appId != "") {
          //发起支付
          var timeStamp = pay.timeStamp;
          var packages = pay.package;
          var paySign = pay.paySign;
          var nonceStr = pay.nonceStr;
          var param = {
            "timeStamp": timeStamp,
            "package": packages,
            "paySign": paySign,
            "signType": "MD5",
            "nonceStr": nonceStr
          };
          that.setData({
            O_UnifiedOrderParam: param,
            //orderCode: pay.orderCode
          });

          if (amt > 0) {

            console.log("amt",amt)
            that.pay();
          } else {
            wx.redirectTo({
              url: '../../../index/index'
            });
          }
        } else {
          wx.showToast({
            title: '网络异常，请稍后重试！',
            icon: 'none',
            duration: 1500
          })
        }
      }
    )
  },
  /* 支付   */
  pay: function () {
    let that = this;
    var param = that.data.O_UnifiedOrderParam;

    //请求支付
    wx.requestPayment({
      timeStamp: param.timeStamp,
      nonceStr: param.nonceStr,
      package: param.package,
      signType: param.signType,
      paySign: param.paySign,
      success: function (res) {

        console.log("success",res)

        wx.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 1000,
          success: function () {
            console.log("wx.requestSubscribeMessage");
            wx.redirectTo({
              url: "../paydetail/detail?pcode=" + that.data.pcode + "&precode=" +that.data.precode
              //url: "../paydetail/detail?pcode=" + that.data.pcode + "&projName=" +that.data.precode
              //url: '../../paydetail/detail?pcode=' + pcode +'&projName='+ projName,
            });
          }
        });
        wx.hideLoading({});
      },
      fail: function (res) {
        console.log("fail",res)
        wx.hideLoading({});
        wx.showModal({
          title: '提示',
          content: '请求超时，请在缴费记录中确认是否支付成功',
          success(res) {
            if (res.confirm) {
              // console.log('用户点击确定')
              //wx.redirectTo({
              //  url: 'batchmain?unitNO=' + that.data.UnitNO
              //});
            } else if (res.cancel) {
              //  console.log('用户点击取消')
              //wx.redirectTo({
              //  url: 'batchmain?unitNO=' + that.data.UnitNO
              //});
            }
          }
        })
      },
      complete: function () {
        console.log("complete")
        // complete
        wx.hideLoading({});
      }
    })
  },
  loadProductDetailData: function () {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    var that = this;
    var code = that.data.pcode;
    let data = {
      "code": code
    }
    request.postRequest("/Product/ProductDetail",
      data,
      function (res) {
        wx.hideLoading({
          complete: (res) => {},
        })
        if (res.StatusCode == 200) {
          let dataList = res.Data;
          var pic1 = dataList.pay7pic;
          var pic2 = dataList.pay8pic;
          console.log('ProductDetail', dataList);
          if (dataList != null) {

            if (dataList.isBuy) {
              that.setData({
                productdetaildata: dataList,
                pic1: pic1,
                pic2: pic2,
                paydisplay: 'none'
              });
            } else {
              that.setData({
                productdetaildata: dataList,
                pic1: pic1,
                pic2: pic2,
                paydisplay: 'flex'
              });
            }
          }
        } else {}
      });
  },
  checkData: function (pcode, pamt, pname, username, userphone, useridcard) {
    var that = this;
    var vuseridcard = that.data.useridcard
    let data = {
      "UserIdCard": vuseridcard
    };
    request.postRequest("/Order/UserInfoJudge",
      data,
      function (res) {
        console.log("UserInfoJudge", res);
        if (res.StatusCode == 200) {
          let dataList = res.Data;
          if (dataList == false) {
            that.payit(pcode, pamt, pname, username, userphone, useridcard);
          } else {
            wx.showToast({
              title: '当前身份证已购买，请知悉！',
              icon: 'none',
              duration: 1000
            })
          }
        } else {}
      });
  }
})