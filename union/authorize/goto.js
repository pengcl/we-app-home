import request from "../../utils/request.js";
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
		UserInfoStatus:false,
		f:'',
	},

	/*
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let _this = this;
		var nappid = _this.options.appid;
		var npath = _this.options.path;
		npath = unescape(npath);
		var ntimestamp = _this.options.timestamp;
		var ncomecode = _this.options.comecode;
		var f = _this.options.f;
		var PhoneNum = wx.getStorageSync("PhoneNum");
		//console.log("ntimestamp", ntimestamp);
		_this.setData({
			domain: app.globalData.domain,
			statusBarHeight: app.globalData.statusBarHeight,
			nappId : nappid,
			npath:npath,
			ntimestamp:ntimestamp,
			ncomecode:ncomecode,
			phone:PhoneNum,
			f:f
		});
		_this.goto();
	},


	goto:function()
	{
		let _this = this;
		let nappid = _this.data.nappId;
		let npath = _this.data.npath;
		let ntimestamp = _this.data.ntimestamp;
		let ncomecode = _this.data.ncomecode;
		let f = _this.data.f;
		var PhoneNum = wx.getStorageSync("PhoneNum");
		if (ntimestamp=="")
		{
			wx.navigateTo({
			  url: "pages2/index/index",
		  })
		}
		else
		{
		//console.log("phone111", PhoneNum);
		if (PhoneNum!="" && PhoneNum!="undefined")
		{
			//console.log("phone333","11111111");
			_this.UnionWXUserLogin();
		}
    else
    {
			//let url = "login?appid="+nappid+"&path="+npath+"&timestamp=" + ntimestamp + "&comecode=" + ncomecode
			//console.log("phone222",url);
      //wx.navigateTo({
			//  url: url,
			//})
			wx.navigateTo({
				//url: "/pages2/permission/phone/phone",
				url: "/union/authorize/gotologin?appid="+nappid+"&path="+npath+"&timestamp=" + ntimestamp + "&comecode=" + ncomecode + "&f=" + f,
		  })
		}
		}
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
				
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
	onShareAppMessage: function () {},

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
		console.log("UserInfo11",UserInfo);
		if (UserInfo!=null)
		{
			nickname = UserInfo.nickName;
		  avatarUrl = UserInfo.avatarUrl;
		 	gender = UserInfo.gender;
		  city = UserInfo.city;
		  country = UserInfo.country;
		  language = UserInfo.language;
			province = UserInfo.province;
			console.log("UserInfo11",language);
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
			fromsign:f,
		};

		request.postRequest("/User/UnionWXUserLogin", data1, function (res) {
			 if (res.StatusCode == 200) {
				  console.log("res111", res);
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
          console.log("wxappid1", wxappid);
					if (wxappid!='' && wxpath !="")
					{
							_this.GotoMiniProgram(wxappid,wxpath,wxphone,wxsignature,wxopenid,wxunionid,wxtimestamp,wxprovince,wxnickname,wxavatarUrl,wxgender,wxcity,wxcountry);
					}
			 }
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
	
	GotoIndex_tap:function(e){
		wx.navigateTo({
			url: "/pages2/index/index",
		})
	},
	
	GotoNext_tap:function(e){
		this.goto();
	}
});
