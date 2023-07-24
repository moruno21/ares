import { itIsNamed } from '~/test/closures/shared/name-type'

import RoutineRenamed from './routine-renamed'

describe('RoutineRenamed', () => {
  const __name__ = 'RoutineRenamed'
  const id = 'id'
  const name = 'name'
  const routineRenamed = RoutineRenamed.with({ id, name })

  itIsNamed(routineRenamed)

  it.concurrent('has an id', () => {
    expect(routineRenamed).toHaveProperty('id')
  })

  it.concurrent('has a name', () => {
    expect(routineRenamed).toHaveProperty('name')
  })

  it.concurrent('can be created', () => {
    expect(routineRenamed.__name__).toBe(__name__)
    expect(routineRenamed.id).toBe(id)
    expect(routineRenamed.name).toBe(name)
  })
})
