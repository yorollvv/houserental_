import {util} from '../../utils/util'
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   isIdent:0
  },
  //退出登录
  loginout(){
    this.setData({
      userInfo:''
    })
    //清理本地缓存
    wx.setStorageSync('user', null)
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

   // 收藏夹跳转
   onStar() {
    wx.navigateTo({
      url: '/pages/star/star'
    })
  },
  //房屋出租跳转
  onMyLease() {
    wx.navigateTo({
      url: '/pages/MyLease/MyLease'
    })
  },
  //我的租房跳转
  onMyRent() {
    wx.navigateTo({
      url: '/pages/myRent/myRent'
    })
  },
  //我的房源跳转
  onMyHouse() {
    wx.navigateTo({
      url: '/pages/myHouse/myHouse'
    })
  },
    //协议跳转
  onAgreement() {
    wx.navigateTo({
      url: '/pages/agreement/agreement'
    })
  },
  //实名认证跳转
   onidentity() {
    wx.navigateTo({
      url: '/pages/identity/identity'
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   //加载用户认证信息
   this.getUserServerInfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  onTabItemTap:function(){
    
  },
  /**
   * 根据用户昵称
   * 读取后台账号信息
   * 查询是否已经认证
   */
  getUserServerInfo(){
  let that=this;
 
    var user=wx.getStorageSync("user");
     console.log(user);
   if(user===""){
   return;
   }
    var param={"nickName":user.nickName};
    
    //调用请求方法将数据请求到管理后台服务接口
    util.reqPost(app.globalData.apiUrl+"/users/user",param,function(res){
      res=res.data;  
      if(res.code !=0){
        return;
      }
       var userInfo=res.data; 
       console.log(JSON.stringify("打印用户信息【"+JSON.stringify(userInfo)+"】"));
       user.isIdent=userInfo[0].isIdent; 

       that.setData({
        isIdent:user.isIdent
       })
       wx.setStorageSync('user', user);  
    })



  }
})