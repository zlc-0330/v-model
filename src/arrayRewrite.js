// 改写数组七个方法
export default function(arr) {
    var methodNames = [
        'push',
        'pop',
        'unshift',
        'shift',
        'aplice',
        'reverse',
        'sort'
    ];
    // 创建一个对象，它将成为array的新的原型链
    let arrayMethods = Object.create(Array.prototype);
    // 遍历methodNames数组
    methodNames.forEach(methodName => {
        arrayMethods[methodName] = function() {
            console.log('方法已改写');
            // 调用js默认方法
            Array.prototype[methodName].apply(this, arguments);
        }
    });
    return arrayMethods;
};