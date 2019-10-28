/**
 * 类型检查机制
 * 定义： TS 编译器在做类型检查时， 所秉承的一些原则，以及表现出的一些行为。
 * 作用：辅助开发，提高开发效率
 * 
 * 1. 类型推断
 *    定义：不需要指定 变量的类型 （函数的返回值类型），TS可以根据某些规则 自动的为其 推断出一个类型
 *    1. 基础类型推断
 *    2. 最佳通用类型推断
 *    3. 上下文类型推断
 * 
 * 2. 类型兼容性
 *    定义：当一个 类型Y 可以被赋值给 另一个 类型X 时，类型X 兼容 类型Y，X：目标类型，Y：源类型
 *    1. 接口兼容
 *    2. 
 * 3. 类型保护
 * 
 */

//  基础类型推断
let a = 1
let b = ['p',null]
let c = {}
let d = (x=1)=>x
// 上下文类型推断
window.onkeydown = (event:any) => {
    // 推断为 键盘事件
    console.log(event)
}
// 类型断言
interface Foo {
    bar: number
}
let foo: Foo = {
    bar : 1
}
foo.bar = 1

// 类型兼容
let s:string = 'a'
// s = null // tsconfig.json中，strictNullChecks为false 时编译可通过

// 接口兼容
interface X {
    a:any,
    b:any
}
interface Y {
    a:any,
    b:any,
    c:any
}
let xs:X = {a:1,b:2}
let y:Y = {a:1,b:2,c:3}

