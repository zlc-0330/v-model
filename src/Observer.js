import reactive from './defineReactive.js';
import arrayRewrite from './arrayRewrite.js';
import Dep from './Dep.js';
// Observe(观察)类，让对象(数组)的每个层级都是响应式的(设置setter和getter)
export default class Observe {
    // 构造函数(new Observe()时函数就会执行)
    constructor(value) {
            // 如果value不是对象，什么都不做
            if (typeof value != 'object') return;
            // 每一个Observe都要有一个Dep实例
            this.dep = new Dep();
            // 在这次遍历的value上加__ob__属性，值(不可枚举不可改写)是它自己(observe实例)
            Object.defineProperty(value, '__ob__', {
                value: this,
                enumerable: false,
                writable: false
            })
            this.value = value;
            if (Array.isArray(value)) {
                this.manageArray(value);
            } else if (typeof value == 'object') {
                this.walk(value);
            }
        }
        // 遍历所有属性，并将它们转化为sett和getter(只有value是对象时调用)
    walk(obj) {
            var keys = Object.keys(obj);
            for (let i = 0; i < keys.length; i++) {
                // 变成响应式 
                reactive(obj, keys[i]);
            }
        }
        // 处理数组的函数
    manageArray(arr) {
        // 改原型链
        Object.setPrototypeOf(arr, arrayRewrite(arr));
    }

};