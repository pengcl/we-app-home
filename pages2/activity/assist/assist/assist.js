import request from '../../../../utils/request.js';
const app = getApp();
var vdomain = app.globalData.domain
Page({
  data: {
    activCode: '',
    orderCode: '',
    activityInfo: {},
    activityOrder: {},
    userInfo: {},
    sunCodeUrl: 'https://xyclientnew.ai-fox.net/QRCodeImage/SunQRCodeImage/7982164D-FAB8-4B1E-BA02-994A9EB9DD7D.jpg',
    haibaoBgImg: 'https://xyclientnew.ai-fox.net/image/activity/activity01/poster.png',
    canvasHeight: 0,
    canvasWidth: 0,
    mergeTempImg: '',
    saveIcon: vdomain + 'image/saveIcon.png',
    maskDisplay: 'none',
    helperMaskDisplay: 'flex',
    cvDisplay: 'block',
    proPercent: '',
    progress: '',
    actorNametemp: '',
    countdown: {
      day: '',
      hour: '',
      minute: '',
      second: ''
    },
    phoneNumber: '',
    helperIcon: []
  },
  onLoad: function(options) {
    let that = this
    that.setData({
      helperIcon: []
    })
    if (app.globalData.appIsOnload) {
      if (typeof(options.scene) == 'undefined') {
        var vactivCode = options.activCode;
        var vorderCode = options.orderCode;

        let data = {
          code: vactivCode,
          productCode: '001'
        }
        let dataOrder = {
          sActivCode: vactivCode,
          code: vorderCode
        }
        that.setData({
          activCode: vactivCode,
          orderCode: vorderCode,
          userInfo: wx.getStorageSync('UserInfo'),
          phoneNumber: wx.getStorageSync('PhoneNum'),
        })
        request.getRequest("/Activity/ActivityInfo",
          data,
          function(res) {
            if (res.statusCode == 200) {
              var info = res.data.Data;
              that.setData({
                activityInfo: info
              })
              request.getRequest("/Activity/ActivityOrder",
                dataOrder,
                function(res) {
                  if (res.statusCode == 200) {
                    var order = res.data.Data;
                    var isHelper = res.data.Data.isHelper
                    for (var i = 0; i < info.needHelperNum; i++) {
                      var helperinfo = {
                        'icon': '',
                        'name': ''
                      }
                      if (res.data.Data.activityHelperlst[i] != null) {
                        helperinfo.icon = res.data.Data.activityHelperlst[i].helperIcon == null || res.data.Data.activityHelperlst[i].helperIcon == '' ? vdomain + 'image/icon9.png' : res.data.Data.activityHelperlst[i].helperIcon;
                        helperinfo.name = res.data.Data.activityHelperlst[i].helperName == null ? '' : res.data.Data.activityHelperlst[i].helperName.length > 2 ? res.data.Data.activityHelperlst[i].helperName.substring(0, 2) + '..' : res.data.Data.activityHelperlst[i].helperName
                        that.setData({
                          helperIcon: that.data.helperIcon.concat(helperinfo)
                        })
                      } else {
                        helperinfo.icon = vdomain + 'image/icon9.png';
                        helperinfo.name = ''
                        that.setData({
                          helperIcon: that.data.helperIcon.concat(helperinfo)
                        })
                      }
                    }
                    that.setData({
                      activityOrder: order,
                      progress: order.helpercount + '/' + info.needHelperNum,
                      proPercent: (order.helpercount / info.needHelperNum) * 100,
                      helperMaskDisplay: isHelper ? 'none' : 'flex'
                    })
                  }
                });

              var vEndtime = that.data.activityInfo.activEndTime
              that.startCountdown(vEndtime);
            }
          });
      } else {
        //扫菊花码进来页面
        let data1 = {
          sScene: options.scene
        }
        request.getRequest("/Activity/QRCodeScene", data1, function(res) {
          if (res.statusCode == 200) {
            var sceneData = decodeURIComponent(res.data.Data).split("&");
            var vactivCode = sceneData[0];
            var vorderCode = sceneData[1];

            let data = {
              code: vactivCode,
              productCode: '001'
            }
            let dataOrder = {
              sActivCode: vactivCode,
              code: vorderCode
            }
            that.setData({
              activCode: vactivCode,
              orderCode: vorderCode,
              userInfo: wx.getStorageSync('UserInfo'),
              phoneNumber: wx.getStorageSync('PhoneNum'),
            })
            request.getRequest("/Activity/ActivityInfo",
              data,
              function(res) {
                if (res.statusCode == 200) {
                  var info = res.data.Data;
                  that.setData({
                    activityInfo: info
                  })
                  request.getRequest("/Activity/ActivityOrder",
                    dataOrder,
                    function(res) {
                      if (res.statusCode == 200) {
                        var order = res.data.Data;
                        var isHelper = res.data.Data.isHelper
                        for (var i = 0; i < info.needHelperNum; i++) {
                          var helperinfo = {
                            'icon': '',
                            'name': ''
                          }
                          if (res.data.Data.activityHelperlst[i] != null) {
                            helperinfo.icon = res.data.Data.activityHelperlst[i].helperIcon == null || res.data.Data.activityHelperlst[i].helperIcon == '' ? vdomain + 'image/icon9.png' : res.data.Data.activityHelperlst[i].helperIcon;
                            helperinfo.name = res.data.Data.activityHelperlst[i].helperName == null ? '' : res.data.Data.activityHelperlst[i].helperName.length > 2 ? res.data.Data.activityHelperlst[i].helperName.substring(0, 2) + '..' : res.data.Data.activityHelperlst[i].helperName
                            that.setData({
                              helperIcon: that.data.helperIcon.concat(helperinfo)
                            })
                          } else {
                            helperinfo.icon = vdomain + 'image/icon9.png';
                            helperinfo.name = ''
                            that.setData({
                              helperIcon: that.data.helperIcon.concat(helperinfo)
                            })
                          }
                        }
                        that.setData({
                          activityOrder: order,
                          progress: order.helpercount + '/' + info.needHelperNum,
                          proPercent: (order.helpercount / info.needHelperNum) * 100,
                          helperMaskDisplay: isHelper ? 'none' : 'flex'
                        })
                      }
                    });

                  var vEndtime = that.data.activityInfo.activEndTime
                  that.startCountdown(vEndtime);
                }
              });
          }
        });
      }

    } else {
      app.appIsOnloadCallback = () => {
        if (typeof(options.scene) == 'undefined') {
          var vactivCode = options.activCode;
          var vorderCode = options.orderCode;

          let data = {
            code: vactivCode,
            productCode: '001'
          }
          let dataOrder = {
            sActivCode: vactivCode,
            code: vorderCode
          }
          that.setData({
            activCode: vactivCode,
            orderCode: vorderCode,
            userInfo: wx.getStorageSync('UserInfo'),
            phoneNumber: wx.getStorageSync('PhoneNum'),
          })
          request.getRequest("/Activity/ActivityInfo",
            data,
            function(res) {
              if (res.statusCode == 200) {
                var info = res.data.Data;
                that.setData({
                  activityInfo: info
                })
                request.getRequest("/Activity/ActivityOrder",
                  dataOrder,
                  function(res) {
                    if (res.statusCode == 200) {
                      console.log('===========Activity/ActivityOrder=====================');
                      console.log(res);
                      console.log('====================================');
                      that.setData({
                        helperIcon: []
                      })
                      var order = res.data.Data;
                      var isHelper = res.data.Data.isHelper
                      for (var i = 0; i < info.needHelperNum; i++) {
                        var helperinfo = {
                          'icon': '',
                          'name': ''
                        }
                        if (res.data.Data.activityHelperlst[i] != null) {
                          helperinfo.icon = res.data.Data.activityHelperlst[i].helperIcon == null || res.data.Data.activityHelperlst[i].helperIcon == '' ? vdomain + 'image/icon9.png' : res.data.Data.activityHelperlst[i].helperIcon;
                          helperinfo.name = res.data.Data.activityHelperlst[i].helperName == null ? '' : res.data.Data.activityHelperlst[i].helperName.length > 2 ? res.data.Data.activityHelperlst[i].helperName.substring(0, 2) + '..' : res.data.Data.activityHelperlst[i].helperName
                          that.setData({
                            helperIcon: that.data.helperIcon.concat(helperinfo)
                          })
                        } else {
                          helperinfo.icon = vdomain + 'image/icon9.png';
                          helperinfo.name = ''
                          that.setData({
                            helperIcon: that.data.helperIcon.concat(helperinfo)
                          })
                        }
                      }

                      that.setData({
                        activityOrder: order,
                        progress: order.helpercount + '/' + info.needHelperNum,
                        proPercent: (order.helpercount / info.needHelperNum) * 100,
                        helperMaskDisplay: isHelper ? 'none' : 'flex'
                      })
                    }
                  });

                var vEndtime = that.data.activityInfo.activEndTime
                that.startCountdown(vEndtime);
              }
            });
        } else {
          //扫菊花码进来页面
          let data1 = {
            sScene: options.scene
          }
          request.getRequest("/Activity/QRCodeScene", data1, function(res) {
            if (res.statusCode == 200) {
              var sceneData = decodeURIComponent(res.data.Data).split("&");
              var vactivCode = sceneData[0];
              var vorderCode = sceneData[1];

              let data = {
                code: vactivCode,
                productCode: '001'
              }
              let dataOrder = {
                sActivCode: vactivCode,
                code: vorderCode
              }
              that.setData({
                activCode: vactivCode,
                orderCode: vorderCode,
                userInfo: wx.getStorageSync('UserInfo'),
                phoneNumber: wx.getStorageSync('PhoneNum'),
              })
              request.getRequest("/Activity/ActivityInfo",
                data,
                function(res) {
                  if (res.statusCode == 200) {
                    var info = res.data.Data;
                    that.setData({
                      activityInfo: info
                    })
                    request.getRequest("/Activity/ActivityOrder",
                      dataOrder,
                      function(res) {
                        if (res.statusCode == 200) {
                          var order = res.data.Data;
                          var isHelper = res.data.Data.isHelper
                          for (var i = 0; i < info.needHelperNum; i++) {
                            var helperinfo = {
                              'icon': '',
                              'name': ''
                            }
                            if (res.data.Data.activityHelperlst[i] != null) {
                              helperinfo.icon = res.data.Data.activityHelperlst[i].helperIcon == null || res.data.Data.activityHelperlst[i].helperIcon == '' ? vdomain + 'image/icon9.png' : res.data.Data.activityHelperlst[i].helperIcon;
                              helperinfo.name = res.data.Data.activityHelperlst[i].helperName == null ? '' : res.data.Data.activityHelperlst[i].helperName.length > 2 ? res.data.Data.activityHelperlst[i].helperName.substring(0, 2) + '..' : res.data.Data.activityHelperlst[i].helperName
                              that.setData({
                                helperIcon: that.data.helperIcon.concat(helperinfo)
                              })
                            } else {
                              helperinfo.icon = vdomain + 'image/icon9.png';
                              helperinfo.name = ''
                              that.setData({
                                helperIcon: that.data.helperIcon.concat(helperinfo)
                              })
                            }
                          }

                          that.setData({
                            activityOrder: order,
                            progress: order.helpercount + '/' + info.needHelperNum,
                            proPercent: (order.helpercount / info.needHelperNum) * 100,
                            helperMaskDisplay: isHelper ? 'none' : 'flex'
                          })
                        }
                      });

                    var vEndtime = that.data.activityInfo.activEndTime
                    that.startCountdown(vEndtime);
                  }
                });
            }
          });
        }
      }
    }
  },
  onReady: function() {},
  onShow: function() {
    let that = this
    let vUserIndo = wx.getStorageSync('UserInfo')
    let vPhoneNum = wx.getStorageSync('PhoneNum')
    that.setData({
      userInfo: vUserIndo,
      phoneNumber: vPhoneNum,
    })
  },
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {
    let that = this;
    let order = that.data.activCode
    let userinfo = that.data.userInfo
    let vtitle = ''
    if (order == "AT20001") {
      vtitle = "这边有礼！" + userinfo.nickName + "@您，美好生活奖赏，好友齐FUN享"
    } else {
      vtitle = "有福同享！" + userinfo.nickName + "@您，无忧置业大赏，好友齐fun享"
    }
    return {
      title: vtitle,
      path: 'pages2/activity/assist/index/index?code=' + order,
      imageUrl: vdomain + '/image/share.jpg',
    }
  },
  startCountdown: function(endTime) {
    var that = this;
    var millisecond = new Date(endTime).getTime() - new Date().getTime();

    var interval = setInterval(function() {
      millisecond -= 1000;
      if (millisecond <= 0) {
        clearInterval(interval);
        that.setData({
          countdown: {
            day: '00',
            hour: '00',
            minute: '00',
            second: '00'
          }
        });
        return;
      }
      that.transformRemainTime(millisecond);
    }, 1000);
  },
  // 剩余时间(毫秒)处理转换时间
  transformRemainTime: function(millisecond) {
    var that = this;
    var countdownObj = that.data.countdown;
    // 秒数
    var seconds = Math.floor(millisecond / 1000);
    // 天数
    countdownObj.day = that.formatTime(Math.floor(seconds / 3600 / 24));
    // 小时
    countdownObj.hour = that.formatTime(Math.floor(seconds / 3600 % 24));
    // 分钟
    countdownObj.minute = that.formatTime(Math.floor(seconds / 60 % 60));
    // 秒
    countdownObj.second = that.formatTime(Math.floor(seconds % 60));
    that.setData({
      countdown: countdownObj
    });
  },
  //格式化时间为2位
  formatTime: function(time) {
    if (time < 10)
      return '0' + time;
    return time;
  },
  createSunCode: function() {
    let that = this
    let data = {
      sCode: that.data.activCode,
      sPageUrl: "pages2/activity/assist/index/index"
    }
    request.getRequest("/WxQRCode/Unlimit",
      data,
      function(res) {
        if (res.data.errcode == 0) {
          var info = res.data.url;
          that.setData({
            sunCodeUrl: info
          })
          that.mergeImg(info)
        } else {
          wx.showToast({
            title: '抱歉，网络异常，请稍后重试！',
            icon: 'none',
            duration: 1000
          })
        }
      });
  },
  mergeImg: function() {
    let that = this
    // 提示用户正在合成，否则用户可能有不当操作或者以为手机卡死
    wx.showLoading({
      title: '合成中......',
      mask: true
    })

    that.setData({
      cvDisplay: 'block'
    })
    // 创建画布对象
    const ctx = wx.createCanvasContext("myCanvas", that)
    // 获取图片信息，要按照原图来绘制，否则图片会变形 
    wx.getImageInfo({
      src: that.data.haibaoBgImg,
      success: function(res) {
        // 根据 图片的大小 绘制底图 的大小
        console.log(" 绘制底图 的图片信息》》》", res)
        let imgW = res.width
        let imgH = res.height
        let imgPath = res.path

        that.setData({
          canvasHeight: imgH,
          canvasWidth: imgW
        })
        // 绘制底图 用原图的宽高比绘制
        ctx.drawImage(imgPath, 0, 0, imgW, imgH)

        wx.getImageInfo({
          src: that.data.sunCodeUrl, // 二维码图片的路径
          success: function(res) {
            console.log(" 绘制二维码》》》", res)
            // 绘制二维码
            ctx.drawImage(res.path, 1100, imgH - 380, 300, 300)

            wx.getImageInfo({
              src: that.data.userInfo.avatarUrl,
              success: function(res) {
                console.log(" 绘制用户头像》》》", res)
                var avatarurl_width = 300; //绘制的头像宽度
                var avatarurl_heigth = 300; //绘制的头像高度
                var avatarurl_x = 100; //绘制的头像在画布上的位置
                var avatarurl_y = imgH - 380; //绘制的头像在画布上的位置
                ctx.save()
                // 绘制用户头像
                ctx.setFillStyle('#fff')
                //先画个圆   前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
                ctx.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 2, 0, Math.PI * 2, false);
                //画好了圆 剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因    
                ctx.clip()
                ctx.drawImage(res.path, avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth);
                //恢复之前保存的绘图上下文 恢复之前保存的绘图上下文即状态 还可以继续绘制
                ctx.restore()


                ctx.setFontSize(50);
                ctx.fillText(that.data.userInfo.nickName, 450, imgH - 280)
                ctx.fillText(that.data.phoneNumber, 450, imgH - 100);
                ctx.draw();
                setTimeout(() => {
                  wx.canvasToTempFilePath({
                    canvasId: 'myCanvas',
                    success: function(res) {
                      console.log("合成的带有小程序码的图片success》》》", res)
                      let tempFilePath = res.tempFilePath
                      that.setData({
                        maskDisplay: 'flex',
                        mergeTempImg: tempFilePath,
                        cvDisplay: 'none'
                      })
                      wx.hideLoading()
                      console.log("合成的带有小程序码的图片的信息》》》", res)
                    },
                    fail: function(res) {
                      console.log("生成的图片失败 fail fail fail ", res)
                      wx.hideLoading()
                      wx.showModal({
                        title: '温馨提示',
                        content: '海报生成失败，请重试',
                        showCancel: false
                      })
                    }
                  }, that)
                }, 1500)
              },
              fail(res) {
                wx.hideLoading()
                wx.showModal({
                  title: '温馨提示',
                  content: '头像信息获取失败，请重试',
                  showCancel: false
                })
              }
            })
          },
          fail(res) {
            wx.hideLoading()
            wx.showModal({
              title: '温馨提示',
              content: '二维码获取失败，请重试',
              showCancel: false
            })
          }
        })
      },
      fail(res) {
        wx.hideLoading()
        wx.showModal({
          title: '温馨提示',
          content: '图片信息获取失败，请重试',
          showCancel: false
        })
      }
    })
  },
  saveImg: function() {
    let that = this
    let tempFilePath = that.data.mergeTempImg
    wx.showLoading({
      title: '正在保存',
      mask: true
    })
    wx.saveImageToPhotosAlbum({
      filePath: tempFilePath,
      success(res) {
        // 修改下载状态
        wx.hideLoading()
        wx.showModal({
          title: '温馨提示',
          content: '图片保存成功，可在相册中查看',
          showCancel: false,
          success(res) {
            wx.clear
            if (res.confirm) {
              that.setData({
                maskDisplay: 'none'
              })
            }
          }
        })
      },
      fail(res) {
        wx.hideLoading()
        wx.showModal({
          title: '温馨提示',
          content: '图片保存失败，请重试',
          showCancel: false
        })
      }
    })
  },
  mask_tap: function() {
    let that = this
    that.setData({
      maskDisplay: 'none'
    })
  },
  assist_tap: function() {
    //插入活动助力表
    let that = this
    let data = {
      activCode: that.data.activCode,
      OrderCode: that.data.orderCode,
      helperName: that.data.userInfo.nickName,
      helperIcon: that.data.userInfo.avatarUrl
    }
    request.postRequest("/Activity/InsertActivityHelper",
      data,
      function(res) {
        if (res.StatusCode == 200) {
          var info = res.Data;
          that.setData({
            activityOrder: info,
            helperMaskDisplay: 'none'
          })
          let actInfo = that.data.activityInfo
          that.setData({
            helperIcon: []
          })
          for (var i = 0; i < actInfo.needHelperNum; i++) {
            var helperinfo = {
              'icon': '',
              'name': ''
            }
            if (res.Data.activityHelperlst[i] != null) {
              helperinfo.icon = res.Data.activityHelperlst[i].helperIcon == null || res.Data.activityHelperlst[i].helperIcon == '' ? vdomain + 'image/icon9.png' : res.Data.activityHelperlst[i].helperIcon;
              helperinfo.name = res.Data.activityHelperlst[i].helperName == null ? '' : res.Data.activityHelperlst[i].helperName.length > 2 ? res.Data.activityHelperlst[i].helperName.substring(0, 2) + '..' : res.Data.activityHelperlst[i].helperName
              that.setData({
                helperIcon: that.data.helperIcon.concat(helperinfo)
              })
            } else {
              helperinfo.icon = vdomain + 'image/icon9.png';
              helperinfo.name = ''
              that.setData({
                helperIcon: that.data.helperIcon.concat(helperinfo)
              })
            }
          }
        } else {
          console.log(res.errMsg)
          wx.showToast({
            title: '网络异常，请稍后重试！',
            icon: 'none',
            duration: 1000
          })
        }
      }, (err) => {
        console.log(err);
      });
  },
  createOrder: function() {
    let that = this
    let orderInfo = that.data.activityOrder
    let isStart = that.data.activityInfo.isStart
    let isBuy = that.data.activityInfo.IsBuy
    if (!isBuy) {
      wx.redirectTo({
        url: '../../activity01/pay/main?pcode=001',
      })
    } else if (isStart) {
      wx.redirectTo({
        url: '../index/index?code=' + orderInfo.activCode
      })
    } else {
      //插入活动参与表
      let data1 = {
        activCode: that.data.activCode,
        actorName: that.data.userInfo.actorName,
        actorIcon: that.data.userInfo.avatarUrl,
        actorPhone: that.data.phoneNumber
      }
      request.postRequest("/Activity/InsertActivityOrder",
        data1,
        function(res) {
          if (res.StatusCode == 200) {
            let vOrderCode = res.Data
            wx.redirectTo({
              url: '../detail/detail?orderCode=' + vOrderCode + "&activCode=" + that.data.activCode,
            })
          } else {
            console.log(res.errMsg)
          }
        }, (err) => {
          console.log(err);
        });
    }
  }
})