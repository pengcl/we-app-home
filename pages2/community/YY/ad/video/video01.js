// pages2/community/YY/ad/video/video01.js
import util from "../../../../../utils/util.js";
import request from "../../../../../utils/request";

var app = getApp();

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		hasPhoneNum: false,
		domain: "https://xyclientnew.ai-fox.net/",
		ProjectCommunity_Gid: "152E7F4B-55F0-4E2C-BBD3-684AF00CB499",
		windowHeight: 0,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var _this = this;
		if (app.globalData.appIsOnload == false) {
			app.appIsOnloadCallback = () => {
				request.getRequest(
					"/Page/yy_ad_video01",
					{},
					function (res) {
						_this.setData({
							pageData: res.data,
						});
					}
				);
			};
		} else {
			request.getRequest("/Page/yy_ad_video01", {}, function (
				res
			) {
				_this.setData({
					pageData: res.data,
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
			hasPhoneNum:
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
		var _this = this;

		return {
			title: "白云山下，邂逅更好的新世界",
			imageUrl: _this.data.pageData.ShareImg,
		};
	},
});
