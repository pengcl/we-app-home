import util from "../../../../utils/util.js";
import request from "../../../../utils/request";

var app = getApp();
var vdomain = app.globalData.domain
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		domain: "https://xyclientnew.ai-fox.net/",
		windowHeight: 0,
		pageData: [],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let _this = this;
		this.setData({
			domain: app.globalData.domain,
			windowHeight: wx.getSystemInfoSync().windowHeight,
		});

		if (app.globalData.appIsOnload == false) {
			app.appIsOnloadCallback = () => {
				request.getRequest(
					"/Page/activity02_main", {},
					function (res) {
						_this.setData({
							pageData: res.data,
						});
					}
				);
			};
		} else {
			request.getRequest(
				"/Page/activity02_main", {},
				function (res) {
					_this.setData({
						pageData: res.data,
					});
				}
			);
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

		request.postRequest("/User/UserWXLogin", data1, function (
			res
		) {});
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
	onShareAppMessage: function () {
		return {
			title: "买家至上 88买好房 生活不打烊",
			path: 'pages2/activity/activity02/main/main',
			imageUrl: vdomain + 'image/activity/activity02/share1.jpg',
		}
	},
	onPageScroll: function (e) {
		let _this = this;
		const query = wx.createSelectorQuery();

		query.selectAll(".video").fields({
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
					} else {
						item.context.play();
					}
				});
			}
		);
		query.exec();
	},

	image_tap: function (e) {
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
});