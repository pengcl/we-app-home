import request from '../../utils/request';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
   data: {
       url_original:"",
       url: "",
       title:"",
       projectgid:""
     },

     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function (options) {
       //console.log("options.url", options.url)
       this.setData({
        url_original:this.options.url,
         url: unescape(this.options.url),
         title:this.options.title,
         projectgid:this.options.projectgid
       })
       
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
    this.AddUserWXLogin();
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
    var _this=this;
    var ProjectGID = _this.data.projectgid;
    var url = _this.data.url_original;
    var title = _this.data.title;
		return {
			title: "新赏家精彩分享",
      //imageUrl: _this.data.pageData.ShareImg,
      path: '/pages/article/view?url=' + url + '&projectgid=' + ProjectGID + '&title=' + title, // 默认是当前页面，必须是以‘/’开头的完整路径
		};
  },
  AddUserWXLogin: function () {
		var ProjectGID = this.data.projectgid;
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
			//console.log("res111", res);
		});
	}
})