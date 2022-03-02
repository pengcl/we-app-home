//使用mock进入模拟数据请求 请求数据有 mock文件夹内定义

var __request = wx.request;
var Mock = require("mockjs")
Object.defineProperty(wx, "request", {
    writable: true
});
wx.request = function (config) {
    //console.log("bbbbbbbbbbbbb", config, Mock._mocked);
    let nurl = config.url + (config.method || '');

    if (typeof Mock._mocked[nurl] == "undefined") {
        __request(config);
        return
    }
   // var resrurl = Mock._mocked[nurl].rurl;
   // var resrtype = Mock._mocked[nurl].rtype;
    var resTemplate = Mock._mocked[nurl].template;
    var response = Mock.mock(resTemplate);

  // console.log("aaaaaaaaa", resrurl, resrtype, response);

    if (typeof config.success == "function") {
        config.success(response)
    }
    if (typeof config.complete == "function") {
        config.complete(response)
    }
};
module.exports = Mock;
