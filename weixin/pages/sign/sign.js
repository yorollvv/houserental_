// pages/sign/sign.js
import WxValidate from '../../utils/WxValidate'
const { util } = require("../../utils/util");
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid:0,
    hid:0,
    month:0,
    totalRent:0,
    house:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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
    this.loadData();

  },
// 获取input值
  getInputName:function(e){
    this.setData({
      month: e.detail.value
    })
   // console.log(this.data.month);
  },


// 点击按钮
 formSubmit(){
   //console.log(this.data.month);
   let that=this;
   var rent = this.data.house[0].hRent;
   console.log("rent:"+rent);
   var month = this.data.month;

   var totalRent = month*rent;
   console.log("month:"+month);
   console.log("total:"+totalRent);
   //console.log(this.data.id);
    var param={"uID":this.data.uid,"hID":this.data.hid,"totalRent":totalRent};
      console.log(param);
    util.reqPost(app.globalData.apiUrl+"/house/tosignHouse",param,function(res){
          console.log(res)
          var res_data=res.data;//接收后端传来的数据
          //console.log(res_data);
          //成功
          if(res.statusCode==200){

            that.setData({
             house:that.data.house.concat(res_data)
             //house:that.data.house
            });
         //  console.log(that.data.house);
             wx.showToast({
               title:"签约成功",
             })
            return;
            }
    });

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
   loadData(){
    let that=this;
   //console.log(this.data.id);
    var param={"uID":this.data.uid,"hID":this.data.hid};
  //    console.log(param);
    util.reqPost(app.globalData.apiUrl+"/house/signHouse",param,function(res){
          console.log(res)
          var res_data=res.data;//接收后端传来的数据
          //console.log(res_data);
          //成功
          if(res.statusCode==200){

            that.setData({
             house:that.data.house.concat(res_data)
             //house:that.data.house
            });
         //  console.log(that.data.house);
             wx.showToast({
               title: res.msg
             })
            return;
            }
    });

   } 
})