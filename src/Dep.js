// 依赖类，发布订阅模式，也叫观察者模式
export default class Dep {
    constructor() {
            // 自己的订阅者，是watcher实例的数组
            this.subs = [];
        }
        // 添加依赖
    depend() {
            // Dep.target是一个全局位置(方便收集依赖)
            if (Dep.target) {
                this.subs.push(Dep.target);
            }
        }
        // 通知
    notify() {
        for (let i = 0, l = this.subs.length; i < l; i++) {
            this.subs[i].updata();
        }
    }
}