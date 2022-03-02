import request from "../../utils/request.js";
var app = getApp();
var vdomain = app.globalData.domain;

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		domain: vdomain,
		gotourl:"",
    comecode:'',
    UserInfo:[],
    PhoneNum:'',
    isshowgoto:false
	},

	/*
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
			let that=this;
      var scene = decodeURIComponent(options.scene);
      var t1 = decodeURIComponent(options.t);
      console.log("scene",scene);
      //let sid = scene.split("-")[0];
      //let pid = scene.split("-")[1];
      var t2 = Date.parse(new Date()); 
      var tp = t2-t1;
      console.log("t2",t2);
      console.log("t1",t1);
      if (tp<180000)
      {
        let comecode = scene;
        if (comecode==""||comecode=="undefined") comecode=wx.getStorageSync('comecode');
        console.log("comecode",comecode);
        this.setData({
          comecode:comecode,
          //pid:pid,
          //UserInfo: wx.getStorageSync('UserInfo'),
          PhoneNum: wx.getStorageSync('PhoneNum'),
        })
        wx.setStorageSync('comecode', comecode);
	    	if (app.globalData.appIsOnload) {
				    that.postdata1();
		    } else {
			    app.appIsOnloadCallback = () => {
				    that.postdata1();
			    }
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
		//let that=this;
		//if (app.globalData.appIsOnload) {
		//		that.postdata1();
		//} else {
		//	app.appIsOnloadCallback = () => {
		//		that.postdata1();
		//	}
		//}
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

	postdata1:function(){
    let that = this;
    //console.log("userInfo",wx.getStorageSync('UserInfo'));
    let data = {
      // "city": that.data.UserInfo.city,
      // "province": that.data.UserInfo.province,
      // "nickname": that.data.UserInfo.nickName,
      // "country": that.data.UserInfo.country,
      // "avatarUrl": that.data.UserInfo.avatarUrl,
      // "gender": that.data.UserInfo.gender,
      "UserPhone": that.data.PhoneNum,
      "comecode": that.data.comecode,
      "comefrom": "anchang"
    }
    //console.log("data",data);
    
    request.postRequest("/User/UserWXLoginAndDeCode", 
    data, 
    function (res) {
      //console.log("res1",res);
        let codetype=res.Data.CodeType;
        //console.log("codetype",codetype);

          if (res.Data.ProjectPath!="undefined")
          {
            if (res.Data.ProjectPath!=null)
            {
              //console.log("ProjectPath",res.Data.ProjectPath);
              var url = res.Data.ProjectPath;
              url = "/" + url;
              url = url.replace("//","/");
              //wx.redirectTo({
              //  url: url
							//});
							
							that.setData({
                gotourl:url,
                isshowgoto:true
							});
              
              wx.setStorageSync('comecode', '');
            }
            else
            {
              //wx.redirectTo({
              //  url: "/pages2/index/index"
							//});
							that.setData({
                gotourl:"/pages2/index/index",
                isshowgoto:true
              });
              
              wx.setStorageSync('comecode', '');
            }
          }
          else
          {
            //wx.redirectTo({
            //  url: "/pages2/index/index"
						//});
						that.setData({
              gotourl:"/pages2/index/index",
              isshowgoto:true
            });
            
            wx.setStorageSync('comecode', '');
          }
          //var projectgid = res.Data.ProjectID;
          //var SalerUserCode = res.Data.ZYGWID;
          //wx.navigateTo({
          //    url: "/pages/im/imview/imview?ProjectGID="+projectgid+"&//SalerUserCode=" + SalerUserCode
          //});
    }, (err) => {
      console.log(err);
    });

  },
	gotoTap:function()
  {
		let that = this;
    wx.navigateTo({
      url: that.data.gotourl,
    });
  },
});
