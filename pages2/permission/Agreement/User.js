// pages2/permission/Agreement/User.js
import request from "../../../utils/request.js";
var app = getApp();
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		Agreement: "",
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var _this = this;
		request.postRequest("/User/WxAgreementNewest", {}, function (
			res
		) {
			if (res.StatusCode === 200) {
				_this.setData({
					Agreement: res.Data.UserContent,
				});
			} else {
				wx.showToast({
					title: res.Info,
					icon: "none",
					duration: 4000,
					mask: true,
				});
			}
		});
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
});
