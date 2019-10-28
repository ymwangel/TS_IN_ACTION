/**
 * 类实现接口 implements
 * 1. 类必须 实现接口中的 每一个属性
 * 2. 接口只能约束 类中的 共有成员(public)
 * 3. 接口不能 约束 构造函数
 * 
 * 接口的继承 extends
 * 1. 接口继承接口
 * 2. 接口继承 类 ：相当于 接口 只有类的 成员结构，但是没有具体的实现，接口在抽离类的成员时 ，抽离了类的 public、private、protecte成员
 * 
 * 总结：
 * 1. 接口  extends        接口
 * 2. 接口   extends       类     // 抽离了 类的 public、prvate、protected 属性 ，限定该类 接口 只能通过该类的子类来实现
 * 3. 类    extends        类    
 * 4  类     implements    接口   //  接口 只能约束 类的 public 成员, 也就是 接口的结构 只有 类的public 成员
 */

interface Human{
    name: string,
    eat(): void,
}
class Asian implements Human {
    constructor(name: string){
        this.name = name
    }
    name: string
    eat() {}
    sleep(){}
}

interface Man extends Human {
    run() : void
}
interface Child {
    cry(): void
}
interface Boy extends Man, Child {}
let boy: Boy = {
    name: '',
    run() {},
    eat(){},
    cry() {}
}

class Auto {
    state = 1
    private state2 = 0 
    protected state3 = 3
    // 因为是private，所以 子类不能继承，AutoInterface extends Auto，所以AutoInterface 抽离了state2，因为接口是可以抽离 private的，
    // 因为C 不是Auto 的子类，所以不能包含 Auto 的非共有成员
}
interface AutoInterface extends Auto{
    // 这样AutoInterface 也包括了 Auto 的 private、protected 成员
    // 接口继承 类的 作用：限定接口的使用范围，并不会真正的为这个接口添加类的 private、protected 成员
    // 这个使用范围：只能由 子类 来实现这个接口 ，所以添加了 private、protected 后，C 直接实现AutoInterface 是错误的，因为没有 继承 Auto
}
// class C implements AutoInterface {
//     // 必须实现state属性
//     state = 1
// }
class Bus extends Auto implements AutoInterface{
    // 不必实现state属性，因为 Auto已经实现类，Bus会继承得到
    showMsg() {
        // console.log(this.state2) 子类不能访问父类的 private属性
        console.log(this.state3) // 子类中可以访问 父类的 protected属性
    }
}
let bus = new Bus()
bus.showMsg()
console.log(bus)