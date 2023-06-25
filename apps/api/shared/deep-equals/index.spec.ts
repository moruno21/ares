import deepEquals from './index'

describe('deepEquals on arrays', () => {
  const array = [1, '2', true]
  const object1 = { prop: 'x' }
  const object2 = { property: 'y' }
  const object3 = { field: 'z' }

  const tests = [
    {
      arrayA: null,
      arrayB: [],
      result: false,
      should: 'return false when A is falsy',
    },
    {
      arrayA: [],
      arrayB: undefined,
      result: false,
      should: 'return false when B is falsy',
    },
    {
      arrayA: [],
      arrayB: [],
      result: true,
      should: 'return true when both arrays are empty',
    },
    {
      arrayA: array,
      arrayB: array,
      result: true,
      should: 'return true when arrays are ===',
    },
    {
      arrayA: [1, 2, 3],
      arrayB: [1, 2],
      result: false,
      should: 'return false when arrays lenght is not the same',
    },
    {
      arrayA: [object1, object2, object3],
      arrayB: [object1, object2, object3],
      result: true,
      should: 'return true if all corresponding elements are ===',
    },
  ]

  tests.forEach(({ arrayA, arrayB, result, should }) => {
    it('should ' + should, () => {
      expect(deepEquals(arrayA, arrayB)).toEqual(result)
    })
  })
})

describe('deepEquals on objects', () => {
  const object1 = { prop: 'x', property: 'y' }
  const object2 = { field: 'z' }

  const tests = [
    {
      objectA: null,
      objectB: {},
      result: false,
      should: 'return false when A is falsy',
    },
    {
      objectA: {},
      objectB: undefined,
      result: false,
      should: 'return false when B is falsy',
    },
    {
      objectA: {},
      objectB: {},
      result: true,
      should: 'return true when both objects are empty',
    },
    {
      objectA: object1,
      objectB: object1,
      result: true,
      should: 'return true when objects are ===',
    },
    {
      objectA: { country: 'Australia', game: 'chess', year: '1979' },
      objectB: { game: 'chess', year: '1979' },
      result: false,
      should: 'return false when objects do not have the same amount of keys',
    },
    {
      objectA: { first: object1, second: object2 },
      objectB: { first: object1, second: object2 },
      result: true,
      should: 'return true when all values are ===',
    },
    {
      objectA: { first: undefined },
      objectB: { second: 'green' },
      result: false,
      should: 'return false when objectA contains undefined',
    },
  ]

  tests.forEach(({ objectA, objectB, result, should }) => {
    it('should ' + should, () => {
      expect(deepEquals(objectA, objectB)).toEqual(result)
    })
  })
})
