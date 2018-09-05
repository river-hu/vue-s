
const fs = require('fs');

const image = require("imageinfo");
const chokidar = require('chokidar');
const path = require("path");

function readFileList(path, filesList) {
    var files = fs.readdirSync(path);
    files.forEach(function (itm, index) {
        var stat = fs.statSync(path + itm);
        if (stat.isDirectory()) {
        //递归读取文件
            readFileList(path + itm + "/", filesList)
        } else {

            var obj = {};//定义一个对象存放文件的路径和名字
            obj.path = path;//路径
            obj.filename = itm//名字
            filesList.push(obj);
        }

    })

}
var watcher = chokidar.watch('C:\\Users\\user\\Documents\\Tencent Files\\1486985856\\Image\\Group\\Image2', {
    ignored: /[\/\\]\./, persistent: true
  });
  
  var log = console.log.bind(console);
  
  watcher
    .on('add', function(path) { log('File', path, 'has been added'); })
    .on('addDir', function(path) { log('Directory', path, 'has been added'); })
    .on('change', function(path) { log('File', path, 'has been changed'); })
    .on('unlink', function(path) { log('File', path, 'has been removed'); })
    .on('unlinkDir', function(path) { log('Directory', path, 'has been removed'); })
    .on('error', function(error) { log('Error happened', error); })
    .on('ready', function() { log('Initial scan complete. Ready for changes.'); })
    .on('raw', function(event, path, details) { log('Raw event info:', event, path, details); })

var getFiles = {
//获取文件夹下的所有文件
    getFileList: function (path) {
        var filesList = [];
        readFileList(path, filesList);
        return filesList;
    },
    //获取文件夹下的所有图片
    getImageFiles: function (path) {
        var imageList = [];

        this.getFileList(path).forEach((item) => {
            var ms = image(fs.readFileSync(item.path + item.filename));

            ms.mimeType && (imageList.push(item.filename))
        });
        return imageList;

    },    //获取文件夹下所有非图片的文件 2018年8月18日 19:15:13更新
    getTxtList: function (path) {


        return this.getFileList(path).filter((item) => {
            var ms = image(fs.readFileSync(item.path + item.filename));

            return !ms.mimeType
        });

    }
};
