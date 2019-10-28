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
 * 
 *      
 *    口诀：
 *      （1）结构之间兼容：成员少 的兼容 成员多的
 *      （2）函数之间兼容：参数多 的兼容 参数少的
 * 
 * 
 *    1. 接口兼容: 源类型必须 具有目标类型的 必要属性，就可以赋值: 成员少的 兼容 成员多的
 *    2. 函数兼容性：
 *       (1) 参数个数： 目标函数的参数个数 >= 目标函数的参数个数
 *       (2) 可选参数和剩余参数：固定参数可以 兼容 可选参数、剩余参数；可选参数 不兼容 固定参数 和剩余参数; 剩余参数 可以兼容 固定参数和 可选参数
 *       (3) 参数类型：参数类型 需 一致
 *       (4) 返回值类型：目标函数的返回值类型 必须与 源函数的 返回值类型相同，或者为其 子类型
 *       (5) 函数实现的参数个数 不能多余 函数定义时参数个数，返回值也必须有
 *    3. 枚举兼容性 ： 枚举和number 之间是可以兼容的； 枚举之间是不兼容的
 *    4. 类之间兼容性
 *       (1)比较两个类之间的兼容性时，static 和constructor 是不参与比较的
 *       (2)如果两个类 有 private 成员，两个类是不兼容的，只有父类和子类互相兼容
 *    5. 泛型兼容性
 *       (1) 泛型接口中没有 成员时，是可以兼容的，有成员的时候不兼容
 *       (2) 泛型函数：两个泛型函数定义一样，且没有指定类型，是可以兼容的
 * 
 * 3. 类型保护 : TS 能够在特定的区块中保证变量属于某种确定的类型
 *    1. 可以在区块中 放心的引用此 类型的 属性，或者调用此类型的方法
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
xs = y 
// y = xs  // Error 

type Handler = (a:number,b:number) => void
function hof(handler:Handler){
    return handler
}
let handler1 = (a:number) =>{}
hof(handler1)
let handler2 = (a:number,b:number,c:number) => {}
// hof(handler2) //Error: handler2的参数个数 大于了 Handler参数个数

// 可选参数和剩余参数
let aa = (p1:number,p2:number) => {}
let bb = (p1?:number,p2?:number)=>{}
let cc = (...args:number[]) => {}

aa = bb
aa = cc

// bb = cc //Error
// bb == aa  //Error
cc = aa
cc = bb

//  参数类型需要匹配
let handler3 = (a:string) => {}
// hof(handler3) //Erro： 参数类型不兼容

interface Point3D {
    x:number,
    y:number,
    z:number
}
interface Point2D{
    x:number,
    y:number
}
let p3d = (point:Point3D) =>{}
let p2d = (point:Point2D) =>{}
p3d = p2d //p3d 兼容 p2d
// p2d = p3d //Error:  成员多的兼容成员少的

// 返回值类型，
let ff = () => ({name: 'Alice'})
let gg = () => ({name: 'Alice',location:'Beijing'})
ff = gg //ff 兼容 gg

function overload(a:number,b:number) :number
function overload(a:string,b:string) :string
function overload(a:any,b:any):any{}  //函数实现的参数个数 不能多余 函数定义时参数个数，返回值也必须有
// function overload(a:any,b:any,c:any):any{} //Error 参数个数
// function overload(a:any,b:any){} //Error 没有返回值


// 枚举类型兼容性
enum Fruit {Apple,Banna}
enum Color {Red, Yellow}
let fruit: Fruit.Apple = 3
console.log(fruit)
let no:number = Fruit.Apple // 枚举和number 之间是可以兼容的
// let color:Color.Red = Fruit.Apple  // Error: 枚举之间是不可以兼容的

// 类的兼容性
class A {
    constructor(p:number,q:number){}
    id: number =1
}
class B {
    static s = 1
    constructor(p:number) {}
    id:number =2
}
let aaa = new A(1,2)
let bbb = new B(1)
aaa = bbb
bbb = aaa
class C extends A {
    
}
let ccc = new C(1,2)

// 泛型兼容性
interface Empty<T>{
}
let obj1:Empty<number> = {}
let obj2:Empty<string> = {}
obj1 = obj2

interface Empty1<T>{
    value: T
}
let obj11:Empty1<number> = {value: 1}
let obj22:Empty1<string> = {value: '1'}
// obj11 = obj22 //Error: 不兼容

let log11 = <T>(x:T):T=>{
    console.log('x')
    return x
}
let log22 = <U>(y:U) : U=>{
    console.log('y')
    return y
}
log11 = log22

// 类型保护
enum Type {Strong,Week}
class Java{
    helloJava() {
        console.log('hello Java')
    }
    java: any
}
class Javascript{
    helloJavascript() {
        console.log('hello Javascript')
    }
    javascript: any
}
function isJava(lang:Java | Javascript): lang is Java {
    return (lang as Java).helloJava !== undefined
}
function getLanguage(type: Type){
    let lang = type === Type.Strong ? new Java() : new Javascript()
    
    // 类型断言
    // if((lang as Java).helloJava) {
    //     (lang as Java).helloJava()
    // }else {
    //     (lang as Javascript).helloJavascript()
    // }

    // 类型保护方法

    // instanceof
    // if(lang instanceof Java){
    //     lang.helloJava()
    // }else{
    //     lang.helloJavascript()
    // }

    // in
    // if('java' in lang) {
    //     lang.helloJava()
    // }else {
    //     lang.helloJavascript()
    // }

    //typeof
    // if(typeof x === 'string'){
    //     x.length
    // }else {
    //     x.toFixed()
    // }
    
    // 类型保护函数
    if(isJava(lang)){
        lang.helloJava()
    }else{
        lang.helloJavascript()
    }
    return lang
}
getLanguage(Type.Strong)


/**
 * 高级类型
 * 1. 交叉类型
 * 
 */
interface DogInterface {
    run(): void
}
interface CatInterface {
    jump(): void
}
let pet: DogInterface & CatInterface = {
    run() {},
    jump() {}
}
class DogClass implements DogInterface {
    run() {}
    eat() {}
}
class CatClass implements CatInterface {
    jump() {}
    eat(){}
}
enum Master {Boy,Girl}
function getPet (master:Master){
    let pet = master === Master.Boy  ? new DogClass() : new CatClass()
    return pet
}

interface Square {
    kind: 'square'
}