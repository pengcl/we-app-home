var MTA_CONFIG = {
  app_id: "",
  event_id: "",
  api_base: "https://pingtas.qq.com/pingd",
  prefix: "_mta_",
  version: "1.3.10",
  stat_share_app: !1,
  stat_pull_down_fresh: !1,
  stat_reach_bottom: !1,
  stat_param: !0
};

function getNetworkType(a) {
  wx.getNetworkType({
    success: function (b) {
      a(b.networkType)
    }
  })
}

function getSystemInfo() {
  var a = wx.getSystemInfoSync();
  return {
    adt: encodeURIComponent(a.model), // 手机型号
    scl: a.pixelRatio, // 设备像素比
    scr: a.windowWidth + "x" + a.windowHeight, // 可使用窗口宽度/高度
    lg: a.language, // 微信设置的语言
    fl: a.version, // 微信版本号
    jv: encodeURIComponent(a.system), // 操作系统版本
    tz: encodeURIComponent(a.platform) // 客户端平台
  }
}
// 用户id，第一次运行时生成，清理小程序会重新生成
function getUID() {
  try {
    return wx.getStorageSync(MTA_CONFIG.prefix + "auid")
  } catch (a) {}
}
// 会话id，每次重新启动小程序，会重新生成
function setUID() {
  try {
    var a = getRandom();
    wx.setStorageSync(MTA_CONFIG.prefix + "auid", a);
    return a
  } catch (b) {}
}

function getSID() {
  try {
    return wx.getStorageSync(MTA_CONFIG.prefix + "ssid")
  } catch (a) {}
}

function setSID() {
  try {
    var a = "s" + getRandom();
    wx.setStorageSync(MTA_CONFIG.prefix + "ssid", a);
    return a
  } catch (b) {}
}
//生成随机数
function getRandom(a) {
  for (var b = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], c = 10; 1 < c; c--) {
    var d = Math.floor(10 * Math.random()),
      f = b[d];
    b[d] = b[c - 1];
    b[c - 1] = f
  }
  for (c = d = 0; 5 > c; c++) d = 10 * d + b[c];
  return (a || "") + (d + "" + +new Date)
}
// 获取当前页面路径地址
function getPagePath() {
  try {
    var a = getCurrentPages(),
      b = "/";
    0 < a.length && (b = a.pop().__route__);
    return b
  } catch (c) {
    console.log("get current page path error:" + c)
  }
}
// 获取主要信息？每次请求都会发送
function getMainInfo() {
  var a = {
    dm: "wechat.apps.xx", // 上报类型
    url: encodeURIComponent(getPagePath() + getQuery(MTA.Data.pageQuery)), // 页面路径
    pvi: "", // 用户id
    si: "", // 会话id
    ty: 0 // 是否是新用户
  };
  a.pvi = function () {
    var b = getUID();
    b || (b = setUID(), a.ty = 1);
    return b
  }();
  a.si = function () {
    var a = getSID();
    a || (a = setSID());
    return a
  }();
  return a
}
// 获取基本信息，包含系统信息和网络类型
function getBasicInfo() {
  var a = getSystemInfo();
  getNetworkType(function (a) {
    try {
      wx.setStorageSync(MTA_CONFIG.prefix + "ntdata", a)
    } catch (c) {}
  });
  a.ct = wx.getStorageSync(MTA_CONFIG.prefix + "ntdata") || "4g";
  return a
}
// 获取扩展信息，用户信息，微信，版本，appid
function getExtentInfo() {
  var a = MTA.Data.userInfo;
  var b = [],
    c;
  for (c in a) a.hasOwnProperty(c) && b.push(c + "=" + a[c]); // 分号分割的等号拼接
  a = b.join(";");
  return {
    r2: MTA_CONFIG.app_id,
    r4: "wx",
    ext: "v=" + MTA_CONFIG.version + (null !== a && "" !== a ? ";ui=" + encodeURIComponent(a) : "")
  }
}
//获取的参数
function getQuery(a) {
  if (!MTA_CONFIG.stat_param || !a) return "";
  a = ignoreParams(a);
  var b = [],
    c;
  for (c in a) b.push(c + "=" + a[c]);
  return 0 < b.length ? "?" + b.join("&") : ""
}
//忽视的参数
function ignoreParams(a) {
  if (1 > MTA_CONFIG.ignore_params.length) return a;
  var b = {},
    c;
  for (c in a) 0 <= MTA_CONFIG.ignore_params.indexOf(c) || (b[c] = a[c]);
  return b
}
//Onload事件
function initOnload() {
  var a = Page;
  Page = function (b) {
    var c = b.onLoad;
    b.onLoad = function (a) {
      c && c.call(this, a);
      MTA.Data.lastPageQuery = MTA.Data.pageQuery;
      MTA.Data.pageQuery = a;
      MTA.Data.lastPageUrl = MTA.Data.pageUrl;
      MTA.Data.pageUrl = getPagePath();
      MTA.Data.show = !1;
      MTA.Page.init()
    };
    a(b)
  }
}
var MTA = {
  App: {
    init: function (a) {
      "appID" in a && (MTA_CONFIG.app_id = a.appID);
      "eventID" in a && (MTA_CONFIG.event_id = a.eventID);
      "statShareApp" in a && (MTA_CONFIG.stat_share_app = a.statShareApp);
      "statPullDownFresh" in a && (MTA_CONFIG.stat_pull_down_fresh = a.statPullDownFresh);
      "statReachBottom" in a && (MTA_CONFIG.stat_reach_bottom = a.statReachBottom);
      "ignoreParams" in a && (MTA_CONFIG.ignore_params = a.ignoreParams);
      "statParam" in a && (MTA_CONFIG.stat_param = a.statParam);
      setSID(); // 重置会话ID
      try {
        // 设置启动参数记录
        "lauchOpts" in a && (MTA.Data.lanchInfo = a.lauchOpts,
          MTA.Data.lanchInfo.landing = 1)
      } catch (b) { }
      //监听Onload事件
      "autoReport" in a && a.autoReport && initOnload()
    }
  },
  // 页面级别的功能
  Page: {
    // 初始化
    init: function () {
      var a = getCurrentPages()[getCurrentPages().length - 1];
      // 页面显示事件
      a.onShow && ! function () {
        var b = a.onShow;
        a.onShow = function () {
          if (!0 === MTA.Data.show) {
            var a = MTA.Data.lastPageQuery;
            MTA.Data.lastPageQuery = MTA.Data.pageQuery;
            MTA.Data.pageQuery = a;
            MTA.Data.lastPageUrl = MTA.Data.pageUrl;
            MTA.Data.pageUrl = getPagePath()
          }
          MTA.Data.show = !0;
          MTA.Page.stat();
          
          b.apply(this, arguments)
        }
      }();
      // 下拉刷新事件
      MTA_CONFIG.stat_pull_down_fresh && a.onPullDownRefresh &&
        ! function () {
          var b = a.onPullDownRefresh;
          a.onPullDownRefresh = function () {
            MTA.Event.stat(MTA_CONFIG.prefix + "pulldownfresh", {
              url: a.__route__
            });
            b.apply(this, arguments)
          }
        }();
      // 上拉事件
      MTA_CONFIG.stat_reach_bottom && a.onReachBottom && ! function () {
        var b = a.onReachBottom;
        a.onReachBottom = function () {
          MTA.Event.stat(MTA_CONFIG.prefix + "reachbottom", {
            url: a.__route__
          });
          b.apply(this, arguments)
        }
      }();
      // 分享事件
      MTA_CONFIG.stat_share_app && a.onShareAppMessage && ! function () {
        var b = a.onShareAppMessage;
        a.onShareAppMessage = function () {
          MTA.Event.stat(MTA_CONFIG.prefix +
            "shareapp", {
              url: a.__route__
            });
          return b.apply(this, arguments)
        }
      }()
    },
    multiStat: function (a, b) {
      if (1 == b) MTA.Page.stat(a), !0;
      else {
        var c = getCurrentPages()[getCurrentPages().length - 1];
        c.onShow && ! function () {
          var b = c.onShow;
          c.onShow = function () {
            MTA.Page.stat(a);
            b.call(this, arguments)
          }
        }()
      }
    },
    // 页面数据上报
    stat: function (a) {
      if ("" != MTA_CONFIG.app_id) {
        var b = [],
          c = getExtentInfo();
        a && (c.r2 = a);
        a = [getMainInfo(), c, getBasicInfo()];
         // 启动信息参数
        if (MTA.Data.lanchInfo) {
          a.push({
            ht: MTA.Data.lanchInfo.scene // 启动场景值
          });
          // 有渠道id
          MTA.Data.pageQuery && MTA.Data.pageQuery._mta_ref_id &&
            a.push({
              rarg: MTA.Data.pageQuery._mta_ref_id // 渠道id的设计
            });
          try {
             // 表示会话第一次上报？ 和userinfo信息放在一起
            1 == MTA.Data.lanchInfo.landing && (c.ext += ";lp=1", MTA.Data.lanchInfo.landing = 0)
          } catch (e) {}
        }
        a.push({
          rdm: "/",
          rurl: 0 >= MTA.Data.lastPageUrl.length ? MTA.Data.pageUrl + getQuery(MTA.Data.lastPageQuery) : encodeURIComponent(MTA.Data.lastPageUrl + getQuery(MTA.Data.lastPageQuery))
        });
        a.push({
          rand: +new Date
        });
        c = 0;
        for (var d = a.length; c < d; c++)
          for (var f in a[c]) a[c].hasOwnProperty(f) && b.push(f + "=" + ("undefined" == typeof a[c][f] ? "" : a[c][f]));
       
        console.log('ric',b);
        // 使用get方式提交数据
        wx.request({
          url: MTA_CONFIG.api_base +
            "?" + b.join("&").toLowerCase()
        })
      }
    }
  },
  //事件上报 需要手动调用mta.Event.stat("ico_search", {"query":"特斯拉"});
  Event: {
    stat: function (a, b) {
      if ("" != MTA_CONFIG.event_id) {
        var c = [],
          d = getMainInfo(),
          f = getExtentInfo();
        d.dm = "wxapps.click"; // 点击数据上报，类型不同时，参数意义不同
        d.url = a; // 数据路径
        f.r2 = MTA_CONFIG.event_id; // 事件ID；MTA_CONFIG.app_id？
        var e = "undefined" === typeof b ? {} : b;
        var k = [],
          g;
        for (g in e) e.hasOwnProperty(g) && k.push(encodeURIComponent(g) + "=" + encodeURIComponent(e[g]));
        e = k.join(";");
        f.r5 = e;
        e = 0;
        d = [d, f, getBasicInfo(), {
          rand: +new Date
        }];
        for (f = d.length; e < f; e++){
          for (var h in d[e]){
            d[e].hasOwnProperty(h)
              && c.push(h + "=" + ("undefined" == typeof d[e][h] ? "" : d[e][h]));
          }
        }
        
        wx.request({
          url: MTA_CONFIG.api_base + "?" + c.join("&").toLowerCase()
        })
      }
    }
  },
  Data: {
    userInfo: null,
    lanchInfo: null,
    pageQuery: null,
    lastPageQuery: null,
    pageUrl: "",
    lastPageUrl: "",
    show: !1
  }
};
module.exports = MTA;