
import request from '../../../../utils/request';

var app = getApp();
var vdomain = app.globalData.domain;

Page({

  data: {
    img1: vdomain +'image/referral/reward/rectangle.png',
    img2: vdomain +'image/referral/reward/avator.png',
    img3: vdomain +'image/referral/reward/type.png',
    img4: vdomain +'image/referral/reward/money.png',
    img5: vdomain +'image/referral/reward/arrow.png',
    img6: vdomain +'image/referral/reward/arrow2.png',

      icon1: vdomain + 'image/referral/icon6.png',
      icon2: vdomain + 'image/referral/icon7.png',
      icon3: vdomain + 'image/referral/icon8.png',
      icon4: vdomain + 'image/referral/icon10.png',
      icon5: vdomain + 'image/referral/icon12.png',
      icon6: vdomain + 'image/referral/icon13.png',

    tjRewardList:[],

    phoneNum:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // //获取登录用户手机号
    // var vPhoneNum = wx.getStorageSync('PhoneNum');
    // if(vPhoneNum != ''){
    //   //获取用户的推荐奖励表记录

    //   this.setData({
    //     phoneNum:vPhoneNum
    //   })

    //   this.getRewardList();
    // }

    // wx.hideShareMenu();
  },

  getRewardList: function () {

    var that = this;
    var phone = that.data.phoneNum;
    var data ={ "phoneNum" : phone };

    request.getRequest("/TJ/TJRewardList",data,
        function(rest) {
          if(rest.data.StatusCode == 200){
            that.setData({
              //SalerList : rest.data.Data
              tjRewardList : rest.data.Data
            })
          }
          else{
            wx.showToast({
              title: '请求出错！',
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
      )
  },

  redirect_tap: function(e){
    var that = this; 
    var val = e.currentTarget.dataset.status;
    
    var name = encodeURIComponent(e.currentTarget.dataset.name);
    var phone = that.data.phoneNum;
    var gid = e.currentTarget.dataset.gid;

    var recruit_id = '95';
    //var recruit_id = '81'; //测试
    var thirduser_id =  phone;
    var withdraw_id = gid; //结算单ID = gid
    var amount = e.currentTarget.dataset.amount;
    var calculate_num = e.currentTarget.dataset.calculate_num;
    var projectname = e.currentTarget.dataset.projectname;
    var invoice = e.currentTarget.dataset.invoicesubject;
    var roomnumber = e.currentTarget.dataset.roomNumber;

    var data = {
       gid : gid
    }

    switch(val){
      case 1:{
        //待举证：判断是否举证
        request.postRequest("/TJ/RewardCertificateStatus",  data,
        function (res) {
          if (res.StatusCode == 200) {
            if(res.Data == 1){
              wx.navigateTo({
                url: 'processing?type=举证审核中', //审核中
              })
            }
            else{
              wx.navigateTo({
                url: 'certificate?phone=' + phone +'&gid='+ gid,  //举证
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
      }break;

      case 2:{
        //未签约 -> 签约页
        wx.navigateTo({
              url: 'contract?recruit_id='+ recruit_id +'&thirduser_id='+thirduser_id+'&phone='+phone +'&name='+name + '&withdraw_id=' + withdraw_id  ,
            })
      }break;

      case 3:{
        //已签约 -> 换卡页
        var amount_fen = amount*100;

        wx.navigateTo({
          url: 'withdraw?recruit_id='+ recruit_id +'&thirduser_id='+thirduser_id+'&withdraw_id='+withdraw_id +'&withdraw_amount='+amount_fen +'&project='+projectname +'&invoice=' + invoice +'&roomnumber=' +roomnumber,

        })
      }break;

      case 4:{
        //结算中 -> 结算详情页
        wx.navigateTo({
          url: 'withdrawing?calculate_num='+ calculate_num,
        })
      }break;

      case 5:{
        //结算完 -> 结算详情页
        wx.navigateTo({
          url: 'withdrawing?calculate_num='+ calculate_num,
        })
      }break;
      
      case 0:{
        //推荐人 待确认(暂不显示)
        wx.showToast({
          title: '推荐人奖励待确认！',
          icon: 'none',
          duration: 2000
        })
      }break;

      case -1:{
        //举证不通过 重新跳到举证页
        wx.navigateTo({
          url: 'certificate?phone=' + phone +'&gid='+ gid,  //举证
        })
      }break;

      case -2:{
        //签约失败 、重签
        wx.navigateTo({
          url: 'contract?recruit_id='+ recruit_id +'&thirduser_id='+thirduser_id+'&phone='+ phone+'&name='+name +'&withdraw_id=' + withdraw_id ,
        })
      }break;

      case -3:{
        //结算失败 -> 结算详情页
        wx.showToast({
          title: '请联系管理员！',
          icon: 'none',
          duration: 2000
        })
      }break;
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
    // var vPhoneNum = wx.getStorageSync('PhoneNum');
    // if(vPhoneNum != ''){
    //   //获取用户的推荐奖励表记录
    //   this.getRewardList();
    // }

    //获取登录用户手机号
    var vPhoneNum = wx.getStorageSync('PhoneNum');
    if(vPhoneNum != ''){
      //获取用户的推荐奖励表记录

      this.setData({
        phoneNum:vPhoneNum
      })

      this.getRewardList();
    }

    wx.hideShareMenu();
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