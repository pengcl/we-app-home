import jwt from "utils/jwt.js";
import util from "utils/util.js";
import info from "utils/Info.js";
const Mock = require("./utils/WxMock");
//import mockdata from 'mock/mockdata.js';

const Track = require("utils/Track.js");

//关闭所有log日志
//console.log = function () { }

App({
	onLoad: function (e) {
		// let _Options = wx.getLaunchOptionsSync();
		// wx.setStorageSync('scene', _Options.scene)
		// wx.setStorageSync('comecode', _Options.query.scene)
		//
		//
		// Track.Event.ManualTrack("APP", "onLoad", e, _Options)
	},
	onShow: function (e) {
		console.log("==============onShow===================");
		console.log(e);
		console.log("====================================");
		const updateManager = wx.getUpdateManager();

		updateManager.onCheckForUpdate(function (res) {
			// 请求完新版本信息的回调
			// console.log("请求完新版本信息的回调",res.hasUpdate)
		});

		updateManager.onUpdateReady(function () {
			wx.showModal({
				title: "更新提示",
				content: "新版本已经准备好，是否重启应用？",
				success: function (res) {
					if (res.confirm) {
						// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
						updateManager.applyUpdate();
					}
				},
			});
		});

		updateManager.onUpdateFailed(function () {
			// 新的版本下载失败
			wx.showModal({
				title: "更新提示",
				content: "新版本下载失败",
				showCancel: false,
			});
		});

		let _Options = wx.getLaunchOptionsSync();
		// wx.setStorageSync('scene', _Options.scene)
		// wx.setStorageSync('comecode', _Options.query.scene)

		wx.setStorageSync("scene", e.scene);
		wx.setStorageSync("comecode", e.query.scene);

		let that = this;
		// 登录 获取token
		jwt.GetToken(function () {
			// console.log("GetToken suss")
			var PhoneNum = wx.getStorageSync("PhoneNum");
			var PhoneNumSignText = wx.getStorageSync(
					"phoneNumSignText"
				);

			if(PhoneNum != null && PhoneNum !=""){
				
				info.getPhoneSystemInfo(PhoneNum);
				//info.getPhoneInfo(PhoneNum);
			}

			that.globalData.appIsOnload = true;
			if (that.appIsOnloadCallback) {
				//判断app.js中是否存在该回调函数，也就是是否存在改方法
				that.appIsOnloadCallback();
				// that.globalData.appIsOnload = false;

				that.appIsOnloadCallback = undefined;
			}

			if (
				PhoneNum == null ||
				PhoneNum == "" ||
				PhoneNumSignText == null ||
				PhoneNumSignText == ""
			) {
			}
		});
		Track.Event.ManualTrack("APP", "onShow", e, _Options);
	},
	onLaunch: function () {
		let _Options = wx.getLaunchOptionsSync();
		//console.log("app onLaunch", wx.getLaunchOptionsSync());
		wx.setStorageSync("comecode", _Options.query.scene);
		wx.setStorageSync("scene", _Options.scene);

		Track.App.init();

		wx.getLocation({
			type: "wgs84",
			success(res) {
				console.log(3, res);
			},
		});

		wx.getSystemInfo({
			success: res => {
				this.globalData.statusBarHeight =
					res.statusBarHeight;
				this.globalData.navBarHeight =
					44 + res.statusBarHeight;

				this.globalData.StatusBar = res.statusBarHeight;
				let custom = wx.getMenuButtonBoundingClientRect();
				if (custom.height == 0) {
					custom = {
						bottom: 80,
						height: 32,
						width: 88,
						left: 281,
						right: 369,
						top: 48,
					};
				}
				this.globalData.Custom = custom;
				this.globalData.CustomBar =
					custom.bottom +
					custom.top -
					res.statusBarHeight;
			},
		});

		Track.Event.ManualTrack("APP", "onLaunch", _Options);
	},
	globalData: {
		securityKey: "dd%88*377f6df$$FdddFF33fssDG^!3",
		domain: "https://xyclientnew.ai-fox.net/", //图片资料站点
		userInfo: {},
		adModalShow: true,
		statusBarHeight: 0,
		navBarHeight: 0,
		Log_DEBUG: true,
		StatusBar: 0, //color ui
		Custom: "", //color ui
		CustomBar: 0, //color ui
		appIsOnload: false,

		//UserInfoStatus: 0, //0 未请求; 1 已拒绝; 2 已同意
	},
});
