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
		adList:[]
		// adList: [],
		// projList: [],
		// adModal: {},
		// activity01Num:0
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

		//if (app.appIsOnloadCallback == null) {
		if (app.globalData.appIsOnload == false) {
			app.appIsOnloadCallback = () => {
				request.getRequest(
					"/Page/Index_index", {},
					function (res) {
						_this.setData({
							pageData: res.data,
						});
					}
				);
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
			request.getRequest("/Page/Index_index", {}, function (
				res
			) {
				_this.setData({
					pageData: res.data,
				});
			});
			request.getRequest("/Page/ADList_Index", {},function (res) 
				{
					_this.setData({
						adList: res.data,
					});
				}
			);
		}
		//_this.AddUserWXLogin();
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},

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
			imageUrl: _this.data.pageData.ShareImg,
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

		if (e.currentTarget.dataset.code == "GF") {
			wx.navigateTo({
				url: "../community/GF/index/index",
			});
		}
		if (e.currentTarget.dataset.code == "KYW") {
			wx.navigateTo({
				url: "../community/KYW/index/index",
			});
		}
		if (e.currentTarget.dataset.code == "ZQ") {
			wx.navigateTo({
				url: "../community/ZQ/index/index",
			});
		}
		if (e.currentTarget.dataset.code == "QY") {
			wx.navigateTo({
				url: "../community/QY/index/index",
			});
		}
		if (e.currentTarget.dataset.code == "ZC") {
			wx.navigateTo({
				url: "../community/ZC/index/index",
			});
		}
		if (e.currentTarget.dataset.code == "HZ") {
			wx.navigateTo({
				url: "../community/HZ/index/index",
			});
		}
		if (e.currentTarget.dataset.code == "HX") {
			wx.navigateTo({
				url: "../community/HX/index/index",
			});
		}
		if (e.currentTarget.dataset.code == "TG") {
			wx.navigateTo({
				url: "../community/TG/index/index",
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
			url: "../../pages/im/imlist/imlist",
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
		var ProjectGID = "96328AF6-05F8-4492-8E0F-B7DABA179635";
		wx.navigateTo({
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
			url: "/pages2/activity/activity20210321/main/main",
			//url:"/pages2/activity/activity20201114/Redirect/Redirect",
		});
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
});