import ExerciseView from '~/exercise/application/models/view'
import ExerciseDescription from '~/exercise/domain/models/description'
import Exercise from '~/exercise/domain/models/exercise'
import ExerciseId from '~/exercise/domain/models/id'
import ExerciseName from '~/exercise/domain/models/name'

import ExerciseDto from './dto'

describe('ExerciseDto', () => {
  const idValue = '5d289d79-c53e-4920-bc3c-6455855b42fe'
  const id = ExerciseId.fromString(idValue).value as ExerciseId
  const nameValue = 'name'
  const name = ExerciseName.fromString(nameValue).value as ExerciseName
  const descriptionValue = 'description'
  const description = ExerciseDescription.fromString(descriptionValue)
    .value as ExerciseDescription
  const dto = ExerciseDto.fromExercise(
    Exercise.create({ description, id, name }),
  )

  it.concurrent('has an id', () => {
    expect(dto).toHaveProperty('id')
  })

  it.concurrent('has a name', () => {
    expect(dto).toHaveProperty('name')
  })

  it.concurrent('has a description', () => {
    expect(dto).toHaveProperty('description')
  })

  it.concurrent('can be created from exercise', () => {
    expect(dto.id).toBe(idValue)
    expect(dto.name).toBe(nameValue)
    expect(dto.description).toBe(descriptionValue)
  })

  it.concurrent('can be created from exercise view', () => {
    const view = ExerciseView.with({
      description: descriptionValue,
      id: idValue,
      name: nameValue,
    })
    const convertedDto = ExerciseDto.fromExerciseView(view)

    expect(convertedDto.id).toBe(id.value)
    expect(convertedDto.name).toBe(name.value)
    expect(convertedDto.description).toBe(description.value)
  })
})
