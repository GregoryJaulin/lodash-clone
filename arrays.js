import { iteratee } from './utils'

function chunk(array, size = 1) {
    // Little hack faster than Math.floor
    const chunksNumbers = Math.ceil(array.length / size)
    const res = Array.from({ length: chunksNumbers }, () => [])

    let buffer
    for (let i = 0; i < array.length / chunksNumbers; i++) {
        for (let j = 0; j < chunksNumbers; j++) {
            buffer = array[size * j + i]
            if (buffer) res[j][i] = buffer
        }
    }
    return res
}

function compact(array = []) {
    return array.filter(value => !!value)
}

function concat() {
    return [].concat(...arguments)
}

function baseDiff(array, exclusions, iteratee, comparator = (f, s) => f === s) {
    const res = []

    if (iteratee) exclusions = exclusions.map(iteratee)

    let value
    for (let i in array) {
        value = iteratee ? iteratee(array[i]) : array[i]

        if (exclusions.findIndex(ex => comparator(value, ex)) === -1) res.push(array[i])
    }

    return res
}

function difference(array, ...arrays) {
    if (!arrays.length) return array

    return baseDiff(array, concat(...arrays))
}

function differenceBy(array, ...properties) {
    let last = properties.splice(-1, 1)[0]
    if (typeof last === 'object' || Array.isArray(last)) return baseDiff(array, concat([...properties, last]))

    return baseDiff(array, concat(...properties), last ? iteratee(last) : undefined)
}

function differenceWith(array, ...properties) {
    let comparator = properties.splice(-1, 1)[0]

    return baseDiff(array, concat(...properties), undefined, comparator)
}

function drop(array = [], n = 1) {
    return array.splice(0, n), array
}

function dropRight(array = [], n = 1) {
    return array.splice(-n, n), array
}

function dropRightWhile(array = [], predicate) {
    if(!predicate) return []
    predicate = iteratee(predicate)

    let index = 0
    for(let i = array.length - 1; i >= 0; i--) {
        if(!predicate(array[i])) {
            index = i
            break
        }
    }

    return array.splice(index + 1, array.length - index), array
}

function dropWhile(array, predicate) {
    if(!predicate) return []
    predicate = iteratee(predicate)

    let index = 0
    for(let i = 0; i < array.length; i++) {
        if(!predicate(array[i])) {
            index = i
            break
        }
    }

    return array.splice(0, index), array
}

function fill(array, value, start = 0, end = array.length) {
    for(let i = start; i < end; i++) array[i] = value
    return array
}

function baseFindIndex(array, iteratee, start, reverse) {
    let index = start + (reverse ? 1 : -1)
    while(reverse ? index-- > 0 : index++ < array.length) {
        if(iteratee(array[index])) return index
    }

    return -1
}

// We could be using built-in Array.prototype.findIndex but
// findLastIndex would be slower than findIndex
// Thus, both functions have a similar execution time
function findIndex(array, predicate, start = 0) {
    return baseFindIndex(array, iteratee(predicate), start)
}

function findLastIndex(array, predicate, start = array.length - 1) {
    return baseFindIndex(array, iteratee(predicate), start, true)
}

function first(array) {
    return array ? array[0] : undefined
}

function fromPairs(array) {
    return array.reduce((acc, obj) => ({...acc, [obj[0]]: obj[1]}), {})
}

function baseIntersect(arrays, iteratee, comparator = (f, s) => f === s) {
    const res = [],
        seen = []

    let index
    for(let i in arrays) {
        arrays[i].forEach(obj => {
            let value = iteratee ? iteratee(obj) : obj

            if((index = seen.findIndex(ex => comparator(value, ex.iteratee))) === -1) seen.push({ raw: obj, iteratee: value })
            else res.push(seen[index].raw)
        })
    }

    return res
}

function intersection(...properties) {
    return baseIntersect(properties)
}

function intersectionBy(...properties) {
    let last = properties.splice(-1, 1)[0]
    if (typeof last === 'object' || Array.isArray(last)) return baseIntersect([...properties, last])

    return baseIntersect(properties, last ? iteratee(last) : undefined)
}

function intersectionWith(...properties) {
    let comparator = properties.splice(-1, 1)[0]

    return baseIntersect(properties, undefined, comparator)
}

function last(array) {
    return array.splice(-1, 1)[0]
}

function nth(array, n = 0) {
    return array ? array[n >= 0 ? n : array.length + n] : undefined
}

function reverse(array) {
    return array ? array.reverse() : array
}

export default {
    chunk,
    compact,
    concat,
    difference,
    differenceBy,
    differenceWith,
    drop,
    dropRight,
    dropRightWhile,
    dropWhile,
    fill,
    findIndex,
    findLastIndex,
    first,
    fromPairs,
    intersection,
    intersectionBy,
    intersectionWith,
    last,
    nth,
    reverse
}