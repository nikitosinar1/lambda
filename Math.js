const Boolean = require('./Boolean');
const Pair = require('./Pair');
const Utils = require('./Utils');

// Digits

const Zero = f => x => x;
const One = f => x => f(x);

// Math: plus

const Succ = a => f => x => f(a(f)(x))
const Sum = a => b => a(Succ)(b)
const Multiply = a => b => a(Sum(b))(Zero)
const Pow = a => b => b(Multiply(a))(One)

// Math: minus pt.1

const Pred = a => f => x => Pair.Second(a(p => Pair.Pair(f(Pair.First(p)))(Pair.First(p)))(Pair.Pair(x)(x)));
const Minus = a => b => b(Pred)(a)

// Conditions

const IsZero = a => a(x => Boolean.False)(Boolean.True)
const IsEqual = a => b => Boolean.And(IsZero(Minus(a)(b)))(IsZero(Minus(b)(a)))
const IsLessThenOrEqual = a => b => IsZero(Minus(a)(b))
const IsLessThen = a => b => IsLessThenOrEqual(a)(Pred(b))
const IsGreatThenOrEqual = a => b => IsZero(Minus(b)(a))
const IsGreatThen = a => b => IsGreatThenOrEqual(Pred(a))(b)
const Max = a => b => Boolean.If (IsLessThen(a)(b))(b)(a)
const Min = a => b => Boolean.If (IsLessThen(a)(b))(a)(b)

// Math: minus pt.2

const Div = Utils.Z(div => a => b => Boolean.If(IsLessThen(a)(b))(() => Zero)(() => Succ(div(Minus(a)(b))(b)))())
const Mod = Utils.Z(mod => a => b => Boolean.If(IsLessThen(a)(b))(() => a)(() => mod(Minus(a)(b))(b))())

// Exports

module.exports = {
    Zero,
    One,

    Succ,
    Sum,
    Multiply,
    Pow,

    Pred,
    Minus,
    Div,
    Mod,

    IsZero,
    IsEqual,
    IsLessThenOrEqual,
    IsLessThen,
    IsGreatThenOrEqual,
    IsGreatThen,
    Max,
    Min
}
