import request from '../../../../../../utils/request.js';
var app = getApp();
var vdomain = app.globalData.domain
//计数器
var interval = null;
//值越大旋转时间越长  即旋转速度
var intime = 100;
Page({
  data: {
    isWinning: false,
    isNoWinning: false,
    color: [1, 1, 1, 1, 1, 1, 1, 1],
    block: vdomain + 'image/activity/PhotoContest/yy/cj/bg-block.png',
    unblock1: '',
    unblock2: '',
    unblock3: '',
    unblock4: '',
    unblock5: '',
    unblock6: '',
    unblock7: '',
    unblock8: '',
    clickName: '',
    lotteryInfo: '',
    clickicon: '',
    zpbgimg: vdomain + 'image/activity/PhotoContest/yy/cj/bg-turntable.png',
    bgimg: '',
    lp1img: '',
    lp2img: '',
    lp3img: '',
    lp4img: '',
    lp5img: '',
    lp6img: '',
    lp7img: '',
    lp8img: '',
  },
  onLoad: function (options) {
    let that = this;
    let gid = '690DD335-126A-46E1-818C-1D144DD4A22E';
    that.loadInfo(gid)
  },
  /** 中奖显示弹窗 */
  clikWinning(index) {
    let self = this,
      // num = parseInt(Math.random() * 9, 10); //抽奖随机数
      num = index
    console.log("num+++" + num)
    self.data.color = [1, 1, 1, 1, 1, 1, 1, 1];
    var index = 0;
    self.setData({
      clickName: ''
    })
    //循环设置每一项的透明度
    interval = setInterval(() => {
      console.log(index)
      if (index > 7) {
        index = 0;
        self.data.color[7] = 1
      } else if (index != 0) {
        self.data.color[index - 1] = 1
      }
      self.data.color[index] = 0.5
      self.setData({
        color: self.data.color,
      })
      index++;
    }, intime);

    //模拟网络请求时间  设为一秒
    setTimeout(() => {
      console.log("stop")
      self.stop(num);
    }, 1000)
  },
  // 停止旋转
  stop(which) {
    let self = this;
    //清空计数器
    clearInterval(interval);
    //初始化当前位置
    var current = 1;
    var color = self.data.color;
    // for (let i in color) {
    //   if (color[i] == 0.5) {
    //     current = i;
    //   }
    // }
    //下标从1开始
    var index = current;
    self.stopLuck(which, index, intime, 10);
  },
  /**
   * which:中奖位置
   * index:当前位置
   * time：时间标记
   * splittime：每次增加的时间 值越大减速越快
   */
  stopLuck(which, index, time, splittime) {
    var self = this;

    //值越大出现中奖结果后减速时间越长
    var color = self.data.color;
    setTimeout(() => {
      //重置前一个位置
      if (index > 7) {
        index = 0;
        color[7] = 1
      } else if (index != 0) {
        color[index - 1] = 1
      }
      //当前位置为选中状态
      color[index] = 0.5
      self.setData({
        color: color,
      })
      //如果旋转时间过短或者当前位置不等于中奖位置则递归执行
      //直到旋转至中奖位置
      if (time < 400 || index != which) {
        //越来越慢
        splittime++;
        time += splittime;
        //当前位置+1
        index++;
        self.stopLuck(which, index, time, splittime);
      } else {
        if (which == 6) {
          //谢谢参与
          setTimeout(() => {
            self.setData({
              // isNoWinning: true,
              clickName: ''
            });
            wx.showModal({
              title: '提示',
              content: '谢谢您的参与！',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.redirectTo({
                    url: '../detail/detail?gid=' + self.data.lotteryInfo.gid
                  })
                }
              }
            })
          }, 1000)
        } else {
          setTimeout(() => {
            self.setData({
              // isWinning: true,
              clickName: '',
            });
            wx.showModal({
              title: '提示',
              content: '恭喜您获得' + self.data.lotteryInfo.awardlst[which].awardname,
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.redirectTo({
                    url: '../detail/detail?gid=' + self.data.lotteryInfo.gid
                  })
                }
              }
            })
          }, 1000)
        }
      }
    }, time);
  },
  /** 关闭中奖弹窗 */
  cancelWinning() {
    this.setData({
      isWinning: false
    })
  },
  // 再来一次
  // continueWinning() {
  //   this.setData({
  //     isWinning: false,
  //     isNoWinning: false
  //   })
  //   this.clikWinning();
  // },
  // 关闭没有中奖弹窗
  confirmNoWinning() {
    this.setData({
      isNoWinning: false
    })
  },
  // 关闭没有中奖弹窗
  cancelNoWinning() {
    this.setData({
      isNoWinning: false
    })
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  loadInfo: function (gid) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    let that = this
    let data = {
      sLotteryID: gid,
      sProject: 'YY'
    }
    request.getRequest("/Lottery/LotteryRecord", data, function (res) {
      if (res.data.StatusCode == 200) {
        let record = res.data.Data;
        if (record != "") {
          wx.redirectTo({
            url: '../detail/detail?gid=' + gid
          })
        } else {
          let data1 = {
            sgid: gid
          }
          request.getRequest("/Lottery/LotteryInfo",
            data1,
            function (res) {
              wx.hideLoading()
              if (res.data.StatusCode == 200) {
                let info = res.data.Data;
                if (info != null) {
                  if (info.isOverTime) {
                    wx.showToast({
                      title: '抱歉，该活动已过期！',
                      icon: 'none',
                      duration: 1000,
                      success: function (e) {
                        setTimeout(function () {
                          wx.navigateBack({
                            delta: 1
                          })
                        }, 1000)
                      }
                    })
                  }
                  that.setData({
                    lotteryInfo: info,
                    lp1img: vdomain + info.awardlst[0].image,
                    lp2img: vdomain + info.awardlst[1].image,
                    lp3img: vdomain + info.awardlst[2].image,
                    lp4img: vdomain + info.awardlst[3].image,
                    lp5img: vdomain + info.awardlst[4].image,
                    lp6img: vdomain + info.awardlst[5].image,
                    lp7img: vdomain + info.awardlst[6].image,
                    lp8img: vdomain + info.awardlst[7].image,
                    bgimg: vdomain + info.image1,
                    unblock1: vdomain + 'image/activity/PhotoContest/yy/cj/bg-unblock1.png',
                    unblock2: vdomain + 'image/activity/PhotoContest/yy/cj/bg-unblock2.png',
                    unblock3: vdomain + 'image/activity/PhotoContest/yy/cj/bg-unblock3.png',
                    unblock4: vdomain + 'image/activity/PhotoContest/yy/cj/bg-unblock4.png',
                    unblock5: vdomain + 'image/activity/PhotoContest/yy/cj/bg-unblock5.png',
                    unblock6: vdomain + 'image/activity/PhotoContest/yy/cj/bg-unblock6.png',
                    unblock7: vdomain + 'image/activity/PhotoContest/yy/cj/bg-unblock7.png',
                    unblock8: vdomain + 'image/activity/PhotoContest/yy/cj/bg-unblock4.png',
                    clickicon: vdomain + info.image2,
                    clickName: 'clickCJ_tap',
                  });
                }
              } else {}
            });
        }
      }
    });
  },
  clickCJ_tap: function () {
    let that = this
    let gid = that.data.lotteryInfo.gid
    let data = {
      sLotteryID: gid,
      sProject: 'KYW'
    }

    request.getRequest("/Lottery/InsertLotteryRecord",
      data,
      function (res) {
        if (res.data.StatusCode == 200) {
          if (res.data.Data == -1) {
            wx.showToast({
              title: '您已经抽过奖啦！',
              icon: 'none',
              duration: 2000
            })
          } else if (res.data.Data >= 0 && res.data.Data <= 7) {
            that.clikWinning(res.data.Data)
          }
        } else {
          wx.showToast({
            title: '网络异常，请稍后重试！',
            icon: 'none',
            duration: 2000
          })
        }
      }, (err) => {
        wx.showToast({
          title: '网络异常，请稍后重试！',
          icon: 'none',
          duration: 2000
        })
      });
  }
})