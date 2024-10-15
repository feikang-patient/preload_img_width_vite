interface Person {
    id: number;
    age: number;
    name: string;
    email: string;
}
// Omit<T, K> 类型 会返回一个新类型，这个类型会从 T 中排除所有 K 相关的属性
type PersonOmit = Omit<Person, 'id' | 'age'>;

const p1: PersonOmit = { name: 'dawei', email: '<EMAIL>' };
