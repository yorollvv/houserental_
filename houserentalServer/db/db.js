let mysql = require('mysql')

let db = mysql.createPool({
    host: '127.0.0.1',     //数据库IP地址
    user: 'root',          //数据库登录账号
    password: 'zjmjim@qq.com',      //数据库登录密码
    database: 'houserental',//要操作的数据库
	timezone:"+8:00",
	dateStrings: true,
	multipleStatements:true
})


exports.escape=function(vale){
	 return mysql.escape(vale);
}
module.exports = db
