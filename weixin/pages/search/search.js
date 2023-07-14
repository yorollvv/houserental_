
const { util } = require("../../utils/util");
const app = getApp()
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    historysearch: [],
    inputValue: "", //输入框输入的值
    replaceValue: "",     //替换输入框的值
    searchresult: false,
    value:''
  },
  
   onSearch(e){
   // console.log(this.data.inputValue);
     var inputValue = this.data.inputValue;
     var user=wx.getStorageSync('user');
     var uid=user.id;
      wx.navigateTo({
        url:`/pages/searchHouse/searchHouse?inputValue=${inputValue}&uid=${uid}`
        //  url:`/pages/searchHouse/searchHouse`
      })
    },

    // 获取input的值
  getInputValue(e) {

    this.setData({
      inputValue: e.detail.value
    })
  },
  
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // // 历史搜索
    // let that = this;
    // that.searchtype = options.searchtype;
    // wx.getStorage({
    //   key: 'historyStorage',
    //   success: function (res) {
    //     // console.log(res.data)
    //     that.setData({
    //       historyStorageShow: true,
    //       historyStorage: res.data
    //     })
    //   }
    // })
    // this.setData({
    //   inputValue: options.inputValue
    // })
    // this.data.inputValue = options.inputValue
    // // console.log(this.data.inputValue)
  },
  // goUpdate: function () {
  //   this.onLoad()
  //   // console.log("我更新啦")
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
 
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
 
  },
 
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
 
  },
 
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
 
  },
 
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
 
  },
 
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
 
  },
 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
 
  }
})