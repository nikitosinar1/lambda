const Boolean = require('./Boolean')
const Math = require('./Math')
const Pair = require('./Pair')

const Nil = f => x => x
const IsNil = l => l(() => () => Boolean.False)(Boolean.True)
const Append = a => l => f => x => f(a)(l(f)(x))
const Head = l => l(h => () => h)()
const Tail = l => Pair.Second(l(h => t => Pair.Pair(Append(h)(Pair.First(t)))(Pair.First(t)))(Pair.Pair(Nil)(Nil)))

const Foldr = f => z => l => l(f)(z);
const Map = m => l => f => l(h => f(m(h)))
const Length = Foldr(() => Math.Succ)(Math.Zero)
const Filter = f => Foldr(h => t => Boolean.If(f(h))(() => Append(h)(t))(() => t)())(Nil)
const Concat = l1 => l2 => f => x => l1(f)(l2(f)(x))
const Reverse = l => l(h => t => Concat(t)(Append(h)(Nil)))(Nil)
const Foldl = f => z => l => Reverse(l)(f)(z)

// Exports

module.exports = {
    Nil,
    IsNil,
    Append,
    Head,
    Tail,

    Foldr,
    Length,
    Map,
    Filter,
    Concat,
    Reverse,
    Foldl,
}