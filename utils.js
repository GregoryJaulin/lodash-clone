function iteratee(arg) {
    if (!arg) return (v) => v
    if (typeof arg === 'function') return arg
    if (typeof arg === 'object') 
        return Array.isArray(arg)
                ? (compare) => compare[arg[0]] === arg[1]
                : (compare) => arg === compare || Object.keys(arg).every(key => arg[key] === compare[key])
    return (v) => v[arg]
}

export {
    iteratee
}