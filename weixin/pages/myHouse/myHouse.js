// pages/myHouse/myHouse.js
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
    hid:0

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
			url: `/pages/myHouseDetail/myHouseDetail?hid=${hid}&user=${uid}`
		})
	},

  loadData(){
    let that=this;
  var uid = this.data.param.uid;
    util.reqPost(app.globalData.apiUrl+"/house/lookMyHouse",this.data.param,function(res){
          res=res.data;
          if(res.code != 0){
             wx.showToast({
               title: res.msg
             })
            return;
            }
          //  console.log(uid);
            that.setData({
              house:that.data.house.concat(res.data.list)
            });

    });
 

   },
   updatePrice(e){
    //  var that=this;
     
    //   that.setData({
    //     hid:e.currentTarget.dataset.id,
    //         });
   // var hid=e.target.dataset.id;
  wx.showModal({
    title: '修改租金',
    editable:true,
    placeholderText:'请输入租金',
    success: function(res) {
      if (res.confirm) {
       console.log('res:',res);

      var user=wx.getStorageSync('user');
      var hid=e.currentTarget.dataset.id;
      console.log("hid:"+hid);
      var hRent=res.content;

      var param={"uID":user.id,"hID":hid,"hRent":hRent};
      console.log(param);
    //调用请求方法将数据请求到管理后台服务接口
    util.reqPost(app.globalData.apiUrl+"/house/updatePrice",param,function(res){
      console.log(res);
      res=res.data;  
      if(res.statusCode == 404){
        wx.showToast({
          title: res.msg,
        })
         return;
        }
        wx.showToast({
          title:"修改成功",
        })
        
    })
      
      } else if (res.cancel) {
      console.log('用户点击取消')

      }   
    }

})
  },
})