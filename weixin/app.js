// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // console.log("打印信息获取到的身份code【"+res.code+"】");
      }
    })
  },
  globalData: {
    userInfo: null,
    apiUrl:"http://127.0.0.1:81"
  }
})
