const Utils = require('./Utils')
const Pair = require('./Pair')
const Boolean = require('./Boolean')
const Math = require('./Math')
const List = require('./List')

const Seq = Utils.Z(seq => f => z => Pair.Pair(z)(() => seq(f)(f(z))))

const Head = seq => Pair.First(seq)
const Tail = seq => Pair.Second(seq)()

const Take = Utils.Z(take => n => seq => Boolean.If(Math.IsZero(n))(() => List.Nil)(() => List.Append(Head(seq))(take(Math.Pred(n))(Tail(seq))))())
const Map = Utils.Z(map => f => seq => Pair.Pair(f(Head(seq)))(() => map(f)(Tail(seq))))
const Filter = Utils.Z(filter => f => seq => Boolean.If(f(Head(seq)))(() => Pair.Pair(Head(seq))(() => filter(f)(Tail(seq))))(() => filter(f)(Tail(seq)))())

module.exports = {
    Seq,

    Head,
    Tail,

    Take,
    Map,
    Filter
}