import request from "../../../utils/request";
let app = getApp();
Page({
	data: {
		domain: app.globalData.domain,
		contentInfo: "",
		info: {},
	},
	onLoad: function (options) {
		let _this = this;
		let data = {
			ID: options.id,
		};
		if (app.globalData.appIsOnload) {
			request.getRequest(
				"/nw/nwDetail",
				data,
				function (res) {
					if (res.data.StatusCode == 200) {
						let vcontent =
							res.data.Data
								.contentInfo;
						// vcontent = vcontent.replace(/\<img/g, '<img style="width:100%;height:auto;display:block" ').replace(/<br\/>/g, '<br>')
						_this.setData({
							info: res.data.Data,
							contentInfo: vcontent,
						});
					} else {
						wx.showToast({
							title:
								"网络异常，请稍后重试！",
							icon: "none",
							duration: 1000,
						});
					}
				},
				err => {
					console.log(err);
				}
			);
		} else {
			app.appIsOnloadCallback = () => {
				request.getRequest(
					"/nw/nwDetail",
					data,
					function (res) {
						if (
							res.data.StatusCode ==
							200
						) {
							let vcontent =
								res.data.Data
									.contentInfo;
							// vcontent = vcontent.replace(/\<img/g, '<img style="width:100%;height:auto;display:block" ').replace(/<br\/>/g, '<br>')
							_this.setData({
								info:
									res.data
										.Data,
								contentInfo: vcontent,
							});
						} else {
							wx.showToast({
								title:
									"网络异常，请稍后重试！",
								icon: "none",
								duration: 1000,
							});
						}
					},
					err => {
						console.log(err);
					}
				);
			};
		}
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
			url: "../../im/imlist/imlist",
		});
	},
	nw_tap: function (e) {},
	my_tap: function (e) {
		wx.redirectTo({
			url: "../../my/main/main",
		});
	},
	benefit12_tap: function (e) {
		wx.navigateTo({
			url: "/pages2/activity/activity01/pay/main",
		});
	},
	benefit_tap: function (e) {
		wx.navigateTo({
		url: "/pages2/activity/activity20200919/main/main",
		});
	},
});
