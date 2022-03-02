const app = getApp();
Component({
  /**
   * 组件的一些选项
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的对外属性
   */
  properties: {
    
    bgColor: {
      type: String,
      default: ''
    },
    isCustomAction: {
      type: [Boolean, String],
      default: false
    },
    isCustom: {
      type: [Boolean, String],
      default: false
    },
    isBack: {
      type: [Boolean, String],
      default: false
    },
    bgImage: {
      type: String,
      default: ''
    },
    isCustomBackEvent: {
      type: Boolean,
      default: false
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom
  },
   pageLifetimes: {
     show: function () {
      //  let _Pages = getCurrentPages();
      //  if (_Pages.length == 1) { 
      //    this.setData({
      //      isBack=false,
      //     // isCustom
      //    })
      //  }

       
     },
     hide: function () {
       // 页面被隐藏
     },
     resize: function (size) {
       // 页面尺寸变化
     }
   },
  /**
   * 组件的方法列表
   */
  methods: {
    BackPage() {
      console.log("isCustomBackEvent",this.data.isCustomBackEvent);
      if(this.data.isCustomBackEvent){
        console.log("isCustomBackEvent2",this.data.isCustomBackEvent);
        var myEventDetail = {} // detail对象，提供给事件监听函数
        var myEventOption = {} // 触发事件的选项
        this.triggerEvent('BackPage',myEventDetail,myEventOption);
      }else
      {
        wx.navigateBack({
          delta: 1
        });
      }
    },
    toHome(){
      wx.reLaunch({
        url: '/pages2/index/index',
      })
    }
  }
})