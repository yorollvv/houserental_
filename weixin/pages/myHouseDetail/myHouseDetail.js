// pages/huoseDetail/huoseDetail.js
const { util } = require("../../utils/util");
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    house:[],
    uid:0,
    hid:0,
    swiperImg:[],
    duration: 500,
    indicatorDots: true,
    vertical: false,
    autoplay: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options) {
    var hid=options.hid;
    var uid=options.user;
    console.log(hid)
    console.log(uid)
    // console.log(options);
    // console.log(options.hid);
    this.setData({
      hid:hid,
      uid:uid
    })
   // console.log(this.data.id)

    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
   var user=wx.getStorageSync('user');
   //console.log(user);
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
    onCall(e) {
      var house = this.data.house;
      var phone = house[0].uTel;
     // console.log(phone);
      wx.makePhoneCall({ 
      phoneNumber:phone,
      success(e) {
        console.log(e)
      }
    })
  },
  onApplicationTap(e) {
   
  },

   loadData(){
    let that=this;
   //console.log(this.data.id);
    var param2={"uID":this.data.uid,"hID":this.data.hid};
      console.log(param2);
    util.reqGet(app.globalData.apiUrl+"/house/HouseDetail",param2,function(res){
          console.log(res)
          var res_data=res.data;//接收后端传来的数据
          //console.log(res_data);
          //成功
          if(res.statusCode==200){

            that.setData({
             house:that.data.house.concat(res_data)
             //house:that.data.house
            });
           console.log(that.data.house);
             wx.showToast({
               title: res.msg
             })
            return;
            }
    });

   } 
})