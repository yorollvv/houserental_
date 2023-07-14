const moment = require('moment');
var md5 =require("md5");

exports.formatData=function(code,msg,data){
	var reslut={"code":code,"msg":msg,"data":data};
	return  reslut;
} 

exports.dateTimeFormat=function(format="YYYY-MM-DD HH:mm:ss"){
	const reslut = moment().format(format);
	return  reslut;
} 

//加密
exports.encryptionPass=function(passwordValue){
 var start=passwordValue.substring(0,2);
 var end=passwordValue.substring(passwordValue.length,passwordValue.length-2);
 var md5Value=md5(start+passwordValue+end);
	 md5Value=md5(md5Value);
	 //就等于是原密码了，没有加密的了。屏蔽掉就等于是加密的了。
	 md5Value=passwordValue
	return md5Value;
}

//密码比较
exports.isPass=function(passwordValue,storePass){
 var start=passwordValue.substring(0,2);
 var end=passwordValue.substring(passwordValue.length,passwordValue.length-2);
 var md5Value=md5(start+passwordValue+end);
 md5Value=md5(md5Value);
 //明文密码比较，屏蔽以后等于加密对比
 md5Value=passwordValue;
	if(md5Value===storePass){
		return true;
	}else{
	   return false;	
	} 
	return false;
}

exports.checkData=function(value,type){ 
	 //验证手机号
	if("phone"===type){
		const judgePhone = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
		const st = new RegExp(judgePhone);
		if (!st.test(value)) {
		   return false;
		}
		return true;
	}

	//验证身份证号
	if("card"===type){
		const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		if (reg.test(value) === false) {
		   return false;
		}
		return true;
	}
	
}






exports.getToken=function(userName){
	var token=this.dateTimeFormat("YYYY-MM-DD HH:mm:ss"+userName);
	token=md5(token);
	return token;
}