// 群里开车，图片撤回太快 保存不下来？ 不用怕，设置qq图片目录以及输出目录，
// npm i chokidar
// node 执行此脚本
var chokidar = require('chokidar');
var fs=require("fs");
var path=require("path");


// qq 图片文件夹
var zTXImgFilePath="C:\\Users\\user\\Documents\\Tencent Files\\1486985856\\Image\\Group";

// 输出路径
var outPutPath="C:\\test";

// 监听qq 图片文件夹
var zChokidar = chokidar.watch(zTXImgFilePath, {
  persistent: true
});

// 图片 内容列表
var zImgDataList={};

var zIfReady=false;

zChokidar
//文件被添加
  .on('add', function (xPath, xStats) {
    // 如果是图片 文件被添加
    if(zIfReady)zOnImgAdded(xPath);
  })
  //文件被修改
  .on('change', function (xPath, xStats) {

  })
  //文件被删除
  .on('unlink', function (xPath) {
    if(zImgDataList[xPath])zImgDataList[xPath].isRemoved=1;
  })

  //出错信息
  .on('error', function (err) {
    // console.log("setupDataBoxFileWatcher err",err)
  })
  //所有文件加载完
  .on('ready', function () {
    console.log("ready")
    zIfReady=true;
  });


// 图片 被添加
function zOnImgAdded(xPath){
  // 读取此图片
  fs.readFile(xPath,(err,data)=>{
    if(err)return;
    zImgDataList[xPath]={data:data};

    setTimeout(()=>{
      // 如果30s 后，图片没有被撤回，则视为不重要，从列表中删除
      if( !zImgDataList[xPath].isRemoved){
        delete zImgDataList[xPath];
      }
      // 否则把图片复制到 输出文件夹
      else{
        var zFileName=path.basename(xPath);
          fs.writeFile(path.join(outPutPath,zFileName),zImgDataList[xPath].data,(err)=>{if(!err)console.log("保存成功：",zFileName)})
      }
    },30000)

  })
};
