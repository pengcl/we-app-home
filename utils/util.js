const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}



//随机字符串
function RandomString(len) {
  len = len || 32;
  // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
  var maxPos = chars.length;
  var pwd = '';
  for (var i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

/*获取当前页url*/
function getCurrentPageUrl() {
  var pages = getCurrentPages() //获取加载的页面
  var currentPage = pages[pages.length - 1] //获取当前页面的对象
  var url = currentPage.route //当前页面url
  return url
}

/*获取当前页带参数的url*/
function getCurrentPageUrlWithArgs() {
  var pages = getCurrentPages() //获取加载的页面
  var currentPage = pages[pages.length - 1] //获取当前页面的对象
  var url = currentPage.route //当前页面url
  var options = currentPage.options //如果要获取url中所带的参数可以查看options

  //拼接url的参数
  var urlWithArgs = url + '?'
  for (var key in options) {
    var value = options[key]
    urlWithArgs += key + '=' + value + '&'
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

  return urlWithArgs
}

// 过滤一个结果的空记录添加，过滤空搜索  
function setCommunityHistoryItems(CommunityCode, CommunityName) {
  //console.log("PlateNum, NumType, color", PlateNum, NumType, color);

  CommunityCode = CommunityCode.trim();
  CommunityName = CommunityName.trim();

  let Community = {
    Code: CommunityCode,
    Name: CommunityName
  }

  let historyItems = wx.getStorageSync('CommunityHistory');
  console.log("historyItems", historyItems, historyItems == "");
  if (historyItems == "") {
    historyItems = [Community];
  } else {
    //.map(item => item.name + 'c');
    let newHistoryItems = historyItems.filter(e => e.Code != CommunityCode);
    newHistoryItems.unshift(Community);

    if (newHistoryItems.length > 4) {
      historyItems = newHistoryItems.slice(0, 4);;
    } else {
      historyItems = newHistoryItems;
    }
  }
  wx.setStorageSync('CommunityHistory', historyItems);

  wx.setStorageSync('CurrCommunity', Community);
}

function getCommunityHistoryItems() {
  return wx.getStorageSync('CommunityHistory');
}

//乘法函数，用来得到精确的乘法结果
//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
//调用：accMul(arg1,arg2)
//返回值：arg1乘以arg2的精确结果
function accMul(arg1, arg2) {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length
  } catch (e) {}
  try {
    m += s2.split(".")[1].length
  } catch (e) {}
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

//手机号校验
function isPhone(value) {
  if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(value)) {
    return false
  } else {
    return true
  }
}


module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  RandomString: RandomString,
  getCurrentPageUrl: getCurrentPageUrl,
  getCurrentPageUrlWithArgs: getCurrentPageUrlWithArgs,
  setCommunityHistoryItems: setCommunityHistoryItems,
  getCommunityHistoryItems: getCommunityHistoryItems,
  accMul: accMul,
  isPhone: isPhone
}