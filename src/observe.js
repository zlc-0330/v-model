import Observer from "./Observer";

// 辅助函数，判断身上是否有__ob__属性
export default function(value) {
    if (typeof value != 'object') return;
    if (typeof value.__ob__ === 'undefined') {
        return new Observer(value);
    } else {
        return value.__ob__;
    }
}