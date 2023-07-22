import RoutineView from '~/routine/application/models/view'
import RoutineDescription from '~/routine/domain/models/description'
import RoutineId from '~/routine/domain/models/id'
import RoutineName from '~/routine/domain/models/name'
import Routine from '~/routine/domain/models/routine'

import RoutineDto from './dto'

describe('RoutineDto', () => {
  const idValue = 'a9a9ca59-a0d5-4391-8e2d-309737569d65'
  const id = RoutineId.fromString(idValue).value as RoutineId
  const nameValue = 'name'
  const name = RoutineName.fromString(nameValue).value as RoutineName
  const descriptionValue = 'description'
  const description = RoutineDescription.fromString(descriptionValue)
    .value as RoutineDescription
  const dto = RoutineDto.fromRoutine(Routine.create({ description, id, name }))

  it.concurrent('has an id', () => {
    expect(dto).toHaveProperty('id')
  })

  it.concurrent('has a name', () => {
    expect(dto).toHaveProperty('name')
  })

  it.concurrent('has a description', () => {
    expect(dto).toHaveProperty('description')
  })

  it.concurrent('can be created from routine', () => {
    expect(dto.id).toBe(idValue)
    expect(dto.name).toBe(nameValue)
    expect(dto.description).toBe(descriptionValue)
  })

  it.concurrent('can be created from routine view', () => {
    const view = RoutineView.with({
      description: descriptionValue,
      id: idValue,
      name: nameValue,
    })
    const convertedDto = RoutineDto.fromRoutineView(view)

    expect(convertedDto.id).toBe(id.value)
    expect(convertedDto.name).toBe(name.value)
    expect(convertedDto.description).toBe(description.value)
  })
})
