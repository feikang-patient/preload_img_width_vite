// 比如在浏览器里面给一个元素绑定事件  移除事件 ，是一件开销很大事情 、如果事件数量很多，那么就会造成性能问题

// 事件绑定和移除，是浏览器里面一个非常消耗性能的操作
let _listeners = [
    { e: "click", f: (ev) => console.log("1st binding") },
    { e: "mousedown", f: (ev) => console.log("2nd binding") },
    { e: "click", f: (ev) => console.log("3rd binding") },
    { e: "click", f: (ev) => console.log("4th binding") },
];
const button = document.querySelector("#btn2");

const getPrevious = (arr, i) => arr[i - 1];
const getNext = (arr, i) => arr[i];

const plainBindEvent = () => {
    for (let i = 1; i < 40000; i++) {
        const now = getNext(_listeners, i);
        const prev = getPrevious(_listeners, i);
        button.addEventListener(now.e, now.f);
        button.removeEventListener(prev.e, prev.f);
    }
};
// 我为一个元素先后绑定了不同的事件  为了不重复绑定，我需要先移除上一个事件，然后再绑定新的事件
// vue是怎么实现的呢？

// keyword: vue event invoker / patchEvent
const vei = {};

const cacheBindEvent = () => {
    for (let i = 1; i < 40000; i++) {
        const now = getNext(_listeners, i);
        let invoker = vei[now.e];
        if (invoker) {
            invoker.value = now.f;
            continue;
        }

        if (!invoker) {
            invoker = function (e) {
                invoker.value(e);
            };
            invoker.value = now.f;
            button.addEventListener(now.e, invoker);
            vei[now.e] = invoker;
        }
    }
};

// 优化方案 并没有把事件 还有回调函数 直接放到事件监听器里面去  中间用了一个invoker 包装了一下, 除了第一个事件 调用的是addEventListener 其他的都是在js层面 直接修改invoker.value ,简单替换了invoker而已
// 但是 JavaScript没有指针的概念  这种替换怎么能传达到以前的监听器当中呢？ 使用了闭包传递这种改变 （39行-41行） 而这一切都缓存在一个vei对象里面
// invoker.value = now.f，把回调存在了invoker.value上，而invoker又是函数，相当于是给invoker自身加了个value静态方法，然后每次调用invoker时，实际是去拿自身上value所对应的函数，value其实也是指针
// invoker相当于一个指针了，绑定按钮事件的时候回调那里存的invoker相当于只是存了一个指向关系，具体指向啥东西是可以缓存和替换的！妙蛙
// 回调函数没变，只变了函数内调用的函数

// 这个最早是在webpack源码中看到过
