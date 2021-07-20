function clamp(number, lower, upper) {
    return (number >= upper ? upper : (number <= lower ? lower : number))
}

function inRange(number, lower, upper) {
    // if upper not provided, set default values
    !upper && (upper = lower, lower = 0)
    // if lower is bigger than upper, swap values
    if(lower > upper) [lower, upper] = [upper, lower]

    return number >= lower && number < upper 
}

function random(lower = 0, upper = 1, asFloat = false) {
    if(typeof lower === 'boolean') [lower, upper, asFloat] = [0, 1, lower]
    else if(typeof upper === 'boolean') [lower, upper, asFloat] = [lower, 1, upper]
    
    if(lower > upper) [lower, upper] = [upper, lower]
    asFloat = asFloat || !!(lower % 1 || upper % 1)


    const rdm = lower + (Math.random() * (upper - lower))
    return asFloat ? rdm : rmd | 0
}

export default {
    clamp, inRange, random
}