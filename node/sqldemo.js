const mysql = require("mysql");

let content = mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"root",
    database:"nodetest"
})
content.connect();
content.query('SELECT * FROM `demo` WHERE 1',function(error , results , fields){
    
    console.log(results[0])
})
content.end();