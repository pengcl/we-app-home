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
    orderCode: '',
    index: 0,
    gwindex: 0,
    projectArray: [{
      gid: '',
      name: '请选择参观项目'
    }],
    gwlist: [{
      GradeName:   "置业顾问",
      ProjectGID: '',
      gid:   "",
      id:  0,
      usercode:   "",
      userheadpic:   "",
      username:   "请选择置业顾问",
      userphone:   "",
      userremark: '',
      userscore:  0
    }],
    gwID: ''
  },
  onLoad: function(options) {
    var nowDate = new Date()
    var orderCode = options.orderCode
    var vDate = util.formatDate(nowDate);
    let that = this
    that.setData({
      date: vDate,
      startDate: vDate,
      orderCode: orderCode
    });
    let data = {
      sIsZQ:'false'
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
          statusgf: 'none'
        })
        break;
      case 'kyw':
        this.setData({
          prjId: '852FA663-9EA1-44F9-A109-1C8990266D92',
          statusyy: 'none',
          statuskyw: 'flex',
          statusgf: 'none'
        })
        break;
      case 'gf':
        this.setData({
          prjId: '96328AF6-05F8-4492-8E0F-B7DABA179635',
          statusyy: 'none',
          statuskyw: 'none',
          statusgf: 'flex'
        })
        break;
    }
  },
  bindPickerChange: function(e) {
    let index = e.detail.value
    let that = this
    that.setData({
      prjId: that.data.projectArray[index].gid,
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
  book_tap: function() {
    wx.showLoading({
      title: '',
      mask: true
    })
    var vName = this.data.name.trim();
    var vPhone = this.data.phone.trim();
    var vDate = this.data.date;
    var vPjid = this.data.prjId
    var vOrderCode = this.data.orderCode
    var vSalerPhone=this.data.gwID
    if (vName == "" || vPhone == "" || vPjid == "") {
      wx.showToast({
        title: '请填写完整信息！',
        icon: 'none',
        duration: 2000
      })
    } else {
      let data = {
        UserName: vName,
        UserPhone: vPhone,
        ProjectGid: vPjid,
        BookTime: vDate,
        OrderCode: vOrderCode,
        SalerPhone: vSalerPhone
      }
      request.postRequest("/YuYue/InsertBookCar",
        data,
        function(res) {
          wx.hideLoading();
          if (res.StatusCode == 200) {
            wx.showToast({
              title: '预约成功，稍后会有置业顾问联系您！',
              icon: 'none',
              duration: 1000,
              success: function() {
                setTimeout(function() {
                  wx.redirectTo({
                    url: '../pay/payok',
                  })
                }, 1000)
              }
            })
          } else {
            wx.showToast({
              title: '预约失败，请稍后重试！',
              icon: 'none',
              duration: 2000
            })
          }
        }, (err) => {
          wx.showToast({
            title: '预约失败，请稍后重试！',
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
  }
})