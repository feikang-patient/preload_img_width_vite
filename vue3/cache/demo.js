function factorial(n) {
    if (n == 0) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}
function memoizeFactorial() {
    const cache = {};
    // 返回一个函数，该函数会记住上次计算的结果 (利用了闭包)   避免重复计算 这样很好的提高了代码的执行效率
    return function (id) {
        if (id in cache) {
            console.log("Cache hit for " + id);
            console.log(cache[id]);
            return cache[id];
        } else {
            const result = factorial(id);
            cache[id] = result;
            return result;
        }
    };
}
const aMemoizeFactorial = memoizeFactorial();

function main() {
    const data1 = aMemoizeFactorial(10);
    const data2 = aMemoizeFactorial(10);
}

main();
