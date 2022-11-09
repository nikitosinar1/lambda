const Pair = a => b => f => f(a)(b);

const First = p => p(a => b => a);
const Second = p => p(a => b => b);

// Exports

module.exports = {
    Pair,
    First,
    Second
}