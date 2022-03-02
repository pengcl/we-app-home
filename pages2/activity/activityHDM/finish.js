import request from '../../../utils/request'

var app = getApp();
var vdomain = app.globalData.domain;

Page({

  data: {
    bgimage: '',
    actvCode :'',
    markCode:'',
    markShow:false,
  },

  onLoad: function (options) {
    
    var that = this;

    var phoneNum = wx.getStorageSync("PhoneNum");
    var actvCode = options.actvCode;
    var projectgid = options.projectgid;
    //var actvType = options.actvType;
    
    if(options.redirectType == "活动页"){
      this.setRemarkCode(phoneNum,actvCode,projectgid);
    }

    //背景图
    var dt = {actvCode :actvCode};
    request.getRequest("/Activity/GetMarkImage",
    dt,
    function (res) {
        if (res.data.StatusCode == 200) {
        
        that.setData({
          bgimage : res.data.Data
        })
        }
        else{
          wx.showToast({
            title: '参数有误！',
            icon: 'none',
            duration: 2000
          })
        }
    }, 
    (err) => {
        wx.showToast({
          title: '网络异常，请稍后重试！',
          icon: 'none',
          duration: 2000
        })
      }
    );

  },

  setRemarkCode : function(phoneNum, vCode, projectGID){
    let that = this;

    //标识码
    var data = {
      phoneNum:phoneNum,
      projectGID:projectGID,
      actvCode:vCode
    };
    request.getRequest("/Activity/GetMarkCode",
    data,
    function (res) {
        if (res.data.StatusCode == 200) {
        
        that.setData({
          markShow :true,
          markCode : res.data.Data
        })
        }
        else{
          wx.showToast({
            title: '参数有误！',
            icon: 'none',
            duration: 2000
          })
        }
    }, 
    (err) => {
        wx.showToast({
          title: '网络异常，请稍后重试！',
          icon: 'none',
          duration: 2000
        })
      }
    );
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }
})