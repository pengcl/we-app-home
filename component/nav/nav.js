const app = getApp()
Component({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },
  /**
   * 组件的初始数据
   */
  data: {},
  ready() {
    let {
      statusBarHeight,
      navBarHeight
    } = app.globalData;

    this.setData({
      statusBarHeight,
      navBarHeight
    })
  },
  methods: {
    back() {
      wx.navigateBack({
        delta: 1
      })
    },
    goback: function () {
      wx.redirectTo({
        url: 'chosearea'
      });
    }
  }

})