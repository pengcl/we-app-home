import request from "../../utils/request.js";
import UserInfo from '../../utils/UserInfo';
var app = getApp();

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		//gourl: "../../index/index",
		domain: "https://xyclientnew.ai-fox.net/",
		statusBarHeight: 0,
		log: "",
		protocols: [],
		nappId:'', //openapi的appid
		npath:'',  //小程序path
		ntimestamp:'', //时间戳,毫秒
		ncomecode:'',//新赏家推广码
		phone:'',
		//isUserInfo:0, //是否已获取UserInfo
		UserInfoStatus:false,
		f:"",
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let _this = this;
		var nappid = _this.options.appid;
		var npath = _this.options.path;
		npath = unescape(npath);
		var ntimestamp = _this.options.timestamp;
		var ncomecode = _this.options.comecode;
		var PhoneNum = wx.getStorageSync("PhoneNum");
		var f = _this.options.f;
		_this.setData({
			domain: app.globalData.domain,
			statusBarHeight: app.globalData.statusBarHeight,
			nappId : nappid,
			npath:npath,
			ntimestamp:ntimestamp,
			ncomecode:ncomecode,
			phone:PhoneNum,
			f:f,
			IsUserInfoStatus: (wx.getStorageSync('UserInfo') || "") != "",
		});
		//console.log("IsUserInfoStatus", _this.data.IsUserInfoStatus);
		//if (PhoneNum!="" && PhoneNum!="undefined")
		//{
		//	_this.UnionWXUserLogin();
		//}
		// if (options.url!=null) {
		//    this.setData({
		//      gourl:"../../../"+ options.url
		//    })
		// }
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
	},

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
	getPhoneNumber: function (e) {
		let _this = this;
		//console.log("getPhoneNumber", e, _this.data.protocols.length);

		if (_this.data.protocols.length < 2) {
			wx.showModal({
				title: "提示",
				content: "请阅读并同意相关协议",
				success(res) {},
			});

			return;
		}

		var comecode = wx.getStorageSync("comecode");

		wx.login({
			success: function (res) {
				if (res.code != "") {
					//console.log("res222", res);
					let data = {
						code: res.code,
						iv: e.detail.iv,
						encryptedData:
							e.detail.encryptedData,
						comecode: comecode,
					};
					//console.log("UserInfo1111","");
					request.postRequest(
						"/User/PhoneNumberInfo",
						data,
						function (res) {
							//console.log("res333", res);
							if (
								res.StatusCode ==
								200
							) {
								wx.setStorageSync(
									"PhoneNum",
									res.Data
										.phoneNumber
								);
								wx.setStorageSync(
									"PhoneNumSign",
									res.Data
										.PhoneNumSignText
								);
								let wxAgreementVersion = wx.getStorageSync(
									"wxAgreementVersion"
								);
								wx.setStorage({
									key:
										"userAgreementVersion",
									data: wxAgreementVersion,
								});
								
								//wx.navigateBack();
								//console.log("UserInfo3333","44");
								_this.UnionWXUserLogin();

							}
						},
						function (e) {
							wx.showToast({
								title:
									"授权失败，请稍后重试",
								icon: "none",
								duration: 2000,
							});
						}
					);
				} else {
				}
			},
		});
	},

	GotoMiniProgram: function (wxappid,path,phone,signature,openid,unionid,timestamp,province,nickname,avatarUrl,gender,city,country){
		wx.navigateToMiniProgram({
			appId: wxappid,
			path: path + "?phone=" + phone + "&signature=" + signature + "&openid=" + openid+ "&unionid=" + unionid+ "&timestamp=" + timestamp+ "&province=" + province+ "&city=" + city+ "&country=" + country+ "&nickname=" + nickname+ "&avatarUrl=" + avatarUrl+ "&gender=" + gender,
			extraData: {
				//foo: 'bar'
			},
			//envVersion: 'develop',
			envVersion: 'trial',
			success(res) {
				// 打开成功
			},
			fail(res){
				// 打开失败
			},
			complete(res){
				// 调用结束  不管成功还是失败都执行
			}
		})
	},


	GoBackMiniProgram_del: function (wxappid,path,phone,signature,wxopenid,wxunionid,timestamp,province,nickname,avatarUrl,gender,city,country){
		wx.navigateBackMiniProgram({
			extraData: {
				phone: phone,
				signature:signature,
				openid:wxopenid,
				opid:wxopenid,
				unionid:wxunionid,
				unid:wxunionid,
				timestamp:timestamp,
				province:province,
				city:city,
				country:country,
				nickname:nickname,
				avatarUrl:avatarUrl,
				gender:gender,
			},
			success(res) {
				// 打开成功
			},
			fail(res){
				// 打开失败
			},
			complete(res){
				// 调用结束  不管成功还是失败都执行
			}
		})
	},

	GotoMiniProgram: function (wxappid,path,phone,signature,openid,unionid,timestamp,province,nickname,avatarUrl,gender,city,country){
		console.log("GotoMiniProgram33","333");
		wx.navigateToMiniProgram({
			appId: wxappid,
			path: path + "?phone=" + phone + "&signature=" + signature + "&openid=" + openid+ "&unionid=" + unionid+ "&timestamp=" + timestamp+ "&province=" + province+ "&city=" + city+ "&country=" + country+ "&nickname=" + nickname+ "&avatarUrl=" + avatarUrl+ "&gender=" + gender,
			extraData: {
				//foo: 'bar'
			},
			//envVersion: 'develop',
			envVersion: 'trial',
			success(res) {
				// 打开成功
			},
			fail(res){
				// 打开失败
			},
			complete(res){
				// 调用结束  不管成功还是失败都执行
			}
		})
	},

	UnionWXUserLogin: function () {
		let _this = this;
		let appid = _this.data.nappId;
		let path = _this.data.npath;
		let timestamp = _this.data.ntimestamp;
		let comecode = _this.data.ncomecode;
		let f = _this.data.f;
		var PhoneNum = wx.getStorageSync("PhoneNum");
		var UserInfo = wx.getStorageSync("UserInfo");
		var nickname = "";
		var avatarUrl = "";
		var gender = "";
		var city = "";
		var country = "";
		var language = "";
		var province = "";
		console.log("UserInfo33",UserInfo);
		if (UserInfo!=null)
		{
			nickname = UserInfo.nickName;
		  avatarUrl = UserInfo.avatarUrl;
		 	gender = UserInfo.gender;
		  city = UserInfo.city;
		  country = UserInfo.country;
		  language = UserInfo.language;
			province = UserInfo.province;
			//console.log("UserInfo11",language);
		}
		//console.log("wxappid1", PhoneNum);
		
		let data1 = {
			appid:appid,
			timestamp:timestamp,
			GoToWXPath:path,
			//language:language,
			province:province,
			nickname:nickname,
			avatarUrl:avatarUrl,
			gender:gender,
			city:city,
			country:country,
			comefrom: "UnionWXUserLogin",
			comecode: comecode,
			ProjectGID: '',
			UserPhone: PhoneNum,
			TGID:"",
			RegionGID:"",
			CommunityGID:"",
			fromsign:'unionlogin|' + f
		};
    console.log("data888", data1);
		request.postRequest("/User/UnionWXUserLogin", data1, function (res) {
			 if (res.StatusCode == 200) {
				  console.log("res888", res);
					var wxappid = res.Data.wxappid;
					var wxpath = path;
					var wxphone = res.Data.phone;
					var wxsignature = res.Data.signature;
					var wxopenid = res.Data.openid;
					var wxunionid = res.Data.unionid;
					var wxtimestamp = res.Data.timestamp;
					var wxpath = res.Data.path;
					var wxprovince= res.Data.province;
					var wxnickname= res.Data.nickname;
					var wxavatarUrl= res.Data.avatarUrl;
					var wxgender= res.Data.gender;
					var wxcity= res.Data.city;
					var wxcountry= res.Data.country;
          console.log("wxappid888", wxappid);
					if (wxappid!='' && wxpath !="")
					{
						 console.log("wxpath888", wxpath);
							_this.GotoMiniProgram(wxappid,wxpath,wxphone,wxsignature,wxopenid,wxunionid,wxtimestamp,wxprovince,wxnickname,wxavatarUrl,wxgender,wxcity,wxcountry);
					}
			 }
		});
	},

	checkboxChange(e) {
		console.log(
			"checkbox发生change事件，携带value值为：",
			e.detail.value
		);

		this.setData({
			protocols: e.detail.value,
		});
		// const items = this.data.items
		// const values = e.detail.value
		// for (let i = 0, lenI = items.length; i < lenI; ++i) {
		//   items[i].checked = false

		//   for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
		//     if (items[i].value === values[j]) {
		//       items[i].checked = true
		//       break
		//     }
		//   }
		// }

		// this.setData({
		//  // items
		// })
	},
	UserAgreement_tap: function (e) {
		wx.navigateTo({
			url: "Agreement/User",
		});
	},
	PrivacyAgreement_tap: function (e) {
		wx.navigateTo({
			url: "Agreement/Privacy",
		});
	},


	UserInfo_tap: function (e) {

		//console.log("UserInfo_tap", this.data.needUserInfo);

		let _this = this;
		console.log(e);
		UserInfo.GetUserInfo(app, e,
			function (res) {
				_this.setData({
					IsUserInfoStatus: (wx.getStorageSync('UserInfo') || "") != ""
				})

				//var url = getCurrentPages()[getCurrentPages().length - 1];
				//console.log("url", url);
				//if (!_this.data.PhoneNumStatus) {
					///xxxxxxxxxxxxxxx
				//}
			},
			function (res) {
				_this.setData({
					IsUserInfoStatus: (wx.getStorageSync('UserInfo') || "") != ""
				})
				wx.showModal({
					title: '未授权',
					content: '为了不影响您的使用，请开启相应的权限哦~'
				});
			});


	},


});
