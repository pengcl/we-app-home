import md5 from "md5.js";
import util from "util.js";
import jwt from "jwt.js";

const app = getApp();

const Log_DEBUG = true;

var apiVersion = 22113; // 接口版本号，

var apiHost = "https://xyclientnew.ai-fox.net/api";
var TrackHost = "https://xyclientnew.ai-fox.net/api"; //埋点API地址
var apiMainHost = "https://xyclientnew.ai-fox.net/api"; //重要api专用

var tokenKey = "token";
// 登录地址, 根据这个地址来设置token
//var loginUrl = "/jwt/WxToken";
// 例外不用token的地址
var exceptionAddrArr = [
	//'http://localhost:8080',
];

/**
 * @param url:String  require(必需) 请求地址相对路径77
 * @param data:Object   可选  请求数据
 * @param success:Function  可选   成功回调函数
 * @param fail:Function     可选    失败回调函数
 */
function getRequest(url, data, success, fail) {
	let app = getApp();
	CreateHeader(url, data, function (header) {
		// console.log("CreateHeader call:", header, apiHost + url, data)
		wx.request({
			url: apiHost + url,
			method: "GET",
			data: data,
			header: header,
			success: function (res) {
				if (Log_DEBUG)
					console.log(
						"success: function (res)",
						res
					);

				if (success && typeof success === "function") {
					success(res);
				}
			},
			fail: function (error) {
				if (Log_DEBUG)
					console.log(
						"success: function (error)",
						error
					);
				if (fail && typeof fail === "function") {
					fail(error);
				} else {
					console.log(error);
				}
			},
		});
	});
}


/**
 * @param url:String  require(必需) 请求地址相对路径77
 * @param data:Object   可选  请求数据
 * @param success:Function  可选   成功回调函数
 * @param fail:Function     可选    失败回调函数
 */
function MainGetRequest(url, data, success, fail) {
	let app = getApp();
	CreateHeader(url, data, function (header) {
		// console.log("CreateHeader call:", header, apiHost + url, data)
		wx.request({
			url: apiMainHost + url,
			method: "GET",
			data: data,
			header: header,
			success: function (res) {
				if (Log_DEBUG)
					console.log(
						"success: function (res)",
						res
					);

				if (success && typeof success === "function") {
					success(res);
				}
			},
			fail: function (error) {
				if (Log_DEBUG)
					console.log(
						"success: function (error)",
						error
					);
				if (fail && typeof fail === "function") {
					fail(error);
				} else {
					console.log(error);
				}
			},
		});
	});
}




/**
 * @param url:String  require(必需) 请求地址相对路径
 * @param data:Object   可选  请求数据
 * @param success:Function  可选   成功回调函数
 * @param fail:Function     可选    失败回调函数
 */
function postRequest(url, data, success, fail) {
	CreateHeader(url, data, function (header) {
		wx.request({
			url: apiHost + url,
			method: "POST",
			data: data,
			header: header,
			success: function (res) {
				if (Log_DEBUG) console.log("postRequest", res);
				if (Log_DEBUG) console.log("postURL", apiHost + url);
				
				if (res.statusCode == 200) {
					//token授权已过期 则重新取token,重新调用请求
					if (res.data.StatusCode == 411) {
						console.warn("cccc", res);

						jwt.GetTokenForRePost(
							url,
							data,
							success,
							fail,
							postRequest
						);
					}
					if (
						success &&
						typeof success === "function"
					) {
						success(res.data);
					}
				} else {
					fail(res);
				}
			},
			fail: function (error) {
				if (Log_DEBUG) console.log(error);
				if (fail && typeof fail === "function") {
					fail(error);
				} else {
					console.error(error);
				}
			},
		});
	});
}


/**
 * @param url:String  require(必需) 请求地址相对路径
 * @param data:Object   可选  请求数据
 * @param success:Function  可选   成功回调函数
 * @param fail:Function     可选    失败回调函数
 */
function MainPostRequest(url, data, success, fail) {
	CreateHeader(url, data, function (header) {
		wx.request({
			url: apiMainHost + url,
			method: "POST",
			data: data,
			header: header,
			success: function (res) {
				if (Log_DEBUG) console.log("postRequest", res);
				if (Log_DEBUG) console.log("postURL", apiHost + url);
				
				if (res.statusCode == 200) {
					//token授权已过期 则重新取token,重新调用请求
					if (res.data.StatusCode == 411) {
						console.warn("cccc", res);

						jwt.GetTokenForRePost(
							url,
							data,
							success,
							fail,
							postRequest
						);
					}
					if (
						success &&
						typeof success === "function"
					) {
						success(res.data);
					}
				} else {
					fail(res);
				}
			},
			fail: function (error) {
				if (Log_DEBUG) console.log(error);
				if (fail && typeof fail === "function") {
					fail(error);
				} else {
					console.error(error);
				}
			},
		});
	});
}

/**
 * @param url:String  require(必需) 请求地址相对路径
 * @param data:Object   可选  请求数据
 * @param success:Function  可选   成功回调函数
 * @param fail:Function     可选    失败回调函数
 */
function TrackPostRequest(url, data, success, fail) {
	CreateHeader(url, data, function (header) {
		wx.request({
			url: TrackHost + url,
			method: "POST",
			data: data,
			header: header,
			success: function (res) {
				if (Log_DEBUG) console.log("postRequest", res);
				if (Log_DEBUG) console.log("postURL", TrackHost + url);
				
				if (res.statusCode == 200) {
					//token授权已过期 则重新取token,重新调用请求
					if (res.data.StatusCode == 411) {
						console.warn("cccc", res);

						jwt.GetTokenForRePost(
							url,
							data,
							success,
							fail,
							postRequest
						);
					}
					if (
						success &&
						typeof success === "function"
					) {
						success(res.data);
					}
				} else {
					fail(res);
				}
			},
			fail: function (error) {
				if (Log_DEBUG) console.log(error);
				if (fail && typeof fail === "function") {
					fail(error);
				} else {
					console.error(error);
				}
			},
		});
	});
}





function uploadImageFile(filePath, formData, success, fail) {
	wx.uploadFile({
		url: apiHost + "/File/WxPostFile", //仅为示例，非真实的接口地址
		filePath: filePath,
		name: "file",
		formData: formData,
		success(res) {
			if (res.statusCode == 200) {
				if (success && typeof success === "function") {
					success(res.data);
				}
			} else {
				fail(res);
			}
		},
		fail: function (error) {
			console.log(error);
			if (fail && typeof fail === "function") {
				fail(error);
			} else {
				console.error(error);
			}
		},
	});
}
/**
 * @param url:String    请求地址(根据请求地址判断是否添加token)
 * @param complete:Function 回调函数
 */
function CreateHeader(url, data, complete) {
	var app = getApp();
	var header = {
		"content-type": "application/json",
	};
	if (exceptionAddrArr.indexOf(url) == -1) {
		//排除请求的地址不需要token的地址

		var token = wx.getStorageSync(tokenKey);
		//  var openid = wx.getStorageSync(openidKey);

		if (token === null) {
			console.error("token 为空");
			//TODO: 跳转登陆授权
		}

		header.apiVersion = apiVersion;
		header.token = token;
		header.timestamp = Math.round(new Date()); //毫秒
		header.nonce = util.RandomString(9);
		if (Log_DEBUG) console.log("app", app);

		let securityKey = app
			? app.globalData.securityKey
			: "dd%88*377f6df$$FdddFF33fssDG^!3";

		header.signature = makeSign(
			header.timestamp,
			header.nonce,
			token,
			securityKey,
			data
		);

		if (Log_DEBUG)
			console.log(
				"header",
				header,
				typeof complete,
				typeof complete === "Function"
			);
		complete(header);
		//complete && typeof complete === 'Function' ? complete(header) : null;
	} else {
		complete(header);
		//complete && typeof complete === 'Function' ? complete(header) : null;
	}
}

/**
 *  数组对象按key升序, 并生成 md5_hex 签名
 * @param openid: string OPENID
 * @param timestamp: int 时间戳
 * @param nonce: string 随机字符串
 * @param token: string   口令
 * @param securityKey: string 本地加密钥
 * @param {Array/Object} data   数组对象
 * @return {String}  encrypted md5加密后的字符串
 */
function makeSign(timestamp, nonce, token, securityKey, data) {
	if (!data) {
		console.error("需要加密的数组对象为空");
	}
	var str = "";

	if (!securityKey) {
		console.error("密钥未获取");
	}
	//生成key升序数组
	var arr = Object.keys(data);
	//console.log("arr", arr);

	//arr.sort();
	arr.sort(function (s, t) {
		var a = s.toLowerCase();
		var b = t.toLowerCase();
		if (a < b) return -1;
		if (a > b) return 1;
		return 0;
	});

	//console.log("arr2", arr);
	for (var i in arr) {
		if (data[arr[i]] != null) {
			str += "&" + arr[i] + "=" + data[arr[i]];
		}
	}
	str = timestamp + nonce + token + securityKey + str;
	if (Log_DEBUG) console.log("MD5 str1", str);
	var encrypted = md5(str);
	return encrypted;
}

//module.exports.getRequest = getRequest;
//module.exports.postRequest = postRequest;

module.exports = {
	apiVersion: apiVersion,
	getRequest: getRequest,
	MainGetRequest: MainGetRequest,
	postRequest: postRequest,
	uploadImageFile: uploadImageFile,
	TrackPostRequest: TrackPostRequest,
	MainPostRequest: MainPostRequest,
};
