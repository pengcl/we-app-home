import request from "../../../../utils/request.js"
import util from '../../../../utils/util'
var app = getApp();
var vdomain = app.globalData.domain
Page({
  data: {
    bgimg: '',
    bgimg1: '',
    numList: [{
      name: '检验资格'
    }, {
      name: '完善资料'
    }, {
      name: '完成'
    }],
    num: 0,
    prjtype: "",
    prjindex: 0,
    prjId: '',
    projectArray: [{
      ProjectGID: '',
      ProjectName: '请选择参观项目',
      GZ: ""
    }],
    phone: '',
    tjPhone: '',
    tjuserName: '',
    iconM: '',
    iconW: '',
    gwID: "",
    gwindex: 0,
    gwArray: [{
      SalerUserCode: '',
      SalerUserName: '无指定置业顾问'
    }],
    date: "",
    startDate: "",
    endDate: "",
    remark: '',
    timeArray: [{
      id: '',
      name: '请选择时间段'
    }, {
      id: 'am',
      name: '上午'
    }, {
      id: 'pm',
      name: '下午'
    }],
    time: '',
    timeindex: 0,
    icon1: '',
    rule: '暂无',
    xzurl: "",
    tips: '',
    nextFunctionName: "numSteps_tap",
    sexType:'M'
  },
  onLoad: function (options) {
    let that = this
    var nowDate = new Date()
    var vDate = util.formatDate(nowDate);
    var phone = wx.getStorageSync('PhoneNum')

    that.setData({
      bgimg: vdomain + "image/referral/main2.jpg",
      bgimg1: vdomain + "image/referral/main3.jpg",
      iconW: vdomain + '/image/referral/icon1.png',
      iconM: vdomain + '/image/referral/icon2.png',
      date: vDate,
      startDate: vDate,
      icon1: vdomain + "image/referral/icon9.png",
      phone: phone
    })

    let data = {

    }

    var list = that.data.projectArray
    request.postRequest("/LDXWH/LDXProjectList",
      data,
      function (res) {
        if (res.StatusCode == 200) {
          that.setData({
            gwindex: 0,
            projectArray: list.concat(res.Data),
          })
        } else {
          wx.showToast({
            title: res.data.Data,
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
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  bindPrjTypeChange: function (e) {
    let index = e.detail.value
    let that = this
    that.setData({
      prjId: that.data.projectArray[index].ProjectGID,
      prjtype: that.data.projectArray[index].ProjectName,
      prjindex: index,
      rule: (that.data.projectArray[index].GZ == "" || that.data.projectArray[index].GZ == null) ? "暂无" : that.data.projectArray[index].GZ,
      xzurl: that.data.projectArray[index].XZ
    })
  },
  numSteps_tap: function (e) {
    // wx.showLoading({
    //   title: '加载中...',
    //   mask: true
    // })
    //预留请求
    let that = this
    let num = that.data.num
    let gwArray = that.data.gwArray
    let phoneNumSignText = ""
    let phoneNumSign1 = wx.getStorageSync('phoneNumSignText')
    let phoneNumSign2 = wx.getStorageSync('PhoneNumSign')
    if (phoneNumSign1 != "") {
      phoneNumSignText = phoneNumSign1
    } else if (phoneNumSign2 != "") {
      phoneNumSignText = phoneNumSign2
    }
    switch (num) {
      case 0:
        if (that.data.tjPhone == "" || that.data.tjPhone.length != 11) {
          wx.hideLoading({
            success: (res) => {},
          })
          wx.showToast({
            title: '请填写正确手机号！',
            icon: "none",
            duration: 2000
          })
          return;
        }
        if (that.data.prjId == "") {
          wx.hideLoading({
            success: (res) => {},
          })
          wx.showToast({
            title: '请选择参观项目！',
            icon: 'none',
            duration: 2000
          })
          return;
        }
        that.setData({
          nextFunctionName: "space_tap"
        })

        let data = {
          PhoneNum: that.data.phone,
          phoneNumSignText: phoneNumSignText,
          ProjectGID: that.data.prjId,
          phone: that.data.tjPhone
        }
        request.postRequest("/LDXWH/LDXCUserAddCheckAndGetData",
          data,
          function (res) {
            that.setData({
              nextFunctionName: "numSteps_tap"
            })
            if (res.StatusCode == 200) {
              wx.hideLoading({
                success: (res) => {},
              })
              that.setData({
                gwindex: 0,
                gwArray: res.Data.IsBuilding ? res.Data.SalerDatas : gwArray.concat(res.Data.SalerDatas),
                endDate: res.Data.eday,
                num: that.data.num == that.data.numList.length - 1 ? 0 : that.data.num + 1,
                nextFunctionName: "numSteps_tap"
              })
            } else {
              wx.hideLoading({
                success: (res) => {},
              })
              wx.showToast({
                title: res.Data,
                icon: 'none',
                duration: 2000
              })
            }
          }, (err) => {
            that.setData({
              nextFunctionName: "numSteps_tap"
            })
            wx.hideLoading({
              success: (res) => {},
            })
            wx.showToast({
              title: '网络异常，请稍后重试！',
              icon: 'none',
              duration: 2000
            })
          });
        break;
      case 1:
        var sex = that.data.sexType == "M" ? "先生" : "女士"
        //var time = that.data.time == "am" ? "上午" : "下午"

        if (that.data.tjuserName.trim() == "") {
          wx.hideLoading({
            success: (res) => {},
          })
          wx.showToast({
            title: '请填写推荐客户的姓名！',
            icon: 'none',
            duration: 2000
          })
          return;
        }
        // if (that.data.gwID == "") {
        //   wx.showToast({
        //     title: '请选择置业顾问！',
        //     icon: 'none',
        //     duration: 2000
        //   })
        //   return;
        // }
        // if (that.data.time == "请选择时间段" || that.data.time == "") {
        //   wx.showToast({
        //     title: '请选择时间段！',
        //     icon: 'none',
        //     duration: 2000
        //   })
        //   return;
        // }
        wx.showModal({
          title: '身份确认',
          content: '请填写被推荐人的真实姓名和电话号码，否则登记无效。',
          success(res) {
            if (res.confirm) {
              // console.log('用户点击确定')
              that.setData({
                nextFunctionName: "space_tap"
              })
              let data1 = {
                username: that.data.tjuserName,
                sex: sex,
                remark: that.data.remark,
                salerusercode: that.data.gwID,
                ScheduledTime: that.data.date,
                ScheduledRemark: that.data.time,
                phone: that.data.tjPhone,
                ProjectGID: that.data.prjId,
                phoneNumSignText: phoneNumSignText,
                PhoneNum: that.data.phone
              }
              request.postRequest("/LDXWH/LDXCUserAdd",
                data1,
                function (res) {
                  that.setData({
                    nextFunctionName: "numSteps_tap"
                  })
                  wx.hideLoading({
                    success: (res) => {},
                  })
                  if (res.StatusCode == 200) {
                    that.setData({
                      num: that.data.num == that.data.numList.length - 1 ? 0 : that.data.num + 1,
                      tips: res.Data
                    })
                  } else {
                    wx.showToast({
                      title: res.Data,
                      icon: 'none',
                      duration: 2000
                    })
                  }
                }, (err) => {
                  that.setData({
                    nextFunctionName: "numSteps_tap"
                  })
                  wx.hideLoading({
                    success: (res) => {},
                  })
                  wx.showToast({
                    title: '网络异常，请稍后重试！',
                    icon: 'none',
                    duration: 2000
                  })
                });
              
            } 
            // else if (res.cancel) {
            //   wx.showToast({
            //     title: '网络异常，请稍后重试！',
            //     icon: 'none',
            //     duration: 2000
            //   })
            // }
          }
       })
       break;
        
      case 2:
        wx.redirectTo({
          url: '../main/main',
        })
        break;
    }

  },
  bindtjPhone: function (e) {
    let value = e.detail.value
    let that = this
    that.setData({
      tjPhone: value
    })
  },
  bindtjUserName: function (e) {
    let value = e.detail.value
    let that = this
    that.setData({
      tjuserName: value
    })
  },
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
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindRemark: function (e) {
    let value = e.detail.value
    let that = this
    that.setData({
      remark: value
    })
  },
  bindTimeChange: function (e) {
    let index = e.detail.value
    let that = this
    that.setData({
      timeindex: index,
      time: that.data.timeArray[index].name
    })
  },
  bindGWChange: function (e) {
    let index = e.detail.value
    let that = this
    that.setData({
      gwindex: index,
      gwID: that.data.gwArray[index].SalerUserCode
    })
  },
  tjrule_tap: function (e) {
    // wx.navigateTo({
    //   url: '../tjrule/tjrule?url=' + this.data.xzurl,
    // })

    let path = this.data.xzurl;
    wx.downloadFile({
      url: path,
      success: function (res) {
        var filePath = res.tempFilePath;
        console.log(filePath);
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功');
            
          }
        })
      }
    })


  },
  space_tap: function (e) {

  }
})