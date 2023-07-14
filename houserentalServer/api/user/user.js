let db = require('../../db/db')
let util=require('../../util/util');
//管理后台用户列表数据
exports.getUserList = (req, res) => {
    var page=req.query.page;
	var pageSize=req.query.pageSize;
	
	page=page==""||typeof page ==="undefined"?1:page;
	pageSize=pageSize==""||typeof pageSize ==="undefined"?20:pageSize;
	
	//统计总数
	var count=0;
	var list=new Array();	
	let startPage=(page-1)*pageSize;
   var sqlParam=[startPage,pageSize];
   
   var sql = "select count(uID)as count from User;select * from User  order by uID desc limit ?,?";
   
    db.query(sql,sqlParam, (err, result) => {
        if(err) {
        list=new Array();
		resultJson={"count":count,"list":list};
		res.send(util.formatData(0,"success["+err+"]",resultJson));
		return;
        }
		
	    count=result[0][0].count;
		list=result[1];
	   console.log("统计数据【"+JSON.stringify(count)+"】【"+JSON.stringify(list)+"】")
		resultJson={"count":count,"list":list};
		res.send(util.formatData(0,"success",resultJson));
    })
	
}

/**
 * 查询用户数据信息
  
 **/
exports.getUser = (req, res) => {
	var nickName=req.body.nickName;
	if(nickName==="" || nickName===null || typeof nickName==="undefined" ){
		 res.send(util.formatData(1,"nickName不能为空",""));
		return;
	}
    var sql = "select * from User where uNickname='"+nickName+"' order by uID desc limit 1";
	
    db.query(sql, (err, data) => {
        if(err) {
			res.send(util.formatData(1,"错误【"+err+"】",[])); 
            return;
        }
		
		if(data==null || data.length <=0){
			 res.send(util.formatData(1,"未找到数据",[])); 
			 return;
		}
		
        res.send(util.formatData(0,"success",data));
    }) 
}

//保存用户信息接口,实名接口
exports.saveUser = (req, res) => {
	var openid=req.body.openid;
	//昵称
	var uNickname=req.body.uNickname;
	//图像
	var uAvatarUrl=req.body.uAvatarUrl;
	//电话
	var uTel=req.body.uTel;
	//真实姓名
	var uRealname=req.body.uRealname;
	//身份证
	var uNumber=req.body.uNumber;
	//性别
	var uSex=req.body.uSex;
	
	if(uRealname==="" || uRealname===null || typeof uRealname==="undefined" ){
		 res.send(util.formatData(1,"真实姓名不能为空",""));
		return;
	}
	
	if(uTel==="" || uTel===null || typeof uTel==="undefined" ){
		 res.send(util.formatData(1,"电话不能为空",""));
		return;
	}
	
	if(uNumber==="" || uNumber===null || typeof uNumber==="undefined" ){
		 res.send(util.formatData(1,"身份证号不能为空",""));
		return;
	}
	
	if(!util.checkData(uTel,"phone")){
		res.send(util.formatData(1,"手机号不正确",""));
		return;
	}
	if(!util.checkData(uNumber,"card")){
		res.send(util.formatData(1,"身份证不正确",""));
		return;
	}
	//判断用户是否存在用户存在则更新实名数据
    var sql = "insert into user set ?";
	var insertData={
		"openid":openid,
		"uNickname":uNickname,
		"uAvatarUrl":uAvatarUrl,
		"uTel":uTel,
		"uRealname":uRealname,
		"uNumber":uNumber,
		"uSex":uSex,
		"isIdent":0,
		"addtime":util.dateTimeFormat("YYYY-MM-DD HH:mm:ss")
	};
    db.query(sql,insertData,(err, data) => {
        if(err) {
            res.send(util.formatData(1,"加入失败【"+err+"】",""));
			return;
        }
        res.send(util.formatData(0,"加入成功",data));
    })
}

/**
 * 管理员审核用户信息明细
 **/
 exports.checkUserList = (req, res) => {
 	var uID=req.query.uID;	
 	if(uID==="" || uID===null || typeof uID==="undefined" ){
 		 res.send(util.formatData(1,"用户身份ID不能为空",""));
 		return;
 	}
 	//判断用户是否存在用户存在则更新实名数据
     var sql = "select * from UserExamine ";
     db.query(sql,(err, data) => {
         if(err) {
             res.send(util.formatData(1,"加入失败【"+err+"】",""));
 			return;
         }
         res.send(util.formatData(0,"加入成功",{"list":data}));
     })
 }
 
 /**
  * 管理员审核用户
  */
 exports.addCheckUser = (req, res) => {
	
	console.log("打印审核数据==>"+JSON.stringify(req.query));
 	var aid=req.query.aid;	
	var uID=req.query.uID;	
	var isUEpass=req.query.isUEpass;	
	var ueReason=req.query.ueReason;
	
	if(aid==="" || aid===null || typeof aid==="undefined" ){
		 res.send(util.formatData(1,"管理员身份ID不能为空",""));
		return;
	}
		
 	if(uID==="" || uID===null || typeof uID==="undefined" ){
 		 res.send(util.formatData(1,"用户身份ID不能为空",""));
 		return;
 	}
	
	if(isUEpass==="" || isUEpass===null || typeof isUEpass==="undefined" ){
		 res.send(util.formatData(1,"审核结果不能为空",""));
		return;
	}
	
	if(isUEpass !=1 && (ueReason==="" || ueReason===null || typeof ueReason==="undefined") ){
		 res.send(util.formatData(1,"审核结果不能为空",""));
		return;
	}
	
 	//插入审核信息
     var sql = "insert into  UserExamine set ?";
	 var insertData={
		 "aid":aid,
		 "uID":uID,
		 "ueTime":util.dateTimeFormat("YYYY-MM-DD HH:mm:ss"),
		 "isUEpass":isUEpass,
		 "ueReason":ueReason
	 }
     db.query(sql,insertData,(err, data) => {
         if(err) {
             res.send(util.formatData(1,"审核失败【"+err+"】",""));
 			return;
         }else{
			 editUserCheckStatus(uID,isUEpass);
			 res.send(util.formatData(0,"审核成功",data));
		 }
     })
 }
 /**
  * uid 用户ID
  * isUEpass 认证通过1 不通过0
  */
 function editUserCheckStatus(uid,isUEpass){
	 var sql="update User set isIdent="+isUEpass+" where uID="+uid;
	 
	db.query(sql,(err, data) => {
	    if(err) {
	       console.log("更新用户状态失败【"+err+"】");
	 			return;
	    }
	     console.log("更新用户状态成功");
	})  
 }