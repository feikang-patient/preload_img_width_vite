// 更实用一点的场景

async function getData(id) {
    const response = await fetch("https//example.com/api/data/" + id);
    if (response.ok) {
        const data = await response.json();
        return data;
    }
}

function memoize(fun) {
    const cache = {};
    return function (...args) {
        const key = JSON.stringify(args);
        if (cache[key]) {
            console.log("cache hit for", key);
            return cache[key];
        } else {
            const res = fun(...args);
            cache[key] = res;
            return res;
        }
    };
}
const accheGetData = memoize(getData);
async function mian() {
    // fetch data from server
    const data1 = await accheGetData(1);
    // fetch data from cahce
    const data2 = await accheGetData(1);
}
