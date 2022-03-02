// pages2/community/GF/index/index.js

import util from "../../../../utils/util.js";
import request from "../../../../utils/request";

let app = getApp();

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		domain: "https://xyclientnew.ai-fox.net/",
		ProjectCommunity_Gid: "96328AF6-05F8-4492-8E0F-B7DABA179635",
		windowHeight: 0,
		//YuYue_Cache: false,
		YuYue_UserName: "",
		YuYue_UserPhone: "",
		scrollintoview: "",
		SalerList: [],
		hasPhoneNum: true,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let _this = this;
		this.setData({
			domain: app.globalData.domain,
			windowHeight: wx.getSystemInfoSync().windowHeight,
			//YuYue_UserName: wx.getStorageSync('PhoneNum'),
			YuYue_UserPhone: wx.getStorageSync("PhoneNum"),
			hasPhoneNum:
				(wx.getStorageSync("PhoneNum") || "") != "",
		});

		request.MainGetRequest(
			"/Page/GF_index",
			{},
			function (res) {
				_this.setData({
					pageData: res.data,
				});
			}
		);


		// if (app.appIsOnloadCallback == null) {
		if (app.globalData.appIsOnload == false) {
			app.appIsOnloadCallback = () => {
				//request.getRequest(
				//	"/Page/GF_index",
				//	{},
				//	function (res) {
				//		_this.setData({
				//			pageData: res.data,
				//		});
				//	}
				//);

				let data = {
					ProjectGID: this.data
						.ProjectCommunity_Gid,
				};
				request.postRequest(
					"/Saler/SalerList",
					data,
					function (res) {
						let _SalerList = [
							{
								id: 0,
								usercode: 0,
								username:
									"未选择",
								userphone: "",
							},
							...res.Data,
						];

						_this.setData({
							SalerList: _SalerList,
						});
					}
				);
			};
		} else {
			//request.getRequest("/Page/GF_index", {}, function (
			//	res
			//) {
			//	_this.setData({
			//		pageData: res.data,
			//	});
			//});
			let data = {
				ProjectGID: this.data.ProjectCommunity_Gid,
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
		}
		_this.AddUserWXLogin();
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
	onShareAppMessage: function (res) {
		//console.log("onShareAppMessage",res);
		var _this=this;

		return {
			title: "广佛新世界",
			imageUrl: _this.data.pageData.ShareImg,
		};
	},
	img_tap: function (e) {
		if (e.currentTarget.dataset.code == "miniProgram") {
			wx.navigateToMiniProgram({
				appId: "wx9cd4e05193235b40",
				envVersion: "release",
				success(res) {
					// 打开成功
					console.log(1);
				},
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

		if ((wx.getStorageSync("PhoneNum") || "") == "") {
			let _this = this;
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

		var that = this;


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

					that.setData({
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
	vr_tap: function (e) {
		let vrurl = e.currentTarget.dataset.vrurl;
		wx.navigateTo({
			url: "../vr/vr?vrurl=" + vrurl,
		});
	},
	map_tap: function (e) {
		var lat = 23.101425,
			lng = 113.054511,
			vname = "广佛之心展览馆",
			vaddress =
				"广东省佛山市南海区高尔夫路333号大浩湖度假区";
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
						// console.log(item.id, "pause", item.bottom, (item.bottom - item.top) / 2, item.top, _this.data.windowHeight - (item.bottom - item.top) / 2);
					} else {
						item.context.play();
						// console.log(item.id, "play", item.bottom, (item.bottom - item.top) / 2, item.top, _this.data.windowHeight - (item.bottom - item.top) / 2);
					}
				});
			}
		);
		query.exec();
	},
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


});
