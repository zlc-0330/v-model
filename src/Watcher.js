// watcher类(监测)
import Dep from './Dep.js';
export default class Watcher {
    // target是目标对象，expression表达式，类似于obj.a
    constructor(target, expression, callback) {
        this.target = target;
        this.A = parsePath(expression);
        this.target = target;
        this.callback = callback;
        this.value = this.get();
    }
    updata() {
        console.log('updata方法');
        this.getAndInvoke(this.callback);
    }
    get() {
        // 依赖收集阶段
        Dep.target = this;
        // 触发getter了，依赖被收集
        var value = this.A(this.target);
        Dep.target = null;
        return value;
    }
    getAndInvoke(callback) {
        const value = this.get();
        // 当原值不等于新值(get()触发的值value)
        if (value != this.value || typeof value == 'object') {
            const oldvalue = this.value;
            this.value = value;
            callback.call(this.target, value, oldvalue);
        }
    }
}

function parsePath(str) {
    var arr = str.split('.');

    function A(obj) {
        if (!obj) return;
        for (let i = 0; i < arr.length; i++) {
            obj = obj[arr[i]];
        }
        return obj;
    }
    return A;
}