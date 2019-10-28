"use strict";
exports.__esModule = true;
function render(result) {
    result.data.forEach(function (value) {
        console.log(value.id, value.name);
        if (value.age) {
            console.log(value.age);
        }
    });
}
var result = {
    data: [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' }
    ]
};
var result1 = {
    data: [
        { id: 1, name: 'A', sex: 'male' },
        { id: 2, name: 'B' }
    ]
};
render(result);
render(result1); //没问题，绕过了类型检查
render({
    data: [
        { id: 1, name: 'A', sex: 'male' },
        { id: 2, name: 'B' }
    ]
}); //以对象字面量方式传入，会对接口额外的字段进行类型检查，报错，解决方法：类型断言
render(result); //类型断言，告知编译器 类型是Result，编译器会绕过类型检查
// 或者
render(result); // 这种在react中会产生歧义
var chars = ['A', 'B'];
var names = { name: 'lisi' };
var sum = function (a, b) { return a + b; };
// 用getLib 封装下 lib，原因：如果不封装，lib就是一个全局变量，封装后可以通过 闭包 创建多个 lib。
function getLib() {
    // let lib: Lib = () => {} //Error 因为缺少必要的字段，接口中的字段不能多也不能少
    var lib = (function () { }); //类型断言
    lib.version = '1.0';
    lib.doSomthing = function () { };
    return lib;
}
var lib1 = getLib();
var lib2 = getLib();
lib1();
lib1.doSomthing();
function sum1(x, y) {
    return x + y;
}
var sum2;
function sum5(x, y) {
    return y ? x + y : x;
}
function sum6(x, y, z, q) {
    if (y === void 0) { y = 0; }
    if (q === void 0) { q = 1; }
    return x + y + q + z;
}
console.log(sum6(1, undefined, 4));
function sum7(x) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    return x + rest.reduce(function (pre, cur) { return pre + cur; });
}
console.log(sum7(1, 2, 3, 4, 5));
