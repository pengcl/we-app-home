// pages/Community/Detail/detail.js

import request from '../../../utils/request';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    domain: 'https://xyclientnew.ai-fox.net/',
    CommunityInfo: {},
    tags: {},
    YueHuoDong: {},
    PinZhouBian_Data: {},
    PinZhouBianMap: {},
    ShangHuXing: {},
    YueDongTi: {},
    ZhiYeGuWenFaBu: {},
    GWInfo: {},
    DianPing: {},
    zxcurrent: '',
    zxtotal: '',
    head_button_select: [{
      code: 'video',
      state: true,
      name: '视频'
    }, {
      code: 'image',
      state: false,
      name: '图片'
    }, {
      code: 'vr',
      state: false,
      name: 'VR'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this;
    let id = options.id;
    let data = {
      gid: '152E7F4B-55F0-4E2C-BBD3-684AF00CB499'
    }
    this.setData({
      id: id,
      domain: app.globalData.domain
    })
    request.getRequest("/Community/CommunityInfo", data, function(res) {
      _this.setData({
        CommunityInfo: res.data.Data,
        tags: JSON.parse(res.data.Data.tags)
      })
      console.log(_this.data.tags)
    }, (err) => {
      console.log(err);
    });
    // //悦活动
    // request.getRequest("/Community/YueHuoDong", {}, function(res) {

    //   _this.setData({
    //     YueHuoDong: res.Data
    //   })
    // }, (err) => {
    //   console.log(err);
    // });
    // //品周边
    // request.getRequest("/Community/PinZhouBian", {}, function(res) {
    //   _this.setData({
    //     PinZhouBian_Data: res.Data
    //   })
    //   _this._Set_PinZhouBian_Map("");

    // }, (err) => {
    //   console.log(err);
    // });
    // //赏户型
    // request.getRequest("/Community/ShangHuXing", {}, function(res) {

    //   //console.log("赏户型",res);

    //   _this.setData({
    //     ShangHuXing: res.Data
    //   })
    // }, (err) => {
    //   console.log(err);
    // });
    // //悦动态
    // request.getRequest("/Community/YueDongTi", {}, function(res) {
    //   console.log("悦动态", res);
    //   _this.setData({
    //     YueDongTi: res.Data
    //   })
    // }, (err) => {
    //   console.log(err);
    // });
    // //置业顾问
    // request.getRequest("/Community/GWInfo", {}, function(res) {
    //   console.log("置业顾问信息", res);
    //   var cs = res.Data.length / 3 | Int32Array
    //   var ys = res.Data.length % 3;
    //   var total = 0
    //   if (ys != 0 || ys != '0') {
    //     total = cs + 1
    //   } else {
    //     total = cs
    //   }
    //   var current = total == 0 ? 0 : 1
    //   _this.setData({
    //     GWInfo: res.Data,
    //     zxtotal: total,
    //     zxcurrent: current
    //   })
    // }, (err) => {
    //   console.log(err);
    // });
    // //置业顾问发布
    // request.getRequest("/Community/ZhiYeGuWenFaBu", {}, function(res) {
    //   console.log("置业顾问发布", res);
    //   _this.setData({
    //     ZhiYeGuWenFaBu: res.Data
    //   })
    // }, (err) => {
    //   console.log(err);
    // });
    // //点评&问答
    // request.getRequest("/Community/DianPing", {}, function(res) {
    //   console.log("点评&问答", res);
    //   _this.setData({
    //     DianPing: res.Data
    //   })
    // }, (err) => {
    //   console.log(err);
    // });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },
  //切换视频 图片 VR展示功能
  head_button_tap: function(e) {
    console.log(e);

    let head_buttons = this.data.head_button_select;
    head_buttons.forEach(function(item) {
      item.state = item.code == e.currentTarget.dataset.code
    })

    this.setData({
      head_button_select: head_buttons
    })
    //TODO:切换视频 图片 VR展示功能
  },
  //收藏
  islike_tap: function(e) {
    let CommunityInfo = this.data.CommunityInfo;
    CommunityInfo.islike = !CommunityInfo.islike
    //TODO:向后台更新islike

    //更新data
    this.setData({
      CommunityInfo: CommunityInfo
    })

  },
  //点击品周边的分类
  PinZhouBian_Type_tap: function(e) {
    let typecode = e.currentTarget.dataset.code

    this._Set_PinZhouBian_Map(typecode);

  },
  _Set_PinZhouBian_Map: function(typecode) {

    let data = this.data.PinZhouBian_Data
    let map = [];
    data.forEach(function(item) {
      if (typecode == "" || item.type == typecode || item.type == 'xm') {
        let m = {
          iconPath: item.imageurl,
          id: item.id,
          latitude: item.latitude,
          longitude: item.longitude,
          width: 25,
          height: 25,
          callout: {
            content: item.name,
            color: '##E0DDE0',
            fontSize: 16,
            borderRadius: 0,
            bgColor: '#FFFEFF',
            borderColor: "#E0DDE0",
            textAlign: 'center',
            // display: 'ALWAYS',
            padding: 3
          }
        }
        map.push(m);
      }

    });
    this.setData({
      PinZhouBianMap: map
    })
  },
  ShangHuXing_tap: function(e) {
    let id = e.currentTarget.dataset.id
    console.log(id);

    //TODO:查看户型
    wx.navigateTo({
      url: '../../housType/housType',
    })
  },
  //我要进行点评&提问
  DianPing_tap: function(e) {
    //TODO:我要进行点评&提问
    wx.navigateTo({
      url: '../comment/add/add',
    })
  },
  MoreDianPing_Tap: function(e) {
    wx.navigateTo({
      url: '../comment/list/list',
    })
  },
  Moregwdt_Tap: function(e) {
    wx.navigateTo({
      url: '../gwmore/gwmore',
    })
  },
  CommunityMore_tap: function(e) {
    let id = this.data.id;
    wx.navigateTo({
      url: '../more/more',
    })
  },
  HousTypeMore_tap: function(e) {
    let id = this.data.id;
    wx.navigateTo({
      url: '../../housType/more/more',
    })
  },
  phoneCall: function(e) {
    var num = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: num
    })
  },
  gwChat: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../im/imview/imview',
    })
  },
  yuyue: function(e) {
    wx.navigateTo({
      url: '../../book/seeHouse/seehouse',
    })
  },
  map_tap: function(e) {
    var lat = 23.234901,
      lng = 113.296822,
      vname = '新世界中国租售体验中心',
      vaddress = '广东省广州市白云区白云大道北1689号';
    wx.openLocation({
      type: 'gcj02',
      latitude: lat,
      longitude: lng,
      name: vname,
      address: vaddress,
      scale: '16',
      success: function(res) {},
      fail: function(res) {}
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
  Moredt_tap: function(e) {
    wx.navigateTo({
      url: '../dtmore/dtmore',
    })
  },
  loushu_tap: function(e) {
    wx.navigateToMiniProgram({
      //房天下
      appId: 'wxe3f2203e4292d7c7',
      path: 'pages/Main/Index/Index',
      //房天下

      //搜狐焦点
      // appId: 'wxf7e3def609be52f7',
      // path: '/pages/web-view/main?url=https://m.zhibo.focus.cn/gz/?fromMp=1',
      //搜狐焦点
      envVersion: 'release',
      success(res) {
        // 打开成功
        console.log(1)
      }
    })
  }
})