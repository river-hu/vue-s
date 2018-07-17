const superagent = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs');

const reptileUrl = "http://www.runoob.com/";

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
    let data = [];

    $('h4').each(function (i, elem) {
        let _this = $(elem);
        data.push({
            title: filter(_this.text()),
            url: addurl(_this.parent(".item-top").attr("href")),
            dec:_this.siblings("strong").text()
        });
    });
    fs.writeFile(__dirname + '\\article.json', JSON.stringify({
        status: 0,
        data: data
    }), function (err) {
        if (err)  err;
        console.log('写入完成');
        console.log(__dirname + '\\article.json');
    });
});
function filter(str){
    return str.replace("【", "").replace("】", "").replace("学习 ", "")
}
function addurl(str){
    return "http:"+str
}
