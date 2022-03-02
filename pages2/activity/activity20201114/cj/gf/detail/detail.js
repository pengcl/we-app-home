import request from '../../../../../../utils/request.js';
var app = getApp();
var vdomain = app.globalData.domain
Page({
  data: {
    lotterygid: '',
    lotteryInfo: '',
    qrcodeURL: '',
    bgimag: '',
    adModalShow:false,
    recordgid:'',
    awardgid:'',
    password:'',
    isuse:'',
    nook:'',
    orderCode:''
  },
  onLoad: function (options) {
    let that = this
    let vlotterygid = "AB222222-3333-0000-0000-000000000000"
    that.setData({
      lotterygid: vlotterygid
    })

    let orderCode = options.orderCode;
    that.setData({
      orderCode: orderCode,
    })
    that.AddUserWXLogin();
    that.loadInfo(vlotterygid);
  },
  hideAdModal: function (e) {
		this.setData({
			adModalShow: false,
		});
		// console.log();
  },
  
	showAdModal: function (e) {
    var awardgid = this.data.awardgid;
    if (awardgid.toUpperCase() !="ab222222-3333-9999-9999-999999999999")
    {
		this.setData({
			adModalShow: true,
		});
    // console.log();
    }
  },
  password_input: function (e) {
		this.setData({
			password: e.detail.value,
		});
	},
  HX_tap: function (e) {
    let that = this;
    console.log("aaaaa");
    var recordgid = this.data.recordgid;
    var password = this.data.password;
    let data1 = {
      "recordgid": recordgid,
      "password": password
    }
    console.log("aaaaa");
    request.postRequest("/Lottery/LotteryRecordHX20201113",
      data1,
      function (res) {
         if (res.StatusCode == 200) {
          wx.showToast({
            title: '核销成功！',
            icon: 'none',
            duration: 1000
          })
          that.setData({
            isuse: true
          })
          that.hideAdModal(e);
        }
        else
        {
          wx.showToast({
            title: res.Data,
            icon: 'none',
            duration: 2000
          })
        }
        console.log("res111", res);
      });
	},

  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  loadInfo: function (gid) {
    let that = this
    let data = {
      sLotteryID: gid,
      sProject: 'GF',
      orderCode: that.data.orderCode
    }
    request.getRequest("/Lottery/LotteryRecord20201113",
      data,
      function (res) {
        if (res.data.StatusCode == 200) {
          
          that.setData({
            lotteryInfo: res.data.Data,
            bgimag: vdomain + res.data.Data.awardModel.image1,
            qrcodeURL: vdomain + res.data.Data.qrcodeURL,
            recordgid:res.data.Data.gid,
            isuse:res.data.Data.isUse,
            awardgid:res.data.Data.awardID
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
  }
  ,
  AddUserWXLogin: function () {
    var ProjectGID = '96328AF6-05F8-4492-8E0F-B7DABA179635';
    var PhoneNum = wx.getStorageSync('PhoneNum');
    var comecode = wx.getStorageSync('comecode');
    console.log("ProjectGID", ProjectGID);
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
        console.log("res111", res);
      });

  }
})