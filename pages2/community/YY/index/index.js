// pages2/community/YY/index/index.js
import util from "../../../../utils/util.js";
import request from "../../../../utils/request";

var app = getApp();
var vdomain = app.globalData.domain;

Page({
	/**
	 * 页面的初始数据
	 */
	data: {

    current: 't1',
		current_scroll: 't1',
		domain: "https://xyclientnew.ai-fox.net/",
		ProjectCommunity_Gid: "152E7F4B-55F0-4E2C-BBD3-684AF00CB499",
		windowHeight: 0,
		// hasVR: true,
		currHuXingVR: "",
		scrollintoview: "",
		// YuYue_Cache: false,
		YuYue_UserName: "",
		YuYue_UserPhone: "",
		pageData: [],
		SalerList: [],
		hasPhoneNum: true,

		adModalShow: false,


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


	
handleChange ({ detail }) {
		this.setData({
				current: detail.key
		});
},
		
handleChangeScroll ({ detail }) {
		this.setData({
				current_scroll: detail.key
		});
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
		let _this = this;
		this.setData({
			domain: app.globalData.domain,
			
			// hasVR: _this.data.HuXingList[0].hasVR,
			// currHuXing: _this.data.HuXingList[0],
			windowHeight: wx.getSystemInfoSync().windowHeight,
			hasPhoneNum:
				(wx.getStorageSync("PhoneNum") || "") != "",
		});

		var vdm = app.globalData.domain;




		_this.setData({
			YuYue_UserPhone: wx.getStorageSync("PhoneNum"),

			iconW: vdm + '/image/referral/icon1.png',
				iconM: vdm + '/image/referral/icon2.png',
				
				yybtn:  vdm + "image/loushu/yy.png",
				fxbtn:  vdm + "image/loushu/gs.png",
				zxbtn:  vdm + "image/loushu/zx.png",
					fgx:  vdm + "image/loushu/line.png",

				yytitle: vdm + "image/loushu/yuyueTitle.png",
				yyBackground: vdm + "image/loushu/yuyueBG.png",
				yyConfirm: vdm + "image/loushu/yuyueConfirm.png",
		});


		request.MainGetRequest(
			"/Page/YY_index",
			{},
			function (res) {
				console.log("res111222",res);
				_this.setData({
					pageData: res.data,
				});
			}
		);



		//if (app.appIsOnloadCallback == null) {
		if (app.globalData.appIsOnload == false) {
			app.appIsOnloadCallback = () => {
				//request.getRequest(
				//	"/Page/YY_index",
				//	{},
				//	function (res) {
				//		console.log("res111222",res);
				//		_this.setData({
				//			pageData: res.data,
				//		});
				//	}
				//);
				
			};
		} else {
			//request.getRequest("/Page/YY_index", {}, function (
			//	res
			//) {
			//	console.log("res111222",res);
			//	_this.setData({
			//		pageData: res.data,
			//	});
			//});
		
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
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		var that =this;

		setTimeout(function(){
			that.setData({
				adModalShow: true,
			})
		},1000)
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

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
		var _this = this;

		return {
			title: "新世界云耀",
			imageUrl: _this.data.pageData.ShareImg,
		};
	},
	// onPageScroll: function (e) {
	// 	let _this = this;
	// 	const query = wx.createSelectorQuery();

	// 	query.selectAll(".video").fields(
	// 		{
	// 			id: true,
	// 			context: true,
	// 			scrollOffset: true,
	// 			rect: true,
	// 		},
	// 		function (res) {
	// 			// console.log(item.id, "pause", item.bottom, (item.bottom - item.top) / 2,

	// 			// console.log("res", res)
	// 			res.forEach((item, i) => {
	// 				if (
	// 					item.bottom <
	// 						(item.bottom -
	// 							item.top) /
	// 							2 ||
	// 					item.top >
	// 						_this.data
	// 							.windowHeight -
	// 							(item.bottom -
	// 								item.top) /
	// 								2
	// 				) {
	// 					item.context.pause();
	// 					console.log(
	// 						"item.bottom",
	// 						item.id,
	// 						item.bottom
	// 					);
	// 				} else {
	// 					item.context.play();
	// 					console.log(
	// 						"item.bottom",
	// 						item.id,
	// 						item.bottom
	// 					);
	// 					// console.log(item.id, "play", item.bottom, (item.bottom - item.top) / 2, item.top, _this.data.windowHeight - (item.bottom - item.top) / 2);
	// 				}
	// 			});
	// 		}
	// 	);
	// 	query.exec();
	// },
	img_tap: function (e) {
		console.log(
			e.currentTarget.dataset.code,
			e.currentTarget.dataset.code || "",
			(e.currentTarget.dataset.code || "") != ""
		);

		if ((e.currentTarget.dataset.code || "") != "") {
			wx.navigateTo({
				url:
					"../detail/detail?code=" +
					e.currentTarget.dataset.code,
			});
		}
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
		let that = this;
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
		if (
			this.data.currSaler != null &&
			this.data.currSaler.username != "未选择"
		) {
			SalerName = this.data.currSaler.username;
			SalerCode = this.data.currSaler.usercode;
		}
		let data = {
			ProjectGid: this.data.ProjectCommunity_Gid,
			UserName: this.data.YuYue_UserName,
			UserPhone: this.data.YuYue_UserPhone,
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
		let vrurl = e.detail.currentItemId;
		let _this = this;
		this.setData({
			// hasVR: _this.data.HuXingList[index].hasVR,
			currHuXingVR: vrurl,
		});
	},
	sheying_tap: function (e) {
		wx.navigateTo({
			url:
				"/pages2/activity/photocontest/main/main?contestCode=contest0001",
		});
	},
	
	map_tap: function (e) {
		var lat = 23.232102,
			lng = 113.294305,
			vname = "云耀•新世界中国租售体验中心",
			vaddress = "广东省广州市白云区白云大道北1689号";
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
	view_scroll: function (e) {
		// let _this = this;
		// const query = wx.createSelectorQuery()
		// query.selectAll('.video').fields({
		//   id: true,
		//   context: true,
		//   scrollOffset: true,
		//   rect: true
		// }, function (res) {
		//   // console.log("res", res)
		//   res.forEach((item, i) => {
		//     if ((item.bottom < (item.bottom - item.top) / 2) ||
		//       (item.top > _this.data.windowHeight - (item.bottom - item.top) / 2)) {
		//       item.context.pause();
		//         console.log(item.id, "pause", item.bottom, (item.bottom - item.top) / 2, item.top, _this.data.windowHeight - (item.bottom - item.top) / 2);
		//     } else {
		//       item.context.play();
		//        console.log(item.id, "play", item.bottom, (item.bottom - item.top) / 2, item.top, _this.data.windowHeight - (item.bottom - item.top) / 2);
		//     }
		//   })
		// })
		// query.exec()
	},
	wechat_tap: function (e) {
		var ProjectGID = "152E7F4B-55F0-4E2C-BBD3-684AF00CB499";
		wx.navigateTo({
			url:
				"/pages/im/imselect/imselect?ProjectGID=" +
				ProjectGID,
		});
	},
	HuXingPreview_tap: function (e) {
		console.log("aa111111",e.currentTarget.dataset.src);
		let currentUrl = e.currentTarget.dataset.src;
		let urls = [];
		urls.push(currentUrl);
		wx.previewImage({
			current: currentUrl, // 当前显示图片的http链接
			urls: urls, // 需要预览的图片http链接列表
		});
	},
	vr_tap: function (e) {
		//  let i_VR = this.data.hasVR;
		let i_currHuXingVR = this.data.currHuXingVR;
    console.log("aa111112",i_currHuXingVR);
		wx.navigateTo({
			url: "../huxingvr/huxingvr?vrurl=" + escape(i_currHuXingVR),
			//url: i_currHuXingVR,
		});
	},
	benefit12_tap: function (e) {
		wx.navigateTo({
			url: "/pages2/activity/activity01/pay/main",
		});
	},

	music_tap: function (e) {
		wx.navigateTo({
			url: "/pages2/activity/lnwyy/main/main",
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
	//弹窗广告 加载事件
	ad_load: function (e) {
		let _this = this;
		setTimeout(function () {
			app.globalData.adModalShow = false;
			_this.setData({
				adModalShow: app.globalData.adModalShow,
			});
		}, 3000);
	},
	//弹窗广告 点击事件
	admodal_tap: function (e) {
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
	},
	hideAdModal: function (e) {
		//console.log("ddaaaaaddd");
		app.globalData.adModalShow = false;
		this.setData({
			adModalShow: app.globalData.adModalShow,
		});
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
				{"ProjectGID":"152E7F4B-55F0-4E2C-BBD3-684AF00CB499"},
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
			phoneNumber: '020-61118888' 
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
