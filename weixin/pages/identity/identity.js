import WxValidate from '../../utils/WxValidate'
import {util} from '../../utils/util'
// pages/identity/identity.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
     sexList: [
      {
        name: 'male',
        value: '男',
        checked: 'true'
      },
      {
        name: 'female',
        value: '女',
      }
    ],

    form: {
      realName: '',
      phone: '',
      id: '',
      sex:''
    },
    nFlag: true,//判断姓名格式
    tFlag: true,//判断手机号格式
    IDFlag: true,//判断身份证号
    nickName:''//昵称

  },

  radioChange: function (e) {
    console.log('性别：', e.detail.value)
    this.data.form.sex=e.detail.value;
    this.setData({
       form:this.formd
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function (options) {
    // 获取缓存中的微信名nickName
    //this.getNickName();
    //如果用户已经提交数据加载认证信息
    this.loadUserData();
  },



   formSubmit(e) {
     let that=this;
    console.log(e);
    var realName = e.detail.value.realName;//姓名
    var phone = e.detail.value.phone;//手机号
    var id = e.detail.value.id;//身份证号
   var sex=e.detail.value.sex;
    if(realName == ''){
      this._showToast('请先输入姓名');
      return;
    }
    if(phone == ''){
      this._showToast('请先输入手机号');
      return;
    }
    if(id == ''){
      this._showToast('请先输入身份证号');
      return;
    }
    
    // 判断姓名格式
    var nFlag = this.judgeName(realName);
    if (!nFlag) {
      this._showToast('请输入正确格式的姓名');
    }
    // 判断手机格式
    var tFlag = this.judgeTel(phone);
    if (!tFlag) {
      this._showToast('请输入正确格式的手机号');
    }
    
   
     var IDFlag = this.judgeID(id);
    // if (!IDFlag) {
    //   this._showToast('请输入正确格式的身份证号');
    // }
     console.log(IDFlag);
    this.setData({
      nFlag,
      tFlag,
      IDFlag
    })
    
    var nickName = this.data.nickName;
   var user=wx.getStorageSync('user');
     var param={"uNickname":user.nickName,"uAvatarUrl":user.avatarUrl,"uTel":phone,"uRealname":realName,"uNumber":id,"uSex":sex,"openid":""};
     //调用请求方法将数据请求到管理后台服务接口
     util.reqPost(app.globalData.apiUrl+"/users/saveUser",param,function(res){
       res=res.data;
        console.log("返回数据===》"+JSON.stringify(res));
           if(res.code != 0){
              wx.showToast({
                title:res.msg,
              })
            return;
           } 

            wx.showToast({
              title: '操作成功'
            })
              user.id=res.data.insertId;
              user.uRealname=realName;
              user.uNumber=id;
              user.uTel=phone;
              user.sex=sex;

              wx.setStorageSync('user', user)
            wx.reLaunch({
              url: '/pages/my/my'
            })
     });
    
  },

  // 判断姓名格式是否正确
  judgeName(nameValue) {
    var newStr = this.delTrim(nameValue);
    var nameReg = /^([\u4e00-\u9fa5·s]{2,20}|[a-zA-Z.s]{2,20})$/g;
    return (nameReg.test(newStr));
  },
  //去掉空格  str 需要去掉空格的字符串
  delTrim(str) {
    var newStr = str.split(' ').filter(function (item) {
      return item;
    }).join('')
    return newStr;
  },
  // 判断手机号格式是否正确
  judgeTel(telValue) {
    var telReg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-9])\d{8}$/;
    //console.log(telReg.test(telValue));
    //console.log(telValue);
    return (telReg.test(telValue));
  },
  // 验证身份证号合法性验证 支持15位和18位身份证号 支持地址编码、出生日期、校验位验证
  judgeID(code) {
    var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
    var pass = true;
    var reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/;
    if (!code || !code.match(reg)) {
      this._showToast('身份证号格式错误');
      pass = false;
    } else if (!city[code.substr(0, 2)]) {
      this._showToast('地址编码错误');
      pass = false;
    } else {
      //18位身份证需要验证最后一位校验位
      if (code.length == 18) {
        code = code.split('');
        //∑(ai×Wi)(mod 11)
        //加权因子
        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        //校验位
        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
        var sum = 0;
        var ai = 0;
        var wi = 0;
        for (var i = 0; i < 17; i++) {
          ai = code[i];
          wi = factor[i];
          sum += ai * wi;
        }
        var last = parity[sum % 11];
        if (last != code[17]) {
          this._showToast('校验位错误');
          pass = false;
        }
      }
    }
    // console.log(pass);
    
    return pass;
  },
  // 提示信息错误
  _showToast(title){
    wx.showToast({
      title:title,
      icon:'none'
    })
  },
  //用户加载当前如果已经认证用户
  loadUserData(){
   var user=wx.getStorageSync('user');
   
   if(typeof user.isIdent ==="undefined" ||  user ===""){
   return;
   }
   
   this.data.form.realName=user.uRealname;
   this.data.form.phone=user.uTel;
   this.data.form.id=user.uNumber;
   this.data.form.sex=user.sex;
   
   this.setData({
     form:this.data.form
   })
  }, 


  //获取缓存中的微信名nickName
  // getNickName(){
  //   var self = this;
  //   wx.getStorage({
  //     key:'USER',
  //     success(res){
  //       // console.log(res.data.nickName)
  //       self.setData({
  //         nickName:res.data.nickName
  //       })
  //     }
  //   })
  // },


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