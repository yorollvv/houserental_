const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

/* GET请求封装 */
function reqGet(url, params, successBack, failBack, completeBack) {
  var header = {};
  request(url, params, "GET", header, successBack, failBack, completeBack);
}

/* 普通POST请求封装 */
function reqPost(url, params, successBack, failBack, completeBack) {
  var header = {"content-type": "application/x-www-form-urlencoded"};
  request(url, params, "POST", header, successBack, failBack, completeBack);
}


// 封装request请求
function request(url, params, method, header, successBack, failBack, completeBack) {
  wx.showNavigationBarLoading() //在标题栏中显示加载
  wx.request({
    url: url,
    data: params,
    method: method,
    header:{'content-type': 'application/x-www-form-urlencoded' },
    dataType:"json",
    success: function (respone) {
      if (typeof successBack == "function") {
        successBack(respone);
      }
    },
    fail: function (respone) {
      showModal("请求错误，请联系管理员！");
      if (typeof failBack == "function") {
        failBack(respone);
      }
    },
    complete: function (respone) {
      wx.hideNavigationBarLoading() //完成停止加载
      if (typeof completeBack == "function") {
        completeBack(respone);
      }
    }
  });
}



module.exports = {
  formatTime,
  util:{
    reqGet: reqGet,
    reqPost: reqPost,
    request: request
  }
}
