// enum Gender {
//     Male = 0,
//     Female = 1
// }
// interface Person {
//     gender: Gender;
// }
// function marry(a: Person, b: Person): [Person, Person] {
//     if (a.gender !== b.gender) {
//         return [a, b]
//     } else {
//         throw new Error('性别相同不能结婚')
//     }
// }
// let a = { gender: Gender.Male }
// let b = { gender: Gender.Female }
// console.log(marry(a, b)[0])