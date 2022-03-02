import request from "../../../utils/request";
let app = getApp();

Page({
	data: {
		domain: app.globalData.domain,
		NWList: [
			{
				ID: 1,
				gid: "78e491f7-3577-405b-b1ad-6080c0aaa79d",
				isdel: false,
				addtime: "2020-04-13T00:00:00",
				imgurl: "/image/nw/K11/index1.png",
				title: "来K11文化学院，明星导师带你云游世界",
				contentInfo:
					"pages/course/course?ADTAG=NWC&origin=685",
				remark: null,
				ParentProjectGID: null,
				createTime: "2020-04-13",
				type: "K11",
			},
		],
		clickName: "",
	},
	onLoad: function (options) {
		let _this = this;
		this.setData({
			domain: app.globalData.domain,
		});

		if (app.globalData.appIsOnload) {
			request.getRequest(
				"/nw/nwlist",
				{},
				function (res) {
					if (res.data.StatusCode == 200) {
						_this.setData({
							NWList: res.data.Data,
						});
					} else {
						// wx.showToast({
						//   title: '网络异常，请稍后重试！',
						//   icon: 'none',
						//   duration: 1000
						// })
					}
				},
				err => {
					console.log(err);
				}
			);
		} else {
			app.appIsOnloadCallback = () => {
				request.getRequest(
					"/nw/nwlist",
					{},
					function (res) {
						if (res.data.StatusCode ==	200	) {
							_this.setData({
								NWList:	res.data.Data,
							});
						} else {
							// wx.showToast({
							//   title: '网络异常，请稍后重试！',
							//   icon: 'none',
							//   duration: 1000
							// })
						}
					},
					err => {
						console.log(err);
					}
				);
			};
		}
	},
	K11View_tap: function (e) {
		let path = e.currentTarget.dataset.content;
		let wxid=e.currentTarget.dataset.wxid;
		wx.navigateToMiniProgram({
			appId: wxid,
			path: path,
		});
	},
	nwview_tap: function (e) {
		let id = e.currentTarget.dataset.id;
		wx.navigateTo({
			url: "../view/view?id=" + id,
		});
	},
	h5view_tap: function (e) {
		let url = e.currentTarget.dataset.content;
		wx.navigateTo({
			url: "../view/h5view?url=" + escape(url),
		});
	},
	xinyunjia_tap: function (e) {
		wx.redirectTo({
			url: "../../../pages2/index/index",
		});
	},
	im_tap: function (e) {
		wx.redirectTo({
			//url: "../../im/imlist/imlist",
			url: "../../../pages2/iServices/index/index",
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
			url: "/pages2/activity/activity20220126/main/main",
		});
	},
});
