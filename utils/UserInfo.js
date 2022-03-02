import request from 'request.js';

function GetUserInfo(app, e, success, fail) {
    let that = this;
    //第二种。用户点击取消授权的情况
    if (e.detail.userInfo == null) { //授权失败，取消授权
        fail(e.detail)
    } else {
        //第一种。用户点击授权的情况
        var vUserInfo = e.detail.userInfo;
        app.globalData.userInfo = vUserInfo;
        wx.setStorage({
            key: "UserInfo",
            data: vUserInfo
        });
        var comecode=wx.getStorageSync('comecode');
        let data1 = {
            "nickname": vUserInfo.nickName,
            "avatarUrl": vUserInfo.avatarUrl,
            "gender": vUserInfo.gender,
            "province": vUserInfo.province,
            "city": vUserInfo.city,
            "country": vUserInfo.country,
            "comefrom": 'UserWXLogin_UserInfo',
            "comecode":comecode
        }
        
        request.postRequest("/User/UserWXLogin",
            data1,
            function (res) {
                // if (res.StatusCode == 200) {
                //     let vpageUrl = that.data.pageUrl
                //     wx.redirectTo({
                //         url: vpageUrl,
                //     })
                // }
                console.log("resu",res);
            });
        
        success(e.detail);
    }
}


module.exports = {
    GetUserInfo: GetUserInfo
}