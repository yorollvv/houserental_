let db = require('../../db/db')
let util=require('../../util/util')

//管理后台管理员列表数据
exports.getAdminList = (req, res) => {
    var page=req.query.page;
	var pageSize=req.query.pageSize;
	
	page=page==""||typeof page ==="undefined"?1:page;
	pageSize=pageSize==""||typeof pageSize ==="undefined"?20:pageSize;
	
	//统计总数
	var count=0;
	var list=new Array();	
	let startPage=(page-1)*pageSize;
   var sqlParam=[startPage,pageSize];
   
   var sql = "select count(aid)as count from Admin;select * from Admin  order by aid desc limit ?,?";
   
    db.query(sql,sqlParam, (err, result) => {
        if(err) {
        list=new Array();
		resultJson={"count":count,"list":list};
		res.send(util.formatData(0,"success["+err+"]",resultJson));
		return;
        }
		
	    count=result[0][0].count;
		list=result[1];
		resultJson={"count":count,"list":list};
		res.send(util.formatData(0,"success",resultJson));
    })
	
}


 
/**
 * 查询用户数据信息
  根据OPENID查询
  提供给小程序使用
 **/
exports.adminLogin = (req, res) => {
	var userName=req.query.userName;
	var aPwd=req.query.aPwd;
	
	if(userName==="" || userName===null || typeof userName==="undefined" ){
		 res.send(util.formatData(1,"账号不能为空",""));
		return;
	}
	
	if(aPwd==="" || aPwd===null || typeof aPwd==="undefined" ){
		 res.send(util.formatData(1,"密码不能为空",""));
		return;
	}
    var sql = "select * from Admin where userName= '"+userName+"'";
	
    db.query(sql, (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
		
		if(data==null || data.length <=0){
			 res.send(util.formatData(1,"用户名不存在",[])); 
			 return;
		}
		
		console.log("====>"+JSON.stringify(data));
		var password=data[0].aPwd;
		if(util.isPass(aPwd,password)){
		data[0].aPwd="";
		data[0].token=util.getToken();
		 res.send(util.formatData(0,"success",data));
			 return;
		}else{
		res.send(util.formatData(1,"密码不正确",""));	
		}
    })
}

//保存用户信息接口
exports.saveAdminUser = (req, res) => {
	var userName=req.query.userName;
	//昵称
	var aPwd=req.query.aPwd;
	
	if(userName==="" || userName===null || typeof userName==="undefined" ){
		 res.send(util.formatData(1,"userName不能为空",""));
		return;
	}
	
	if(aPwd==="" || aPwd===null || typeof aPwd==="undefined" ){
		 res.send(util.formatData(1,"密码不能为空",""));
		return;
	}
	
	if(userName.length <5){
		res.send(util.formatData(1,"用户名长度需要大于5位",""));
		return;
	}
	
	if(aPwd.length <6){
		res.send(util.formatData(1,"密码长度需要大于6位",""));
		return;
	}
	
	aPwd=util.encryptionPass(aPwd);
	//判断用户是否存在用户存在则更新实名数据
    var sql = "insert into Admin set ?";
	var insertData={
		"userName":userName,
		"aPwd":aPwd,
		"addtime":util.dateTimeFormat("YYYY-MM-DD HH:mm:ss")
	}
	
    db.query(sql,insertData,(err, data) => {
        if(err) {
            res.send(util.formatData(1,"添加失败【"+err+"】",""));
			return;
        }
        res.send(util.formatData(0,"添加成功",""));
    })
}


exports.logout=(req, res)=>{
	var token=req.query.token;
	
 res.send(util.formatData(0,"退出成功",""));	
}