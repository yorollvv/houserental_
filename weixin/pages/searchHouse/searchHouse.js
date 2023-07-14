const { util } = require("../../utils/util");
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     param:{
      uid:0,
      inputValue:''
    },
   
    house:[],

   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options) {
      //console.log("111");
      var inputValue_=options.inputValue;
      var uid_=options.uid;
      var user=wx.getStorageSync('user');
      var uid="%"+uid_+"%";
      var inputValue="%"+inputValue_+"%";
     this.data.param.uid=uid;
     this.data.param.inputValue=inputValue;
     this.setData({
      param:this.data.param
     })
      console.log(this.data.param);
      this.loadData();

  },

  loadData(){
    let that=this;
    var inputValue=this.data.param.inputValue;
    console.log("111");
    console.log(inputValue);
    util.reqGet(app.globalData.apiUrl+"/house/searchHouse",this.data.param,function(res){
          res=res.data;
          console.log(res);
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
   },
  onHouseDetail(event) {
		var hid=event.currentTarget.dataset.id;
    var user=wx.getStorageSync('user');
    var uid=user.id;
   // console.log(hid);
		//console.log(uid);
		wx.navigateTo({
			url: `/pages/huoseDetail/huoseDetail?hid=${hid}&user=${uid}`
		})
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

  }
})

