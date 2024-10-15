// 联合交叉类型
interface o1 {
    a: string;
    b: number;
}
interface o2 {
    c: string;
    d: number;
}

type o3 = o1 & o2;
const obj: o3 = { a: 'a', b: 1, c: 'c', d: 2 };
