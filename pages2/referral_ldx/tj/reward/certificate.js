import request from "../../../../utils/request.js"
import UserInfo from '../../../../utils/UserInfo';
var app = getApp();
var vdomain = app.globalData.domain;
Page({
  data: {
    bgimg: '',
    sexType: 'M',
    iconW: '',
    iconM: '',
    icon1: '',
    icon2: '',
    icon3: '',
    icon4: '',
    icon5: '',
    phonenum: '',
    userindex: '0',
    userTypeValue: '',
    itemindex:0,
    itemTypeValue: '',
    groupindex:0,
    groupTypeValue: '',
    deleteVisible: "none",
    uploadVisible: "block",
    deleteVisible2: "none",
    uploadVisible2: "block",
    deleteVisible3: "none",
    uploadVisible3: "block",
    protocolsel: 'F',
    userName: '',
    pics: [],
    picsthumb: [],
    pics2: [],
    picsthumb2: [],
    pics3: [],
    picsthumb3: [],
   
    icon6: '',
    maskDisplay: '',
    userInfo: {},
    uploadtext1: '',
    uploadtext2: '',
    uploadtext3: '',
    remark: "",
    sfzno: '',
    rewardGid:'',
    img_cert1:'',
    img_cert2:'',
    img_cert3:'',
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    let that = this;
    var userInfo = wx.getStorageSync('UserInfo');
    //var phone = wx.getStorageSync('PhoneNum');
    var maskDisplay = 'flex';

    if (userInfo != "") {
      maskDisplay = 'none'
    }

    that.setData({
      bgimg: vdomain + '/image/referral/reward/main8.png',
      iconW: vdomain + '/image/referral/icon1.png',
      iconM: vdomain + '/image/referral/icon2.png',
      icon2: vdomain + 'image/referral/icon5.png',
      icon3: vdomain + 'image/referral/icon4.png',
      icon4: vdomain + 'image/referral/icon3.png',
      icon5: vdomain + '/image/referral/icon1.png',
      icon6: vdomain + 'image/referral/icon9.png',
      img_cert1: vdomain + 'image/referral/reward/cert_01.png',
      img_cert2: vdomain + 'image/referral/reward/cert_02.png',
      img_cert3: vdomain + 'image/referral/reward/cert_03.png',
      maskDisplay: maskDisplay,
      userInfo: userInfo,
      phonenum: options.phone,
      rewardGid : options.gid
    })

    






    wx.hideLoading({
      success: (res) => {},
    })
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},

  
  ChangeSex_tap: function (e) {
    let value = e.currentTarget.dataset.value;
    let that = this

    if (value == "M") {
      that.setData({
        sexType: 'M',
        iconM: vdomain + '/image/referral/icon2.png',
        iconW: vdomain + '/image/referral/icon1.png'
      })
    } else {
      that.setData({
        sexType: 'W',
        iconM: vdomain + '/image/referral/icon1.png',
        iconW: vdomain + '/image/referral/icon2.png'
      })
    }
  },
  getPhoneNumber: function (e) {
    let _this = this;
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
              if (
                res.StatusCode ==
                200
              ) {
                wx.setStorageSync(
                  "PhoneNum",
                  res.Data
                  .phoneNumber
                );
                wx.setStorageSync(
                  "PhoneNumSign",
                  res.Data
                  .PhoneNumSignText
                );
                let wxAgreementVersion = wx.getStorageSync(
                  "wxAgreementVersion"
                );
                wx.setStorage({
                  key: "userAgreementVersion",
                  data: wxAgreementVersion,
                });

                _this.setData({
                  phonenum: res.Data.phoneNumber
                })
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

  chooseImage : function(e) {
    const that = this;
    var pics = '';
    var picsthumb = '';
    var val = e.currentTarget.dataset.value;
    switch(val){
      case '1':{
        var pics = that.data.pics;
        var picsthumb = that.data.picsthumb;
      }break;
      case '2':{
        var pics = that.data.pics2;
        var picsthumb = that.data.picsthumb2;
      }break;
      case '3':{
        var pics = that.data.pics3;
        var picsthumb = that.data.picsthumb3;
      }break;
    }
    // var pics = that.data.pics
    // var picsthumb = that.data.picsthumb
    if (pics.length < 1) {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          wx.showLoading({
            title: '上传中,请稍等...',
            mask: true
          })
          console.log('chooseImage success, temp path is', res.tempFilePaths)
          var imgsrc = res.tempFilePaths;
          wx.uploadFile({
            url: vdomain + 'api/UploadFile/UploadImgCommon',
            filePath: imgsrc[0],
            name: 'file',
            formData: {
              'path': '/UploadFile/referral/',
              'name': 'referral',
              'thumbWidth': '697',
              'thumbHeight': '287'
            },
            success: (resp) => {
              wx.hideLoading({
                complete: (res) => {},
              })
              let result = JSON.parse(resp.data)
              if (result.StatusCode == 200) {
                let pics1 = result.Data.split(',');
                let pic = pics1[0];
                let picthumb = pics1[1]

                switch(val){
                  case '1':{
                    that.setData({
                      pics: pics.concat(pic),
                      picsthumb: picsthumb.concat(picthumb),
                      deleteVisible: "block",
                      uploadVisible: 'none'
                    })
                  }break;
                  case '2':{
                    that.setData({
                      pics2: pics.concat(pic),
                      picsthumb2: picsthumb.concat(picthumb),
                      deleteVisible2: "block",
                      uploadVisible2: 'none'
                    })
                  }break;
                  case '3':{
                    that.setData({
                      pics3: pics.concat(pic),
                      picsthumb3: picsthumb.concat(picthumb),
                      deleteVisible3: "block",
                      uploadVisible3: 'none'
                    })
                  }break;
                }
                
              } else if (result.StatusCode == 900) {
                wx.showToast({
                  title: result.Info,
                  icon: 'none',
                  duration: 1000
                })
              }
            },
            fail: (resp) => {
              wx.hideLoading({
                complete: (res) => {},
              })
              wx.showToast({
                title: '网络异常，请稍后重试！',
                icon: 'none',
                duration: 1000
              })
            },
          })
        },
        fail({
          errMsg
        }) {
          console.log('chooseImage fail, err is', errMsg)
        }
      })
    }
  },
  delete_tap: function (e) {
    let that = this;
    var val = e.currentTarget.dataset.value;
    switch(val){
      case '1':{
        that.setData({
          pics: [],
          picsthumb: [],
          deleteVisible: "none",
          uploadVisible: "block"
        })
      }break;
      case '2':{
        that.setData({
          pics2: [],
          picsthumb2: [],
          deleteVisible2: "none",
          uploadVisible2: "block"
        })
      }break;
      case '3':{
        that.setData({
          pics3: [],
          picsthumb3: [],
          deleteVisible3: "none",
          uploadVisible3: "block"
        })
      }break;
    }

  },
  preview_tap: function (e) {
    let that = this
    var val = e.currentTarget.dataset.value;
    var url ='';
    switch(val){
      case '1':url = that.data.pics; break;
      case '2':url = that.data.pics2; break;
      case '3':url = that.data.pics3; break;
    }
    wx.previewImage({
      urls: url,
    })
  },
  
  submit_tap: function (e) {
    let that = this;

    var temp= that.data.pics3[0];

    var username = that.data.userName.trim();
    var phone = that.data.phonenum.trim();
    var sex = that.data.sexType;
    var imgUrl = that.data.pics[0];
    var imgUrl2 = that.data.pics2[0];
    var imgUrl3 = temp == null ? '' :temp ;
    var sfzno = that.data.sfzno.trim();
    var rewardGid = that.data.rewardGid;

    if (username == "") {
      wx.showToast({
        title: '请填写姓名！',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if (phone == "") {
      wx.showToast({
        title: '请授权手机号！',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    
    if (sex == "") {
      wx.showToast({
        title: '请选择性别',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if (sfzno == "") {
      wx.showToast({
        title: '请填写身份证号码！',
        icon: 'none',
        duration: 1000
      })
      return;
    }

      if (typeof (imgUrl) == "undefined" || imgUrl == "") {
        wx.showToast({
          title: '请上传身份证照 ！',
          icon: 'none',
          duration: 1000
        })
        return;
      }
      if (typeof (imgUrl2) == "undefined" || imgUrl == "") {
        wx.showToast({
          title: '请上传产权证/查册证明照！',
          icon: 'none',
          duration: 1000
        })
        return;
      }
      // if (typeof (imgUrl3) == "undefined" || imgUrl == "") {
      //   wx.showToast({
      //     title: '请上传关系证明（如需） ！',
      //     icon: 'none',
      //     duration: 1000
      //   })
      //   return;
      // }

    let data = {
      name: username,
      sex: sex == "M" ? "先生" : "女士",
      phoneNum : phone,
      sfzNO: sfzno,
      pic1: imgUrl,
      pic2:imgUrl2,
      pic3:imgUrl3,
      rewardGid :rewardGid

    }

    request.postRequest("/TJ/TJRewardCertificate",
      data,
      function (res) {
        if (res.StatusCode == 200) {
          wx.redirectTo({
            url: 'processing?type=举证审核中',
          })
        } else {
          wx.showToast({
            title: res.Data,
            icon: 'none',
            duration: 2000
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
  bindUserName: function (e) {
    let that = this
    let value = e.detail.value
    that.setData({
      userName: value
    })
  },

  UserInfo_tap: function (e) {

    console.log("UserInfo_tap", this.data.needUserInfo);

    let _this = this;
    console.log(e);
    UserInfo.GetUserInfo(app, e,
      function (res) {
        _this.setData({
          UserInfoStatus: (wx.getStorageSync('UserInfo') || "") != ""
        })

        var url = getCurrentPages()[getCurrentPages().length - 1];
        if (!_this.data.PhoneNumStatus) {
          _this.setData({
            maskDisplay: 'none',
            userInfo: wx.getStorageSync('UserInfo')
          })
        }
      },
      function (res) {
        _this.setData({
          UserInfoStatus: (wx.getStorageSync('UserInfo') || "") != ""
        })
        wx.showModal({
          title: '未授权',
          content: '为了不影响您的使用，请开启相应的权限哦~'
        });
      });
  },
  bindRemark: function (e) {
    let that = this
    let value = e.detail.value
    that.setData({
      remark: value
    })
  },
  bindsfzno: function (e) {
    let that = this
    let value = e.detail.value
    that.setData({
      sfzno: value
    })
  }
})