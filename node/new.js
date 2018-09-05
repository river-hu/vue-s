const superagent = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs');

const reptileUrl = "http://www.pmtown.com/archives/category/%E6%97%A9%E6%8A%A5"; //泡面早班车早报页面地址

superagent.get(reptileUrl).end(function (err, res) {
    // 抛错拦截
    if (err) {
        return  Error(err);
    }
    /**
    * res.text 包含未解析前的响应内容
    * 我们通过cheerio的load方法解析整个文档，就是html页面所有内容，可以通过console.log($.html());在控制台查看
    */
    let $ = cheerio.load(res.text);
    // 以下代码与页面dom结构有关
    $('.item-title a').each(function (i, elem) {  //获取最新的新闻页面的地址
        if(i==0){
            console.log($(elem).attr("href"))
            getnew ($(elem).attr("href"))
        }
               
    });
});


function getnew (url) { // 获取当前页面的新闻
    superagent.get(url).end(function (err, res) {
        // 抛错拦截
        if (err) {
            return  Error(err);
        }
        /**
        * res.text 包含未解析前的响应内容
        * 我们通过cheerio的load方法解析整个文档，就是html页面所有内容，可以通过console.log($.html());在控制台查看
        */
        let $ = cheerio.load(res.text);
        let data = "【泡面早班车】\n【今日头条】\n";
        // 以下代码与页面dom结构有关
        $('.entry-content h2').each(function (i, elem) {
              
                    data+=$(elem).text()+"\n";
                    console.log($(elem).text())
        });
        data+="【周边新闻】\n";
        $(".entry-content h1+p").each(function (i, elem) {
            let str = '';
            if(i==0){
                console.log($(elem).text())
                // $(elem).text()
                data+=$(elem).text()+"\n";
            }
           
            if(i==1){
                data+="【融资收购】\n";
                console.log($(elem).text())
                // $(elem).text()
                data+=$(elem).text()+"\n";
            }
            
        })
    
        // 写入文件
        fs.writeFile(__dirname + '\\new.text', data, function (err) { //此路径在win电脑上可用
            if (err)  err;
            console.log('写入完成');
            console.log(__dirname + '\\new.text');
        });
    });
}

