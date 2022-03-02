import request from "request.js";

function GetToken(successFun) {
	wx.login({
		success: res => {
			// jwt.GetToken(res.code);

			var data = {
				wxcode: res.code,
				comeCode: wx.getStorageSync("comecode"),
			};
			//console.log("jwtwxcode",res.code);
			
			request.getRequest("/JWT/WxToken", data, function (
				res
			) {
			 console.log("wxcode", res);
				if (
					res.statusCode == 200 &&
					res.data.StatusCode == 200
				) {
					// console.log("wxcode statusCode", res.data.Data);
					var data = res.data.Data;
					// wx.setStorageSync({
					//     key: "token",
					//     data: token
					// });

					
					wx.setStorageSync(
						"token",
						 data.token,
					);
					wx.setStorageSync(
						"userAgreementVersion",
						 data.userAgreementVersion,
					);
					wx.setStorageSync(
						 "wxAgreementVersion",
						 data.wxAgreementVersion,
					);

					//如果用户协议版本相同，就自己登陆手机
					if (
						data.userAgreementVersion ==
							data.wxAgreementVersion &&
						data.PhoneNum != null
					) {
						wx.setStorage({
							key: "PhoneNum",
							data: data.PhoneNum,
						});
						wx.setStorage({
							key: "phoneNumSignText",
							data:
								data.phoneNumSignText,
						});
					} else {
						//如果用户协议版本不相同，就清空当前手机
						wx.removeStorage({
							key: "PhoneNum",
						});
						wx.removeStorage({
							key: "phoneNumSignText",
						});
					}

					if (
						successFun &&
						typeof successFun === "function"
					) {
						successFun();
					}
				}
			});
		},
	});
}

function GetTokenForRePost(url, data, success, fail, rePost) {
	wx.login({
		success: res => {
			// jwt.GetToken(res.code);

			var data = {
				wxcode: res.code,
			};

			request.getRequest("/JWT/WxToken", data, function (
				res
			) {
				//  console.log("wxcode", res);
				if (
					res.statusCode == 200 &&
					res.data.StatusCode == 200
				) {
					wx.setStorageSync({
						key: "token",
						data: res.data.Data,
					});
					if (
						successFun &&
						typeof successFun === "function"
					) {
						rePost(
							url,
							data,
							success,
							fail
						);
					}
				}
			});
		},
	});
}

module.exports = {
	GetToken: GetToken,
};
