import { Z_ASCII } from "zlib"

/**
 * 接口
 * 接口成员属性：
 * 1. 定义了任意属性，那么确定属性 和 可选属性 的类型 都必须是 任意属性的类型的 子集
 */
interface List{
    readonly id: number, //read-only 是不允许修改的
    name: string,
    age?: number,
    [x:string]: any
}
interface Result{
    data: List[]
}
function render(result: Result){
    result.data.forEach(value=>{
        console.log(value.id,value.name)
        if(value.age){
            console.log(value.age)
        }
    })
}
let result = {
    data: [
        {id:1, name: 'A'},
        {id:2, name: 'B'}
    ]
}
let result1 = {
    data: [
        {id:1, name: 'A',sex:'male'},
        {id:2, name: 'B'}
    ]
}
render(result)
render(result1) //没问题，绕过了类型检查
render({
    data: [
        {id:1, name: 'A',sex:'male'},
        {id:2, name: 'B'}
    ]
}) //以对象字面量方式传入，会对接口额外的字段进行类型检查，报错，解决方法：类型断言
render(result as Result) //类型断言，告知编译器 类型是Result，编译器会绕过类型检查
// 或者
render(<Result>result) // 这种在react中会产生歧义
// 或者 在 接口List中 定义一个签名，添加：[x:string]: any


interface StringArray {
    // 数字索引
    [index: number]: string
}
let chars: StringArray = ['A','B']

interface Names {
    // 字符串索引
    [x:string] : string //任意属性
}
let names: Names = {name: 'lisi'}

/**
 * 定义函数方式：
 * 1. 函数定义方式
 * 2. 通过变量声明
 * 3. 接口方式
 * 4. 类型别名：关键字：type
 */

//  
//  function sum (x:number,y:number){
//      return x+y
//  }
// 通过变量声明
// let sum: (x:number,y:number)=>number
// 接口方式
// interface Sum {
//     (x:number,y:number): number
// }
// 类型别名：关键字：type
type Sum = (x:number,y:number) => number 

let sum: Sum = (a,b) => a+b

// 混合接口
interface Lib {
    (): void,
    version: string,
    doSomthing(): void
}
// 用getLib 封装下 lib，原因：如果不封装，lib就是一个全局变量，封装后可以通过 闭包 创建多个 lib。
function getLib() {
    // let lib: Lib = () => {} //Error 因为缺少必要的字段，接口中的字段不能多也不能少
    let lib: Lib = (() => {}) as Lib //类型断言
    lib.version = '1.0'
    lib.doSomthing = () => {}
    return lib
}
let lib1 = getLib()
let lib2 = getLib()
lib1()
lib1.doSomthing()


function sum1(x:number,y:number):number{
    return x+y
}
let sum2: (x:number,y:number) => number
type sum3 = (x:number,y:number) => number
interface sum4 {
    (x:number,y:number): number
}
function sum5(x:number,y?:number){
    return y? x+y : x
}
function sum6(x:number,y=0,z:number,q=1){
    return x+y+q+z
}
console.log(sum6(1,undefined,4))
function sum7(x:number, ...rest:number[]){
    return x + rest.reduce((pre,cur)=>pre+cur)
}
console.log(sum7(1,2,3,4,5))

/**
 * 函数重载
 * 1. 要求先定义一系列相同的声明
 */
function sum8(...rest:number[]): number
function sum8(...rest:string[]): string
function sum8(...rest:any[]): any {
    let first = rest[0]
    if (typeof first === 'string' ) return rest.join('')
    if(typeof first === 'number') return rest.reduce((pre,cur)=>pre+cur)
};
console.log(sum8(1,2,3))
console.log(sum8('a','b','c'))