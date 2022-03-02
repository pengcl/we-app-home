var app = getApp();
var vdomain = app.globalData.domain;
Page({
  data: {
    domain: vdomain,
    topImgUrls: [
      vdomain + 'image/type.jpg',
      vdomain + 'image/type.jpg'
    ],
    islike: false,
    curTop: 0,
    indicatorDots: true,
    feature: [
      " 平层 ",
      " 采光充足 ",
      " 观景飘窗 "
    ],
    imagejsq: vdomain + 'image/fdjsq.jpg',
    zxInfo: [{
        name: '张三',
        icon: vdomain + 'image/icontx.jpg',
        point: '5.0',
        phonenum: '12345678910'
      },
      {
        name: '李四',
        icon: vdomain + 'image/icontx.jpg',
        point: '5.0',
        phonenum: '12345678910'
      },
      {
        name: '王五',
        icon: vdomain + 'image/icontx.jpg',
        point: '5.0',
        phonenum: '12345678910'
      },
      {
        name: '丁六',
        icon: vdomain + 'image/icontx.jpg',
        point: '5.0',
        phonenum: '12345678910'
      },
      {
        name: '马七',
        icon: vdomain + 'image/icontx.jpg',
        point: '5.0',
        phonenum: '12345678910'
      },
      {
        name: '戎八',
        icon: vdomain + 'image/icontx.jpg',
        point: '5.0',
        phonenum: '00000000000'
      },
      {
        name: '黄九',
        icon: vdomain + 'image/icontx.jpg',
        point: '5.0',
        phonenum: '12345678910'
      },
      {
        name: '十全',
        icon: vdomain + 'image/icontx.jpg',
        point: '5.0',
        phonenum: '12345678910'
      },
    ],
    questionInfo: [{
      askIcon: vdomain + 'image/icontx.jpg',
      askName: "戎靓仔",
      askTime: "2020-02-25",
      askInfo: "房子挺好的，很适合我们全家生活!房子挺好的，很适合我们全家生活!房子挺好的，很适合我们全家生活!",
      gwIcon: vdomain + 'image/icontx.jpg',
      gwPhone: "12345678910",
      gwName: "丁靓仔",
      gwInfo: "感谢您对我们楼盘的认可！有任何疑问随时联系，祝您生活愉快！",
      readStatus: '已看过'
    }],
    moreType: [{
      houseName: '阅风华 | 建筑面积172平4房户型',
      houseImg: vdomain + 'image/housetype.jpg',
      housetype: '4室2厅3卫1厨',
      houseArea: '172㎡',
      houseToward: '南'
    }, {
      houseName: '阅风华 | 建筑面积172平4房户型',
      houseImg: vdomain + 'image/housetype.jpg',
      housetype: '4室2厅3卫1厨',
      houseArea: '172㎡',
      houseToward: '南'
    }, {
      houseName: '阅风华 | 建筑面积172平4房户型',
      houseImg: vdomain + 'image/housetype.jpg',
      housetype: '4室2厅3卫1厨',
      houseArea: '172㎡',
      houseToward: '南'
    }],
    zxcurrent: '1',
    zxtotal: '3',
    icon1: vdomain + 'image/icon1.jpg',
    icon2: vdomain + 'image/icon2.png',
    icon3: vdomain + 'image/icon3.png',
    icon4: vdomain + 'image/icon4.png',
    icon5: vdomain + 'image/icon5.png',
    bg1: vdomain + 'image/bg1.png',
    bg2: vdomain + 'image/bg2.png',
    moreAsk: vdomain + 'image/moreAsk.jpg',
    dp: vdomain + 'image/dp.jpg',
    navBarHeight: app.globalData.navBarHeight,
  },
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '户型详情',
    })
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {},
  phoneCall: function(e) {
    var num = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: num
    })
  },
  btnpre: function(e) {
    var that = this;
    var vcurpage = parseInt(that.data.zxcurrent);
    if (vcurpage > 1) {
      that.setData({
        zxcurrent: vcurpage - 1
      })
    }
  },
  btnnext: function(e) {
    var that = this;
    var vcurpage = parseInt(that.data.zxcurrent);
    var vtotal = parseInt(that.data.zxtotal)
    if (vcurpage < vtotal) {
      that.setData({
        zxcurrent: vcurpage + 1
      })
    }
  },
  yuyue: function(e) {
    wx.navigateTo({
      url: '../book/seeHouse/seehouse'
    })
  },
  zixun: function(e) {
    wx.navigateTo({
      url: '../im/imview/imview',
    })
  },
  ask: function(e) {
    wx.navigateTo({
      url: '../community/comment/add/add',
    })
  },
  moreAsk: function(e) {
    wx.navigateTo({
      url: '../community/comment/list/list',
    })
  },
  //收藏
  islike_tap: function(e) {
    let islike= !this.data.islike;
    //TODO:向后台更新islike

    //更新data
    this.setData({
      islike: islike
    })

  }
})