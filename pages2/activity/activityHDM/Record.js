import request from '../../../utils/request'
import util from '../../../utils/util'
import UserInfo from '../../../utils/UserInfo';

var app = getApp();
var vdomain = app.globalData.domain

Page({
  
  data: {

    finished:false,
    maskDisplay: 'none',
    UserGID:'',
    iconW: '',
    iconM: '',
    icon1: '',

    phonenum: '',
    phoneNumSignText: '',
    userName: '',
    sexType: '',
    sexName: '',
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

    bgimg :'',
    showType:'',
    redirectType:'',
    redirectPath:'',
    code :'',
    groupName:'',
    groupID:'',
    AuthAvatar:'',
    // teamGID:'',
    // salerCode:'',
    nameItem: '',
    sexItem: '',
    projectItem :'',
    visitTimeItme:'',
    visitProjectItem: '',
    ZYGWItem: '',
    momeItem:'',
    
    salerindex: 0,
    salercode: "",
    salername: '',
    SalerList:[{
      username: '选择置业顾问',
      usercode: ''
    }],
    memo:'',
    markStage:'',

    UserInfoStatus: false,
    projName :'',

    // allPJ : [
    //   '96328AF6-05F8-4492-8E0F-B7DABA179635',
    //   '152E7F4B-55F0-4E2C-BBD3-684AF00CB499'
    // ]
  },

  onLoad: function (options) {
    let that = this
    var vCode =options.scene;

    var nowDate = new Date();
    var vDate = util.formatDate(nowDate);
    
    var userInfo = wx.getStorageSync('UserInfo');
    var phone = wx.getStorageSync('PhoneNum');
    var maskDisplay = 'flex';
    if (userInfo != "") {
      maskDisplay = 'none'
    }
  
    if (app.globalData.appIsOnload == false) {
			app.appIsOnloadCallback = () => {
        //that.getProjectList();
        that.getCodeActvItem(vCode)
			};
		} else {
      //that.getProjectList();
      that.getCodeActvItem(vCode)
    }
    
    
    that.setData({
      //bgimg: vdomain + "image/referral/invite_bg.png",
      icon1: vdomain + "image/referral/icon9.png",
      iconW: vdomain + '/image/referral/icon1.png',
      iconM: vdomain + '/image/referral/icon2.png',

      maskDisplay : maskDisplay,
      date : vDate,
      startDate : vDate,
      // markStage : vMarkStage,
      code : vCode
    })

    //缓存
    wx.setStorageSync('comecode', vCode)

    //放入客池
    that.AddUserWXLogin();
  },

  // 绑定项目
  getProjectList :function(){
  
  let that = this
  let data = {

  }
  
  var list = that.data.projectArray
  request.postRequest("/TJ/TJProjectList",
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

  //活动项数据
  getCodeActvItem :function(vCode)
  {
    let that = this
    var data = {Code:vCode};
    request.getRequest("/Activity/CodeActvItem",
    data,
    function (res) {
      if (res.data.StatusCode == 200) {
        that.setData({

          bgimg:res.data.Data.bgImage,
          groupName:res.data.Data.ReceptionGroupName,
          groupID:res.data.Data.ReceptionGroupGID,
          // teamGID:res.data.ReceptionTeamGID,
          // salerCode: res.data.ReceptionSalerCode,
          AuthAvatar:res.data.Data.AuthAvatar,
          redirectType: res.data.Data.RedirectType,
          redirectPath: res.data.Data.RedirectPath,
          showType : res.data.Data.ShowType,
          nameItem: res.data.Data.NameItem,
          sexItem: res.data.Data.SexItem,
          visitTimeItme: res.data.Data.VisitTimeItem,
          visitProjectItem: res.data.Data.VisitProjectItem,
          ZYGWItem: res.data.Data.ZYGWItem,
          moreItem: res.data.Data.MoreItem,

          startDate: res.data.Data.StartDate,
          endDate: res.data.Data.EndDate
          
        })



        // that.setData({
        //   markStage:vStage,
        //   projName:vProjName
        // });

        var redirectType = that.data.redirectType;
        var projectGID = that.data.groupID;
 

        //活动页：判断是否已提交信息
      if(redirectType == "活动页") {
          var dataMark ={
            projectGID : projectGID,
            phoneNum : wx.getStorageSync('PhoneNum'),
            actvCode : vCode
          }

        request.getRequest("/Activity/GetMarkCode",
          dataMark,
          function (res) {
            if(res.data.Data != ""){

            let projGID = that.data.groupID;
            let actvCode = that.data.code;

            wx.redirectTo({
              //  url: '/pages2/activity/activityHDM/finish?' + "projectgid="+projGID+"&actvCode=" +actvCode+"&actvType=" +redirectType

              url : "/pages2/activity/activityHDM/finish?projectgid="+projGID+"&actvCode=" +actvCode+"&redirectType=" +redirectType

              })}},
              (err) => {
                wx.showToast({
                title: '网络异常，请稍后重试！',
                icon: 'none',
                duration: 2000
              })
            }
          );
        }
        
          let AuthAvatar =that.data.AuthAvatar;
          let ZYGWItem =that.data.ZYGWItem;
          var userInfo = wx.getStorageSync('UserInfo');

          that.setData({
                finished:true
              })
          
          if(AuthAvatar == true){
            if (userInfo == "") {
              that.setData({
              maskDisplay: 'flex'
              })
            }
          }
          
          if(ZYGWItem  == true){
            request.getRequest("/Activity/CodeActvSaler",data,
            function(rest) {

              let slist = that.data.SalerList;
              that.setData({
                //SalerList : rest.data.Data
                SalerList : slist.concat(rest.data.Data)
              })
            })
          }
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


  //放入池中
	AddUserWXLogin: function () {

    let that = this;
    let AuthAvatar = that.data.AuthAvatar;

		var ProjectGID = this.data.groupID;
		var PhoneNum = wx.getStorageSync("PhoneNum");
    var comecode = wx.getStorageSync("comecode");
    var UserInfo = wx.getStorageSync("UserInfo");
    
		let data = {
			nickname: AuthAvatar? UserInfo.nickName :"",
			avatarUrl: AuthAvatar? UserInfo.avatarUrl :"",
			gender: AuthAvatar? UserInfo.gender :"",
			province: AuthAvatar? UserInfo.province :"",
			city: AuthAvatar? UserInfo.city :"",
			country: AuthAvatar? UserInfo.country :"",
			comefrom: "HDM",
			comecode: comecode,
			ProjectGID: ProjectGID,
			UserPhone: PhoneNum,
		};

		request.postRequest("/User/UserWXLogin", data, function (
			res
		) {});
	},

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
    })


    let data = {
      ProjectGID: that.data.prjId,
    }

  },
  bindSalerListChange: function(e){
    let index = e.detail.value
    let that = this 
    that.setData({
      salerindex: index,
      salername: that.data.SalerList[index].username,
      salercode: that.data.SalerList[index].usercode,
    })
  },


  ChangeSex_tap: function (e) {
    let value = e.currentTarget.dataset.value;
    let that = this

    if (value == "M") {
      that.setData({
        sexType: 'M',
        sexName: '男',
        iconM: vdomain + '/image/referral/icon2.png',
        iconW: vdomain + '/image/referral/icon1.png'
      })
    } else {
      that.setData({
        sexType: 'W',
        sexName: '女',
        iconM: vdomain + '/image/referral/icon1.png',
        iconW: vdomain + '/image/referral/icon2.png'
      })
    }
  },
  // getPhoneNumber: function (e) {
  //   let _this = this;
  //   var comecode = wx.getStorageSync("comecode");

  //   wx.login({
  //     success: function (res) {
  //       if (res.code != "") {
  //         let data = {
  //           code: res.code,
  //           iv: e.detail.iv,
  //           encryptedData: e.detail.encryptedData,
  //           comecode: comecode,
  //         };

  //         request.postRequest(
  //           "/User/PhoneNumberInfo",
  //           data,
  //           function (res) {
  //             if (
  //               res.StatusCode ==
  //               200
  //             ) {
  //               wx.setStorageSync(
  //                 "PhoneNum",
  //                 res.Data
  //                 .phoneNumber
  //               );
  //               wx.setStorageSync(
  //                 "PhoneNumSign",
  //                 res.Data
  //                 .PhoneNumSignText
  //               );
  //               let wxAgreementVersion = wx.getStorageSync(
  //                 "wxAgreementVersion"
  //               );
  //               wx.setStorage({
  //                 key: "userAgreementVersion",
  //                 data: wxAgreementVersion,
  //               });

  //               _this.setData({
  //                 phonenum: res.Data.phoneNumber
  //               })
  //             }
  //           },
  //           function (e) {
  //             wx.showToast({
  //               title: "授权失败，请稍后重试",
  //               icon: "none",
  //               duration: 2000,
  //             });
  //           }
  //         );
  //       } else {}
  //     },
  //   });
  // },
  bindUserName: function (e) {
    let value = e.detail.value
    let that = this
    that.setData({
      userName: value
    })
  },
  bindMemo: function (e) {
    let value = e.detail.value
    let that = this
    that.setData({
      memo: value
    })
  },
  submit_tap:function(e){
    let that = this;

    //let showType = that.data.showType;
    let redirectType = that.data.redirectType;
    let nameItem = that.data.nameItem;
    let ZYGWItem = that.data.ZYGWItem;

    let userName = that.data.userName;
    let salername = that.data.salername;

    var PhoneNum = wx.getStorageSync("PhoneNum");
    var UserInfo = wx.getStorageSync("UserInfo");
    
      if(nameItem ==true && userName.trim() ==""){
        wx.showToast({
          title: '请填写姓名！',
          icon: 'none',
          duration: 2000
        })
        return;
      }
      if(ZYGWItem ==true && salername.trim() ==""){
        wx.showToast({
          title: '请选择置业顾问',
          icon: 'none',
          duration: 2000
        })
        return;
      }
    
    let data ={

      code:that.data.code,
      ProjectGID:that.data.groupID,
      ProjectName : that.data.groupName,
      UserName: that.data.userName,
      UserPhone : PhoneNum,
      UserAvatar : UserInfo.avatarUrl,
      Sex:that.data.sexName,
      VisitDate:that.data.date,
      ZYGWUserCode:that.data.salercode,
      ZYGWUserName:that.data.salername,
      Memo:that.data.memo,
      markStage : that.data.code
    };

    //记录信息
    request.postRequest("/Activity/AddCodeActvData_and_Mark",
      data,
      function(res) {
        if (res.StatusCode == 200){
          let projGID = that.data.groupID;
          let page = that.data.redirectPath;
          let actvCode = that.data.code;
          let showType = that.data.showType;

          if(redirectType == "活动页" || redirectType == "宣传页"){
            page = "pages2/activity/activityHDM/finish?projectgid="+projGID+"&actvCode=" +actvCode+"&redirectType=" +redirectType;
          }

        
          wx.showToast({
            title: '提交完成',
            icon: 'none',
            duration: 2000,
            success: function(){
              setTimeout(function () {
                //要延时执行的代码
                wx.redirectTo({
                  url: "/" + page
                })
              }, 1200) //延迟时间
            }
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
    );

    
  },


  UserInfo_tap: function (e) {

    console.log("UserInfo_tap", this.data.needUserInfo);

    let _this = this;
    console.log(e);
    UserInfo.GetUserInfo(app, e,
      function (res) {
        _this.setData({
          UserInfoStatus: (wx.getStorageSync('UserInfo') || "") != ""
        })

        var url = getCurrentPages()[getCurrentPages().length - 1];
        if (!_this.data.PhoneNumStatus) {
          _this.setData({
            maskDisplay: 'none',
            userInfo: wx.getStorageSync('UserInfo')
          })
        }
      },
      function (res) {
        _this.setData({
          UserInfoStatus: (wx.getStorageSync('UserInfo') || "") != ""
        })
        wx.showModal({
          title: '未授权',
          content: '为了不影响您的使用，请开启相应的权限哦~'
        });
      });
  },

  onReady: function () {

  },

  onShow: function () {

    // let that =this;
    // var projectGID = that.data.groupID;
    // if(projectGID == "96328AF6-05F8-4492-8E0F-B7DABA179635"){
    //   var dataMark =
    //   {
    //     projectGID : projectGID,
    //     phoneNum : that.data.phonenum,
    //     markStage : that.data.markStage
    //   }

    //   request.getRequest("/Activity/GetMarkCode",
    //   dataMark,
    //   function (res) {
    //     if(res.data.Data != "") {
    //       wx.redirectTo({
    //        url: '/pages2/activity/activityHDM/finish?projName=GF'
    //       })
    //     }
    //   },(err) => {
    //     wx.showToast({
    //     title: '网络异常，请稍后重试！',
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   });
    // }
  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})