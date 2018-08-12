/*
*Module dependencies
*/

var fs=require('fs'),
    stdin=process.stdin,
    stdout=process.stdout,
    stats=[];
// console.log(fs.readdirSync(__dirname));同步方式获取指定目录下的文件





function async(err,files){
    console.log(files);
    if(!files.length){
        return console.log(' \033[31m No files to show!\033[39m\n');
    }

    console.log(' Select which file or directoy you want to see');

    function file(i){
        var filename=files[i];
        fs.stat(__dirname+'/'+filename,function(err,stat){
            stats[i]=stat;
            if(stat.isDirectory){
                console.log('   '+i+'    \033[36m'+filename+'/\033[39m');
            }else{
                console.log('   '+i+'    \033[90m'+filename+'/\033[39m');
            }
            if(++i===files.length){
                read();
            } else{
                file(i);
            }
        })
    }

    function read(){
        console.log(' ');
        stdout.write('  \033[33mEnter you choice: \33[39m');
        stdin.resume();
        stdin.setEncoding('utf-8');
        stdin.on('data',option);
    }
    
    function option(data){
        var filename=files[Number(data)];
        console.log(filename);
        if(!filename){
            stdout.write('    \033[31mEnter you choice:\033[39m')
        }else{
            stdin.pause;
            if(stats[Number(data)].isDirectory()){
                fs.readdir(__dirname+'/'+filename,function(err,files){
                    console.log(' ');
                    console.log('   ('+files.length+' files)');
                    files.forEach(function(file){
                        console.log('      -    '+file);
                    })
                })
            }else{
                fs.readFile(__dirname+'/'+filename,'utf-8',function(err,data){
                    console.log(' ');
                    console.log('\033[90m'+data.replace(/(.*)/g,'     $1')+'\033[39m');
                })
            }
        }
    }

    file(0);
}

fs.readdir(__dirname,async);//异步方式获取目录下的文件

console.log('hello world1');

process.stdout.write('hello world2');
