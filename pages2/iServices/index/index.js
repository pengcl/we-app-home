import request from '../../../utils/request'

var app = getApp();
//var vdomain = "http://localhost:59717/"
var vdomain = app.globalData.domain;

Page({


  data: {

    imgHead: vdomain +'image/service/head.png',
    imgLine: vdomain +'image/service/line.png',
    imgQiaTan:vdomain +'image/service/QiaTan.png',
    imgYuYue:vdomain +'image/service/YuYue.png',
    imgDengJi:vdomain +'image/service/DengJi.png',

    imgJiSuanQi:vdomain +'image/service/JiSuanQi.png',
    imgYuQianYue:vdomain +'image/service/YuQianYue.png',
    imgGouFang:vdomain +'image/service/GouFang.png',
    imgBaoXiu:vdomain +'image/service/BaoXiu.png',
		imgZiXun:vdomain +'image/service/ZiXun.png',
		
		imgScanCode:vdomain +'image/service/ScanCode.png',

		domain:vdomain,
		phone:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	let _this = this;
		// this.setData({
		// 	domain: app.globalData.domain,
		// 	// statusBarHeight: app.globalData.statusBarHeight,
		// 	// adModalShow: app.globalData.adModalShow,
		// });
		_this.checkphone();
  },

  QiaTan_tap:function(e){

    wx.navigateTo({
			url: "../../../pages/im/imlist/imlist",
		});
  },

  Other_tap:function(e){
    wx.showToast({
      title: '即将开放，敬请期待！',
      icon: 'none',
      duration: 1800,
  })},

	xinyunjia_tap: function (e) {
		 wx.redirectTo({
			 //url: '../im/imlist/imlist' + id,
			 url: '../../../pages2/index/index'
		 })
	},
	im_tap: function (e) {
		wx.redirectTo({
			//url: "../../pages/im/imlist/imlist",

			// url: "../../../pages3/iServices/index/index",
		});
	},
	nw_tap: function (e) {
		wx.redirectTo({
			url: "../../../pages/nw/index/index",
		});
	},
	my_tap: function (e) {
		wx.redirectTo({
			url: "../../../pages/my/main/main",
		});
	},
	ScanCode_tap:function(e){
		wx.redirectTo({
			url: "../code/scanCode",
		});
	},
	wechatindex_tap: function (e) {
		//var ProjectGID = "96328AF6-05F8-4492-8E0F-B7DABA179635";
		// wx.navigateTo({
		// 	url: "/pages/im/imlist/imlist",
		// });
	},
	benefit12_tap: function (e) {
		wx.navigateTo({
			url: "/pages2/activity/activity01/pay/main",
		});
	},
	benefit_tap: function (e) {
		//wx.navigateTo({
		//	url: "/pages2/activity/activity20210919/main/main",
		//	//url:"/pages2/activity/activity20201114/Redirect/Redirect",
		//});
	},
	teee_tap: function (e) {
		console.log("====================================");
		console.log(this.teee_tap);
		console.log("====================================");
	},
	exSideMenu_tap: function (e) {
		let _this = this;
	
		let type = e.currentTarget.dataset.type;
		let url = e.currentTarget.dataset.url;
		let data = e.currentTarget.dataset.data;

		// console.log(type, url, data);

		if (type === "url") {
			wx.navigateTo({
				url: url,
			});
		} else {
			wx.navigateToMiniProgram({
				...data,
				success(res) {
					// 打开成功
					console.log(1);
				},
			});
		}
	},

	tab_tap: function(e){

		var that =this;
		var idx = e.currentTarget.dataset.idx;
		
		that.setData({
			tabTitle : idx,
			tabContent :idx
		})


	},



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

	},
	checkphone: function (e) {
    let that = this
    var phone = wx.getStorageSync("PhoneNum");
    if (phone == "") {
      //wx.showToast({
      //  title: '请授权手机号！',
      //  icon: 'none',
      //  duration: 1000
      //})
      wx.navigateTo({
				url: "../../permission/phone/phone",
      });
      //that.getPhoneNumber(e);
      return;
    }
    let data = {
      phone: phone,
    }
    that.AddUserWXLogin();
  },

  AddUserWXLogin: function () {
    //var ProjectGID = this.data.ProjectCommunity_Gid;
    //var RegionGID="88888888-8888-8888-8888-888888888888";
		var PhoneNum = wx.getStorageSync("PhoneNum");
		var comecode = wx.getStorageSync("comecode");
		//console.log("ProjectGID", ProjectGID);
		let data1 = {
			nickname: "",
			avatarUrl: "",
			gender: "",
			province: "",
			city: "",
			country: "",
			comefrom: "iServices",
			comecode: comecode,
      ProjectGID: "",//ProjectGID,
      RegionGID:"",
			UserPhone: PhoneNum,
		};

		request.postRequest("/User/UserWXLogin", data1, function (res) {
			// if (res.StatusCode == 200) {
			//     let vpageUrl = that.data.pageUrl
			//     wx.redirectTo({
			//         url: vpageUrl,
			//     })
			// }
			//console.log("res111", res);
		});
	},
})