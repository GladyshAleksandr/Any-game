const classNames = (...args: (string | boolean)[]) => {
  return args
    .filter((arg) => typeof arg === 'string' || (typeof arg === 'boolean' && arg))
    .join(' ')
}

export default classNames
