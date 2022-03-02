import request from '../../../utils/request';
const app = getApp();
var vdomain = app.globalData.domain;
Page({
  data: {
    info: {},
    phoneNumber: "",
    name: '',
    checkedNum: false,
    icon: vdomain + 'image/icon7.png',
    bg: vdomain + 'image/bg5.png'
  },
  onLoad: function(option) {
    let phone = option.phone;
    let _this = this;

    _this.setData({
      phoneNumber: phone,
      checkedNum: _this.checkPhoneNum(phone)
    })


    // wx.login({
    //   success: function(res) {
    //     if (res.code) {
    //       let data = {
    //         code: res.code,
    //         encryptedData: e.detail.encryptedData
    //       }
    //       console.log('PhoneNumberInfoData', data);

    //       request.getRequest("/my/getPhone", {}, function(res) {
    //         _this.setData({
    //           phoneNum: res.Data
    //         })
    //       }, (err) => {
    //         console.log(err);
    //       });

    //     } else {
    //       console.log(res.errMsg)
    //     }
    //   }
    // })
    request.getRequest("/my/seeHouse", {}, function(res) {
      _this.setData({
        info: res.Data
      })
    }, (err) => {
      console.log(err);
    });
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {},
  inputName: function(e) {
    let name = e.detail.value;
    this.setData({
      name: name
    })
  },
  inputPhone: function(e) {
    // console.log("inputPhoneNum", e);
    let phoneNumber = e.detail.value;

    this.setData({
      phoneNumber: phoneNumber
    })

    if (phoneNumber.length === 11) {
      var that = this;
      let vcheckedNum = that.checkPhoneNum(phoneNumber)
      this.setData({
        checkedNum: vcheckedNum
      })
    } else {
      this.setData({
        checkedNum: false
      })
    }
  },
  checkPhoneNum: function(phoneNumber) {
    let str = /^1(3|4|5|6|7|8|9)\d{9}$/
    if (str.test(phoneNumber)) {
      return true
    } else {
      return false
    }
  },
  submit: function() {
    if (!this.data.checkedNum) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.name.trim() == "" || this.data.phoneNumber.trim() == "") {
      wx.showToast({
        title: '请输入手机号与姓名',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.showToast({
        title: '预约成功',
        duration: 2000,
        success: function() {
          setTimeout(function() {
            wx.navigateBack({
              delta: 1
            })
          }, 2000)

        }
      })
    }
  }
})