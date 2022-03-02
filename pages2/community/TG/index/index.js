// pages2/community/TG/index/index.js
import util from "../../../../utils/util.js";
import request from "../../../../utils/request";

var app = getApp();
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
    current: 't1',
		current_scroll: 't1',

		domain: "https://xyclientnew.ai-fox.net/",
		ProjectCommunity_Gid: "7c47321d-c548-4f0e-a01a-8c94091c11c3",
		windowHeight: 0,
		// hasVR: true,
		currHuXingVR: "",
		scrollintoview: "",
		// YuYue_Cache: false,
		YuYue_UserName: "",
		YuYue_UserPhone: "",
		pageData: [],
		SalerList: [],
		adModalShow: true,
		hasPhoneNum: false,

		IsLoadingShow:false,
		LoadingShowPIC:"../../../../images/3.gif"
	},

	hideLoadingShow: function (e) {
		this.setData({
			IsLoadingShow: false,
		});
	},
	LoadingShow_tap:function(){
		request.getRequest(
			"/Page/TG_index",
			{},
			function (res) {
				_this.setData({
					pageData: res.data,
				});
				_this.hideLoadingShow();
			});
	},

handleChange ({ detail }) {
		this.setData({
				current: detail.key
		});
},
		
handleChangeScroll ({ detail }) {
		this.setData({
				current_scroll: detail.key
		});
},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

		var code = decodeURIComponent(options.scene);
		if(code == "202108201746571089"){
			wx.navigateTo({
				url: '/pages2/activity/activity20210830/index',
			})
		}

		let _this = this;

		//request.getRequest(
		//	"/Page/TG_index",
		//	{},
		//	function (res) {
		//		_this.setData({
		//			pageData: res.data,
		//		});
		//	}
		//);


		this.setData({
			domain: app.globalData.domain,
			// hasVR: _this.data.HuXingList[0].hasVR,
			// currHuXing: _this.data.HuXingList[0],
			windowHeight: wx.getSystemInfoSync().windowHeight,
			adModalShow: true,
			hasPhoneNum:
				(wx.getStorageSync("PhoneNum") || "") != "",
		});

		_this.setData({
			YuYue_UserPhone: wx.getStorageSync("PhoneNum"),
		});

		request.MainGetRequest(
			"/Page/TG_index",
			{},
			function (res) {
				_this.setData({
					pageData: res.data,
				});
				//_this.hideLoadingShow();
			});


		//if (app.appIsOnloadCallback == null) {
		if (app.globalData.appIsOnload == false) {
			app.appIsOnloadCallback = () => {
				//request.getRequest(
				//	"/Page/TG_index",
				//	{},
				//	function (res) {
				//		_this.setData({
				//			pageData: res.data,
				//		});
				//		
				//	});

					_this.GetSalerList();

				//let data = {
				//	ProjectGID: this.data
				//		.ProjectCommunity_Gid,
				//};
				//request.postRequest(
				//	"/Saler/SalerList",
				//	data,
				//	function (res) {
				//		let _SalerList = [
				//			{
				//				id: 0,
				//				usercode: 0,
				//				username:
				//					"未选择",
				//				userphone: "",
				//			},
				//			...res.Data,
				//		];

				//		_this.setData({
				//			SalerList: _SalerList,
				//		});
				//	}
				//);
				
			};
		} else {
			//request.getRequest("/Page/TG_index", {}, function (res) {
			//	_this.setData({
			//		pageData: res.data,
			//	});
				

			//});
			_this.GetSalerList();
			
		}
		_this.AddUserWXLogin();
		_this.GetTT();
	},


	GetSalerList:function()
	{
		let _this=this;
		let data = {
			ProjectGID: _this.data
				.ProjectCommunity_Gid,
		};
		request.postRequest("/Saler/SalerList", data, function (
			res
		) {
			let _SalerList = [
				{
					id: 0,
					usercode: 0,
					username: "未选择",
					userphone: "",
				},
				...res.Data,
			];

			_this.setData({
				SalerList: _SalerList,
			});
		});
	},


	AddUserWXLogin: function () {
		var ProjectGID = this.data.ProjectCommunity_Gid;
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
			comefrom: "projectindex",
			comecode: comecode,
			ProjectGID: ProjectGID,
			UserPhone: PhoneNum,
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
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		this.setData({
			YuYue_UserPhone: wx.getStorageSync("PhoneNum"),
		});
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
		let _this = this;
		return {
			title: "新世界星辉",
			imageUrl: _this.data.pageData.ShareImg,
		};
	},
	onPageScroll: function (e) {
		let _this = this;
		const query = wx.createSelectorQuery();

		query.selectAll(".video").fields(
			{
				id: true,
				context: true,
				scrollOffset: true,
				rect: true,
			},
			function (res) {
				// console.log(item.id, "pause", item.bottom, (item.bottom - item.top) / 2,

				// console.log("res", res)
				res.forEach((item, i) => {
					if (
						item.bottom <
							(item.bottom -
								item.top) /
								2 ||
						item.top >
							_this.data
								.windowHeight -
								(item.bottom -
									item.top) /
									2
					) {
						item.context.pause();
						console.log(
							"item.bottom",
							item.id,
							item.bottom
						);
					} else {
						item.context.play();
						console.log(
							"item.bottom",
							item.id,
							item.bottom
						);
						// console.log(item.id, "play", item.bottom, (item.bottom - item.top) / 2, item.top, _this.data.windowHeight - (item.bottom - item.top) / 2);
					}
				});
			}
		);
		query.exec();
	},
	img_tap: function (e) {
		console.log(
			e.currentTarget.dataset.code,
			e.currentTarget.dataset.code || "",
			(e.currentTarget.dataset.code || "") != ""
		);

		if ((e.currentTarget.dataset.code || "") != "") {
			wx.navigateTo({
				url:
					"../detail/detail?code=" +
					e.currentTarget.dataset.code,
			});
		}
	},
	goYuYue: function (e) {
		wx.pageScrollTo({
			selector: "#YuYue",
			duration: 500,
		});
	},
	view_YuYue_tap: function (e) {
		console.log("view_YuYue_tap");
		let _this = this;
		if ((wx.getStorageSync("PhoneNum") || "") == "") {
			
			if (!_this.data.PhoneNumStatus) {
				wx.navigateTo({
					url: "/pages2/permission/phone/phone",
				});
			}
		}
		
	},

	// YuYue_Cache_tap: function (e) {
	//   let YuYue_Cache = this.data.YuYue_Cache || false
	//   this.setData({
	//     YuYue_Cache: !YuYue_Cache
	//   })
	// },
	YuYue_UserName_input: function (e) {
		this.setData({
			YuYue_UserName: e.detail.value,
		});
	},
	YuYue_UserPhone_input: function (e) {
		this.setData({
			YuYue_UserPhone: e.detail.value,
		});
	},
	YuYue_tap: function (e) {
		let _this = this;
		if (this.data.YuYue_UserName == "") {
			wx.showToast({
				title: "请输入姓名",
				icon: "none",
				mask: true,
				duration: 2000,
			});
			return;
		}
		if (!util.isPhone(this.data.YuYue_UserPhone)) {
			wx.showToast({
				title: "手机号不正确",
				icon: "none",
				mask: true,
				duration: 2000,
			});
			return;
		}

		wx.showLoading({
			title: "提交中...",
		});

		let SalerName = "";
		let SalerCode = "";
		if (
			this.data.currSaler != null &&
			this.data.currSaler.username != "未选择"
		) {
			SalerName = this.data.currSaler.username;
			SalerCode = this.data.currSaler.usercode;
		}
		let data = {
			ProjectGid: this.data.ProjectCommunity_Gid,
			UserName: this.data.YuYue_UserName,
			UserPhone: this.data.YuYue_UserPhone,
			SalerName: SalerName,
			SalerCode: SalerCode,
		};
		request.postRequest(
			"/YuYue/YuYue",
			data,
			function (res) {
				if (res.Data.StatusCode == "Y") {
					wx.showToast({
						title:
							"预约成功，稍后会有置业顾问会与您联系",
						icon: "none",
						mask: true,
						duration: 2000,
					});
					_this.setData({
						YuYue_UserName: "",
						YuYue_UserPhone: "",
					});
				} else {
					wx.showToast({
						title: "预约失败，请稍后重试",
						icon: "none",
						mask: true,
						duration: 2000,
					});
				}
				wx.hideLoading();
			},
			err => {
				console.log(err);
				wx.hideLoading();
			}
		);
	},
	swiper_change: function (e) {
		let vrurl = e.detail.currentItemId;
		let _this = this;
		this.setData({
			// hasVR: _this.data.HuXingList[index].hasVR,
			currHuXingVR: vrurl,
		});
	},

	vr_tap: function (e) {
		//  let i_VR = this.data.hasVR;
		let i_currHuXingVR = this.data.currHuXingVR;

		wx.navigateTo({
			url: "../huxingvr/huxingvr?vrurl=" + i_currHuXingVR,
		});
	},
	map_tap: function (e) {
		 var lat = 23.198042,
		 	lng = 113.599813,
		 	vname = "新世界星辉",
		 	vaddress = "广州增城区新新大道与永宁大道交汇处";
		 wx.openLocation({
		 	type: "gcj02",
		 	latitude: lat,
		 	longitude: lng,
		 	name: vname,
		 	address: vaddress,
		 	scale: "16",
		 	success: function (res) {},
		 	fail: function (res) {},
		 });
	},
	view_scroll: function (e) {},
	wechat_tap: function (e) {
		var ProjectGID = this.data.ProjectCommunity_Gid;
		wx.navigateTo({
			url:
				"/pages/im/imselect/imselect?ProjectGID=" +
				ProjectGID,
		});
	},
	HuXingPreview_tap: function (e) {
		console.log(e.currentTarget.dataset.src);
		let currentUrl = e.currentTarget.dataset.src;
		let urls = [];
		urls.push(currentUrl);
		wx.previewImage({
			current: currentUrl, // 当前显示图片的http链接
			urls: urls, // 需要预览的图片http链接列表
		});
	},
	benefit12_tap: function (e) {
		wx.navigateTo({
			url: "/pages2/activity/activity01/pay/main",
		});
	},

	bindSalerPickerChange: function (e) {
		let _this = this;
		console.log(e);
		this.setData({
			currSaler: _this.data.SalerList[e.detail.value],
		});
	},
	banner_tap: function (e) {
		let type = e.currentTarget.dataset.type;
		let url = e.currentTarget.dataset.url;
		let data = e.currentTarget.dataset.data;

		if (type === "url" && url != null) {
			wx.navigateTo({
				url: url,
			});
		} else if (type === "wxapp" && url != null) {
			wx.navigateToMiniProgram({
				...data,
				success(res) {
					// 打开成功
					console.log(1);
				},
			});
		}
	},

	exSideMenu_tap: function (e) {
		let _this = this;
		console.log("getPhoneNumber", e);
		if (e.detail.errMsg === "getPhoneNumber:ok") {
			wx.login({
				success: function (res) {
					if (res.code != "") {
						// var comecode = wx.getStorageSync('comecode');
						let data = {
							code: res.code,
							iv: e.detail.iv,
							encryptedData:
								e.detail
									.encryptedData,
							comecode: wx.getStorageSync(
								"comecode"
							),
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
										res
											.Data
											.phoneNumber
									);
									wx.setStorageSync(
										"PhoneNumSign",
										res
											.Data
											.PhoneNumSignText
									);

									_this.setData(
										{
											hasPhoneNum: true,
										}
									);
								}

								_this.AddUserWXLogin();
							},
							function (e) {}
						);
					} else {
					}
				},
			});
		}

		if (_this.data.hasPhoneNum==true)
		{
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
	  }
	},


	hideAdModal: function (e) {
		this.setData({
			adModalShow: false,
		});
		// console.log();
	},


	//弹窗
	admodal_tap: function (e) {
		let _this = this;
		console.log("getPhoneNumber", e);
		if (e.detail.errMsg === "getPhoneNumber:ok") {
			wx.login({
				success: function (res) {
					if (res.code != "") {
						// var comecode = wx.getStorageSync('comecode');
						let data = {
							code: res.code,
							iv: e.detail.iv,
							encryptedData:
								e.detail
									.encryptedData,
							comecode: wx.getStorageSync(
								"comecode"
							),
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
										res
											.Data
											.phoneNumber
									);
									wx.setStorageSync(
										"PhoneNumSign",
										res
											.Data
											.PhoneNumSignText
									);

									_this.setData(
										{
											hasPhoneNum: true,
										}
									);
								}

								_this.AddUserWXLogin();
							},
							function (e) {}
						);
					} else {
					}
				},
			});
		}

		let type = e.currentTarget.dataset.type;
		let url = e.currentTarget.dataset.url;
		let data = e.currentTarget.dataset.data;

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


	
	h5view_tap: function (e) {
		let url = e.currentTarget.dataset.url;
		let gid = e.currentTarget.dataset.gid;
		this.ToutiaoClickAdd(gid);
		wx.navigateTo({
			url: "../../../../pages/toutiao/view/h5view?url=" + escape(url),
		});
	},
	xcxView_tap: function (e) {
		let path = e.currentTarget.dataset.xcxpath;
		let wxid=e.currentTarget.dataset.xcxappid;
		let gid = e.currentTarget.dataset.gid;
		this.ToutiaoClickAdd(gid);
		wx.navigateToMiniProgram({
			appId: wxid,
			path: path,
		});
	},
	nwview_tap: function (e) {
		let gid = e.currentTarget.dataset.gid;
		this.ToutiaoClickAdd(gid);
		wx.navigateTo({
			url: "../../../../pages/toutiao/view/view?gid=" + gid,
		});
	},

  LS1_tap: function (e) {
		let url = this.data.pageData.loushuUrl;
		console.log("aaaurl",url);
		url = unescape(url);
		//let url = unescape("https://yanrunweb.wbdev.cn/yrweb/guanggao/1107ghzf/index.html");
		wx.navigateTo({
			url: "../../../../pages/toutiao/view/h5view?url=" + escape(url),
		});
	},

	LS_tap:function(e)
	{
		let that = this;
		var phonenum = wx.getStorageSync('PhoneNum');
		console.log("phonenum",phonenum);
		if (phonenum==""||phonenum=="undefined")
		{
			wx.navigateTo({
				url: "/pages2/permission/phone/phone"
			});
		}
		else
		{
			
			if (app.globalData.appIsOnload) {
				//that.postdata1();
				that.LS1_tap(e);
			} else {
				app.appIsOnloadCallback = () => {
					//that.postdata1();
					that.LS1_tap(e);
				}
			}
		}

	},

	GetTT:function()
	{
		  let _this = this;
			request.getRequest(
				"/Toutiao/list",
				{"ProjectGID":"7c47321d-c548-4f0e-a01a-8c94091c11c3"},
				function (res) {
					if (res.data.StatusCode == 200) {
						_this.setData({
							NWList: res.data.Data,
						});
					} else {
						// wx.showToast({
						//   title: '网络异常，请稍后重试！',
						//   icon: 'none',
						//   duration: 1000
						// })
					}
				},
				err => {
					console.log(err);
				}
			);

	},

	ToutiaoClickAdd: function (gid) {
		console.log("gid111",gid);
		let data1 = {
			gid: gid,
		};
		request.postRequest("/Toutiao/clickadd", data1, function (res) {
			console.log("res111",res);
		});
	},


});
