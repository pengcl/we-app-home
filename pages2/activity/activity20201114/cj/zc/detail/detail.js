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
    nook:''
  },
  onLoad: function (options) {
    let that = this
    let vlotterygid = options.lotterygid
    that.setData({
      lotterygid: vlotterygid
    })
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
    if (awardgid.toUpperCase() !="AB111111-9999-9999-9999-999999999999")
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
      sProject: 'ZC'
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
})