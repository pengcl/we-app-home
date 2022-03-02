// pages/im/imselect/imselect.js
import request from "../../../utils/request";
const app = getApp();

var vdomain = app.globalData.domain;

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		icon1: vdomain + "image/icon1.jpg",
		icon2: vdomain + "image/icon2.png",
		icon3: vdomain + "image/icon3.png",
		icon4: vdomain + "image/icon4.png",
		icon5: vdomain + "image/icon5.png",
		ProjectGID: "",
		ListData: [],
	},
	imview_tap: function (e) {
		console.log("e1", e);
		var salercode = e.currentTarget.dataset.salercode;
		var salername = e.currentTarget.dataset.salername;
		var ProjectGID = this.data.ProjectGID;
		wx.navigateTo({
			url:
				"../imview/imview?ProjectGID=" +
				ProjectGID +
				"&SalerUserCode=" +
				salercode +
				"&salername=" +
				salername,
		});
	},
	phone_tap: function (e) {
		console.log("e1", e);
		var phone = e.currentTarget.dataset.phone;
		wx.makePhoneCall({
			phoneNumber: phone,
		});
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let _this = this;
		this.setData({
			domain: app.globalData.domain,
		});

		_this.setData({
			ProjectGID: options.ProjectGID,
		});

		_this.GetList();
	},

	GetList() {
		var that = this;
		var projectgid = this.data.ProjectGID;
		let data = {
			ProjectGID: projectgid,
		};
		if (typeof projectgid != "undefined") {
			request.postRequest(
				"/Saler/SalerList",
				data,
				function (res) {
					console.log("res", res);
					if (res.StatusCode == 200) {
						//console.log("ContextList1",res.Data);
						console.log("11");
						var ListData = res.Data;
						console.log(
							"ListData",
							ListData
						);
						that.setData({
							ListData: ListData,
						});
					}
				},
				err => {
					console.log(err);
				}
			);
		}
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
	nw_tap: function (e) {
		wx.redirectTo({
			url: "../../nw/index/index",
		});
	},
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
