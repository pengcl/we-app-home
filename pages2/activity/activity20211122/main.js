var app = getApp();
var vdomain = app.globalData.domain
import request from "../../../utils/request";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //img: '',
    btnSource : '',
    pageData: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      //img : vdomain + "image/activity/activity_TJ/TJ_Detail.jpg",
      btnSource : vdomain + "image/activity/activity20211122/Button.png"
    });

    request.getRequest(
      "/Page/activity20211122", {},
      function (res) {
        that.setData({
          pageData: res.data,
        });
        that.AddUserWXLogin();
      }
    );

    

    //if (options.isp=="1")
    //{
    //  that.checkpass();
    //}
  },

  banner_tap:function()
  {
      //this.checkpass();
      wx.navigateTo({
				url: "goto",
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

  },

  checkpass: function (e) {
    let that = this
    var phone = wx.getStorageSync("PhoneNum");
    if (phone == "") {
      //wx.showToast({
      //  title: '请授权手机号！',
      //  icon: 'none',
      //  duration: 1000
      //})
      wx.navigateTo({
				url: "../../permission/phone/phone",
      });
      //that.getPhoneNumber(e);
      return;
    }
    let data = {
      phone: phone,
    }
    request.postRequest("/TJ/TJEUserCheckPass",
      data,
      function (res) {
        //console.log("aafdsafa",res)
        if (res.StatusCode == 200) {
          //console.log("aafdsafa",res.Data);
          wx.navigateTo({
            url: "../../../../../../referral/tj/tj/index",
          });
        } else {
          wx.navigateTo({
            url: "reg",
          });
        }
      }, (err) => {
        wx.showToast({
          title: '网络异常，请稍后重试！',
          icon: 'none',
          duration: 2000
        })
      });
  },

  AddUserWXLogin: function () {
    //var ProjectGID = this.data.ProjectCommunity_Gid;
    var RegionGID="88888888-8888-8888-8888-888888888888";
		var PhoneNum = wx.getStorageSync("PhoneNum");
		var comecode = wx.getStorageSync("comecode");
		//console.log("ProjectGID", ProjectGID);
		let data1 = {
			nickname: "",
			avatarUrl: "",
			gender: "",
			province: "",
			city: "",
			country: "",
			comefrom: "activity20211122",
			comecode: comecode,
      ProjectGID: "",//ProjectGID,
      RegionGID:RegionGID,
			UserPhone: PhoneNum,
		};

		request.postRequest("/User/UserWXLogin", data1, function (res) {
			// if (res.StatusCode == 200) {
			//     let vpageUrl = that.data.pageUrl
			//     wx.redirectTo({
			//         url: vpageUrl,
			//     })
			// }
			//console.log("res111", res);
		});
	},
})