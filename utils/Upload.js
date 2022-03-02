//多张图片上传
//data.url  服务器地址
//data.filePath 图片本地路径
//data.tips 是否需要提示
//data.redirectUrl上传成功后跳转地址
function uploadimg(data) {
  var that = this,
    i = data.i ? data.i : 0, //当前上传的哪张图片
    success = data.success ? data.success : 0, //上传成功的个数
    fail = data.fail ? data.fail : 0; //上传失败的个数
  var tips = data.tips
  var redirectUrl = data.redirectUrl
  wx.uploadFile({
    url: data.url,
    filePath: data.path[i],
    name: 'file', //这里根据自己的实际情况改
    formData: null, //这里是上传图片时一起上传的数据
    success: (resp) => {
      var data=JSON.parse(resp.data)
      success++; //图片上传成功，图片上传成功的变量+1
      console.log('resp:' + data.StatusCode)
      //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
    },
    fail: (res) => {
      var data = JSON.parse(res.data)
      console.log('res:' + res.StatusCode)
      console.log('res:' + res.Info)
      fail++; //图片上传失败，图片上传失败的变量+1
      console.log('fail:' + i + "fail:" + fail);
    },
    complete: () => {
      console.log(i);
      i++; //这个图片执行完上传后，开始上传下一张
      if (i == data.path.length) { //当图片传完时，停止调用          
        console.log('执行完毕');
        console.log('成功：' + success + " 失败：" + fail);
        //上传成功时，提示：
        if (tips) {
          wx.showToast({
            title: '提交成功！',
            duration: 2000,
            success: function() {
              wx.redirectTo({
                url: redirectUrl,
              })
            }
          })
        }
      } else { //若图片还没有传完，则继续调用函数
        console.log(i);
        data.i = i;
        data.success = success;
        data.fail = fail;
        that.uploadimg(data);
      }

    }
  });
}

module.exports = {
  uploadimg: uploadimg
}