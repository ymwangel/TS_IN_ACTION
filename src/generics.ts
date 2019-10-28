/**
 * 泛型： <T>
 * 定义：不预先确定的数据类型，具体的类型 在使用 的时候 才能确定
 * 1. T 相当于any类型
 * 2. 泛型可以理解为：代表类型的参数
 * 3. 泛型可以约束 类 的成员
 * 4. 泛型不能 应用于 类的 static 成员
 * 
 * 泛型 函数：
 * 1. 泛型定义函数
 * 2. type 定义 泛型函数 类型
 * 
 * 泛型接口
 * 1. 
 * 
 * 类型约束
 * 
 * 泛型好处：
 * 1. 函数和类 可以轻松的支持 多种类型，增强 程序的扩展性
 * 2. 不必写 多条 函数重载、冗长的联合类型声明，增加代码可读性
 * 3. 灵活控制类型之间的 约束
 * 
 */


// function log(value:string):string{
//     console.log(value)
//     return value
// }
// 泛型定义函数
function log<T> (value: T) : T{
    console.log(value)
    return value
}
// 调用
log<string[]>(['a','b'])
log(['a','b']) //利用TS的类型推断

// type 定义 泛型函数 类型
type Log = <T>(value:T) => T
let myLog : Log = log

interface LogIn {
    <T>(value:T) : T //只约束 value属性，其他属性不约束为 泛型
} 
let logIn : LogIn = log
logIn(4)
logIn('tt')

// 泛型接口：约束接口的所有成员
interface LogInAll<T>{
    (value:T) : T
}
let myLogAll : LogInAll<number> = log
myLogAll(1)

// 或者
interface LogInStr<T = string>{
    (value:T) : T
}
let myLogStr : LogInStr = log
myLogStr('1')

class LogClass<T> {
    run(value:T){
        console.log(value)
        return value
    }
}
let log1 = new LogClass<number>()
log1.run(1)
let log2 = new LogClass()  //run可以传任何类型的值
log2.run(2)
log2.run('sodf')
log2.run({x:1})

interface Length {
    length: number
}

// 泛型约束
function logThree<T extends Length>(value: T): T {
    console.log(value,value.length)
    return value
}
logThree([1,2,3])
logThree('rtyui')
logThree({length:5})