const {Zero, Succ, Minus, Sum, Mod, Multiply, IsGreatThen, IsLessThen, One, IsZero} = require("./Math");
const {True, False, And, Not} = require("./Boolean")
const {Append, Nil, Head, Tail, Map, Foldr, IsNil, Length} = require("./List")
const Sequence = require("./Sequence");
const {Z} = require("./Utils");

const toJsNumber = eq => eq(x => x + 1)(0)
const toJsBoolean = eq => eq(true)(false)
const toJsArray = eq => eq(a => l => [a, ...l])([])

const toLbNumber = n => n <= 0 ? Zero : Succ(toLbNumber(n - 1))
const toLbBoolean = b => b ? True : False
const toLbList = ([a, ...rest]) => a != null ? Append(a)(toLbList(rest)) : Nil

console.log('Examples: Numbers')

const forty_two = toLbNumber(42)
const thirty_three = toLbNumber(33)
const five = toLbNumber(5)

console.log('42 - 33 =', toJsNumber(
    Minus(forty_two)(thirty_three)
))

console.log('42 + 33 =', toJsNumber(
    Sum(forty_two)(thirty_three)
))

console.log('42 * 5 mod 33 =', toJsNumber(
    Mod(Multiply(forty_two)(five))(thirty_three)
))

console.log('Examples: List')

const array = toLbList([forty_two, thirty_three, five])

console.log('array = [forty_two, thirty_three, five]')

console.log('head of array:', toJsNumber(
    Head(array)
))

console.log('tail of array:', toJsArray(
    Map(toJsNumber)(Tail(array))
))

console.log('sum of array:', toJsNumber(
    Foldr(Sum)(Zero)(array)
))

console.log('Examples: Boolean')

console.log('is array Nil:', toJsBoolean(
    IsNil(array)
))

console.log('is 42 > 33:', toJsBoolean(
    IsGreatThen(forty_two)(thirty_three)
))

console.log('is array length < 5 and 5 < 33:', toJsBoolean(
    And(IsLessThen(Length(array))(five))(IsLessThen(five)(thirty_three))
))

console.log('Examples: Sequence (Advanced)')

const primes = Z(_primes => seq =>
    Sequence.Append
        (Sequence.Head(seq))
        (() => _primes(
            Sequence.Filter
                (x => Not(IsZero(Mod(x)(Sequence.Head(seq)))))
                (Sequence.Tail(seq))
        ))
)
(Sequence.Seq(Succ)(Succ(One)))

console.log('first 42 prime numbers from infinity sequence:', toJsArray(
    Map(toJsNumber)(Sequence.Take(forty_two)(primes))
))