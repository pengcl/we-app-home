// pages/im/imview/imview.js
import request from "../../../utils/request";
const app = getApp();

var interval;

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		InputBottom: 0,
		ProjectGID: "",
		SalerUserCode: "",
		SalerUserName: "",
		UserInfo: [],
		MyContext: "",
		ContextList: [],
		ContextMaxID: 0,
		ContextListNew: [],
		PhoneNum: "",
		toView: "",
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;

		//wx.getStorage({
		//  key: "UserInfo",
		//  success:function(res){
		//    that.setData({
		//      UserInfo:res.data
		//    });
		//  }
		//})

		that.setData({
			ProjectGID: options.ProjectGID,
			SalerUserCode: options.SalerUserCode,
			SalerUserName: options.salername,
			UserInfo: wx.getStorageSync("UserInfo"),
			PhoneNum: wx.getStorageSync("PhoneNum"),
		});

		interval = setInterval(function () {
			that.GetContextList();
		}, 3000);
	},

	WeChatAdd: function (e) {
		var that = this;
		var projectgid = this.data.ProjectGID;
		var salerusercode = this.data.SalerUserCode;
		//console.log("projectgid",projectgid);
		let data = {
			projectgid: projectgid,
			salerusercode: salerusercode,
			nickname: that.data.UserInfo.nickName,
			userphone: that.data.PhoneNum,
			userpic: that.data.UserInfo.avatarUrl,
			context: that.data.MyContext,
		};
		if (typeof projectgid != "undefined") {
			request.postRequest(
				"/WeChat/WeChatAdd",
				data,
				function (res) {
					console.log("res", res);
					if (res.StatusCode == 200) {
						that.setData({
							MyContext: "",
						});
					}
				},
				err => {
					console.log(err);
				}
			);
		}
	},

	GetContextList() {
		var that = this;
		var projectgid = this.data.ProjectGID;
		var salerusercode = this.data.SalerUserCode;
		var OldMaxID = this.data.ContextMaxID;
		console.log("projectgid", projectgid);
		let data = {
			projectgid: projectgid,
			salerusercode: salerusercode,
			oldmaxid: OldMaxID,
		};
		if (typeof projectgid != "undefined") {
			request.postRequest(
				"/WeChat/WeChatData",
				data,
				function (res) {
					console.log("res", res);
					if (res.StatusCode == 200) {
						//console.log("ContextList1",res.Data);
						console.log("11");
						if (
							res.Data
								.WeChatInfoData !=
							null
						) {
							var ContextListNew =
								res.Data
									.WeChatInfoData;
							var ContextList =
								that.data
									.ContextList;
							var salerusername = "";
							var mid;
							if (
								ContextListNew.length >
								0
							) {
								salerusername =
									ContextListNew[0]
										.hfsalername;
								mid =
									res.Data
										.MaxID;
								//ContextList.push(ContextListNew[0]);
								ContextList = ContextList.concat(
									ContextListNew
								);
							}
							console.log(
								"ContextList",
								mid
							);
							that.setData({
								ContextListNew: ContextListNew,
								ContextList: ContextList,
								ContextMaxID: mid,
								SalerUserName: salerusername,
								toView:
									"item" +
									mid,
							});
						}
					}
				},
				err => {
					console.log(err);
				}
			);
		}
	},

	BindInputContext: function (e) {
		var MyContext = e.detail.value;
		this.setData({
			MyContext: MyContext,
		});
		//console.log("Context",Context);
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
	onHide: function () {
		clearInterval(interval);
	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {
		clearInterval(interval);
	},

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
