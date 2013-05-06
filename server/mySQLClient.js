

var mysql = require('mysql');

var mySQLClient = mysql.createClient({
  host     : 'rbztinstance1.cxcivjzftilb.us-east-1.rds.amazonaws.com',
  database : 'zombieBETA',
  user     : 'rbroot',
  password : 'z0mb13s!',
  port : 3306,
  debug:false
});
console.log('Listening to rbztinstance1.cxcivjzftilb.us-east-1.rds.amazonaws.com')


/*
 * 
var mySQLClient = mysql.createClient({
  host     : 'localhost',
  database : 'zombieBETA',
  user     : 'root',
  password : '',
  port : 3306,
  debug:false
});
console.log('Listening to LOCALHOST database')

 */
mySQLClient.uuid = require('node-uuid');
mySQLClient.escape=function(str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
        }
    });
}
mySQLClient.queryToArray=function(obj){
	
	var returnObj=new Array;
	if (obj.COLUMNS && obj.DATA){
		for (var i =0; i<obj.DATA.length; i++){
			returnObj[i]=new Object;
			for (var j = 0; j < obj.COLUMNS.length; j++) {
				returnObj[i][obj.COLUMNS[j]]=obj.DATA[i][j];
			}
		}
	} else{
		returnObj=obj;
	}
	return returnObj;
}



module.exports=mySQLClient;
