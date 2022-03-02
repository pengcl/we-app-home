
import request from '../../../utils/request'
var app = getApp();
var vdomain = app.globalData.domain;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailList: [
    {
      id: 1,
      img: vdomain + "image/activity/activity20210417/index/1.jpg"
    },
    {
      id: 2,
      img: vdomain + "image/activity/activity20210417/index/2.jpg"
    },
    {
      id: 3,
      img: vdomain + "image/activity/activity20210417/index/3.jpg"
    },
    {
      id: 4,
      img: vdomain + "image/activity/activity20210417/index/4.jpg"
    },
    {
      id:5,
      img: vdomain + "image/activity/activity20210417/index/5.jpg"
    },
    {
      id: 6,
      img: vdomain + "image/activity/activity20210417/index/6.jpg"
    },
    {
      id: 7,
      img: vdomain + "image/activity/activity20210417/index/7.jpg"
    },
    {
      id: 8,
      img: vdomain + "image/activity/activity20210417/index/8.jpg"
    },
    // {
    //   id: 9,
    //   img: vdomain + "image/activity/activity20210417/index/09.jpg"
    // },
  ],

    vUserName:'',
    vPhoneNum:'',
    vUserType:'',
    vVisitors:'',

    index :0,
    arrUserType: ['业主', '市场客户', '员工'],
    userTypeValue: '',
    icon6: vdomain + 'image/referral/icon9.png',

    shareImg: vdomain +'image/activity/activity20210417/share.jpg',


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
        vPhoneNum: wx.getStorageSync('PhoneNum'),
      }
    )
  },

  submit_tap : function(e){

    let that = this;
    let index = that.data.index;

    var vUserName= that.data.vUserName;
    var vPhoneNum= that.data.vPhoneNum;
    var vUserType= that.data.arrUserType[index];
    var vVisitors= that.data.vVisitors;

    if (vUserName == '') {
      wx.showToast({
        title: '请填写姓名！',
        icon: 'none',
        duration: 1800
      })
      return;
    }

    if (vPhoneNum == '') {
      wx.showToast({
        title: '请先授权手机号！',
        icon: 'none',
        duration: 1800
      })
      return;
    }

    var data = {
      cUserName: vUserName,
      phoneNum: vPhoneNum,
      userType: vUserType,
      visitors: vVisitors
    };

    request.postRequest('/Activity/ActivityPorsche',data,
    function (res) {
      if (res.StatusCode == 200) {
        wx.showToast({
          title: '登记成功！',
          icon: 'none',
          duration: 1800
        })
      } 
      else 
      {
        if (res.Data == 2){
          wx.showToast({
            title: '当前手机号已登记过！',
            icon: 'none',
            duration: 1800
          })
        }
        else if (res.Data == 0){
          wx.showToast({
            title: '登记失败！',
            icon: 'none',
            duration: 1800
          })
        }
      }
    },
     (err) => {
      wx.showToast({
        title: '网络异常，请稍后重试！',
        icon: 'none',
        duration: 2000
      })
    });


  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },

  bindUserName: function (e) {
    let value = e.detail.value
    let that = this
    that.setData({
      vUserName: value
    })
  },
  bindPhoneNum: function (e) {
    let value = e.detail.value
    let that = this
    that.setData({
      vPhoneNum: value
    })
  },
  bindUserType: function (e) {
    let value = e.detail.value
    let that = this
    that.setData({
      vUserType: value
    })
  },
  bindVisitors: function (e) {
    let value = e.detail.value
    let that = this
    that.setData({
      vVisitors: value
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
    let that = this;
    that.setData({
        vPhoneNum: wx.getStorageSync('PhoneNum'),
      }
    )
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
    let _this = this;
		return {
			title: "新世界美好生活+",
			imageUrl: _this.data.shareImg,
		};
  }
})