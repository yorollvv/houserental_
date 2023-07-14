// pages/star/star.js
import {util} from '../../utils/util'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    param:{
  
      uid:0
    },
   
   house:[],
   userInfo:{},
   starPic:['../../icon/ifstar.png','../../icon/ifstar_.png']

  },
  


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   var user=wx.getStorageSync('user');

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
   onHouseDetail(event) {
		var hid=event.currentTarget.dataset.id;
    var user=wx.getStorageSync('user');
    var uid=user.id;
   // console.log(hid);
		//console.log(uid);
		wx.navigateTo({
			url: `/pages/myStarDetail/myStarDetail?hid=${hid}&user=${uid}`
		})
	},
  
  loadData(){
    let that=this;

    util.reqPost(app.globalData.apiUrl+"/house/lookStarHouse",this.data.param,function(res){
          res=res.data;
          if(res.code != 0){
             wx.showToast({
               title: res.msg
             })
            return;
            }
            that.setData({
              house:that.data.house.concat(res.data.list)
            });

    });
 

   } 
})