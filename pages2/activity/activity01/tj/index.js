// pages2/activity/activity01/tj/index.js
import request from '../../../../utils/request.js';
import util from '../../../../utils/util'
var app = getApp();
var vdomain = app.globalData.domain
Page({
  data: {
    banner1: '',
    date: "",
    startDate: "",
    endDate: "",
    icon: vdomain + 'image/icon7.png',
    prjId: '152E7F4B-55F0-4E2C-BBD3-684AF00CB499',
    name: '',
    phone: '',
    statusyy: 'flex',
    statuskyw: 'none',
    statusgf: 'none',
    statuszq: 'none',
    ordercode: '',
    projectname: '',
    index: 0,
    gwindex: 0,
    userindex: 0,
    houseDisplay: 'none',
    houseno: '',
    userTypeValue: '',
    usertype: [{
      id: '0',
      value: '请选择'
    }, {
      id: '1',
      value: '客户'
    }, {
      id: '2',
      value: '业主'
    }],
    projectArray: [{
      gid: '',
      name: '请选择参观项目'
    }],
    gwlist: [{
      GradeName: "置业顾问",
      ProjectGID: '',
      gid: "",
      id: 0,
      usercode: "",
      userheadpic: "",
      username: "请选择置业顾问",
      userphone: "",
      userremark: '',
      userscore: 0
    }],
    gwID: ''
  },
  onLoad: function(options) {
    var nowDate = new Date()
    var vDate = util.formatDate(nowDate);
    var oc = options.ordercode;
    let that = this
    that.setData({
      date: vDate,
      startDate: vDate,
      ordercode: oc
    });

    let data = {
      sIsZQ: 'true'
    }
    var list = that.data.projectArray
    request.getRequest("/Community/CommunityInfoList",
      data,
      function(res) {
        if (res.data.StatusCode == 200) {
          that.setData({
            gwindex: 0,
            projectArray: list.concat(res.data.Data)
          })
        } else {
          wx.showToast({
            title: '网络异常，请稍后重试！',
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
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {},
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindName: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindPhone: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  selectPrj: function(e) {
    let prid = e.currentTarget.dataset.id
    switch (prid) {
      case 'yy':
        this.setData({
          prjId: '152E7F4B-55F0-4E2C-BBD3-684AF00CB499',
          statusyy: 'flex',
          statuskyw: 'none',
          statusgf: 'none',
          statuszq: 'none',
          projectname: '云逸'
        })
        break;
      case 'kyw':
        this.setData({
          prjId: '852FA663-9EA1-44F9-A109-1C8990266D92',
          statusyy: 'none',
          statuskyw: 'flex',
          statusgf: 'none',
          statuszq: 'none',
          projectname: '凯粤湾'
        })
        break;
      case 'gf':
        this.setData({
          prjId: '96328AF6-05F8-4492-8E0F-B7DABA179635',
          statusyy: 'none',
          statuskyw: 'none',
          statusgf: 'flex',
          statuszq: 'none',
          projectname: '广佛'
        })
        break;
      case 'zq':
        this.setData({
          prjId: 'D8834E95-AE3B-4A92-B503-DDB73B0C74D8',
          statusyy: 'none',
          statuskyw: 'none',
          statusgf: 'none',
          statuszq: 'flex',
          projectname: '肇庆'
        })
        break;
    }
  },
  bindPickerChange: function(e) {
    let index = e.detail.value
    let that = this
    that.setData({
      prjId: that.data.projectArray[index].gid,
      projectname: that.data.projectArray[index].name,
      index: index
    })
    var list = [{
      GradeName: "置业顾问",
      ProjectGID: '',
      gid: "",
      id: 0,
      usercode: "",
      userheadpic: "",
      username: "请选择置业顾问",
      userphone: "",
      userremark: '',
      userscore: 0
    }]

    if (index != '0') {
      let data = {
        ProjectGID: that.data.prjId
      }
      request.postRequest("/Saler/SalerList",
        data,
        function(res) {
          if (res.StatusCode == 200) {

            that.setData({
              gwindex: 0,
              gwlist: list.concat(res.Data)
            })
          } else {
            wx.showToast({
              title: '网络异常，请稍后重试！',
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
    } else {
      that.setData({
        gwindex: 0,
        gwlist: list
      })
    }
  },
  bindUserTypeChange: function(e) {
    let index = e.detail.value
    let that = this
    let display = index == '2' ? 'flex' : 'none'
    that.setData({
      userindex: index,
      userTypeValue: that.data.usertype[index].value,
      houseDisplay: display
    })
  },
  book_tap: function() {
    wx.showLoading({
      title: '',
      mask: true
    })
    var vName = this.data.name.trim();
    var vPhone = this.data.phone.trim();
    var vDate = this.data.date;
    var vPjid = this.data.prjId;
    var oc = this.data.ordercode;
    var vPjName = this.data.projectname;
    var vSalerPhone = this.data.gwID;
    var vUserType = this.data.userTypeValue;
    var vHouseno = this.data.houseno;
    if (oc == "" || typeof(oc) == "undefined" || vName == "" || vPhone == "" || vPjid == "" || vPjName == "") {
      wx.showToast({
        title: '请填写完整信息！',
        icon: 'none',
        duration: 2000
      })
    } else if (vUserType == "" || vUserType == "请选择") {
      wx.showToast({
        title: '请选择个人身份！',
        icon: 'none',
        duration: 2000
      })
    } else {
      let data = {
        ordercode: oc,
        projectname: vPjName,
        projectgid: vPjid,
        username: vName,
        userphone: vPhone,
        usertime: vDate,
        useropenid: '',
        SalerPhone: vSalerPhone,
        usertype: vUserType,
        buserHouseNo: vHouseno
      }
      request.postRequest("/Order/OrderHDAdd",
        data,
        function(res) {
          wx.hideLoading();
          if (res.StatusCode == 200) {
            console.log("res", res);
            wx.showToast({
              title: '预约成功',
              icon: 'none',
              duration: 1000,
              success: function() {
                setTimeout(function() {
                  wx.navigateTo({
                    url: 'detail?qr=' + res.Data,
                  })
                }, 2000)
              }
            })
          } else {
            wx.showToast({
              title: '推荐失败，请稍后重试！',
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
    }
  },
  bindgwChange: function(e) {
    let index = e.detail.value
    let that = this
    that.setData({
      gwindex: index,
      gwID: that.data.gwlist[index].userphone
    })
  },
  bindHouseNo: function(e) {
    this.setData({
      houseno: e.detail.value
    })
  }
})