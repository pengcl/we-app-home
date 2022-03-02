// pages/im/imlist/imlist.js
import request from "../../../utils/request";
const app = getApp();

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		domain: app.globalData.domain,
		IMList: {},
		imlist_empty: {},
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		//console.log("im",res);
		let _this = this;
		this.setData({
			domain: app.globalData.domain,
		});

		//request.getRequest("/im/imlist", {}, function (res) {
		request.postRequest(
			"/WeChat/WeChatListData",
			{},
			function (res) {
				console.log("res", res);
				_this.setData({
					IMList: res.Data,
				});
			},
			err => {
				console.log(err);
			}
		);

		request.getRequest(
			"/Page/im_imlist_empty",
			{},
			function (res) {
				console.log("res", res);
				_this.setData({
					imlist_empty: res.data,
				});
			},
			err => {
				console.log(err);
			}
		);
	},
	imselect_tap: function (e) {
		let ProjectGID = e.currentTarget.dataset.guid;
		wx.navigateTo({
			url: "../imselect/imselect?ProjectGID=" + ProjectGID,
		});
	},
	imview_tap: function (e) {
		console.log("e1", e);
		let salercode = e.currentTarget.dataset.salercode;
		let ProjectGID = e.currentTarget.dataset.projectgid;
		wx.navigateTo({
			url:
				"../imview/imview?ProjectGID=" +
				ProjectGID +
				"&SalerUserCode=" +
				salercode,
		});
	},
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
			url: "/pages2/activity/activity20220126/main/main",
		});
	},
});
