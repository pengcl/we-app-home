import request from '../../../utils/request';
const app = getApp();
var vdomain = app.globalData.domain
Page({
  data: {
    CommunityInfo: {},
    PinZhouBian_Data: {},
    PinZhouBianMap: {},
    bus: vdomain + 'image/i09.png',
    school: vdomain + 'image/i10.png',
    metro: vdomain + 'image/i11.png',
    hospital: vdomain + 'image/i12.png',
    shopping: vdomain + 'image/i13.png'
  },

  onLoad: function(options) {
    let _this = this;
    request.getRequest("/Community/CommunityInfo", {}, function(res) {
      _this.setData({
        CommunityInfo: res.Data
      })
    }, (err) => {
      console.log(err);
    });
    //品周边
    request.getRequest("/Community/PinZhouBian", {}, function(res) {
      _this.setData({
        PinZhouBian_Data: res.Data
      })
      _this._Set_PinZhouBian_Map("");

    }, (err) => {
      console.log(err);
    });
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {},
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
})