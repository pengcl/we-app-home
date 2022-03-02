import request from "../../../utils/request"
import util from '../../../utils/util'
var app = getApp();
var vdomain = app.globalData.domain

Page({
  data: {
    UserGID:'',
    bgimg: '',
    iconW: '',
    iconM: '',
    icon1: '',
    TJEUserGID:'',
    phonenum: '',
    phoneNumSignText: '',
    userName: '',
    sexType: 'M',
    date:'',
    startDate: "",
    endDate: "",
    prjtype: "",
    prjindex: 0,
    prjId: '',
    projectArray: [{
      ProjectGID: '',
      ProjectName: '请选择参观项目',
      GZ: ""
    }],
    viewGID:'',
    pid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    var pid = options.pid;
    //this.getProjectList(pid);

    var phone = wx.getStorageSync('PhoneNum');
    let phoneNumSign = ""
    let phoneNumSign1 = wx.getStorageSync('phoneNumSignText')
    let phoneNumSign2 = wx.getStorageSync('PhoneNumSign')
    if (phoneNumSign1 != "") {
      phoneNumSign = phoneNumSign1
    } else if (phoneNumSign2 != "") {
      phoneNumSign = phoneNumSign2
    }
    var nowDate = new Date()
    var vDate = util.formatDate(nowDate);
    
    
  
    if (app.globalData.appIsOnload == false) {
			app.appIsOnloadCallback = () => {
        that.getProjectList(pid);
        console.log("pid1",pid);
			};
		} else {
      that.getProjectList(pid);
      console.log("pid2",pid);
		}

    that.setData({
      bgimg: vdomain + "image/referral/invite_bg.png",
      icon1: vdomain + "image/referral/icon9.png",
      iconW: vdomain + '/image/referral/icon1.png',
      iconM: vdomain + '/image/referral/icon2.png',
      phonenum : phone,
      phoneNumSignText : phoneNumSign,
      date : vDate,
      startDate : vDate,
      TJEUserGID : options.gid,
      pid:options.pid,
      viewGID: 'UID: ' + options.gid.substring(options.gid.length-12)
    })

    // 获取用户GID
    //var value = options.UserGID;
    //that.getTJPhoneNum(value);

  },

  getProjectList :function(pid){
  // 绑定项目
  let that = this
  let data = {
    ProjectGID:pid
  }
  console.log("data111",data);
  var list = that.data.projectArray
  request.postRequest("/TJ/TJProjectTList",
    data,
    function (res) {
      if (res.StatusCode == 200) {
        that.setData({
          projectArray: list.concat(res.Data),
        })
      } else {
        wx.showToast({
          title: res.Data,
          icon: 'none',
          duration: 2000
        })
      }
    }, (err) => {
      wx.showToast({
        title: '网络异常，请稍后重试！',
        icon: 'none',
        duration: 2000
      })
    });

  },

  //获取（设置）推荐人手机
  // getTJPhoneNum : function(value)
  // {
  //   let that = this
  //   let data = {
  //     gid :value 
  //   }
  //   request.postRequest("TJ/TJEUserInfoByGID",
  //   data,
  //   function(res){
  //     if(res.startDate == "200"){
  //       let info = res.Data.UserInfo;
  //       that.setData({
  //         tjPhone : info.phoneNum
  //       })
  //     }
  //     else{
  //       wx.showToast({
  //         title: '获取推荐人信息有误',
  //         icon: 'none',
  //         duration: 2000
  //       })
  //     }
  //   }
  //   ,(err) => {
  //     wx.showToast({
  //       title: '网络异常，请稍后重试！',
  //       icon: 'none',
  //       duration: 2000
  //     })
  //   }
  //   )},

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  bindPrjTypeChange: function (e) {
    let index = e.detail.value
    let that = this
    that.setData({
      prjId: that.data.projectArray[index].ProjectGID,
      prjtype: that.data.projectArray[index].ProjectName,
      prjindex: index
      // rule: (that.data.projectArray[index].GZ == "" || that.data.projectArray[index].GZ == null) ? "暂无" : that.data.projectArray[index].GZ,
      // xzurl: that.data.projectArray[index].XZ
    })


    let data = {
      PhoneNum: that.data.phonenum,
      phoneNumSignText: that.data.phoneNumSignText, 

      ProjectGID: that.data.prjId,
      TJEUserGID: that.data.TJEUserGID
    }

    console.log("ddddd",data);
    //获取时间
    request.postRequest("/TJ/TJCUserTAddCheckAndGetData",
      data,
      function (res) {
        if (res.StatusCode == 200) {

          that.setData({
            endDate: res.Data.eday,
          })
        } else {
          wx.showToast({
            title: res.Data,
            icon: 'none',
            duration: 2000
          })
        }
      }, (err) => {
       
        wx.showToast({
          title: '网络异常，请稍后重试！',
          icon: 'none',
          duration: 2000
        })
      });
  },
  ChangeSex_tap: function (e) {
    let value = e.currentTarget.dataset.value;
    let that = this

    if (value == "M") {
      that.setData({
        sexType: 'M',
        iconM: vdomain + '/image/referral/icon2.png',
        iconW: vdomain + '/image/referral/icon1.png'
      })
    } else {
      that.setData({
        sexType: 'W',
        iconM: vdomain + '/image/referral/icon1.png',
        iconW: vdomain + '/image/referral/icon2.png'
      })
    }
  },
  getPhoneNumber: function (e) {
    let _this = this;
    var comecode = wx.getStorageSync("comecode");

    wx.login({
      success: function (res) {
        if (res.code != "") {
          let data = {
            code: res.code,
            iv: e.detail.iv,
            encryptedData: e.detail.encryptedData,
            comecode: comecode,
          };

          request.postRequest(
            "/User/PhoneNumberInfo",
            data,
            function (res) {
              if (
                res.StatusCode ==
                200
              ) {
                wx.setStorageSync(
                  "PhoneNum",
                  res.Data
                  .phoneNumber
                );
                wx.setStorageSync(
                  "PhoneNumSign",
                  res.Data
                  .PhoneNumSignText
                );
                let wxAgreementVersion = wx.getStorageSync(
                  "wxAgreementVersion"
                );
                wx.setStorage({
                  key: "userAgreementVersion",
                  data: wxAgreementVersion,
                });

                _this.setData({
                  phonenum: res.Data.phoneNumber
                })
              }
            },
            function (e) {
              wx.showToast({
                title: "授权失败，请稍后重试",
                icon: "none",
                duration: 2000,
              });
            }
          );
        } else {}
      },
    });
  },
  bindUserName: function (e) {
    let value = e.detail.value
    let that = this
    that.setData({
      userName: value
    })
  },
  invite_tap:function(e){
    let that = this;
   
    if(that.data.prjId.trim() =="")
    {
      wx.showToast({
        title: '请选择参观项目！',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if(that.data.userName.trim() =="")
    {
      wx.showToast({
        title: '请填写姓名！',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if(that.data.phonenum.trim() =="")
    {
      wx.showToast({
        title: '请授权手机号！',
        icon: 'none',
        duration: 2000
      })
      return;
    }


    let data ={
      TJEUserGID :that.data.TJEUserGID,
      username :that.data.userName,
      sex : that.data.sexType == 'M' ? '男' :'女',
      
      PhoneNum : that.data.phonenum,
      phoneNumSignText : that.data.phoneNumSignText,
      ProjectGID: that.data.prjId,

      remark :'',
      salerusercode:'',
      ScheduledTime:that.data.date,
      ScheduledRemark:'',
    };
    request.postRequest("/TJ/TJCUserTAdd",
      data,
      function(res) {
        if (res.StatusCode == 200){

          let gid = res.Data;
          let viewGID = that.data.viewGID;
          console.log("gid11",res);
          // wx.redirectTo({
          //   url: '../invite/finished?gid=' +gid,
          // })
          wx.navigateTo({
            url: '../invite/finished?gid=' +gid + '&viewGID=' +viewGID,
          })
        }
        else
        {
          wx.showToast({
            title: res.Data,
            icon: 'none',
            duration: 2000
          })
          return;
        }
      },
      (err) =>{
        wx.showToast({
          title: '网络异常，请稍后重试！',
          icon: 'none',
          duration: 2000
        })
        return;
      }
    )
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