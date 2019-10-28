/**
 * TS: 类
 * 1. 类成员的 属性 都是 实例属性，而不是原型属性； 类成员的 方法，都是 原型 方法，而不是实例方法, ES(js)也是如此
 * 2. 实例的属性必须有初始值，但是js可以没有
 * 3. 构造函数加 private，该类不能被继承，也不能被实例化
 * 4. 构造函数加 protected，该类只能被继承，不能实例化，也就是一个 基类
 * 
 * 类的成员的修饰符： 
 * 1. public：
 * 2. private: 只能在类的本身调用，不能被子类、实例中调用,
 * 3. protected: 只能在类和子类中调用，不能被实例调用
 * 4. readonly: 只读属性，不能被更改，且必须初始化
 * 5. static: 类的静态成员，只能通过 类名调用，可以被继承，所以也可以被子类调用。不能通过实例调用
 * 
 * 构造函数的参数 也可以添加修饰符 作用：将参数自动变为实例属性，这样就不用在类中定义了
 * 
 * 抽象类： 只能被继承，不能实例化
 * 1. 抽象类中的 abstract 方法，必须被 子类实现
 * 2. 抽象类 可以抽象出 共性，供子类使用
 * 
 * 多态：在父类中定义，在子类有不同的实现
 * 
 * this 类型
 * 1. 在所有的方法中 每次都返回 当前对象
 * 
 * 
 */

class Dog{
    // private constructor(name: string){ //Dog 不能被实例还，也不能被继承
    //     this.name = name
    // }
    constructor(name: string){
        this.name = name
    }
    public name?: string //实例属性，在实例上的属性
    run() {}
    private pri(){console.log('private')}
    protected pro() {console.log('protected')}
    readonly legs:number = 4
    static food:string = 'bones'
}
console.log(Dog.prototype)// name并不在原型上，但是run在原型上
let dog = new Dog('wangwang')
console.log(Dog)
console.log(Dog.food)

class Husky extends Dog {
    // public age:number 将age变为实例属性，
    constructor(name: string,color:string, public age?:number){
        super(name)
        this.color = color
        this.age = age
    }
    color: string
    protectedFunc(){
        console.log(this.pro())
    }
}
console.log(Husky.food)
let husky = new Husky('wangcai','black')
// Husky.pri() //不能被实例
husky.protectedFunc() 

abstract class Animal {
    // 定义方法，子类可以复用
    eat(){
        console.log('eat')
    }
    abstract sleep() :void  //抽象方法，必须在子类中实现
}
class Rabbit extends Animal {
    constructor(name: string){
        super()
        this.name = name
    }
    name: string
    sleep(){
        console.log('rabbit sleep')
    }
}
let rabbit = new Rabbit('kitty')
rabbit.eat()

class Cat extends Animal{
    sleep(){
        console.log('cat sleep')
    }
}
let cat = new Cat()
/**
 * 1. animals 是一个数组，数组中每项都是Animal类，但是赋值的是子类的实例？
 * 答：实例的类型 就是 类的类型，因为它具备类的必要属性
 */
let animals: Animal[] = [rabbit,cat]  
animals.forEach(i=>{
    i.sleep()
})

// this 类型
class WordFlow {
    step1() {
        return this
    }
    step2() {
        return this
    }
}
new WordFlow().step1().step2()

class MyFlow extends WordFlow {
    next() {
        return this
    }
}
new MyFlow().next().step1().step2().next()