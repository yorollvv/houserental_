// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
   onfd() {
    wx.navigateTo({
      url: '/pages/leaveFd/leaveFd'
    })
  },
   onMyfd() {
    wx.navigateTo({
      url: '/pages/myFd/myFd'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
  // addPic1: function (e) {
  //   // console.log(e);
  //   var self = this;
  //   var imgbox = this.data.imgbox;
  //   // console.log(imgbox)
  //   var picid = e.currentTarget.dataset.pic;
  //   // console.log(picid)
  //   var that = this;
  //   var n = 6;
  //   if (6 > imgbox.length > 0) {
  //     n = 6 - imgbox.length;
  //   } else if (imgbox.length == 6) {
  //     n = 1;
  //   }
  //   wx.chooseImage({
  //     count: n, // 默认9
  //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  //     success: function (res) {
  //       // console.log(res.tempFilePaths)
  //       // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
  //       var tempFilePaths = res.tempFilePaths;
  //       for (var i = 0; i < tempFilePaths.length; i++) {
  //         wx.getFileSystemManager().readFile({
  //           filePath: res.tempFilePaths[i], //选择图片返回的相对路径
  //           encoding: 'base64', //编码格式
  //           success: res => { //成功的回调
  //             // console.log('data:image/png;base64,' + res.data)
  //           }
  //         })
  //       }
  //       if (imgbox.length == 0) {
  //         imgbox = tempFilePaths
  //       } else if (9 > imgbox.length) {
  //         imgbox = imgbox.concat(tempFilePaths);

  //       } else {
  //         imgbox[picid] = tempFilePaths[0];
  //       }
  //       that.setData({
  //         imgbox: imgbox
  //       });
  //     }
  //   })
  // },

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
