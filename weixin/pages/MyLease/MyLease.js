
import WxValidate from '../../utils/WxValidate'
import {util} from '../../utils/util'
const app=getApp();
// import { UserModel } from '../../model/user';
// var userModel = new UserModel();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['福建省', '厦门市', '思明区'],
    
    facilities: [
      {
        pro: "kt",
        name: '空调',
        active: false
      },
      {
        pro: "wifi",
        name: 'wifi',
        active: false
      },


      {
        pro: "rsq",
        name: '热水器',
        active: false
      },
      {
        pro: "xyj",
        name: '洗衣机',
        active: false
      },
   
     
      {
        pro: "dsj",
        name: '电视机',
        active: false
      },
    
      {
        pro: "bx",
        name: '冰箱',
        active: false
      }
    ],
    selected: [],
    imgbox:[],//上传图片
    //nFlag: true,
    // form表单
    form: {
      houseName: '',
      addrDetail: '',
      rentPrice: '',
      type:'',
      mode:'',
      maxNum:'',
      describe: '',
      area: ''
    },
    max: 300,//textarea最多可以输入的字
    currentWordNumber: 0,//textarea当前字数
    uid: 0,
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate();
   // this.getGA();
    var user=wx.getStorageSync('user');
    
  },
 
  //报错规则 
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  //验证函数
  initValidate() {
    const rules = {
      houseName: {
        required: true,
     
      },
      addrDetail: {
        required: true
      },
      rentPrice: {
        required: true,
        
      },
      type: {
        required: true,
        
      },
      mode: {
        required: true,
       
      },
      maxNum: {
        required: true,
        maxlength: 10,
        minlength: 1
      },
      describe: {
        required: true,
        
      },
      area: {
        required: true,
       
      }
    }
    const messages = {
      houseName: {
        required: '请填写房子名称',
        minlength: '房子名称长度最少为5位'
      },
      addrDetail: {
        required: '请填写房子的详细地址'
      },
      rentPrice: {
        required: '请填写租金',
        maxlength: '租金价格最高100000元',
        minlength: '租金价格最低100元'
      },
      type: {
        required: '请填写房源户型',
      },
      mode: {
        required: '请填写租住类型',
      },
      maxNum: {
        required: '请填写最多租住人数',
      },
      describe: {
        required: '请简要描述一下你的房源'
      },
      area: {
        required: '请填写房子面积单位平方米',
      },
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  // 表单提交
  formSubmit(e) {
    let that=this;
    // console.log(e);
    // console.log(this.data.nickName)
    var values = e.detail.value
    const params = e.detail.value;
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }

    // this.showModal({
    //   msg: '提交成功'
    // })
    var user=wx.getStorageSync('user');
    var uid=user.id;
   //  console.log(uid);
    uid = this.data.uid;
    var area = values.area;
    var rentPrice = values.rentPrice;
    var houseName = values.houseName;
    var addrDetail = values.addrDetail;
    var type = values.type;
    var mode = values.mode;
    var maxNum = values.maxNum;
    var describe = values.describe;
    var selected = this.data.selected;
    var city = this.data.region[1];
 //   console.log(city);
     var imgbox = this.data.imgbox;
     console.log(imgbox);
  //   var newStrSel = '';
  //  // console.log(this.getRandom(0,length));
  //   for (var i = 0; i < selected.length; i++) {
  //     newStrSel += selected[i] + ","
  //   }


  imgbox= JSON.stringify(imgbox)
  console.log(imgbox);


    var param={"uID":user.id,"houseName":houseName,"addrDetail":addrDetail,"rentPrice":rentPrice,"type":type,"maxNum":maxNum,"area":area,"describe":describe,"mode":mode,"city":city,"hPic":imgbox};
    //调用请求方法将数据请求到管理后台服务接口
    util.reqPost(app.globalData.apiUrl+"/house/upHouse",param,function(res){
      console.log(res);
      res=res.data;  
      if(res.statusCode == 404){
        wx.showToast({
          title: res.msg,
        })
         return;
        }
        wx.showToast({
          title:"上传成功",
        })
        wx.reLaunch({
              url: '/pages/my/my'
            })
    })
  

  },


  // 选择省市区
  onRegionChange(e) {
    // console.log(e);
    this.setData({
      region: e.detail.value
    })

  },
  // 点击配置设施
  onChooseFacTap(e) {
    // console.log(e);
    var curIndex = e.currentTarget.dataset.index;
    var bool = this.data.facilities[curIndex].active;
    var selected = this.data.selected;
    this.setData({
      ['facilities[' + curIndex + '].active']: !bool
    })
    if (this.data.facilities[curIndex].active == true) {
      selected.push(this.data.facilities[curIndex].name)
    } else if (this.data.facilities[curIndex].active == false) {
      this.remove(selected, this.data.facilities[curIndex].name);
    }
    console.log(this.data.selected);
    console.log(bool);
    console.log(curIndex);
  },
  // 删除指定元素的数组
  remove: function (array, val) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == val) {
        array.splice(i, 1);
      }
    }
    return -1;
  },

  // // 获取当前选择的租住类型
  // onRentalChoosed(e) {
  //   // console.log(e);
  //   var rentalChoosed = e.detail.choose;
  //   this.setData({
  //     rentalChoosed
  //   })
  //   if (rentalChoosed === '短租') {
  //     this.setData({
  //       isShowDate: true
  //     })
  //     this.getLocalDate();
  //   } else {
  //     this.setData({
  //       isShowDate: false
  //     })
  //   }
  // },
  // 获取当前选择的户型
  // onApartChoosed(e) {
  //   // console.log(e);
  //   var apartChoosed = e.detail.choose;
  //   this.setData({
  //     apartChoosed
  //   }
  //   )
  // },

  // // 监听出租的开始时间（短租）
  // changeStartDate(e) {
  //   // console.log(e,332);
  //   var startDate = e.detail.value;
  //   this.setData({
  //     startDate
  //   })
  // },

  // // 监听出租的结束时间（短租）
  // changeEndDate(e) {
  //   var endDate = e.detail.value;
  //   this.setData({
  //     endDate
  //   })
  // },
  
  // 删除照片
  imgDelete1: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgbox = this.data.imgbox;
    imgbox.splice(index, 1)
    that.setData({
      imgbox: imgbox
    });
  },
  // 上传图片
  addPic1: function (e) {
    // console.log(e);
    var self = this;
    var imgbox = this.data.imgbox;
    // console.log(imgbox)
   // console.log("imgbox:"+imgbox)
    var picid = e.currentTarget.dataset.pic;
  //   console.log("picid:"+picid)
    var that = this;
    // var n = 6;
    // if (6 > imgbox.length > 0) {
    //   n = 6 - imgbox.length;
    // } else if (imgbox.length == 6) {
    //   n = 1;
    // }

    wx.chooseImage({
      // count: n, // 默认6
     // sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
     // sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
       //  console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        //console.log(tempFilePaths.length);
        // console.log(res.tempFilePaths); 

        // for (var i = 0; i < tempFilePaths.length; i++) {
        //   wx.getFileSystemManager().readFile({
        //     filePath: res.tempFilePaths[i], //选择图片返回的相对路径
        //     encoding: 'base64', //编码格式
        //     success: res => { //成功的回调
        //        //console.log('data:image/png;base64,' + res.data)
        //     }
        //   })
        // }

        //console.log(imgbox.length);
        if (imgbox.length == 0) {
          imgbox = tempFilePaths
        } else if (7 > imgbox.length) {
          imgbox = imgbox.concat(tempFilePaths);

        } else {
          imgbox[picid] = tempFilePaths[0];
        }
        that.setData({
          imgbox: imgbox,
         
        });
       // console.log(imgbox)
      }
    })
  },
  // 监听textarea的字数限制和动态变化
  onDescribeInput(e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);

    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len //当前字数  
    });
  },


  //去掉空格  str 需要去掉空格的字符串
  // delTrim(str) {
  //   var newStr = str.split(' ').filter(function (item) {
  //     return item;
  //   }).join('')
  //   return newStr;
  // },
 

  getRandom(min, max) {
    //
    return Math.floor(Math.random() * (max - min) + min);
  },

 
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