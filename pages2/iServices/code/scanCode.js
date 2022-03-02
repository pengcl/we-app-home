// pages2/iServices/code/scanCode.js
import md5 from '../../../utils/md5.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: "",
    phone:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    var phone = wx.getStorageSync("PhoneNum");
    if (phone == "") {
      wx.navigateTo({
				url: "../../permission/phone/phone",
      });
      return;
    }
    let data = {
      phone: phone,
    }
    var timestamp = Date.parse(new Date());   
    console.log("aafdsafdsfAAA",phone+"KDPMExchange"+timestamp)
    var vcode = md5(phone+"KDPMExchange"+timestamp);
    console.log("aafdsafdsf",vcode)
    wx.scanCode({
      onlyFromCamera: true,
      success (res) {
        //console.log("aafdsafdsf44",res)
        if (res.errMsg=="scanCode:ok")
        {
          var result=res.result;
          if (result!="")
          {
            //console.log("aafdsafdsf3",result.indexOf("https"))
            if (result.indexOf("https")>=0)
            {
              //console.log("aafdsafdsf6","111");
              if (result.indexOf("?")>=0)
              {
                //console.log("aafdsafdsf2","111")
                _this.setData({
                  url: result + "&userphone=" + phone +"&token=" + vcode
                })
              }
              else
              {
                _this.setData({
                  url: result + "?userphone=" + phone +"&token=" + vcode
                })
              }
            }
            else
            {
              wx.redirectTo({
                url: "../index/index",
              });
            }
          }
          else
          {
            wx.redirectTo({
              url: "../index/index",
            });
          }
        }
        else
        {
          wx.redirectTo({
            url: "../index/index",
          });

        }
      },
      fail(res)
      {
        wx.redirectTo({
          url: "../index/index",
        });
      }
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