// pages/share/index.js


import request from '../../utils/request';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain: '',
    comecode:'',
    //pid:'',
    UserInfo:[],
    PhoneNum:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    var scene = decodeURIComponent(options.scene);
    console.log("scene",scene);
    //let sid = scene.split("-")[0];
    //let pid = scene.split("-")[1];
    let comecode = scene;
    if (comecode==""||comecode=="undefined") comecode=wx.getStorageSync('comecode');
    console.log("comecode",comecode);
    this.setData({
      comecode:comecode,
      //pid:pid,
      UserInfo: wx.getStorageSync('UserInfo'),
      PhoneNum: wx.getStorageSync('PhoneNum'),
    })
    
    wx.setStorageSync('comecode', comecode);

    if (comecode=='202111081650391716')
    {
      wx.navigateTo({
        url: "/pages2/community/TG/index/index?scene=202111081650391716"
      });
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
    let that = this;
    var phonenum = wx.getStorageSync('PhoneNum');
    console.log("phonenum",phonenum);
    if (phonenum==""||phonenum=="undefined")
    {
      wx.navigateTo({
        url: "/pages2/permission/phone/phone"
      });
    }
    else
    {
      
      if (app.globalData.appIsOnload) {
        that.postdata1();
      } else {
        app.appIsOnloadCallback = () => {
          that.postdata1();
        }
      }
    }
},

postdata1:function(){
  let that = this;
  console.log("userInfo",wx.getStorageSync('UserInfo'));
  let data = {
    // "city": that.data.UserInfo.city,
    // "province": that.data.UserInfo.province,
    // "nickname": that.data.UserInfo.nickName,
    // "country": that.data.UserInfo.country,
    // "avatarUrl": that.data.UserInfo.avatarUrl,
    // "gender": that.data.UserInfo.gender,
    "UserPhone": that.data.PhoneNum,
    "comecode": that.data.comecode,
    "comefrom": "share_index"
  }
  console.log("dataAAA",data);
  
  request.postRequest("/User/UserWXLoginAndDeCode", 
  data, 
  function (res) {
    //console.log("res1",res);
      //let codetype=res.Data.CodeType;
      console.log("res112233",res);
        let RegionGID = res.Data.RegionGID;
        if (RegionGID!="undefined")
        {
          if (RegionGID!=null)
          {
            console.log("RegionGID111",RegionGID);
            wx.redirectTo({
              url: "/pages2/index/index?RegionGid=" + RegionGID
            });
          }
          else
          {
            wx.redirectTo({
              url: "/pages2/index/index"
            });
          }
        }
        else
        {
          wx.redirectTo({
            url: "/pages2/index/index"
          });
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