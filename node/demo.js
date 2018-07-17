
var http = require("http");

http.createServer(function(request,response){
    //发送http头部
    //http状态值200:ok
    //内容类型：text/plain
    response.writeHead(200,{"Content-Type":'text/plain'});

    response.end("helloword!\n");
}).listen(8888);
console.log('Server running at http://127.0.0.1:8888/');