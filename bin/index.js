#!/usr/bin/env node

const { program } = require('commander') // 命令行

//处理文件
const fs = require("fs");
const path = require("path");

program.version('0.0.1', '-v, --version', 'cli的最新版本');

program
    .option('-d, --debug', '调试一下')
    .option('-l, --list <value>', '把字符串分割为数组', strToArr)


const options = program.opts();

if(options.debug) {
    console.log("调试成功")
} 
if(options.list !== undefined) {
    console.log(options.list)
}
// 字符串分割为数组的方法
function strToArr(value, preValue){
    return value.split(',')
}

// 创建文件内容
let obj = `let dog = {name: '哈士奇',age: 6} `

program
    .command('create <filename>')
    .description('创建一个项目文件')
    .action((filename) => {
        fs.writeFile(`./${filename}.js`, obj, function(err) {
            if(err) {
                console.log('创建失败：', err)
            } else {
                console.log(`创建文件成功！-${filename}.js`);
            }
        })
    })

program.parse(process.argv)