// pages/index/index.js
import request from "../../utils/request";

//index.js
//获取应用实例
const app = getApp();

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		domain: "https://xyclientnew.ai-fox.net/",
		info: {},
		areaData: ["华南", "华中"],
		areaIndex: 0,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let _this = this;
		this.setData({
			domain: app.globalData.domain,
		});

		request.getRequest("/index/info", {}, function (res) {
			_this.setData({
				info: res.Data,
			});
		});
	},
	//选区域
	areaData_Change: function (e) {
		this.setData({
			areaIndex: e.detail.value,
		});
	},
	comm_watch_tap: function (e) {
		let id = e.currentTarget.dataset.id;
		wx.navigateTo({
			url: "../community/detail/detail?id=" + id,
		});
	},
	interview_tap: function (e) {
		wx.navigateTo({
			url: "../interview/index/index",
		});
	},
	discount_tap: function (e) {
		wx.navigateTo({
			url: "../discount/index/index",
		});
	},
	calculator_tap: function (e) {
		wx.navigateTo({
			url: "../calculator/calculator",
		});
	},

	//tabbar

	xinyunjia_tap: function (e) {
		//  wx.navigateTo({
		//    url: '../im/imlist/imlist' + id,
		//  })
	},
	im_tap: function (e) {
		wx.navigateTo({
			url: "../im/imlist/imlist",
		});
	},
	nw_tap: function (e) {
		wx.navigateTo({
			url: "../nw/index/index",
		});
	},
	my_tap: function (e) {
		wx.navigateTo({
			url: "../my/main/main",
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
