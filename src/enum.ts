
/**
 * 枚举类型 ： 一组有名字的常量的集合, 枚举成员 read-only
 * 1. 数字枚举： 可以反向映射
 * 2. 字符串枚举 : 不可以反向映射，
 * 3. 异构枚举：数字枚举+字符串枚举
 * 
 * 枚举成员类型分类：
 * 1. 常量枚举 ：使用：在编译时被移除，不需要一个对象，而使用对象的值时，可以使用常量枚举，可以减少编译时的代码
 *      1. 没有初始值，
 *      2. 对已有枚举成员的引用
 *      3. 枚举表达式
 * 2. computed : 
 *      1. 被计算的枚举成员的值被保留，在运行时才会被计算
 *      2. computed 枚举成员之后的 成员必须被赋值
 * 
 * 1. 可以自定义初始值，后面的值自增
 * 2. 编译为js的一个对象
 * 3. 枚举成员不可修改，read-only
 * 4. 含有字符串成员的枚举不能 含有计算值， 况且异构枚举也不推荐使用
 * 5. 两种不同类型的枚举 是不可以比较的
*/
// 数字枚举：
enum Role {
    Reporter,
    Developer,
    Maintainer,
    Owner,
    Guest
}
console.log(Role.Reporter) // 0
console.log(Role)
// 字符串枚举
enum Message {
    Success = '恭喜你，成功了',
    Fail = '抱歉，失败了'
}
console.log(Message)
// 异构枚举
enum Answer {
    N,
    Y = 'Yes'
    // X = 1 + 5 //Error : Computed values are not permitted in an enum with string valued members.
}

enum Char {
    // const
    a,
    b = Char.a,
    c = 1 +3,
    //computed
    d = Math.random(),
    e = '123'.length
}

// 常量枚举
const enum Month {
    Jan,
    Feb,
    Mar
}
let month = [Month.Jan, Month.Feb,Month.Mar]

// 枚举类型
enum E {a,b}
enum F {a=0,b=1}
enum G {a='apple', b='banana'}

let e:E = 3
let f:F = 3
// console.log(e === f) //Error :两种不同的枚举类型 是不可以比较的
let e1 : E.a = 1
let e2: E.b
let e3 : E.a = 1
// e1 和 e2 是不可以比较的，e1 和 e3 可以比较，

let g1: G = G.b //只能是 G.a 或者G.b
let g2: G.a = G.a //只能赋值为G.a 自身，字符串类型的枚举类型只能 赋值为自身

/**
 * 角色判断函数
 * js代码：存在硬编码
 function initByRole(role){
    if(role === 1 || role === 2){
        // do sth
    }else if(role === 3 || role === 4){
        // do sth
    }else if(role === 5){
        // do sth
    }else{
        // do sth
    }
}
*/
// ts编码
const enum ERole{
    Reporter,
    Developer,
    Maintainer,
    Owner,
    Guest
}
function initByRole(role:number) {
    switch(role){
        case ERole.Reporter:
        case ERole.Developer:
            break;
        case ERole.Maintainer:
        case ERole.Owner:
            break;
        default:
            // do sth
    }  
}