interface Person {
    id: number;
    age: number;
    name: string;
    email: string;
}
// Partial
type PartialPerson = Partial<Person>;
const partial: PartialPerson = { age: 20, name: 'John' };
console.log(partial); // Outputs: { age: 20 }
