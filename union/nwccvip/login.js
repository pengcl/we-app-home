// union/nwccvip/login.js
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
		//npath:'',  //小程序path
		ntimestamp:'', //时间戳,毫秒
		ncomecode:'',//新赏家推广码
		phone:'',
    UserInfoStatus:false,
    unionId:''
	},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
		var nappid = _this.options.appid;
		//var npath = _this.options.path;
		//npath = unescape(npath);
		var ntimestamp = _this.options.timestamp;
		//var ncomecode = _this.options.comecode;
		var PhoneNum = wx.getStorageSync("PhoneNum");
		console.log("ntimestamp", ntimestamp);
		_this.setData({
			//domain: app.globalData.domain,
			statusBarHeight: app.globalData.statusBarHeight,
			nappId : nappid,
			//npath:npath,
			ntimestamp:ntimestamp,
			//ncomecode:ncomecode,
			phone:PhoneNum
		});
		if (ntimestamp=="")
		{
			wx.navigateTo({
			  url: "pages2/index/index",
		  })
		}
		else
		{
		  console.log("phone111", PhoneNum);
		  if (PhoneNum!="" && PhoneNum!="undefined")
		  {
			  console.log("phone333","11111111");
			  _this.redir_crm();
		  }
      else
      {
			//let url = "login?appid="+nappid+"&path="+npath+"&timestamp=" + ntimestamp + "&comecode=" + ncomecode
			//console.log("phone222",url);
      //wx.navigateTo({
			//  url: url,
			//})
			  wx.navigateTo({
			    url: "/pages2/permission/phone/phone",
		    })
		  }
		}

  },


  redir_crm:function(){
    let _this = this;
		let appid = 'crm';
		let path = 'https://tests.veevlink.com/custom/NWCLProject/h5/index.html';
		let timestamp = _this.data.ntimestamp;
		let comecode = _this.data.ncomecode;
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
    let data1 = {
			appid:appid,
			timestamp:timestamp,
			GoToWXPath:'',
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
		};

		request.postRequest("/User/UnionWXUserLogin", data1, function (res) {
			 if (res.StatusCode == 200) {
          console.log("res111", res);
          
					var wxopenid = res.Data.openid;
					var wxunionid = res.Data.unionid;
			
					if (wxunionid!=''){
						_this.setData({
              unionId : wxunionid,
            })
					}
       }
       else{
        console.log("rst", res);
       }
		});
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
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})