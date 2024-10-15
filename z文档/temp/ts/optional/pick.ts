interface Person {
    id: number;
    age: number;
    name: string;
    email: string;
}
type PersonPick = Pick<Person, 'id' | 'age'>;

const p2: PersonPick = { id: 22, age: 12 };
