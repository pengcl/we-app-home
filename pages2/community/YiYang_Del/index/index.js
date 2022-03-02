import request from "../../../../utils/request"

var app = getApp();
var vdomain = app.globalData.domain
Page({
  data: {
    bgImg: '',
    icon: '',
    icon1: '',
    name: '',
    sexindex: '0',
    sex: [{
      id: 'M',
      value: '先生'
    }, {
      id: 'W',
      value: '女士'
    }],
    sexValue: '先生',
    phone: '',
    protocols: [],
  },
  onLoad: function (options) {
    let that = this
    that.setData({
      bgImg: vdomain + 'image/yiyang/yiyang_1_1.jpg',
      icon: vdomain + 'image/yiyang/icon1.png',
      icon1: vdomain + 'image/yiyang/icon2.png',
      phone: wx.getStorageSync('PhoneNum'),
      sexValue: '先生'
    })
    that.AddUserWXLogin();
  },
  AddUserWXLogin: function () {
    var ProjectGID = "F8C76F96-362D-2D73-AD23-33A9798C2785";
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
  onShow: function () {
    let that = this
    that.setData({
      bgImg: vdomain + 'image/yiyang/yiyang_1_1.jpg',
      icon: vdomain + 'image/yiyang/icon1.png',
      icon1: vdomain + 'image/yiyang/icon2.png',
      phone: wx.getStorageSync('PhoneNum'),
      sexValue: '先生',
    })
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  bindusername: function (e) {
    let that = this;
    that.setData({
      name: e.detail.value
    })
  },
  bindSexTypeChange: function (e) {
    let index = e.detail.value
    let that = this
    that.setData({
      sexindex: index,
      sexValue: that.data.sex[index].value,
    })
  },
  getPhoneNumber: function (e) {
    let that = this

    if (that.data.protocols.length < 2) {
      wx.showModal({
        title: "提示",
        content: "请阅读并同意相关协议",
        success(res) {},
      });

      return;
    }
    var comecode = wx.getStorageSync("comecode");

    wx.login({
      success: function (res) {
        if (res.code != "") {
          let data = {
            code: res.code,
            iv: e.detail.iv,
            encryptedData: e.detail.encryptedData,
            comecode: comecode,
          };
          request.postRequest(
            "/User/PhoneNumberInfo",
            data,
            function (res) {
              if (res.StatusCode == 200) {
                wx.setStorageSync(
                  "PhoneNum",
                  res.Data.phoneNumber
                );
                wx.setStorageSync(
                  "PhoneNumSign",
                  res.Data.PhoneNumSignText
                );
                let wxAgreementVersion = wx.getStorageSync(
                  "wxAgreementVersion"
                );
                wx.setStorage({
                  key: "userAgreementVersion",
                  data: wxAgreementVersion,
                });
                that.setData({
                  phone: res.Data.phoneNumber
                })
                that.saveYiYangUserInfo();
              }
            },
            function (e) {
              wx.showToast({
                title: "授权失败，请稍后重试",
                icon: "none",
                duration: 2000,
              });
            }
          );
        } else {}
      },
    });
  },
  UserAgreement_tap: function (e) {
    wx.navigateTo({
      url: "../../../permission/Agreement/User",
    });
  },
  PrivacyAgreement_tap: function (e) {
    wx.navigateTo({
      url: "../../../permission/Agreement/Privacy",
    });
  },
  checkboxChange(e) {
    this.setData({
      protocols: e.detail.value,
    });
  },
  saveYiYangUserInfo: function () {
    wx.showLoading({
      title: '提交中...',
    })
    let that = this
    if (that.data.name.trim() == "") {
      wx.showToast({
        title: '请输入姓名！',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    //授权成功后，保存用户信息
    let data = {
      UserName: that.data.name + that.data.sexValue,
      UserPhone: that.data.phone,
      Project: '5F64D089-8D6C-4ABA-97D4-C91F38062469'
    }
    request.postRequest("/Activity/InsertUserInfoCommon",
      data,
      function (res) {
        if (res.StatusCode == 200) {
          if (res.Data = "1") {
            wx.hideLoading({
              complete: (res) => {},
            })
            wx.redirectTo({
              url: '../index/index1',
            })
          } else {
            wx.hideLoading({
              complete: (res) => {},
            })
            wx.showToast({
              title: '网络异常，请稍后重试！',
              icon: 'none',
              duration: 1000
            })
          }
        } else {
          wx.hideLoading({
            complete: (res) => {},
          })
          wx.showToast({
            title: '网络异常，请稍后重试！',
            icon: 'none',
            duration: 1000
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
  }
})