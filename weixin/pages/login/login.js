// pages/login/login.js
Page({
  data: {
    userInfo:''
    },
    onLoad(){
     
     let user=wx.getStorageSync('user')
     this.setData({
      userInfo:user
    })
    },
    //授权登录
  login(){
    // wx.getUserProfile().then((res)=>{
    //   console.log(res.userInfo);
    // })
    wx.getUserProfile({
      desc:'必须授权才能上使用',
      success:res=>{
      var user=res.userInfo
      console.log(user);
      //把用户信息缓存在本
      wx.setStorageSync('user', user)
      this.setData({
        userInfo:user
      })
      wx.switchTab({
        url: '/pages/index/index',
      })
      },
      fail:res=>{
        console.log("失败",res)
      }
    })

    // const token=wx.getStorageSync('token');
    //     if(!token){
    //         Promise.all([getWxLogin(),getUserProfile()]).then((res)=>{
    //             console.log(res[0].code);
    //             console.log(res[1].userInfo.nickName,res[1].userInfo.avatarUrl)
    //             let loginParam={
    //                 code:res[0].code,
    //                 nickName:res[1].userInfo.nickName,
    //                 avatarUrl:res[1].userInfo.avatarUrl
    //             }
    //             //console.log(loginParam)
    //             wx.setStorageSync('userInfo', res[1].userInfo);
    //             this.wxlogin(loginParam);
    //             this.setData({
    //                 userInfo:res[1].userInfo
    //             })
    //         })
            
    //     }else{
    //         //已登录
    //         const userInfo=wx.getStorageSync('userInfo')
    //         this.setData({
    //             userInfo
    //         })
    //     }

  },
 

  //退出登录
  loginout(){
    this.setData({
      userInfo:''
    })
    //清理本地缓存
    wx.setStorageSync('user', null)
  },

  switchTab(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
})