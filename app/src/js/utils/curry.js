function isFunction(fn) {
  return typeof fn === 'function'
}

function argsArray(x) {
  return Array.prototype.slice.call(x)
}

function applyCurry(fn, arg) {
  if(!isFunction(fn)) { return fn }
  return fn.length > 1 ? fn.bind(null, arg) : fn.call(null, arg)
}

// curry : ((a, b, c) -> d) -> a -> b -> c -> d
function curry(fn) {
  if(!isFunction(fn)) {
    throw new TypeError('curry: Function required')
  }

  return function() {
    const xs =
      argsArray(arguments)

    const args =
      xs.length ? xs : [ undefined ]

    if(args.length < fn.length) {
      return curry(Function.bind.apply(fn, [null].concat(args)))
    }

    const val = (args.length === fn.length)
      ? fn.apply(null, args)
      : args.reduce(applyCurry, fn)

    if(isFunction(val)) {
      return curry(val)
    }

    return val
  }
}

module.exports = curry
