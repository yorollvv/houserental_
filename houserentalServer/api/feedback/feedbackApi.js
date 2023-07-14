let db = require('../../db/db')
let util=require('../../util/util');
let xss = require("xss");
/**
 * 管理后台获取留言反馈信息
 **/
exports.getFeedBackList = (req, res) => {
    var page=req.query.page;
	var pageSize=req.query.pageSize;
	var uID=req.query.uID;
	
	page=page==""||typeof page ==="undefined"?1:parseInt(page);
	pageSize=pageSize==""||typeof pageSize ==="undefined"?20:parseInt(pageSize);
	
	uID=uID==""||typeof uID ==="undefined"?"":uID;
	
	//统计总数
	var count=0;
	var list=new Array();	
	let startPage=(page-1)*pageSize;
    var sqlParam=[startPage,pageSize];
   
   var sql = "select count(uID)as count from Feedback;SELECT Feedback.fdID,Feedback.uID,Feedback.fdDetail,Feedback.fdTime,Feedback.fdResult,Feedback.handleTime,Feedback.aID,`User`.uNickname,`User`.uAvatarUrl,`User`.uTel,`User`.uRealname,`User`.uNumber,`User`.isIdent,`User`.uSex from Feedback left join `User` on `User`.uID=Feedback.uID ";
       if(uID !="" && uID !=null){
		   sql+=" where Feedback.uID ="+db.escape(uID);
	   }
      sql+=" order by fdTime desc  limit ?,?";
   
    db.query(sql,sqlParam, (err, result) => {
        if(err) {
        list=new Array();
		resultJson={"count":count,"list":list};
		res.send(util.formatData(0,"success["+err+"]",resultJson));
		return;
        }
		
	    count=result[0][0].count;
		list=result[1];
	   console.log("feed统计数据【"+JSON.stringify(count)+"】【"+JSON.stringify(list)+"】")
		resultJson={"count":count,"list":list};
		res.send(util.formatData(0,"success",resultJson));
    })
	
}

//获取单个意见详情
exports.getFeedBackDetail = (req, res) => {
    var fdID=req.query.fdID;
	
	
	if(fdID==="" || fdID===null || typeof fdID==="undefined" ){
		 res.send(util.formatData(1,"数据fdID不能为空",""));
		return;
	}
	
    var sqlParam=[fdID];
   
   var sql = "select count(uID)as count from Feedback;select * from Feedback where fdID=?";
   
    db.query(sql,sqlParam, (err, result) => {
        if(err) {
		res.send(util.formatData(0,"success["+err+"]",result));
		return;
        }
		res.send(util.formatData(0,"success",result));
    })
	
}


exports.getFeedBackListByUser = (req, res) => {
	var uID=req.body.uid;

	if(uID==""||typeof uID ==="undefined" || uID===null){
		res.send(util.formatData(1,"用户身份ID为空",""));
		return;
	}
	//统计总数
	var count=0;
	var list=new Array();
    
   //计算数据总条数
   // var sql1 = "select count(uID)as count from Feedback";
   // //分页，查询反馈
   // var sql2="SELECT Feedback.fdID,Feedback.uID,Feedback.fdDetail,Feedback.fdTime,"+
   // "Feedback.fdResult,Feedback.handleTime,Feedback.aID,`User`.uNickname,"+
   // "`User`.uAvatarUrl,`User`.uTel,`User`.uRealname,`User`.uNumber,`User`.isIdent,`User`.uSex "+
   // "from Feedback left join `User` on `User`.uID=Feedback.uID "
   
   var sql = "select count(uID)as count from Feedback;SELECT Feedback.fdID,Feedback.uID,Feedback.fdDetail,Feedback.fdTime,Feedback.fdResult,Feedback.handleTime,Feedback.aID,`User`.uNickname,`User`.uAvatarUrl,`User`.uTel,`User`.uRealname,`User`.uNumber,`User`.isIdent,`User`.uSex from Feedback left join `User` on `User`.uID=Feedback.uID ";
       if(uID !="" && uID !=null){
		   sql+=" where Feedback.uID ="+db.escape(uID);
	   }s
      sql+=" order by fdTime desc limit ?,?";
   
    db.query(sql, (err, result) => {
        if(err) {
        list=new Array();
		//resultJson={"count":count,"list":list};
		//res.send(util.formatData(0,"success["+err+"]",resultJson));
		return;
        }
		
	    count=result[0][0].count;//获取总条数
		list=result[1];//页数
	   console.log("feed统计数据【"+JSON.stringify(count)+"】【"+JSON.stringify(list)+"】")
	//	resultJson={"count":count,"list":list};
	//	res.send(util.formatData(0,"success",resultJson));
    })
	
}




/**
 * 保存反馈信息
 **/
exports.saveFeedBack=(req,res)=> {
	var uID=req.body.uID;
	console.log(uID);
	//内容
	var fdDetail=req.body.fdDetail;
	if(uID==="" || uID===null || typeof uID==="undefined" ){
		 res.send(util.formatData(1,"用户身份不能为空",""));
		return;
	}
	if(fdDetail==="" || fdDetail===null || typeof fdDetail==="undefined" ){
		 res.send(util.formatData(1,"反馈内容不能为空",""));
		return;
	}
	fdDetail=xss(fdDetail);
	//判断用户是否存在用户存在则更新实名数据
	var sql = "insert into Feedback set ?";
	var insertData={
		"uID":uID,
		"fdDetail":fdDetail,
		"fdResult":"",
		"fdTime":util.dateTimeFormat("YYYY-MM-DD HH:mm:ss")
	};
	db.query(sql,insertData,(err, data) => {
	    if(err) {
	        res.send(util.formatData(1,"反馈失败【"+err+"】",""));
			return;
	    }
	    res.send(util.formatData(0,"反馈成功",""));
	})
}

/**
 * 管理员用户回复留言
 */
exports.saveFeedBackRep=(req,res)=> {
	//留言id
	var fdID=req.query.fdID;
	  //管理员ID
	var aID=req.query.aID;
	//处理结果内容
	var fdResult=req.query.fdResult;
	
	if(fdID==="" || fdID===null || typeof fdID==="undefined" ){
		 res.send(util.formatData(1,"留言数据ID不能为空",""));
		return;
	}
	
	if(aID==="" || aID===null || typeof aID==="undefined" ){
		 res.send(util.formatData(1,"管理员身份不能为空",""));
		return;
	}
	
	if(fdResult==="" || fdResult===null || typeof fdResult==="undefined" ){
		 res.send(util.formatData(1,"处理内容不能为空",""));
		return;
	}
	
	fdResult=xss(fdResult);
	//判断用户是否存在用户存在则更新实名数据
	var sql = "update Feedback set ? where fdID="+fdID;
	var insertData={
		"fdResult":fdResult,
		"handleTime":util.dateTimeFormat("YYYY-MM-DD HH:mm:ss"),
		"aID":aID
	};
	
	db.query(sql,insertData,(err, data) => {
	    if(err) {
	        res.send(util.formatData(1,"反馈失败【"+err+"】",""));
			return;
	    }
	    res.send(util.formatData(0,"反馈成功",""));
	})
	
}