let db = require('../../db/db')
let util=require('../../util/util');
let xss = require("xss");

// 首页房源推荐
exports.getHouseList = (req, res) => {

	
	//统计总数
	var count=0;
	var list=new Array();	
	//var hID=req.body.hID;
	var selectedCity=req.body.selectedCity;
	console.log(selectedCity);
	//console.log(hID);
   
   // var sql = "select house.*,housePic.* from house left join housePic on house.hID = housePic.hID where house.state < house.hPeopleNum";
   var sql = "select * from house where state < hPeopleNum and hcity = ? order by hStar desc";
   var insertData={
   	"hcity":selectedCity
   };
    db.query(sql, [insertData.hcity],(err, result) => {
        if(err) {
        list=new Array();
		resultJson={"count":count,"list":list};
		res.send(util.formatData(0,"success["+err+"]",resultJson));
		return;
        }		
		
		//console.log("====>"+JSON.stringify(result));
	    count=result.length;
		list=result;
	   console.log("house统计数据【"+JSON.stringify(count)+"】【"+JSON.stringify(list)+"】")
		resultJson={"count":count,"list":list};
		res.send(util.formatData(0,"success",resultJson));
    })
	
}


//收藏房源
exports.starHouse = (req, res) => {
    var hID=req.body.hID;
	var uID=req.body.uID;
	console.log(uID);
	console.log(hID);
	if(uID==="" || uID===null || typeof uID==="undefined" ){
		 res.send(util.formatData(1,"请登录",""));
		return;
	}
	//判断用户是否收藏房源
	var sql = "insert into star set ?;";
	var insertData={
		"uID":uID,
		"hID":hID
	};
	
	db.query(sql,insertData,(err, data) => {
	    if(err) {
	        res.send(util.formatData(1,"已收藏"));
			console.log(err)
			return;
	    }
		else{
			res.send(util.formatData(0,"收藏成功",""));
			//房源收藏+1
			var sql2="update house set hStar = hStar + 1 where hID = ?";
			var insertData2={
				"hID":hID
			};
			db.query(sql2,[insertData2.hID],(err, data) => {
			    if(err) {
					console.log(err)
					return;
			    }
			    console. log( '房源收藏+1成功');
			//	console. log(data);
			})
		}	    
	})
}

//取消收藏房源
exports.cancelStarHouse = (req, res) => {
    var hID=req.body.hID;
	var uID=req.body.uID;
	//console.log(uID);
	console.log(hID);
	if(uID==="" || uID===null || typeof uID==="undefined" ){
		 res.send(util.formatData(1,"请登录",""));
		return;
	}
	
	//判断用户是否收藏房源
	var sql = "delete from star where uID= ? and hID = ?";
	var insertData={
		"uID":uID,
		"hID":hID
	};
	db.query(sql,[insertData.uID,insertData.hID],(err, data) => {
	    if(err) {
	        res.send(util.formatData(1,"取消收藏失败【"+err+"】",""));
			console.log(err)
			return;
	    }
		else{
			res.send(util.formatData(0,"取消收藏成功",""));
			
			//房源收藏-1
			var sql2="update house set hStar = hStar - 1 where hID = ?";
			var insertData2={
				"hID":hID
			};
			db.query(sql2,[insertData2.hID],(err, data) => {
			    if(err) {
					console.log(err)
					return;
			    }
			    console. log( '房源收藏-1成功')
			})
				
		}
		    
	})	
}

// 查看收藏的房源
exports.lookStarHouse=(req,res)=> {	
		var hID=req.body.hID;
		var uID=req.body.uid;
		console.log(uID);
		
		//统计总数
		var count=0;
		var list=new Array();	
	var sql="SELECT star.hID,star.uID,house.* from star left join house on star.hID=house.hID";
	if(uID !="" && uID !=null){
			   sql+=" where star.uID ="+db.escape(uID);
	}
	
	 db.query(sql, (err, result) => {
	     if(err) {
	     list=new Array();
			resultJson={"count":count,"list":list};
			res.send(util.formatData(0,"success["+err+"]",resultJson));
			return;
	     }									
		    count=result.length;
			list=result;
		   //console.log("house统计数据【"+JSON.stringify(count)+"】【"+JSON.stringify(list)+"】")
			resultJson={"count":count,"list":list};
			res.send(util.formatData(0,"success",resultJson));
	 })
	
}


//房源详细信息
exports.HouseDetail=(req,res)=> {	
	var hID=req.query.hID;
	var uID=req.query.uID;
	console.log(uID)
	console.log(hID)
	var sql2 = "select * from house left Join user on house.uID=user.uID left join housePic on house.hID = housePic.hID where house.hID = ?";
	var sql1 = "select * from house left join housePic on house.hID = housePic.hID where house.hID = ?";
	var sql="select * from house left Join user on house.uID=user.uID where house.hID = ?";
	var insertData2={
		"hID":hID
	};
	
	 db.query(sql2,[insertData2.hID],(err, result) => {
	     if(err) {
			console.log("错误"+err)
			return;
	     }
		 else{
			 
			 res.send(result);
			// console.log(result);
			 console.log("成功")
			 
		 }
	 })
	
}



//上传房源
exports.upHouse = (req,res) => {
	var area = req.body.area;
	var rentPrice = req.body.rentPrice;
	var houseName = req.body.houseName;
	var addrDetail = req.body.addrDetail;
	var type = req.body.type;
	var mode = req.body.mode;
	var maxNum = req.body.maxNum;
	var describe = req.body.describe;
	// var selected = this.data.selected;
	var city = req.body.city;
	var uID=req.body.uID;
	 var hPic = eval(req.body.hPic);	 
	// console.log(area);
	// console.log(rentPrice);
	// console.log(houseName);
	// console.log(addrDetail);
	// console.log(type);
	// console.log(mode);
	// console.log(maxNum);
	// console.log(describe);
	// console.log(city);
	// console.log(uID);
	// // console.log(hPic);	
	if(houseName==="" || houseName===null || typeof houseName==="undefined" ){
		 res.send(util.formatData(1,"房源名称不能为空",""));
		return;
	}
	
	if(addrDetail==="" || addrDetail===null || typeof addrDetail==="undefined" ){
		 res.send(util.formatData(1,"详细地址不能为空",""));
		return;
	}
	
	if(rentPrice==="" || rentPrice===null || typeof rentPrice==="undefined" ){
		 res.send(util.formatData(1,"每月租金不能为空",""));
		return;
	}
	if(type==="" || type===null || typeof type==="undefined" ){
		 res.send(util.formatData(1,"房源户型不能为空",""));
		return;
	}
	if(maxNum==="" || maxNum===null || typeof maxNum==="undefined" ){
		 res.send(util.formatData(1,"最大租住人数不能为空",""));
		return;
	}
	if(maxNum < 1){
		 res.send(util.formatData(1,"最大租住人数不能小于1",""));
		return;
	}
	if(area==="" || area===null || typeof area==="undefined" ){
		 res.send(util.formatData(1,"房源面积不能为空",""));
		return;
	}
	if(describe==="" || describe===null || typeof describe==="undefined" ){
		 res.send(util.formatData(1,"房源描述不能为空",""));
		return;
	}
	if(mode==="" || mode===null || typeof mode==="undefined" ){
		 res.send(util.formatData(1,"租住类型不能为空",""));
		return;
	}
	
	//房源加入数据库
    var sql = "insert into house set ?";
	var insertData={
		"uID":uID,
		"hName":houseName,
		"hcity":city,
		"hAddress":addrDetail,
		"hRent":rentPrice,
		"hArea":area,
		"hDetail":describe,
		"hMode":mode,
		"hPeopleNum":maxNum,
		"hType":type,
		"hStar":0,
		"state":0,
	    "hPic":hPic[0]
	};
		//获取前端传的数组，存入数据库，获取刚递增出来的hID
	db.getConnection(function(err,connection){
	            if (err) {
	                res.send(util.formatData(1,"加入失败【"+err+"】",""));
	            }else{
	                connection.query(sql,insertData,
	                    function(err,data){
	                        if(err){
	                                console.log(err);
	                                res.send(util.formatData(1,"加入失败【"+err+"】",""));
	                            }else{
	                                connection.query("SELECT LAST_INSERT_ID();",
	                                    function(err,data){
	                                        if (err) {
	                                            res.send(util.formatData(1,"加入失败【"+err+"】",""));
	                                        }else{
	                        					var hID=data[0]['LAST_INSERT_ID()'];
												console.log(hID)
												
												for(var i=0;i<hPic.length;i++){
													console.log(hPic[i]);
													
													var sql2 = "insert into housePic set ?";
													var insertData2={
														"hID":hID,
														"hPic":hPic[i],
													};
													db.query(sql2,insertData2,(err, data) => {
													     if(err) {
																console.log("错误"+err)
													         res.send(util.formatData(1,"加入失败【"+err+"】",""));
																return;
													     }
													 })
												}
	                                            res.send(util.formatData(0,"加入成功",data));
	                                        }
	                                    });
	                            }
	                        });
	                connection.release();
	            }
	        });
}


// 查看我出租的房源
exports.lookMyHouse=(req,res)=> {		
	var uID=req.body.uid;
	console.log(uID);
		
	var count=0;
	var list=new Array();		
	
	var sql="SELECT house.* from house";
	if(uID !="" && uID !=null){
			   sql+=" where house.uID ="+db.escape(uID);
	}
	 db.query(sql, (err, result) => {
	     if(err) {
	     list=new Array();
			resultJson={"count":count,"list":list};
			res.send(util.formatData(0,"success["+err+"]",resultJson));
			return;
	     }									
		    count=result.length;
			list=result;
		   //console.log("house统计数据【"+JSON.stringify(count)+"】【"+JSON.stringify(list)+"】")
			resultJson={"count":count,"list":list};
			res.send(util.formatData(0,"success",resultJson));
	 })
	
}

//修改租金价格
exports.updatePrice = (req,res) => {
    var hID=req.body.hID;
    var uID=req.body.uID;
	var hRent=req.body.hRent;
	console.log(uID);
	console.log(hID);
	console.log(hRent);
	if(uID==="" || uID===null || typeof uID==="undefined" ){
		 res.send(util.formatData(1,"请登录",""));
		return;
	}
//房源收藏+1
	var sql2="update house set hRent = ? where hID = ?";
	var insertData2={
		"hRent":hRent,
		"hID":hID
	};
	db.query(sql2,[insertData2.hRent,insertData2.hID],(err, data) => {
	if(err) {
		console.log(err)
		return;
	}
	console.log( '修改成功');
	//	console. log(data);
		})
}


// 搜索房源
exports.searchHouse=(req,res)=> {		
	var uID=req.query.uid;
	var inputValue=req.query.inputValue;
	console.log(uID);
	console.log(inputValue);
	var count=0;
	var list=new Array();		
	
	var sql="SELECT house.* from house where hcity like ? or hName like ?;";
	var insertData={
		"inputValue":inputValue
	};
	 db.query(sql, [insertData.inputValue,insertData.inputValue],(err, result) => {
	     if(err) {
	     list=new Array();
			resultJson={"count":count,"list":list};
			res.send(util.formatData(0,"success["+err+"]",resultJson));
			return;
	     }									
		    count=result.length;
			list=result;
		   //console.log("house统计数据【"+JSON.stringify(count)+"】【"+JSON.stringify(list)+"】")
			resultJson={"count":count,"list":list};
			res.send(util.formatData(0,"success",resultJson));
	 })
	
}


// 签订合同
exports.signHouse=(req,res)=> {		
	var uID=req.body.uID;
	var hID=req.body.hID;
	console.log(uID);
	console.log(hID);	
	
	//var sql="SELECT house.* from house where hcity like ? or hName like ?;";
	var sql="select house.*,user.* from house left join user on house.uID = user.uID where house.hID = ?; ";
	var insertData={
		"hID":hID
	};
	 db.query(sql, [insertData.hID],(err, result) => {
	     if(err) {
	     
			console.log(err)
			return;
	     }									
		 //    count=result.length;
			// list=result;
		 //   //console.log("house统计数据【"+JSON.stringify(count)+"】【"+JSON.stringify(list)+"】")
			// resultJson={"count":count,"list":list};
			res.send(result);
			console.log("111");
	 })
	
}


// 真的签了
exports.tosignHouse=(req,res)=> {		
	var uID=req.body.uID;
	var hID=req.body.hID;
	var totalRent=req.body.totalRent;
	console.log(uID);
	console.log(hID);	
	// var sql = "insert into star set ?;";
	// var insertData={
	// 	"uID":uID,
	// 	"hID":hID
	// };
	
//	var sql="select house.*,user.* from house left join user on house.uID = user.uID where house.hID = ?; ";
	var sql="insert into rental set ?;update house set house.state=house.state+1 where house.hID ="+db.escape(hID);
	var insertData={
		"uID":uID,
		"hID":hID,
		"Rent":totalRent
	};
	 db.query(sql, insertData,(err, result) => {
	     if(err) {
			res.send("已经签约");
			console.log(err)
			return;
	     }									
		 //    count=result.length;
			// list=result;
		 //   //console.log("house统计数据【"+JSON.stringify(count)+"】【"+JSON.stringify(list)+"】")
			// resultJson={"count":count,"list":list};
			res.send("签约成功");
			console.log("111");
	 })
	
}

// 查看我租的房源
exports.MyRentHouse=(req,res)=> {		
	var uID=req.body.uid;
	console.log(uID);
	
	var count=0;
	var list=new Array();		
	
	var sql="SELECT rental.*,house.* from rental left join house on house.hID = rental.hID";
	if(uID !="" && uID !=null){
			   sql+=" where rental.uID ="+db.escape(uID);
	}
	 db.query(sql, (err, result) => {
	     if(err) {
	     list=new Array();
			resultJson={"count":count,"list":list};
			res.send(util.formatData(0,"success["+err+"]",resultJson));
			console.log(err)
			return;
	     }									
		    count=result.length;
			list=result;
		   //console.log("house统计数据【"+JSON.stringify(count)+"】【"+JSON.stringify(list)+"】")
			resultJson={"count":count,"list":list};
			res.send(util.formatData(0,"success",resultJson));
	 })
	
}
