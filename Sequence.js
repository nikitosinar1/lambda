const Utils = require('./Utils')
const Pair = require('./Pair')
const Boolean = require('./Boolean')
const Math = require('./Math')
const List = require('./List')

const Seq = Utils.Z(seq => f => z => Pair.Pair(z)(() => seq(f)(f(z))))

const Head = seq => Pair.First(seq)
const Tail = seq => Pair.Second(seq)()
const Append = a => seqCb => Pair.Pair(a)(seqCb) // seqCb - should have type () => seq

const Take = Utils.Z(take => n => seq => Boolean.If(Math.IsZero(n))(() => List.Nil)(() => List.Append(Head(seq))(take(Math.Pred(n))(Tail(seq))))())
const Map = Utils.Z(map => f => seq => Append(f(Head(seq)))(() => map(f)(Tail(seq))))
const Filter = Utils.Z(filter => f => seq => Boolean.If(f(Head(seq)))(() => Append(Head(seq))(() => filter(f)(Tail(seq))))(() => filter(f)(Tail(seq)))())
const Zip = Utils.Z(zip => seq1 => seq2 => Append(Pair.Pair(Head(seq1))(Head(seq2)))(() => zip(Tail(seq1))(Tail(seq2))))

// Exports

module.exports = {
    Seq,

    Head,
    Tail,
    Append,

    Take,
    Map,
    Filter,
    Zip
}