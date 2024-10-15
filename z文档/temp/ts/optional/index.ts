interface User {
    name: string;
    age: number;
    gender: string;
    phone: string;
    address: string;
    date: Date;
    status: string;
}

// interface CreateUserOptions {
//     name: string;
//     age: number;
//     gender: string;
//     phone: string;
//     address?: string;
//     date?: Date;
//     status?: string;
// }
// type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// t k有什么约束吗？
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// 指定的类型变成可选的  ts并没有内置的api
type CreateUserOptions = Optional<User, 'address' | 'date' | 'status'>;

function createUser(options: CreateUserOptions) {
    // options.;
}
