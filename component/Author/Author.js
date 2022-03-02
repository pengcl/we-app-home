// component/Author/Author.js
import UserInfo from '../../utils/UserInfo';
let app =  getApp();

  
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    needUserInfo: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    UserInfoStatus: false,
    PhoneNumStatus:false,
  },

  pageLifetimes: {
    show: function () {
      // 页面被展示
      console.log("pageLifetimes", this.data.needUserInfo);
      this.setData({
        UserInfoStatus: ((wx.getStorageSync('UserInfo') || "") != "" && (wx.getStorageSync('PhoneNum') || "") != ""),
        PhoneNumStatus: (wx.getStorageSync('PhoneNum') || "") != ""
      })
    },
    hide: function () {
      // 页面被隐藏
    },
    resize: function (size) {
      // 页面尺寸变化
    }
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行

    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
          console.log("url", url);
          if (!_this.data.PhoneNumStatus) {
            wx.navigateTo({
              url: '/pages2/permission/phone/phone'
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
    PhoneNum_tap: function (e) { 
       let _this = this;
       if (!_this.data.PhoneNumStatus) {
         wx.navigateTo({
           url: '/pages2/permission/phone/phone'
         })
       }
    }

  }
})