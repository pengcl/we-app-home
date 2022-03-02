// pages2/permission/phone/phone.js
import request from "../../../utils/request.js";
var app = getApp();

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		gourl: "../../index/index",
		domain: "https://xyclientnew.ai-fox.net/",
		statusBarHeight: 0,
		log: "",
		protocols: [],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let _this = this;
		this.setData({
			domain: app.globalData.domain,
			statusBarHeight: app.globalData.statusBarHeight,
		});

		// if (options.url!=null) {
		//    this.setData({
		//      gourl:"../../../"+ options.url
		//    })
		// }
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {},

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
	onShareAppMessage: function () {},
	getPhoneNumber: function (e) {
		let _this = this;
		console.log("getPhoneNumber", e, _this.data.protocols.length);

		if (_this.data.protocols.length < 2) {
			wx.showModal({
				title: "提示",
				content: "请阅读并同意相关协议",
				success(res) {},
			});

			return;
		}

		var comecode = wx.getStorageSync("comecode");

		wx.login({
			success: function (res) {
				if (res.code != "") {
					let data = {
						code: res.code,
						iv: e.detail.iv,
						encryptedData:
							e.detail.encryptedData,
						comecode: comecode,
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
									res.Data
										.phoneNumber
								);
								wx.setStorageSync(
									"PhoneNumSign",
									res.Data
										.PhoneNumSignText
								);
								let wxAgreementVersion = wx.getStorageSync(
									"wxAgreementVersion"
								);
								wx.setStorage({
									key:
										"userAgreementVersion",
									data: wxAgreementVersion,
								});
								//wx.navigateBack();
								wx.navigateTo({
									url: "../../../pages2/activity/activity20211122/main?isp=1",
									//url: "regok",
								});
							}
						},
						function (e) {
							wx.showToast({
								title:
									"授权失败，请稍后重试",
								icon: "none",
								duration: 2000,
							});
						}
					);
				} else {
				}
			},
		});
	},
	checkboxChange(e) {
		console.log(
			"checkbox发生change事件，携带value值为：",
			e.detail.value
		);

		this.setData({
			protocols: e.detail.value,
		});
		// const items = this.data.items
		// const values = e.detail.value
		// for (let i = 0, lenI = items.length; i < lenI; ++i) {
		//   items[i].checked = false

		//   for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
		//     if (items[i].value === values[j]) {
		//       items[i].checked = true
		//       break
		//     }
		//   }
		// }

		// this.setData({
		//  // items
		// })
	},
	UserAgreement_tap: function (e) {
		wx.navigateTo({
			url: "../Agreement/User",
		});
	},
	PrivacyAgreement_tap: function (e) {
		wx.navigateTo({
			url: "../Agreement/Privacy",
		});
	},
});
