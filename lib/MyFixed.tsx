function myFixed(x, d) {
    if (!d) return x.toFixed(d); // don't go wrong if no decimal
    return x.toFixed(d).replace(/\.?0+$/, '');
}

export default myFixed
