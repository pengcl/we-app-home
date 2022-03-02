// pages2/index/index.js

import util from "../../utils/util.js";
import request from "../../utils/request";
import UserInfo from "../../utils/UserInfo";
//const Track = require('../../utils/Track.js')

var app = getApp();

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		
		domain: "https://xyclientnew.ai-fox.net/",
		adModalShow: false,
		statusBarHeight: 0,
		UserInfoStatus: false,
		pageData: {},
		adList:[],
		// adList: [],
		// projList: [],
		// adModal: {},
		// activity01Num:0

		isYZ:0,

		tabTitle:0,
		tabContent: 0,
		cityName:'',

		imghead:'/image/indexv2_head05.png',
		imgxiaoshang:'/image/xiaoshang.png',
		img1_1:'/image/v0713/1_1.png',
		img1_2:'/image/v0713/1_2.png',
		img1_3:'/image/v0713/1_3.png',
		img1_4:'/image/v0713/1_4.png',
		img1_5:'/image/v0713/1_5.png',
		
		img1_6:'/image/v0713/1_6.png',
		img1_7:'/image/v0713/1_7.png',

		img2_0:'/image/v0713/2_0.png',
		img2_1:'/image/v0713/2_1.png',
		img2_2:'/image/v0713/2_2.png',
		//img2_3:'/image/v0713/2_3.png',
		img2_3:'/image/v0713/2_3B.png',
		img2_4:'/image/v0713/2_4.png',
		img3_0:'/image/v0713/3_0.png',

		op_bottom:'/referral/option/option_bottom.png',

		tjArea:false,

		regionGid:''




	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let _this = this;
		this.setData({
			domain: app.globalData.domain,
			statusBarHeight: app.globalData.statusBarHeight,
			adModalShow: app.globalData.adModalShow,
		});


		request.getRequest("/Page/Index_index", {}, function (
			res
		) {
			_this.setData({
				pageData: res.data,
			});
		});


		//if (app.appIsOnloadCallback == null) {
		if (app.globalData.appIsOnload == false) {
			app.appIsOnloadCallback = () => {
				//request.getRequest(
				//	"/Page/Index_index", {},
				//	function (res) {
				//		_this.setData({
				//			pageData: res.data,
				//		});
				//	}
				//);
				request.getRequest(
					"/Page/ADList_Index", {},
					function (res) {
						_this.setData({
							adList: res.data,
						});
					}
				);
			};
		} else {
			//request.getRequest("/Page/Index_index", {}, function (
			//	res
			//) {
			//	_this.setData({
			//		pageData: res.data,
			//	});
			//});
			request.getRequest("/Page/ADList_Index", {},function (res) 
				{
					_this.setData({
						adList: res.data,
					});
				}
			);
		}
		


		//设置项目页签
		this.setData({
			regionGid : options.RegionGid
		});


		_this.AddUserWXLogin();

		var region = this.data.regionGid;
		var that = this;

		switch(region){
			case '':{
				that.setData({
					tabTitle : 0,
					tabContent :0
				})
			}; break;
			//华南（广州）
			case '88888888-8888-8888-8888-888888888888':{
				that.setData({
					tabTitle : 1,
					tabContent :1
				})
			}; break;
			//宁波
			case '88888888-8888-8888-8888-555555555555':{
				that.setData({
					tabTitle : 2,
					tabContent :2
				})
			}; break;
			//武汉
			case '88888888-8888-8888-8888-666666666666':{
					that.setData({
						tabTitle : 4,
						tabContent :4
					})
				}; break;
			//沈阳
			case '88888888-8888-8888-8888-777777777777':{
				that.setData({
					tabTitle : 3,
					tabContent :3
				})
			}; break;
			//益阳
			case '88888888-8888-8888-8888-333333333333':{
				that.setData({
					tabTitle : 5,
					tabContent :5
				})
			}; break;
			//杭州
			case '88888888-8888-8888-8888-999999999999':{
				that.setData({
					tabTitle : 6,
					tabContent :6
				})
			}; break;
		}

		
	},
	switchCity:function(e){
		var cn = this.data.cityName;
		wx.navigateTo({
			url: '/pages2/city/city?cn=' + cn,
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		var _this = this;
		_this.GetIsYZ();

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		console.log(
			"UserInfo",
			(wx.getStorageSync("UserInfo") || "") != ""
		);

		this.setData({
			UserInfoStatus: (wx.getStorageSync("UserInfo") || "") != "" &&
				(wx.getStorageSync("PhoneNum") || "") != "",
		});

		//新版初始化
		if(wx.getStorageSync("cityname") != ''){
			this.setData({
			
				cityName : wx.getStorageSync("cityname")
			});
		}else{
			this.setData({
			
				cityName : '广州'
			});
		}
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {
		var _this = this

		return {
			title: "新赏家home+",
			//imageUrl: _this.data.pageData.ShareImg,
		};

	},
	hideAdModal: function (e) {
		//console.log("ddaaaaaddd");
		app.globalData.adModalShow = false;
		this.setData({
			adModalShow: app.globalData.adModalShow,
		});
	},
	ad_tap: function (e) {
		let type = e.currentTarget.dataset.type;
		let url = e.currentTarget.dataset.url;
		let data = e.currentTarget.dataset.data;

		console.log(type, url, data);
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
	
	proj_tap: function (e) {
		if (e.currentTarget.dataset.code == "YY") {
			wx.navigateTo({
				url: "../community/YY/index/index",
			});
		}

	 else	if (e.currentTarget.dataset.code == "GF") {
			wx.navigateTo({
				url: "../community/GF/index/index",
			});
		}
		else if (e.currentTarget.dataset.code == "KYW") {
			wx.navigateTo({
				url: "../community/KYW/index/index",
			});
		}
		else if (e.currentTarget.dataset.code == "ZQ") {
			wx.navigateTo({
				url: "../community/ZQ/index/index",
			});
		}
		else if (e.currentTarget.dataset.code == "QY") {
			wx.navigateTo({
				url: "../community/QY/index/index",
			});
		}
		else if (e.currentTarget.dataset.code == "ZC") {
			wx.navigateTo({
				url: "../community/ZC/index/index",
			});
		}
		else if (e.currentTarget.dataset.code == "HZ") {
			wx.navigateTo({
				url: "../community/HZ/index/index",
			});
		}
		else if (e.currentTarget.dataset.code == "HX") {
			wx.navigateTo({
				url: "../community/HX/index/index",
			});
		}
		else if (e.currentTarget.dataset.code == "TG") {
			wx.navigateTo({
				url: "../community/TG/index/index",
			});
		}
		else if (e.currentTarget.dataset.code == "JH") {
			wx.navigateTo({
				url: "../community/JH/index/index",
			});
		}
		else if (e.currentTarget.dataset.code == "NB") {
			wx.navigateTo({
				url: "../community/NB/index/index",
			});
		}
		else if (e.currentTarget.dataset.code == "SY") {
			wx.navigateTo({
				url: "../community/SY/index/index",
			});
		}
		else if (e.currentTarget.dataset.code == "SY2") {
			wx.navigateTo({
				url: "../community/SY2/index/index",
			});
		}
		else if (e.currentTarget.dataset.code == "SY3") {
			wx.navigateTo({
				url: "../community/SY3/index/index",
			});
		}
		else if (e.currentTarget.dataset.code == "SY4") {
			wx.navigateTo({
				url: "../community/SY4/index/index",
			});
		}

		else if (e.currentTarget.dataset.code == "WH") {
			wx.navigateTo({
				url: "../community/WH/index/index",
			});
		}

		else if (e.currentTarget.dataset.code == "ZSH") {
			wx.navigateTo({
				url: "../community/ZSH/index/index",
			});
		}

		else if (e.currentTarget.dataset.code == "HangZhou") {
			wx.navigateTo({
				url: "../community/HangZhou/index/index",
			});
		}

	},
	UserInfo_tap: function (e) {
		let _this = this;
		console.log(e);
		UserInfo.GetUserInfo(
			app,
			e,
			function (res) {
				_this.setData({
					UserInfoStatus: (wx.getStorageSync(
						"UserInfo"
					) || "") != "",
				});

				var url = getCurrentPages()[
					getCurrentPages().length - 1
				];
				console.log("url", url);
				if (
					(wx.getStorageSync("PhoneNum") || "") ==
					""
				) {
					wx.navigateTo({
						url: "../permission/phone/phone", //?url=' + url.route
					});
				}
			},
			function (res) {
				_this.setData({
					UserInfoStatus: (wx.getStorageSync(
						"UserInfo"
					) || "") != "",
				});
				wx.showModal({
					title: "未授权",
					content: "为了不影响您的使用，请开启相应的权限哦~",
				});
			}
		);
	},
	activity_tap: function (e) {
		let type = e.currentTarget.dataset.type;
		let url = e.currentTarget.dataset.url;
		let data = e.currentTarget.dataset.data;

		// console.log(type, url, data);

		if (type === null || type === "url") {
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
	//弹窗广告 加载事件
	ad_load: function (e) {
		let _this = this;
		setTimeout(function () {
			app.globalData.adModalShow = false;
			_this.setData({
				adModalShow: app.globalData.adModalShow,
			});
		}, 3000);
	},
	//弹窗广告 点击事件
	admodal_tap: function (e) {
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

	//tabbar

	xinyunjia_tap: function (e) {
		//  wx.navigateTo({
		//    url: '../im/imlist/imlist' + id,
		//  })
	},
	im_tap: function (e) {
		wx.redirectTo({
			//url: "../../pages/im/imlist/imlist",

			url: "../../pages2/iServices/index/index",
		});
	},
	nw_tap: function (e) {
		wx.redirectTo({
			url: "../../pages/nw/index/index",
		});
	},
	my_tap: function (e) {
		wx.redirectTo({
			url: "../../pages/my/main/main",
		});
	},
	wechatindex_tap: function (e) {
		//var ProjectGID = "96328AF6-05F8-4492-8E0F-B7DABA179635";
		wx.redirectTo({
			url: "/pages/im/imlist/imlist",
		});
	},
	benefit12_tap: function (e) {
		wx.navigateTo({
			url: "/pages2/activity/activity01/pay/main",
		});
	},
	benefit_tap: function (e) {
		wx.navigateTo({
			url: "/pages2/activity/activity20220126/main/main",
			//url:"/pages2/activity/activity20201114/Redirect/Redirect",
		});
	},
	teee_tap: function (e) {
		console.log("====================================");
		console.log(this.teee_tap);
		console.log("====================================");
	},

	
	// exSideMenu_tap: function (e) {

	// 	let type = e.currentTarget.dataset.type;
	// 	let url = e.currentTarget.dataset.url;
	// 	let data = e.currentTarget.dataset.data;

	// 	// console.log(type, url, data);

	// 	if (type === "url") {
	// 		wx.navigateTo({
	// 			url: url,
	// 		});
	// 	} else {
	// 		wx.navigateToMiniProgram({
	// 			...data,
	// 			success(res) {
	// 				// 打开成功
	// 				console.log(1);
	// 			},
	// 		});
	// 	}
	// },

 //宁波项目 待发版
	exSideMenu_tap: function (e) {
		let _this = this;

		var region = _this.data.regionGid;

		if(region == undefined) {
			_this.setData({
				tjArea :true,
			})
		}
		else{
		switch(region){
			case '':{
				_this.setData({
					tjArea :true,
				})
			}; break;
			//华南（广州）
			case '88888888-8888-8888-8888-888888888888':{
				wx.navigateTo({
					url: '../referral/main/main',
				})
			}; break;
			//宁波
			case '88888888-8888-8888-8888-555555555555':{
				wx.navigateTo({
					url: '../referral_ldx/main/main',
				})
			}; break;
		}
	}
		
	},

	maskHide_tap:function(){
		let that =this;
		that.setData({
			tjArea :false,
		})
	},

	goTJ_tap:function(e){
		var that =this;
		var area = e.currentTarget.dataset.area;

		that.setData({
			tjArea:false,
		})
		if(area == 1){
			wx.navigateTo({
				url: '../referral/main/main',
			})
		}
		else if(area == 2){
			wx.navigateTo({
				url: '../referral_ldx/main/main',
			})
		}
		else if(area == 4){
			wx.navigateTo({
				url: '../referral_ldxwh/main/main',
			})
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

	xsjlive_tap:function(){
    var timestamp = Date.parse(new Date());   
    let url = "/union/authorize/goto?appid=zhsq&f=homeindex&path=pages/index/index&timestamp=" + timestamp
    wx.navigateTo({
			url: url,
		})
	},
	
	xsjlive_km_tap:function(){
    var timestamp = Date.parse(new Date());   
    let url = "/union/authorize/goto?appid=zhsq&f=homeindex&path=pages/smarthouse/index&timestamp=" + timestamp
    wx.navigateTo({
			url: url,
		})
	},
	
	xsjlive_jf_tap:function(){
    var timestamp = Date.parse(new Date());   
    let url = "/union/authorize/goto?appid=zhsq&f=homeindex&path=pagesTn/community/pages/bills/index&timestamp=" + timestamp
    wx.navigateTo({
			url: url,
		})
  },
	
	xsjlive_zh_tap:function(){
    var timestamp = Date.parse(new Date());   
    let url = "/union/authorize/goto?appid=zhsq&f=homeindex&path=pagesTn/my/pages/smarthome/index&timestamp=" + timestamp
    wx.navigateTo({
			url: url,
		})
  },

	//xsjkfx_tap:function(){
    //var timestamp = Date.parse(new Date());  
    //let url = "/union/authorize/goto?appid=kdp&f=homeindex&path=pages/index/index&timestamp=" + timestamp
    //wx.navigateTo({
		//	url: url,
		//})
	//},

	xsjkfx_tap: function (){
		wx.navigateToMiniProgram({
			appId: 'wx46c80e86088ef17b',
			path: 'pages/index/index',
			extraData: {
				//foo: 'bar'
			},
			//envVersion: 'develop',
			envVersion: 'trial',
			success(res) {
				// 打开成功
			},
			fail(res){
				// 打开失败
			},
			complete(res){
				// 调用结束  不管成功还是失败都执行
			}
		})
	},

	
	xsjcrm_tap:function(){
    // wx.showToast({
		// 	title: '敬请期待！',
		// 	icon: 'none',
		// 	duration: 2000
		// })

		//var timestamp = Date.parse(new Date());  
    //let url = "/union/nwccvip/login?appid=crm&timestamp=" + timestamp
    //wx.navigateTo({
		//	url: url,
		//})

		wx.navigateTo({
			url: '/pages3/KDPMall/index/index',
		})
		

	},
	
	xiaoshang_tap:function(){
    wx.showToast({
			title: '敬请期待！',
			icon: 'none',
			duration: 2000
		})
	},
	guanjia_tap:function(){
    wx.showToast({
			title: '敬请期待！',
			icon: 'none',
			duration: 2000
		})
	},
	guwen_tap:function(){
    wx.navigateTo({
			 url: "../../pages/im/imlist/imlist",
		});
  },



	GetIsYZ: function () {
		let that = this;
		var PhoneNum = wx.getStorageSync("PhoneNum");
		var phoneNumSignText = wx.getStorageSync("phoneNumSignText");
		let data1 = {
			PhoneNum: PhoneNum,
			phoneNumSignText: phoneNumSignText,
		};

		request.postRequest("/LivePlus/IsYZ", data1, function (res) {
			 if (res.StatusCode == 200) {
				 let isyz = 0;
				 if (res.Data!="0") isyz=res.Data;
				that.setData({
					isYZ : isyz,
				})
			 }
			console.log("res111", res);
		});
	},
	game_tap:function(e){
		//let url = e.currentTarget.dataset.url;
		wx.navigateTo({
			url: '/pages2/activity/activity20210919/game/game',
		})
	},

	AddUserWXLogin: function () {
		var ProjectGID = this.data.ProjectCommunity_Gid;
		var RegionGID = this.data.regionGid;
		var PhoneNum = wx.getStorageSync("PhoneNum");
		var comecode = wx.getStorageSync("comecode");
		console.log("ProjectGID", ProjectGID);
		let data1 = {
			nickname: "",
			avatarUrl: "",
			gender: "",
			province: "",
			city: "",
			country: "",
			comefrom: "index",
			comecode: comecode,
			ProjectGID: ProjectGID,
			UserPhone: PhoneNum,
			RegionGID:RegionGID
		};

		request.postRequest("/User/UserWXLogin", data1, function (res) {
			// if (res.StatusCode == 200) {
			//     let vpageUrl = that.data.pageUrl
			//     wx.redirectTo({
			//         url: vpageUrl,
			//     })
			// }
			console.log("res111", res);
		});
	}

});