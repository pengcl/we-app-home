
import util from "../../../../utils/util.js";
import request from "../../../../utils/request";
import jwt from "../../../../utils/jwt.js";

let app = getApp();
var vdomain = app.globalData.domain;

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		current: 't1',

		domain: "https://xyclientnew.ai-fox.net/",
		ProjectCommunity_Gid: "852FA663-9EA1-44F9-A109-1C8990266D92",
		windowHeight: wx.getSystemInfoSync().windowHeight,
		//YuYue_Cache: false,
		YuYue_UserName: "",
		YuYue_UserPhone: "",
		scrollintoview: "",
		pageData: [],
		SalerList: [],
		adModalShow: false,
		hasPhoneNum: false,

		query:[],
		scrollTop:0,
		sexType:'M',
		maskShow:false,
		yytitle: "",
		yyBackground: "",
		yyConfirm: "",
		yybtn: "",
		fxbtn: "",
		zxbtn: "",
		fgx:"",

		btn_Auth:true,
	},



//点击跳转到板块一
click1: function () {
	wx.pageScrollTo({
		scrollTop: 0  
	})
},
//点击跳转到板块二
click2: function () {
	var this_query=wx.createSelectorQuery();

	this_query.select('.xiangmu').boundingClientRect();
	this_query.exec(function(res){
		wx.pageScrollTo({
			scrollTop: res[0].height +22 , 
		})
	})
},
//点击跳转到板块三
 click3: function () {
	var this_query=wx.createSelectorQuery();
			 
	this_query.select('.xiangmu').boundingClientRect();
	this_query.select('.loushu').boundingClientRect();

	this_query.exec(function(res){
			wx.pageScrollTo({
				scrollTop: res[0].height + res[1].height +22 , 
			})
	}
)},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log("aaa onLoad");
		let _this = this;
		console.log("aaa 3");

		this.setData({
			domain: app.globalData.domain,
			windowHeight: wx.getSystemInfoSync().windowHeight,
			adModalShow: true,
			hasPhoneNum:(wx.getStorageSync("PhoneNum") || "") != "",

				YuYue_UserPhone : wx.getStorageSync("PhoneNum"),
		});


		var vdm =this.data.domain;
		this.setData({
			iconW: vdm + '/image/referral/icon1.png',
				iconM: vdm + '/image/referral/icon2.png',
				
				yybtn:  vdm + "image/kyw/20210819/yy.png",
				fxbtn:  vdm + "image/kyw/20210819/gs.png",
				zxbtn:  vdm + "image/kyw/20210819/zx.png",
					fgx:  vdm + "image/kyw/20210819/line.png",

				yytitle: vdm + "image/kyw/20210819/yuyueTitle.png",
				yyBackground: vdm + "image/kyw/20210819/yuyueBG.png",
				yyConfirm: vdm + "image/kyw/20210819/yuyueConfirm.png",
		});



		// if(_this.data.YuYue_UserPhone == null || _this.data.YuYue_UserPhone ==''){
		// 	_this.setData({
		// 		btn_Auth:false,
		// 	})
		// }

		console.log("aaa 4");
		_this.setData({
			// YuYue_UserName: wx.getStorageSync('YuYue_UserName'),
			YuYue_UserPhone: wx.getStorageSync("PhoneNum"),
		});

		//console.log(
		//	"aaa 5",
		//	app.appIsOnloadCallback,
		//	app.appIsOnloadCallback == null
		//);
		//if (app.appIsOnloadCallback == null) {


			request.MainGetRequest(
				"/Page/KYW_index",
				{},
				function (res) {
					_this.setData({
						pageData: res.data,
					});
				}
			);


		if (app.globalData.appIsOnload == false) {
			app.appIsOnloadCallback = () => {
				console.log("aaa 1");

				//request.getRequest(
				//	"/Page/KYW_index",
				//	{},
				//	function (res) {
				//		_this.setData({
				//			pageData: res.data,
				//		});
				//	}
				//);

				// let data = {
				// 	ProjectGID: this.data
				// 		.ProjectCommunity_Gid,
				// };
				// request.postRequest(
				// 	"/Saler/SalerList",
				// 	data,
				// 	function (res) {
				// 		let _SalerList = [
				// 			{
				// 				id: 0,
				// 				usercode: 0,
				// 				username:
				// 					"未选择",
				// 				userphone: "",
				// 			},
				// 			...res.Data,
				// 		];

				// 		_this.setData({
				// 			SalerList: _SalerList,
				// 		});
				// 	}
				// );
			};
		} else {
			console.log("aaa 2");
			//request.getRequest("/Page/KYW_index", {}, function (
			//	res
			//) {
			//	_this.setData({
			//		pageData: res.data,
			//	});
			//});

			// let data = {
			// 	ProjectGID: this.data.ProjectCommunity_Gid,
			// };
			// request.postRequest("/Saler/SalerList", data, function (
			// 	res
			// ) {
			// 	let _SalerList = [
			// 		{
			// 			id: 0,
			// 			usercode: 0,
			// 			username: "未选择",
			// 			userphone: "",
			// 		},
			// 		...res.Data,
			// 	];

			// 	_this.setData({
			// 		SalerList: _SalerList,
			// 	});
			// });
		}
		_this.AddUserWXLogin();

		_this.GetTT();
	},

	AddUserWXLogin: function () {
		var ProjectGID = this.data.ProjectCommunity_Gid;
		var PhoneNum = wx.getStorageSync("PhoneNum");
		var comecode = wx.getStorageSync("comecode");
		console.log("ProjectGID", ProjectGID);
		let data1 = {
			nickname: "",
			avatarUrl: "",
			gender: "",
			province: "",
			city: "",
			country: "",
			comefrom: "projectindex",
			comecode: comecode,
			ProjectGID: ProjectGID,
			UserPhone: PhoneNum,
		};

		request.postRequest("/User/UserWXLogin", data1, function (res) {
			// if (res.StatusCode == 200) {
			//     let vpageUrl = that.data.pageUrl
			//     wx.redirectTo({
			//         url: vpageUrl,
			//     })
			// }
			console.log("res111", res);
		});
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		//强制取手机号授权
		/*
		var time = util.formatTime(new Date());
		if (
			(time >= "2020/08/29 17:00:00" &&
				time <= "2020/08/29 22:00:00") ||
			(time >= "2020/08/30 17:00:00" &&
				time <= "2020/08/30 22:00:00")
		) {
			//1获取系统中是否已授权过手机号
			//2如果没有授权，直接跳转到授权页面
			jwt.GetToken(() => {
				let PhoneNum = wx.getStorageSync("PhoneNum");

				if (
					PhoneNum == null ||
					PhoneNum == undefined ||
					PhoneNum == ""
				) {
					wx.navigateTo({
						url:
							"/pages2/permission/phone/phone",
					});
				}
			});
		}
		//强制取手机号授权 END
		*/
		this.setData({
			YuYue_UserPhone: wx.getStorageSync("PhoneNum"),
		});
		if(this.data.YuYue_UserPhone == null || this.data.YuYue_UserPhone ==''){
			this.setData({
				btn_Auth:false,
			})
		}
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {
		var _this=this
		
		return {
			title: "新世界·凯粤湾",
			imageUrl: _this.data.pageData.ShareImg,
		};
	},
	hideAdModal: function (e) {
		this.setData({
			adModalShow: false,
		});
		// console.log();
	},
	//弹窗广告 点击事件
	admodal_tap: function (e) {
		let _this = this;
		console.log("getPhoneNumber", e);
		if (e.detail.errMsg === "getPhoneNumber:ok") {
			wx.login({
				success: function (res) {
					if (res.code != "") {
						// var comecode = wx.getStorageSync('comecode');
						let data = {
							code: res.code,
							iv: e.detail.iv,
							encryptedData:
								e.detail
									.encryptedData,
							comecode: wx.getStorageSync(
								"comecode"
							),
						};

						request.postRequest(
							"/User/PhoneNumberInfo",
							data,
							function (res) {
								if (
									res.StatusCode ==
									200
								) {
									wx.setStorageSync(
										"PhoneNum",
										res
											.Data
											.phoneNumber
									);
									wx.setStorageSync(
										"PhoneNumSign",
										res
											.Data
											.PhoneNumSignText
									);

									_this.setData(
										{
											hasPhoneNum: true,
										}
									);
								}

								_this.AddUserWXLogin();
							},
							function (e) {}
						);
					} else {
					}
				},
			});
		}

		let type = e.currentTarget.dataset.type;
		let url = e.currentTarget.dataset.url;
		let data = e.currentTarget.dataset.data;

		if (type === "url") {
			wx.navigateTo({
				url: url,
			});
		} else {
			wx.navigateToMiniProgram({
				...data,
				success(res) {
					// 打开成功
					console.log(1);
				},
			});
		}
	},
	exSideMenu_tap: function (e) {
		let _this = this;
		console.log("getPhoneNumber", e);
		if (e.detail.errMsg === "getPhoneNumber:ok") {
			wx.login({
				success: function (res) {
					if (res.code != "") {
						// var comecode = wx.getStorageSync('comecode');
						let data = {
							code: res.code,
							iv: e.detail.iv,
							encryptedData:
								e.detail
									.encryptedData,
							comecode: wx.getStorageSync(
								"comecode"
							),
						};

						request.postRequest(
							"/User/PhoneNumberInfo",
							data,
							function (res) {
								if (
									res.StatusCode ==
									200
								) {
									wx.setStorageSync(
										"PhoneNum",
										res
											.Data
											.phoneNumber
									);
									wx.setStorageSync(
										"PhoneNumSign",
										res
											.Data
											.PhoneNumSignText
									);

									_this.setData(
										{
											hasPhoneNum: true,
										}
									);
								}

								_this.AddUserWXLogin();
							},
							function (e) {}
						);
					} else {
					}
				},
			});
		}

		if (_this.data.hasPhoneNum==true)
		{
		let type = e.currentTarget.dataset.type;
		let url = e.currentTarget.dataset.url;
		let data = e.currentTarget.dataset.data;

		// console.log(type, url, data);

		if (type === "url") {
			wx.navigateTo({
				url: url,
			});
		} else {
			wx.navigateToMiniProgram({
				...data,
				success(res) {
					// 打开成功
					console.log(1);
				},
			});
		}
		}
	},
	vr_tap: function (e) {
		let vrurl = escape(e.currentTarget.dataset.vrurl);
		console.log("currentTarget.dataset.vrurl", vrurl);
		wx.navigateTo({
			url: "../huxingvr/huxingvr?vrurl=" + vrurl,
		});
	},
	goYuYue: function (e) {
		wx.pageScrollTo({
			selector: "#YuYue",
			duration: 500,
		});
	},
	view_YuYue_tap: function (e) {
		console.log("view_YuYue_tap");

		if ((wx.getStorageSync("PhoneNum") || "") == "") {
			let _this = this;
			if (!_this.data.PhoneNumStatus) {
				wx.navigateTo({
					url: "/pages2/permission/phone/phone",
				});
			}
		}
	},
	// YuYue_Cache_tap: function (e) {
	//   let YuYue_Cache = this.data.YuYue_Cache || false
	//   this.setData({
	//     YuYue_Cache: !YuYue_Cache
	//   })
	// },
	YuYue_UserName_input: function (e) {
		this.setData({
			YuYue_UserName: e.detail.value,
		});
	},
	YuYue_UserPhone_input: function (e) {
		this.setData({
			YuYue_UserPhone: e.detail.value,
		});
	},
	YuYue_tap: function (e) {

		let that =this;

		if (this.data.YuYue_UserName == "") {
			wx.showToast({
				title: "请输入姓名",
				icon: "none",
				mask: true,
				duration: 2000,
			});
			return;
		}
		if (!util.isPhone(this.data.YuYue_UserPhone)) {
			wx.showToast({
				title: "手机号不正确",
				icon: "none",
				mask: true,
				duration: 2000,
			});
			return;
		}

		wx.showLoading({
			title: "提交中...",
		});

		let SalerName = "";
		let SalerCode = "";
		let setType = (that.data.sexType == 'M' ? '先生' :'女士');
		if (
			that.data.currSaler != null &&
			that.data.currSaler.username != "未选择"
		) {
			SalerName = that.data.currSaler.username;
			SalerCode = that.data.currSaler.usercode;
		}
		let data = {
			ProjectGid: that.data.ProjectCommunity_Gid,
			UserName: that.data.YuYue_UserName + setType,
			UserPhone: that.data.YuYue_UserPhone,
			SalerName: SalerName,
			SalerCode: SalerCode,
		};

		request.postRequest(
			"/YuYue/YuYue",
			data,
			function (res) {
				if (res.Data.StatusCode == "Y") {
					wx.hideLoading();
					setTimeout(function(){
						wx.showToast({
							title:"预约成功，稍后会有置业顾问会与您联系",
							icon: "none",
							mask: true,
							duration: 3000,
						});
						that.setData({
							YuYue_UserName: "",
							YuYue_UserPhone: "",
						});
					  setTimeout(function () {
							that.setData({
								maskShow:false
							});}, 2500);

					},1000)
				} 
				else {
					wx.showToast({
						title: "预约失败，请稍后重试",
						icon: "none",
						mask: true,
						duration: 2000,
					});
				}
			},
			err => {
				console.log(err);
				wx.hideLoading();
			}
		);
	},
	swiper_change: function (e) {
		console.log("====================================");
		console.log(e);
		console.log("====================================");
		let index = e.detail.current;
		let _this = this;
		this.setData({
			hasVR: _this.data.HuXingList[index].hasVR,
			currHuXing: _this.data.HuXingList[index],
		});
	},

	map_tap: function (e) {
		var lat = 23.115682,
			lng = 113.214669,
			vname = "新世界中国租售体验中心",
			vaddress = "广东省广州市荔湾区芳村大道西236号";
		wx.openLocation({
			type: "gcj02",
			latitude: lat,
			longitude: lng,
			name: vname,
			address: vaddress,
			scale: "16",
			success: function (res) {},
			fail: function (res) {},
		});
	},
	onPageScroll: function (e) {
		let _this = this;
		const query = wx.createSelectorQuery();

		query.selectAll(".video").fields(
			{
				id: true,
				context: true,
				scrollOffset: true,
				rect: true,
			},
			function (res) {
				// console.log("res", res)
				res.forEach((item, i) => {
					if (
						item.bottom <
							(item.bottom -
								item.top) /
								2 ||
						item.top >
							_this.data
								.windowHeight -
								(item.bottom -
									item.top) /
									2
					) {
						item.context.pause();
						//  console.log(item.id, "pause", item.bottom, (item.bottom - item.top) / 2, item.top, _this.data.windowHeight - (item.bottom - item.top) / 2);
					} else {
						item.context.play();
						//  console.log(item.id, "play", item.bottom, (item.bottom - item.top) / 2, item.top, _this.data.windowHeight - (item.bottom - item.top) / 2);
					}
				});
			}
		);
		query.exec();

    // console.log('scrollTop',e.scrollTop)
		// console.log('query',that.data.query)
		//var	query = that.data.query;
		
		var view_query=wx.createSelectorQuery();
			 
		view_query.select('.xiangmu').boundingClientRect();
		view_query.select('.loushu').boundingClientRect();
		view_query.select('.toutiao').boundingClientRect();
		
	　　　// 获取每个元素顶部距离和高度
		view_query.exec(function(res){
	
			var cur = _this.data.current;

			if(e.scrollTop>=0 && e.scrollTop< res[0].height +15){
				if(cur != 't1'){
					_this.setData({
						current:'t1',
					})
				}
			}
			else if(e.scrollTop>=res[0].height +15 && e.scrollTop< (res[0].height + res[1].height +15)){
				if(cur != 't2'){
					_this.setData({
						current:'t2',
					})
				}
			}
			else if(e.scrollTop>=(res[0].height + res[1].height +15)){
				if(cur != 't3'){
					_this.setData({
						current:'t3',
					})
				}
			}
		 })
	},
	wechat_tap: function (e) {
		var ProjectGID = this.data.ProjectCommunity_Gid;
		wx.navigateTo({
			url:
				"/pages/im/imselect/imselect?ProjectGID=" +
				ProjectGID,
		});
	},
	benefit12_tap: function (e) {
		wx.navigateTo({
			url: "/pages2/activity/activity01/pay/main",
		});
	},
	bindSalerPickerChange: function (e) {
		let _this = this;
		console.log(e);
		this.setData({
			currSaler: _this.data.SalerList[e.detail.value],
		});
	},
	banner_tap: function (e) {
		let type = e.currentTarget.dataset.type;
		let url = e.currentTarget.dataset.url;
		let data = e.currentTarget.dataset.data;

		if (type === "url" && url != null) {
			wx.navigateTo({
				url: url,
			});
		} else if (type === "wxapp" && url != null) {
			wx.navigateToMiniProgram({
				...data,
				success(res) {
					// 打开成功
					console.log(1);
				},
			});
		}
	},


	h5view_tap: function (e) {
		let url = e.currentTarget.dataset.url;
		let gid = e.currentTarget.dataset.gid;
		this.ToutiaoClickAdd(gid);
		wx.navigateTo({
			url: "../../../../pages/toutiao/view/h5view?url=" + escape(url),
		});
	},
	xcxView_tap: function (e) {
		let path = e.currentTarget.dataset.xcxpath;
		let wxid=e.currentTarget.dataset.xcxappid;
		let gid = e.currentTarget.dataset.gid;
		this.ToutiaoClickAdd(gid);
		wx.navigateToMiniProgram({
			appId: wxid,
			path: path,
		});
	},
	nwview_tap: function (e) {
		let gid = e.currentTarget.dataset.gid;
		this.ToutiaoClickAdd(gid);
		wx.navigateTo({
			url: "../../../../pages/toutiao/view/view?gid=" + gid,
		});
	},

  LS1_tap: function (e) {
		let url = this.data.pageData.loushuUrl;
		console.log("aaaurl",url);
		url = unescape(url);
		//let url = unescape("https://yanrunweb.wbdev.cn/yrweb/guanggao/1107ghzf/index.html");
		wx.navigateTo({
			url: "../../../../pages/toutiao/view/h5view?url=" + escape(url),
		});
	},

	LS_tap:function(e)
	{
		let that = this;
		var phonenum = wx.getStorageSync('PhoneNum');
		console.log("phonenum",phonenum);
		if (phonenum==""||phonenum=="undefined")
		{
			wx.navigateTo({
				url: "/pages2/permission/phone/phone"
			});
		}
		else
		{
			
			if (app.globalData.appIsOnload) {
				//that.postdata1();
				that.LS1_tap(e);
			} else {
				app.appIsOnloadCallback = () => {
					//that.postdata1();
					that.LS1_tap(e);
				}
			}
		}

	},

	GetTT:function()
	{
		  let _this = this;
			request.getRequest(
				"/Toutiao/list",
				{"ProjectGID":"852FA663-9EA1-44F9-A109-1C8990266D92"},
				function (res) {
					if (res.data.StatusCode == 200) {
						_this.setData({
							NWList: res.data.Data,
						});
					} else {
						// wx.showToast({
						//   title: '网络异常，请稍后重试！',
						//   icon: 'none',
						//   duration: 1000
						// })
					}
				},
				err => {
					console.log(err);
				}
			);

	},

	ToutiaoClickAdd: function (gid) {
		console.log("gid111",gid);
		let data1 = {
			gid: gid,
		};
		request.postRequest("/Toutiao/clickadd", data1, function (res) {
			console.log("res111",res);
		});
	},
	
	maskShow_tap:function(){

		let _this = this;
		//获取置业顾问

		let data = {
			ProjectGID: this.data
				.ProjectCommunity_Gid,
		};
		request.postRequest(
			"/Saler/SalerList",
			data,
			function (res) {
				let _SalerList = [
					{
						id: 0,
						usercode: 0,
						username:
							"未选择",
						userphone: "",
					},
					...res.Data,
				];

				_this.setData({
					SalerList: _SalerList,
				});
			}
		);







		let that =this;
		that.setData({
			maskShow :true,
		})
	},
	maskHide_tap:function(){
		let that =this;
		that.setData({
			maskShow :false,
		})
	},
	callPhone_tap: function(e){
		wx.makePhoneCall({
			phoneNumber: '020-81698888' 
		})
	},

	getPhoneNumber: function (e) {
    let _this = this;
    var comecode = wx.getStorageSync("comecode");

    wx.login({
      success: function (res) {
        if (res.code != "") {
          let data = {
            code: res.code,
            iv: e.detail.iv,
            encryptedData: e.detail.encryptedData,
            comecode: comecode,
          };

          request.postRequest(
            "/User/PhoneNumberInfo",
            data,
            function (res) {
              if (
                res.StatusCode ==
                200
              ) {
                wx.setStorageSync(
                  "PhoneNum",
                  res.Data
                  .phoneNumber
                );
                wx.setStorageSync(
                  "PhoneNumSign",
                  res.Data
                  .PhoneNumSignText
                );
                let wxAgreementVersion = wx.getStorageSync(
                  "wxAgreementVersion"
                );
                wx.setStorage({
                  key: "userAgreementVersion",
                  data: wxAgreementVersion,
                });

                _this.setData({
                  YuYue_UserPhone: res.Data.phoneNumber
                })
							}
							else{
								wx.showToast({
									title: "授权失败，请稍后重试",
									icon: "none",
									duration: 2000,
								});
							}
            },
            function (e) {
              wx.showToast({
                title: "授权失败，请稍后重试",
                icon: "none",
                duration: 2000,
              });
            }
          );
        } else {}
      },
    });
	},
	ChangeSex_tap: function (e) {
    let value = e.currentTarget.dataset.value;
    let that = this

    if (value == "M") {
      that.setData({
        sexType: 'M',
        iconM: vdomain + '/image/referral/icon2.png',
        iconW: vdomain + '/image/referral/icon1.png'
      })
    } else {
      that.setData({
        sexType: 'W',
        iconM: vdomain + '/image/referral/icon1.png',
        iconW: vdomain + '/image/referral/icon2.png'
      })
    }
  },

});
