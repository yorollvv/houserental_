
import {util} from '../../utils/util'
// pages/identity/identity.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    param:{
      page:1,
      pageSize:20,
      uid:0
    },
    feedbackList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
     var user= wx.getStorageSync('user');
     this.data.param.uid=user.id;
     this.setData({
      param:this.data.param
     })
     this.loadData();
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
    //获取用户认证信息
   
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
    this.data.param.page= this.data.param.page+1;
     this.setData({
       param:this.data.param
     });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
   loadData(){
    let that=this;

    util.reqPost(app.globalData.apiUrl+"/feedBack/listByUser",this.data.param,function(res){
          res=res.data;
          if(res.code != 0){
             wx.showToast({
               title: res.msg
             })
            return;
            }
            that.setData({
              feedbackList:that.data.feedbackList.concat(res.data.list)
            });
            console.log(res)

    });
 

   } 
})