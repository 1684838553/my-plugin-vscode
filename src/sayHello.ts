import * as vscode from 'vscode'
const util = require('./util')

let myStatusBarItem: vscode.StatusBarItem;
module.exports = function(context:vscode.ExtensionContext){
    // 下拉框
    const list:Array<string> = ['one','two','three','four']
    context.subscriptions.push(vscode.commands.registerCommand('pluginwelcome.sayHello',()=>{
        vscode.window.showQuickPick(list).then((value:string|undefined)=>{
            if(value){
                vscode.window.showInformationMessage(`you select ${value} button`)
            }
        })
    }))

    // 输入框
    context.subscriptions.push(vscode.commands.registerCommand("pluginwelcome.showInputBox",()=>{
        vscode.window.showInputBox({prompt:'请选择'}).then((filter:any)=>{
            if(filter && filter.length){
                vscode.window.showQuickPick(util.fuzzyQuery(list,filter)).then((value:string|any)=>{
                    if(value){
                        vscode.window.showInformationMessage(`这是你的选择：${value}`)
                    }
                })
            }
        })
    }))


    // 弹窗
    context.subscriptions.push(vscode.commands.registerCommand('pluginwelcome.dialog',()=>{
        vscode.window.showWarningMessage("是否选择这个选项?","是","否").then((value:string|undefined)=>{
            if(value === "是"){
                vscode.window.showInformationMessage("是的，就是选择这个选项")
            }else{
                vscode.window.showErrorMessage("不选择，我有更好的选择")
            }
        })
    }))

    // 状态栏
    context.subscriptions.push(vscode.commands.registerCommand('pluginwelcome.addStatusBar',()=>{
        myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right,1000)
        myStatusBarItem.text = '这是在状态栏添加的一个状态'
        // 显示状态
        myStatusBarItem.show()
        // 隐藏状态
        // myStatusBarItem.hide()
    }))

    // 控制台输出面板
    context.subscriptions.push(vscode.commands.registerCommand('pluginwelcome.outputChannel',()=>{
        const opc = vscode.window.createOutputChannel('textSearch')
        // 清空输出面板
        opc.clear()
        // 在输出面板追加一行
        opc.appendLine('测试一下控制台输出的功能')
        // 打开控制台并切换到输出面板
        opc.show()
    }))
}
