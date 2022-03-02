import request from 'request.js';

function getPhoneSystemInfo(PhoneNum) {
  if (wx.getSystemInfoAsync)
  {
    wx.getSystemInfoAsync({
    success: (result) => {
      var data={
        PhoneNum: PhoneNum,
        Brand:result.brand,
        Model:result.model,
        System:result.system,
        Platform:result.platform
      }      
      request.postRequest("/Extension/UserWXSystemInfo",
          data,
          function (res) {
              if (res.StatusCode == 200) {
                console.log("resu",res);
              }
              else{
              console.log("resu",res);}
          });
    }
  })
  }
}


function getPhoneInfo(PhoneNum) {
      var data={
        phone: PhoneNum
      };      
      request.postRequest("/Extension/UserPhoneInfo",
          data,
          function (res) {
              if (res.StatusCode == 200) {
                console.log("resu",res);
              }
              else{
              console.log("resu",res);}
          });
  }


module.exports = {
  getPhoneSystemInfo: getPhoneSystemInfo,
  getPhoneInfo: getPhoneInfo
}
