
import request from '../../../utils/request';
var app = getApp();
var vdomain = app.globalData.domain;
Page({

  data: {
    vPhoneNum :'',
    hasPhoneNum: false,
    mainImg:  vdomain +'image/activity/activityPorsche/01.jpg',
    shareImg: vdomain +'image/activity/activityPorsche/share.jpg',
    detailList: [
      {
        id: 2,
        img: vdomain + "image/activity/activityPorsche/02.jpg"
      },
      {
        id: 3,
        img: vdomain + "image/activity/activityPorsche/03.jpg"
      },
      {
        id: 4,
        img: vdomain + "image/activity/activityPorsche/04.jpg"
      }
    ]

  },
    
  onLoad: function (options) {
    let that = this;
    that.setData({
        vPhoneNum: wx.getStorageSync('PhoneNum'),
        hasPhoneNum:
				(wx.getStorageSync("PhoneNum") || "") != "",
      }
    );
    that.AddUserWXLogin();
  },

  redir_tap: function (e) {
    let _this = this;
    var hasPhoneNum = _this.data.hasPhoneNum;
    if(!hasPhoneNum){
      if (e.detail.errMsg === "getPhoneNumber:ok") {
        wx.login({
          success: function (res) {
          if (res.code != "") {
            let data = {
                code: res.code,
                iv: e.detail.iv,
                encryptedData:e.detail.encryptedData,
                comecode: wx.getStorageSync("comecode"),
              };
              request.postRequest(
                "/User/PhoneNumberInfo",
                data,
                function (res) {
                  if ( res.StatusCode ==200) {
                    wx.setStorageSync("PhoneNum",res.Data.phoneNumber);
                    wx.setStorageSync("PhoneNumSign",res.Data.PhoneNumSignText);

                    _this.setData({
                      vPhoneNum :wx.getStorageSync('PhoneNum'),
                      hasPhoneNum: true,
                    });
                  }
                  _this.AddUserWXLogin();
                  //跳转到
                  wx.navigateTo({
                    url: 'h5',
                  });
                },
                function (e) {}
              );
            } 
            else {}
          },
          fail:function(res){
            wx.showToast({
              title: '授权手机号失败！',
              icon: 'none',
              duration: 1800
            });
            return;
          }
        });
      }else{
        wx.showToast({
          title: '请授权登录后进行查看！',
          icon: 'none',
          duration: 1800
        })
        return;
      }
    }
    else{
      wx.navigateTo({
        url: 'h5',
        });
    }
  },


	AddUserWXLogin: function () {
		//var ProjectGID = this.data.ProjectCommunity_Gid;
		var PhoneNum = wx.getStorageSync("PhoneNum");
		var comecode = wx.getStorageSync("comecode");
		
		let data1 = {
			nickname: "",
			avatarUrl: "",
			gender: "",
			province: "",
			city: "",
			country: "",
			comefrom: "PhoneNumberInfo",
			comecode: comecode,
			ProjectGID: '',
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

  onShow: function () {
    let that = this;
    that.setData({
        vPhoneNum: wx.getStorageSync('PhoneNum'),
      }
    );
    
  },

 

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let _this = this;
		return {
			title: "保时捷周年庆典",
			imageUrl: _this.data.shareImg,
		};
  }
})