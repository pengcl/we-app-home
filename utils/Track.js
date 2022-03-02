//埋点类
//使用方法 by liqir
//1.在app.js 导入 const Track = require('utils/Track.js')
//2.onLaunch 方法中生命周期函数的初始化 Track.App.init();
//3.在page页面埋点事件方法：onLoad中配置事件：const methods = ['bindViewTap', 'console.log'];Track.Page.InitEvent(methods);

//TODO:用户信息的收集，生命周期函数的完善，自定义事件的参数数据收集

import util from 'util.js';
import request from 'request';



//埋点 获取当前的地理位置、速度 wx.getLocation(Object object)
//备份wx.getLocation
const __bak_getLocation = wx.getLocation;
const __bak_getUserInfo = wx.getUserInfo;

var Track = {
    
    Config: {
        app_id: "wxbc54366afc539c0b",
        app_Name: "新赏家",
        prefix: "__Track_",
        version: "0.1.1",

        //本地存储中存储用户信息的Key
        Storage_UserData_Key: "UserInfo",
        //本地存储中存储Token的Key
        Storage_Token_Key: "token"
    },
    //埋点公用方法（wx）
    TrackWxFun: {
        trackGetLocation: function (page) {
            //console.log("page", page)
            var __getLocation = __bak_getLocation;
            Object.defineProperty(wx, "getLocation", {
                writable: true
            });
            wx.getLocation = function (config) {

                if (typeof config.success === 'function') {
                    let __success = config.success;
                    config.success = function (res) {
                        console.log("Track __getLocation __success", res, page);
                        //TODO:发送埋点数据

                        //保存到
                        wx.setStorage({
                            key: Track.Config.prefix + "getLocation",
                            data: res
                        })
                    
                        // wx.chooseLocation({
                        //     latitude: res.latitude,
                        //     longitude: res.longitude,
                        //     success: function (e) { 
                        //           wx.setStorage({
                        //               key: Track.Config.prefix + "chooseLocation",
                        //               data: e
                        //           })
                        //     }
                        // })
                        __success(res);
                    }

                }
                __getLocation(config);

            };
        },
        trackGetUserInfo: function (page) {
            //console.log("page", page)
            var __getUserInfo = __bak_getUserInfo;
            Object.defineProperty(wx, "getUserInfo", {
                writable: true
            });
            wx.getUserInfo = function (config) {

                if (typeof config.success === 'function') {
                    let __success = config.success;
                    config.success = function (res) {
                        console.log("Track __getUserInfo __success", res, page);
                        //TODO:发送埋点数据

                        //保存到
                        wx.setStorage({
                            key: Track.Config.prefix + "getUserInfo",
                            data: res
                        })
                        __success(res);
                    }

                }
                __getUserInfo(config);

            };
        },
    },
    //公共方法
    CommFun: {

        // 用户id，第一次运行时生成，清理小程序会重新生成
        getUID: function () {
            try {
                return wx.getStorageSync(Track.Config.prefix + "UID")
            } catch (a) {}
        },
        // 会话id，每次重新启动小程序，会重新生成
        setUID: function () {
            try {
                var a = util.RandomString(16);
                wx.setStorageSync(Track.Config.prefix + "UID", a);
                return a
            } catch (b) {}
        },

        getSID: function () {
            try {
                return wx.getStorageSync(Track.Config.prefix + "SSID")
            } catch (a) {}
        },
        setSID: function () {
            try {
                var a = util.RandomString(16);
                wx.setStorageSync(Track.Config.prefix + "SSID", a);
                return a
            } catch (b) {}
        },

        getRoute: function () {
            return wx.getStorageSync(Track.Config.prefix + "Route") || [];
        },
        clearRoute: function () {
            wx.setStorageSync(Track.Config.prefix + "Route", []);
        },
        pushRoute: function (url) {
            let route = Track.CommFun.getRoute();

            if (route.length == 0 || route[route.length - 1] != url) {
                route.push(url);
                wx.setStorageSync(Track.Config.prefix + "Route", route);
            }
        },
        getStorageData: function () {
            let sd = [];
            let {
                keys
            } = wx.getStorageInfoSync()

            keys.forEach(function (key, index) {
                sd.push({
                    key: key,
                    value: wx.getStorageSync(key)
                })
            });


            return sd;
        },

        // 获取主要信息？每次请求都会发送
        getMainInfo: function () {
            let app = getApp() || {};
            let _page = getCurrentPages()[getCurrentPages().length - 1] || {};

            var a = {
                SystemData: {}, // 设备信息
                UserData: {}, //用户信息
                StorageData: {}, //本地存储信息
                LocationData: {}, //位置信息
                AppData: {}, //app.globalData 的数据
                PageRoute: {}, //路由信息
                PageUrl: {}, //页面地址
                PageOptions: {}, //页面参数
                PageData: {}, //page data 的数据 
                //  url: encodeURIComponent(getPagePath() + getQuery(MTA.Data.pageQuery)), // 页面路径
                UID: "", // 用户id
                SSID: "", // 会话id
                AppID: Track.Config.app_id,
                AppName: Track.Config.app_Name,
                Scene: ""
                //Token: "", //用户token
            };
            a.SystemData = JSON.stringify(wx.getSystemInfoSync());
            a.UserData = JSON.stringify(wx.getStorageSync(Track.ConfigStorage_UserData_Key));
            a.StorageData = JSON.stringify(Track.CommFun.getStorageData());
            a.LocationData = JSON.stringify(wx.getStorageSync(Track.Config.prefix + "getLocation"));
            a.AppData = JSON.stringify(app.globalData);
            a.PageRoute = JSON.stringify(Track.CommFun.getRoute());

            a.PageUrl = JSON.stringify(_page.route);
            a.PageOptions = JSON.stringify(_page.options);
            a.PageData = JSON.stringify(_page.data);
            a.Scene = JSON.stringify(wx.getStorageSync("scene"));
            // a.Token = wx.getStorageSync(Track.Config.Storage_Token_Key);
            a.UID = function () {
                var b = Track.CommFun.getUID();
                b || (b = Track.CommFun.setUID());
                return b
            }();
            a.SSID = function () {
                var a = Track.CommFun.getSID();
                a || (a = Track.CommFun.setSID());
                return a
            }();
            return a
        }

    },

    App: {
        init: function () {
            console.log("Track.Page.init", Page);
            Track.CommFun.setSID(); // 重置会话ID
            Track.CommFun.clearRoute(); //清空路由

            //记录场景值
            // let launchOptions = wx.getLaunchOptionsSync();
            // let mainInfo = Track.CommFun.getMainInfo();
            //TODO:记录场景值

            // Track.ttt.a("sdsfdsf");
            // initOnload()
            var _page = Page;
            Page = function (b) {
                var c = b.onLoad;
                b.onLoad = function (a) {

                    var _currPage = getCurrentPages()[getCurrentPages().length - 1];

                    Track.CommFun.pushRoute(_currPage.route);

                    Track.TrackWxFun.trackGetLocation(_currPage);
                    Track.TrackWxFun.trackGetUserInfo(_currPage);

                    Track.Page.InitEvent(_currPage);

                    let mmm = Track.CommFun.getMainInfo();


                    let data = {
                        ...mmm,
                        TrackType: "page",
                        FunctionName: "onLoad",
                        FunctionData: JSON.stringify(a)
                    }

                    console.log("apiVersion",request.apiVersion)

                    //request.postRequest("/Track/Track", data, function (res) {
                    request.TrackPostRequest("/Track/Track", data, function (res) {
                    }, (err) => {

                    });

                    // console.log("Track onLoad", mmm);
                    c && c.call(this, a);
                    Track.Page.init()

                };
                _page(b)
            }

            //为app.js 调用GetLocation时埋点
            Track.TrackWxFun.trackGetLocation()
        },

    },
    Page: {
        init: function () {
            const _page = getCurrentPages()[getCurrentPages().length - 1];

            _page.onShow && ! function () {
                let b = _page.onShow;
                _page.onShow = function (e) {
                    console.log("Track onShow", e, _page);
                    //  console.log(this, arguments);

                    Track.CommFun.pushRoute(_page.route); //添加路由


                    b.apply(this, arguments)
                    let mmm = Track.CommFun.getMainInfo();
                    let data = {
                        ...mmm,
                        TrackType: "page",
                        FunctionName: "onShow",
                        FunctionData: JSON.stringify(exports)
                    }

                    //request.postRequest("/Track/Track", data, function (res) {}, (err) => {});
                    request.TrackPostRequest("/Track/Track", data, function (res) {}, (err) => {});
                }
            }();
            _page.onReady && ! function () {
                let app = getApp();

                let b = _page.onReady;
                _page.onReady = function (e) {
                    b.apply(this, arguments)
                    let mmm = Track.CommFun.getMainInfo();
                    let data = {
                        ...mmm,
                        TrackType: "page",
                        FunctionName: "onReady",
                        FunctionData: JSON.stringify(e)
                    }

                    //request.postRequest("/Track/Track", data, function (res) {}, (err) => {});
                    request.TrackPostRequest("/Track/Track", data, function (res) {}, (err) => {});
                }
            }();
            _page.onHide && ! function () {
                let app = getApp();

                let b = _page.onHide;
                _page.onHide = function (e) {
                    b.apply(this, arguments)
                    let mmm = Track.CommFun.getMainInfo();
                    let data = {
                        ...mmm,
                        TrackType: "page",
                        FunctionName: "onHide",
                        FunctionData: JSON.stringify(e)
                    }

                    //request.postRequest("/Track/Track", data, function (res) {}, (err) => {});
                    request.TrackPostRequest("/Track/Track", data, function (res) {}, (err) => {});
                }
            }();
            _page.onUnload && ! function () {
                let app = getApp();

                let b = _page.onUnload;
                _page.onUnload = function (e) {
                    b.apply(this, arguments)
                    let mmm = Track.CommFun.getMainInfo();
                    let data = {
                        ...mmm,
                        TrackType: "page",
                        FunctionName: "onUnload",
                        FunctionData: JSON.stringify(e)
                    }

                    //request.postRequest("/Track/Track", data, function (res) {}, (err) => {});
                    request.TrackPostRequest("/Track/Track", data, function (res) {}, (err) => {});
                }
            }();

            _page.onShareAppMessage && ! function () {
                let app = getApp();

                let b = _page.onShareAppMessage;
                _page.onShareAppMessage = function (e) {
                    let rrr = b.apply(this, e)
                    // b && b.call(this, e);

                    let mmm = Track.CommFun.getMainInfo();
                    let data = {
                        ...mmm,
                        TrackType: "page",
                        FunctionName: "onShareAppMessage",
                        FunctionData: JSON.stringify(e)
                    }

                    //request.postRequest("/Track/Track", data, function (res) {}, (err) => {});
                    request.TrackPostRequest("/Track/Track", data, function (res) {}, (err) => {});

                    return rrr;
                }
            }();


        },
        initWxMethod: function () {
            var a = getCurrentPages()[getCurrentPages().length - 1];
            //  trackGetLocation(a);
        },
        InitEvent: function (currPage, methods) {

            var _currPage = currPage;
            let _methods = [];

            Object.getOwnPropertyNames(_currPage).forEach((item, index) => {
                if (item.endsWith("_tap")) {
                    _methods.push(item);
                    //  console.log(item);
                }
            })

            // console.log(_methods);
            _methods && _methods.forEach(function (m, i) {

                let method = _currPage[m]
                const _o_method = method;
                _currPage[m] = function (ops) {

                    //在此处进行数据埋点
                    let mmm = Track.CommFun.getMainInfo();
                    let data = {
                        ...mmm,
                        TrackType: "Function",
                        FunctionName: m,
                        FunctionData: JSON.stringify(ops)
                    }

                    //request.postRequest("/Track/Track", data, function (res) {
                    request.TrackPostRequest("/Track/Track", data, function (res) {
                    }, (err) => {

                    });

                    if (typeof _o_method === 'function') {
                        _o_method.call(this, ops);
                        //_o_method.apply(this, arguments)
                    }
                }
            })
        },

    },
    //事件上报
    Event: {
        //手动埋点
        ManualTrack: function (_TrackType, _FunctionName, _FunctionData, _FunctionExtData) {
            //在此处进行数据埋点
            let mmm = Track.CommFun.getMainInfo();

            console.log('=============手动埋点====================');
            console.log(_TrackType, _FunctionName, _FunctionData, _FunctionExtData);
            console.log('====================================');
            let data = {
                ...mmm,
                TrackType: _TrackType,
                FunctionName: _FunctionName,
                FunctionData: JSON.stringify(_FunctionData),
                FunctionExtData: JSON.stringify(_FunctionExtData)
            }

            //request.postRequest("/Track/Track", data, function (res) {
            request.TrackPostRequest("/Track/Track", data, function (res) {
            }, (err) => {

            });

        }
    },
}

module.exports = Track;