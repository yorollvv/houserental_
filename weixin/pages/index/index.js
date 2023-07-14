
//import {util} from '../../utils/util';
const { util } = require("../../utils/util");
const app = getApp()

Page({
  data: {
   // 轮播图部分
   swiperImg: ['http://himg4.qunarzz.com/imgs/202106/04/C.991QbCDeYv7FmP52vi624.jpg',
   'http://himg4.qunarzz.com/imgs/201902/03/C._M0DCiiu6K7H2Tagii624.jpg',
   'http://himg3.qunarzz.com/imgs/202112/09/C.Z9hvVwpymIXsxr4ifi624.jpg',
   'http://himg1.qunarzz.com/imgs/201910/04/C.fFGiVX9EUtXlQwdQXi624.jpg'
   ],
   duration: 500,
   indicatorDots: true,
   vertical: false,
   autoplay: true,
   interval: 2000,
   
   city:'',
  //  param1:{
      
      	
  //   },
    hid:0,
    selectedCity:'厦门市',//被选中的城市
   region: ['福建省', '厦门市', '思明区'],
   house:[],
   userInfo:{},
   starPic:['../../icon/ifstar.png','../../icon/ifstar_.png']
	},
	

  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
       // canIUseGetUserProfile: true
      })
    }
   var user=wx.getStorageSync('user');  
    this.loadData();
  },
    // 监听地址(区域)改变事件
    changeArea1(e) {
      var city = e.detail.value[1];

      this.setData({
        region: e.detail.value,
        city: e.detail.value[1],
        selectedCity: e.detail.value[1],
        house:[]
      }) 
      //console.log(this.data.selectedCity)
      this.loadData()
  
    },

    onSearch(e){
      wx.hideKeyboard({
        complete: res => {
          console.log('hideKeyboard res', res)
        }
      })
      wx.navigateTo({
        url:'/pages/search/search'
      })
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

  loadData(){
    
    let that=this;
    var param1={"hID":this.data.hid,"selectedCity":this.data.selectedCity};
     
    util.reqPost(app.globalData.apiUrl+"/house/houseListByUser",param1,function(res){
          res=res.data;
          //console.log(res);
          if(res.code != 0){
             wx.showToast({
               title: res.msg
             })
            return;
            }
            that.setData({
             house:that.data.house.concat(res.data.list)
             //house:that.data.house
            });
            
    });
    
  

   } 


  
})
