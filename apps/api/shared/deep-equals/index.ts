const deepEquals = (a: unknown, b: unknown): boolean => {
  if (a === b) return true

  if (!a || !b) return false

  if (
    a instanceof Function &&
    b instanceof Function &&
    a.toString() === b.toString()
  )
    return true

  if (
    !(
      a instanceof Object &&
      b instanceof Object &&
      Array.isArray(a) === Array.isArray(b)
    )
  )
    return false

  const aKeys = Object.keys(a)
  const bKeys = Object.keys(b)

  if (aKeys.length !== bKeys.length) return false

  for (let index = 0; index < aKeys.length; index++)
    if (!deepEquals(aKeys[index], bKeys[index])) return false

  return true
}

export default deepEquals
