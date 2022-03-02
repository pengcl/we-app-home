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
    protocolsel: 'F',
    userName: '',
    pics: [],
    picsthumb: [],
    usertype: [{
      id: '0',
      value: '请选择所属身份'
    }, {
      id: '1',
      value: '新世界集团员工'
    }, {
      id: '2',
      value: '新中华南员工'
    }, {
      id: '3',
      value: '新中华南业主'
    }, {
      id: '4',
      value: '尊享家'
    }, {
      id: '5',
      value: '同享家'
    }],
    itemtype:[{
      XM: '请选择项目',
      XQ: '请选择组团'
    }],
    grouptype:[{
      XQ: '请选择组团'
    }],
    grouptypeDefault:[{
      XQ: '请选择组团'
    }],

    icon6: '',
    maskDisplay: '',
    userInfo: {},
    uploadtext: '',
    remark: "",
    sfzno: ''
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    let that = this;

    var userInfo = wx.getStorageSync('UserInfo');
    var phone = wx.getStorageSync('PhoneNum');
    var maskDisplay = 'flex';

    //let itemtype = that.data.itemtype

    // request.postRequest("/TJ/TJXM", 
    // "" , function(res) {
    //     if (res.StatusCode == 200) {
    //       that.setData({
    //         itemtype: itemtype.concat(res.Data),
    //       })
    //     } else {
    //       wx.showToast({
    //         title: '网络异常，请稍后重试！',
    //         icon: 'none',
    //         duration: 2000
    //       })
    //     }
    //   }
    // )

    if (userInfo != "") {
      maskDisplay = 'none'
    }

    that.setData({
      bgimg: vdomain + '/image/referral/main1_2.png',
      iconW: vdomain + '/image/referral/icon1.png',
      iconM: vdomain + '/image/referral/icon2.png',
      icon2: vdomain + 'image/referral/icon5.png',
      icon3: vdomain + 'image/referral/icon4.png',
      icon4: vdomain + 'image/referral/icon3.png',
      icon5: vdomain + '/image/referral/icon1.png',
      icon6: vdomain + 'image/referral/icon9.png',
      maskDisplay: maskDisplay,
      userInfo: userInfo,
      phonenum: phone
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
  bindUserTypeChange: function (e) {
    let index = e.detail.value
    let that = this
    let text = ''

    switch (index) {
      case "1":
        text = '*请上传/拍摄提交工作证，方便我方进行审核。'
        break;
      case "2":
        text = '*请上传/拍摄提交工作证，方便我方进行审核。'
        break;
      case "3":
        text = '*如阁下为新世界华南业主，请提供所购住宅信息。操作指引：提供不动产权证或个人名下查册证明（公众号“广州不动产登记”—办事大厅界面—个人名下查询进行微信查册）'
        break;
      case "4":
        text = '*请上传/拍摄个人名片，方便我方进行审核。'
        break;
    }
    
    let itemtype =that.data.itemtype;
    if(itemtype.length == 1 && index == 3)
    {
      request.postRequest("/TJ/TJXM", "" , 
      function(res) {
        if (res.StatusCode == 200) {
          that.setData({
            itemtype: itemtype.concat(res.Data),
          })
        } else {
          wx.showToast({
            title: '网络异常，请稍后重试！',
            icon: 'none',
            duration: 2000
          })
        }
      }
    )
    }
    that.setData({
      userindex: index,
      userTypeValue: that.data.usertype[index].value,
      uploadtext: text
    })
  },
  binditemTypeChange: function (e) {
    let that = this
    let grouptype = that.data.grouptype
    let grouptypeDefault = that.data.grouptypeDefault
    let itemindex = that.data.itemindex
    let groupindex = that.data.groupindex
    let itemTypeValue = that.data.itemTypeValue
    let groupTypeValue = that.data.groupTypeValue
    let index = e.detail.value
    let data = {
        XM : that.data.itemtype[index].XM
    }
    request.postRequest("/TJ/TJXQ", 
      data , function(res) {
        if (res.StatusCode == 200) {
          that.setData({
            grouptype: index >0? res.Data : grouptypeDefault,
            groupindex: 0,
            itemTypeValue: data.XM,
            groupTypeValue: index >0? res.Data[0].XQ : "请选择组团",
            itemindex: index
          })
        } else {
          wx.showToast({
            title: '网络异常，请稍后重试！',
            icon: 'none',
            duration: 2000
          })
        }
        }
      )
    // }
  },
  bindgroupTypeChage: function(e)
  {
    let index = e.detail.value
    let that = this
    let groupindex = that.data.groupindex
    let groupTypeValue = that.data.groupTypeValue
    that.setData({
      groupindex: index,
      groupTypeValue: that.data.grouptype[index].XQ
    })

  },
  chooseImage() {
    const self = this
    var pics = self.data.pics
    var picsthumb = self.data.picsthumb
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

                self.setData({
                  pics: pics.concat(pic),
                  picsthumb: picsthumb.concat(picthumb),
                  deleteVisible: "block",
                  uploadVisible: 'none'
                })
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
    let that = this

    that.setData({
      pics: [],
      picsthumb: [],
      deleteVisible: "none",
      uploadVisible: "block"
    })
  },
  preview_tap: function (e) {
    let that = this
    wx.previewImage({
      urls: that.data.pics,
    })
  },
  agree_tap: function (e) {
    let value = e.currentTarget.dataset.value
    let that = this
    if (value == "F") {
      that.setData({
        protocolsel: 'S',
        icon5: vdomain + 'image/referral/icon3.png'
      })
    } else {
      that.setData({
        protocolsel: 'F',
        icon5: vdomain + 'image/referral/icon1.png'
      })
    }
  },
  submit_tap: function (e) {
    let that = this

    var username = that.data.userName.trim();
    var phone = that.data.phonenum.trim();
    var userType = that.data.userTypeValue;
    var sex = that.data.sexType;
    var imgUrl = that.data.pics[0];
    var protocolsel = that.data.protocolsel;
    var userinfo = that.data.userInfo;
    var sfzno = that.data.sfzno.trim();
    var remark = that.data.remark.trim();
    var XM = that.data.userindex == 3? that.data.itemTypeValue : "";
    var XQ = that.data.userindex == 3? that.data.groupTypeValue : "";

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
    if (userType == "" || userType == "请选择所属身份") {
      wx.showToast({
        title: '请选择所属身份！',
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
          title: '请上传证明身份的资料！',
          icon: 'none',
          duration: 1000
        })
        return;
      }
 
    if(userType == "新中华南业主")
    {
      if(XM == "请选择项目" || XM == "")
      {
        wx.showToast({
          title: '请选择所在项目',
          icon: 'none',
          duration: 1000
        })
        return;
      }
      else
      {
        if(XQ == "")
        {
          wx.showToast({
            title: '请选择组团',
            icon: 'none',
            duration: 1000
          })
          return;
        }
      }
    }
    if (protocolsel == "" || protocolsel == "F") {
      wx.showToast({
        title: '请阅读相关协议并同意！',
        icon: 'none',
        duration: 1000
      })
      return;
    }

    let data = {
      truename: username,
      nickname: userinfo.nickName,
      headpic: userinfo.avatarUrl,
      sex: sex == "M" ? "先生" : "女士",
      sftype: userType,
      sfremark: remark,
      zlurl: imgUrl,
      phone: phone,
      sfzno: sfzno,
      XM : XM,
      XQ : XQ
    }

    request.postRequest("/TJ/TJEUserAdd",
      data,
      function (res) {
        if (res.StatusCode == 200) {
          wx.redirectTo({
            url: '../audit/auditting',
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
  protocol_tap: function (e) {
    wx.navigateTo({
      url: '../rule/rule',
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