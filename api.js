console.log(process.argv.slice(2))





fs.readFile('test.txt',function(){})//在整个文件都读取完后调用回调函数


//通过设置option来读取一定范围内的字节文件，并在每次读取完成之后调用回调函数
var stream=fs.createReadStream('test.txt',options);

stream.on('data',function(){});

stream.on('end',function(){});


var fs=require('fs');
var stream=fs.createReadStream('my-file.text');

var files=fs.readdirSync(process.cwd());

files.forEach(function(file){
    if(/\.css/.test(file)){
        fs.watchFile(process.cwd()+'/'+file,function(){
            console.log('    -  '+file+'  changed');
        })
    }
})
