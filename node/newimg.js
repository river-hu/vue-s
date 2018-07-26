const superagent = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
var mkdirp = require('mkdirp');
var request = require("request");
const reptileUrl = "https://search.jd.com/Search?keyword=%E6%89%8B%E6%9C%BA&enc=utf-8&wq=%E6%89%8B%E6%9C%BA";  // 爬取的页面地址-可带参数

var dir = './phone'; //定义图片
console.log("开始获取");
superagent.get(reptileUrl).end(function (err, res) {
    // 抛错拦截
    if (err) {
        console.log("获取页面失败")
        return Error(err);
    }
    /**
    * res.text 包含未解析前的响应内容
    * 我们通过cheerio的load方法解析整个文档，就是html页面所有内容，可以通过console.log($.html());在控制台查看
    */
    let $ = cheerio.load(res.text);  //获取页面
    console.log("获取页面成功")
    $('.gl-warp .p-img img').each(function (i, elem) {  // 获取图片的标签dom
        let src = $(elem).attr("source-data-lazy-img");  //获取图片标签的地址 //有的页面存在图片懒加载
        console.log(src)
        if(!src){ //地址不能为空
            return;
        }
        if(src.indexOf("https")==-1){  // 有的地址存在相对路径
            src="https:"+src;
        }
        console.log('正在下载' + src);
        download(src, dir, Math.floor(Math.random() * 100000) + src.substr(-4, 4)); //生成图片名称并下载图【Ian
        console.log('下载完成');
    });
});

var download = function (url, dir, filename) {  //图片下载函数
    request.head(url, function (err, res, body) {
        request(url).pipe(fs.createWriteStream(dir + "/" + filename));
    });
};