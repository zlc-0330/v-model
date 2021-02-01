import observe from './observe.js';
import Dep from './Dep.js';
// 第三个参数“=”是es6中的默认值
// 如果没传第三个参数，就把obj[key]当做第三个参数的值
export default function reactive(obj, key, value = obj[key]) {
    // 实例化一个dep类
    var dep = new Dep();
    // 每次reactive都是observe调用的，此时value是每个层次的属性值，也要被观察，所以observe(value)，observe类和reactive函数互相调用形成了两文件递归
    var childob = observe(value);
    // 形参value就是set()函数和get()函数的闭包
    Object.defineProperty(obj, key, {
        
        // getter收集依赖,setter触发(通知)依赖
        get() {
            console.log('我是getter', key);
            if (Dep.target) {
                dep.depend();
                if (childob) {
                    childob.dep.depend();
                }
            }
            return value;
        },
        set(newValue) {
            console.log('改变' + key + '的值');
            value = newValue;
            // 观察新值，防止新值是对象
            observe(newValue);
            dep.notify();
        }
    });
}