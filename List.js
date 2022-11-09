const Boolean = require('./Boolean')
const Math = require('./Math')
const Pair = require("./Pair")

const Nil = f => x => x
const IsNil = l => l(() => () => Boolean.False)(Boolean.True)
const Append = a => l => f => x => f(a)(l(f)(x))
const Head = l => l(h => () => h)()
const Tail = l => Pair.Second(l(h => t => Pair.Pair(Append(h)(Pair.First(t)))(Pair.First(t)))(Pair.Pair(Nil)(Nil)))

const Foldr = f => z => l => l(f)(z);
const Length = Foldr(() => Math.Succ)(Math.Zero)
const Map = m => l => f => l(h => f(m(h)))

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
}