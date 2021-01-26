#!/usr/bin/env node

// 命令行
const { program } = require('commander');
const inquirer = require('inquirer');

// 处理文件
const fs = require("fs");

// 引入模板文件
const templates = require('../templates/index');

// 命令行问答列表
let prompList = [
    {
        type:'list',
        name: 'template',
        message: '请选择你想要生成的模板？',
        choices: templates,
        default: templates[0]
    }
]

// cli版本
program.version(require('../package').version, '-v, --version', 'cli的最新版本');

// options
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

// 创建文件命令行
program
    .command('create <filename>')
    .description('创建一个文件')
    .action(async (filename) => {
        const res = await inquirer.prompt(prompList)
        console.log(res);
        if(res.template === 'reactClass') {
            templates.forEach((item) => {
                if(item.name === 'reactClass') {
                    fs.writeFile(`./${filename}.jsx`, item.src(filename), function(err) {
                        if(err) {
                            console.log('创建失败：', err)
                        } else {
                            console.log(`创建文件成功！${filename}.jsx`);
                        }
                    })
                }
            })
        }
        if(res.template === 'reactRoute') {
            templates.forEach((item) => {
                if(item.name === 'reactRoute') {
                    fs.writeFile(`./${filename}.js`, item.src, function(err) {
                        if(err) {
                            console.log('创建失败：', err)
                        } else {
                            console.log(`创建文件成功！${filename}.js`);
                        }
                    })
                }
            })
        }
        if(res.template === 'vueTemplate') {
            templates.forEach((item) => {
                if(item.name === 'vueTemplate') {
                    fs.writeFile(`./${filename}.vue`, item.src(), function(err) {
                        if(err) {
                            console.log('创建失败：', err)
                        } else {
                            console.log(`文件创建成功！${filename}`);
                        }
                    })
                }
            })
        } 
    })
// 创建文件夹命令行
program
    .command('create-f <folder>')
    .description('创建一个文件夹')
    .action((folder) => {
        if(fs.existsSync(folder)) {
            console.log('文件夹已存在')
        } else {
            fs.mkdirSync(folder);
            console.log('文件夹创建成功')
        }
    })

program.parse(process.argv)