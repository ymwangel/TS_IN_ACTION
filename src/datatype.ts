/**
 * 数字索引类型：数组
 * 字符串索引类型：对象：{}
 */

// 基本类型
let bool: boolean = true
let num : number = 123
let str: string = 'abc'

// 数组 。类数组，数组：可以用 interface 描述数组，
let arr1: number[] = [1,2,3]
let arr2: Array<number | string> = [1,'2',3,4]

// 元组
let tuple: [number,string] = [0,'1']

// 函数
// 还可以用接口定义
let add = (x:number, y: number) : number => x+y //既定义，且实现
let computed: (x:number,y:number) => number //仅定义，未实现
computed = (a,b) => a + b

// 对象
let obj : {x:number,y:number} = {x:1,y:2}
obj.x = 3 

// Symbol: 具有唯一的值
let s1: symbol = Symbol()
let s2 = Symbol()
console.log(s1 === s2) //false

// undefined null

let un: undefined = undefined
let nu: null = null

// void
let noReturn = () => {}

// any
let x
x=1
x=[]
x=()=>{}

// never : 永远不会有返回值的类型 :抛出异常函数、死循环函数
let error = () => {
    throw new Error('error')
}
let endless = () => {
    while(true) {}
}

