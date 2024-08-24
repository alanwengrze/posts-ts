
interface User {
  name: string
  age: number
}

function sumAge(users: User[]) {
  return users.reduce((total, user) => total + user.age, 0)
}

const sumOfAllUsersAge = sumAge([
  { name: 'John', age: 30 },
  { name: 'Mary', age: 25 },
])
console.log(sumOfAllUsersAge)