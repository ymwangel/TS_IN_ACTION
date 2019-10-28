// 基本类型
var bool = true;
var num = 123;
var str = 'abc';
// 数组
var arr1 = [1, 2, 3];
var arr2 = [1, '2', 3, 4];
// 元组
var tuple = [0, '1'];
// 函数
var add = function (x, y) { return x + y; }; //既定义，且实现
var computed; //仅定义，未实现
computed = function (a, b) { return a + b; };
// 对象
var obj = { x: 1, y: 2 };
obj.x = 3;
// Symbol: 具有唯一的值
var s1 = Symbol();
var s2 = Symbol();
console.log(s1 === s2); //false
// undefined null
var un = undefined;
var nu = null;
// void
var noReturn = function () { };
// any
var x;
x = 1;
x = [];
x = function () { };
// never : 永远不会有返回值的类型 :抛出异常函数、死循环函数
var error = function () {
    throw new Error('error');
};
var endless = function () {
    while (true) { }
};
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
var Role;
(function (Role) {
    Role[Role["Reporter"] = 0] = "Reporter";
    Role[Role["Developer"] = 1] = "Developer";
    Role[Role["Maintainer"] = 2] = "Maintainer";
    Role[Role["Owner"] = 3] = "Owner";
    Role[Role["Guest"] = 4] = "Guest";
})(Role || (Role = {}));
console.log(Role.Reporter); // 0
console.log(Role);
// 字符串枚举
var Message;
(function (Message) {
    Message["Success"] = "\u606D\u559C\u4F60\uFF0C\u6210\u529F\u4E86";
    Message["Fail"] = "\u62B1\u6B49\uFF0C\u5931\u8D25\u4E86";
})(Message || (Message = {}));
console.log(Message);
// 异构枚举
var Answer;
(function (Answer) {
    Answer[Answer["N"] = 0] = "N";
    Answer["Y"] = "Yes";
    // X = 1 + 5 //Error : Computed values are not permitted in an enum with string valued members.
})(Answer || (Answer = {}));
var Char;
(function (Char) {
    // const
    Char[Char["a"] = 0] = "a";
    Char[Char["b"] = 0] = "b";
    Char[Char["c"] = 4] = "c";
    //computed
    Char[Char["d"] = Math.random()] = "d";
    Char[Char["e"] = '123'.length] = "e";
})(Char || (Char = {}));
var month = [0 /* Jan */, 1 /* Feb */, 2 /* Mar */];
// 枚举类型
var E;
(function (E) {
    E[E["a"] = 0] = "a";
    E[E["b"] = 1] = "b";
})(E || (E = {}));
var F;
(function (F) {
    F[F["a"] = 0] = "a";
    F[F["b"] = 1] = "b";
})(F || (F = {}));
var G;
(function (G) {
    G["a"] = "apple";
    G["b"] = "banana";
})(G || (G = {}));
var e = 3;
var f = 3;
// console.log(e === f) //Error :两种不同的枚举类型 是不可以比较的
var e1 = 1;
var e2;
var e3 = 1;
// e1 和 e2 是不可以比较的，e1 和 e3 可以比较，
var g1 = G.b; //只能是 G.a 或者G.b
var g2 = G.a; //只能赋值为G.a 自身，字符串类型的枚举类型只能 赋值为自身
function initByRole(role) {
    switch (role) {
        case 0 /* Reporter */:
        case 1 /* Developer */:
            break;
        case 2 /* Maintainer */:
        case 3 /* Owner */:
            break;
        default:
        // do sth
    }
}
