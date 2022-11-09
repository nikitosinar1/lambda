const Y = f => (x => f(x(x)))(x => f(x(x)))
const Z = f => (x => f(y => x(x)(y)))(x => f(y => x(x)(y)))
const I = x => x;

// Exports

module.exports = {
    Y,
    Z,
    I
}
