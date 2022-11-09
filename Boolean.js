const True = a => b => a;
const False = a => b => b;

const If = b => t => e => b(t)(e);
const And = b1 => b2 => b1(b2)(False);
const Or = b1 => b2 => b1(True)(b2);
const Not = b => b(False)(True);

// Exports

module.exports = {
    True,
    False,
    If,
    And,
    Or,
    Not
}