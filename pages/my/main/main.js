import request from "../../../utils/request";
const app = getApp();
var vdomain = app.globalData.domain;
Page({
	data: {
		domain: vdomain,
		userInfo: app.globalData.userInfo,
		icon: vdomain + "image/icon6.png",
		userPhone: "",
		nickName: "",
		bg1: vdomain + "image/bg3.png",
		bg2: vdomain + "image/bg4.png",
		banner: vdomain + "image/referral/main7.jpg",
		tjIsValid: false
	},
	onLoad: function (options) {
		let that = this;
		let vUserInfo = wx.getStorageSync("UserInfo");
		let vPhone = wx.getStorageSync("PhoneNum");
		if (vPhone != null && vPhone != "") {
			vPhone =
				vPhone.substring(0, 3) +
				"****" +
				vPhone.substring(7);
		}
		let nickName = vUserInfo.nickName;
		// if (nickName.length > 8) {
		//   nickName = nickName.substring(0, 8) + "..."
		// }
		that.setData({
			userInfo: vUserInfo,
			userPhone: vPhone,
			nickName: nickName,
		});

		let data = {}

		request.getRequest("/Activity/TJIsValid",
			data,
			function (res) {
				if (res.data.StatusCode == 200) {
					if (res.data.Data) {
						that.setData({
							tjIsValid: true
						})
					}
				} else {
					// wx.showToast({
					// 	title: '网络异常，请稍后重试！',
					// 	icon: 'none',
					// 	duration: 2000
					// })
				}
			}, (err) => {
				// wx.showToast({
				// 	title: '网络异常，请稍后重试！',
				// 	icon: 'none',
				// 	duration: 2000
				// })
			});

	},
	onReady: function () {},
	onShow: function () {},
	onHide: function () {},
	onUnload: function () {},
	onPullDownRefresh: function () {},
	onReachBottom: function () {},
	onShareAppMessage: function () {},
	xinyunjia_tap: function (e) {
		wx.redirectTo({
			url: "../../../pages2/index/index",
		});
	},
	im_tap: function (e) {
		wx.redirectTo({
			// url: "../../im/imlist/imlist",
			url: "../../../pages2/iServices/index/index",
		});
	},
	nw_tap: function (e) {
		wx.redirectTo({
			url: "../../nw/index/index",
		});
	},
	my_tap: function (e) {
		// wx.navigateTo({
		//   url: '../../my/main/main',
		// })
	},
	benefit12_tap: function (e) {
		wx.navigateTo({
			url: "/pages2/activity/activity01/pay/main",
		});
	},
	benefit_tap: function (e) {
		wx.navigateTo({
			url: "/pages2/activity/activity20220126/main/main",
		});
	},
	myBook: function (e) {
		wx.navigateTo({
			url: "../myBook/myBook",
		});
	},
	myCollect: function (e) {
		wx.navigateTo({
			url: "../myCollect/myCollect",
		});
	},
	viewHis: function (e) {
		wx.navigateTo({
			url: "../viewHis/viewHis",
		});
	},
	copyText: function (e) {
		console.log(e);
		wx.setClipboardData({
			data: e.currentTarget.dataset.text,
			success: function (res) {
				wx.getClipboardData({
					success: function (res) {
						wx.showToast({
							title: "复制成功",
						});
					},
				});
			},
		});
	},
	activity_tap: function () {
		wx.navigateTo({
			url: "../../../pages2/activity/activity01/pay/main",
		});
	},
	myCard: function () {
		wx: wx.showToast({
			title: "即将开放，敬请期待",
			icon: "none",
			duration: 1000,
			mask: true,
			success: function (res) {},
		});
	},
	myPoint: function () {
		wx: wx.showToast({
			title: "即将开放，敬请期待",
			icon: "none",
			duration: 1000,
			mask: true,
			success: function (res) {},
		});
	},
	mytj_tap: function (e) {
		wx.showLoading({
			title: '加载中...',
		})
		var phonenum = wx.getStorageSync('PhoneNum')
		let phoneNumSignText = ""
		let phoneNumSign1 = wx.getStorageSync('phoneNumSignText')
		let phoneNumSign2 = wx.getStorageSync('PhoneNumSign')
		if (phoneNumSign1 != "") {
			phoneNumSignText = phoneNumSign1
		} else if (phoneNumSign2 != "") {
			phoneNumSignText = phoneNumSign2
		}
		if (phonenum != "") {
			let data = {
				PhoneNum: phonenum,
				phoneNumSignText: phoneNumSignText
			}
			request.postRequest("/TJ/TJEUserCheck",
				data,
				function (res) {
					if (res.StatusCode == 200) {
						let status = res.Data
						switch (status) {
							case "审核通过":
								wx.navigateTo({
									url: '../../../pages2/referral/tj/main/main',
								})
								break;
							case "正在审核":
								wx.navigateTo({
									url: '../../../pages2/referral/regist/audit/auditting',
								})
								break;
							case "可注册":
								wx.navigateTo({
									url: '../../../pages2/referral/regist/main/main',
								})
								break;
						}
					} else {
						wx.hideLoading({
							success: (res) => {},
						})
						wx.showToast({
							title: res.data.Data,
							icon: 'none',
							duration: 2000
						})
					}
				}, (err) => {
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
	}
});