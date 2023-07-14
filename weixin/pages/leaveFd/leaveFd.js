const { formatTime,util } = require("../../utils/util");
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    words:"",
    userInfo:{},
    //留言信息
    message:{id:"",name:"",words:"",time:""},
    //留言集合
    messageList:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  
    getWords(e){
    this.data.words = e.detail.value;
    console.log("getwords:"+this.data.words);
  },


  send(){
    //检测是否有填写留言，若无则提示
    if(this.data.words.length==0){
      wx.showToast({
        title: '请填写留言',
        icon:'error'
      })
      return;
    }
    //向服务器请求插入
    var that = this;
    that.pushFeedback();
  


    /*wx.request({
    //  url: '',
      method: "POST",
      data: {
        name: that.data.userInfo.nickName,
        words: that.data.words
      },
      header: {
        'content-type' : 'application/x-www-form-urlencoded',
      },
      success: function(res){
        //刷新页面内容
        that.findAll();
        that.setData({
          messageList:that.data.messageList,
          words:""
        })
        //页面弹出留言成功提示
        wx.showToast({
          title: '留言成功',
          icon: 'success'
        })
      }
    })*/
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
  /***
   * 提交留言信息到管理后台
   * 
   */
  pushFeedback(){
  var user=wx.getStorageSync('user');
  console.log(user.nickName);
  console.log(user);
  if(typeof user.isIdent==="undefined" || user===""){
      wx.showToast({
        title: '用户未认证',
      })
   return;
  }

  if(typeof user.id==="undefined"|| user.id===0){
    wx.showToast({
      title: '请先提交实名信息',
    })
 return;
  }

   var param={"uID":user.id,"fdDetail":this.data.words};
    util.reqPost(app.globalData.apiUrl+"/feedBack/saveFeedBack",param,function(res){
      res=res.data;  
      if(res.code !=0){
        wx.showToast({
          title: res.msg,
        })
         return;
        }

        wx.showToast({
          title:"提交成功",
        })
        wx.switchTab({
          url: '/pages/feedback/feedback',
        })
 
    })


  }
})