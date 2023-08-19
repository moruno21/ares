import RoutineView from '~/routine/application/models/view'
import RoutineDescription from '~/routine/domain/models/description'
import RoutineId from '~/routine/domain/models/id'
import RoutineName from '~/routine/domain/models/name'
import Routine from '~/routine/domain/models/routine'
import RoutineWorkout from '~/routine/domain/models/workout'
import UserId from '~/user/domain/models/id'

import RoutineDto from './dto'

describe('RoutineDto', () => {
  const idValue = 'a9a9ca59-a0d5-4391-8e2d-309737569d65'
  const id = RoutineId.fromString(idValue).value as RoutineId
  const nameValue = 'name'
  const name = RoutineName.fromString(nameValue).value as RoutineName
  const descriptionValue = 'description'
  const description = RoutineDescription.fromString(descriptionValue)
    .value as RoutineDescription
  const ownerIdValue = '62a1aecd-b6df-4436-8240-7795bb6000d5'
  const ownerId = UserId.fromString(ownerIdValue).value as UserId
  const workoutsValue = [
    {
      exerciseId: '303ce779-d987-470c-9ecc-28758498faa2',
      exerciseName: 'exerciseName',
      reps: 5,
      sets: 3,
    },
  ]
  const workouts = workoutsValue.map(
    (workoutValue) =>
      RoutineWorkout.fromValue(workoutValue).value as RoutineWorkout,
  )
  const dto = RoutineDto.fromRoutine(
    Routine.create({ description, id, name, ownerId, workouts }),
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

  it.concurrent('has an ownerId', () => {
    expect(dto).toHaveProperty('ownerId')
  })

  it.concurrent('has workouts', () => {
    expect(dto).toHaveProperty('workouts')
  })

  it.concurrent('can be created from routine', () => {
    expect(dto.id).toBe(idValue)
    expect(dto.name).toBe(nameValue)
    expect(dto.description).toBe(descriptionValue)
    expect(dto.ownerId).toBe(ownerIdValue)
    expect(dto.workouts).toStrictEqual(workoutsValue)
  })

  it.concurrent('can be created from routine view', () => {
    const view = RoutineView.with({
      description: descriptionValue,
      id: idValue,
      name: nameValue,
      ownerId: ownerIdValue,
      workouts: workoutsValue,
    })
    const convertedDto = RoutineDto.fromRoutineView(view)

    expect(convertedDto.id).toBe(id.value)
    expect(convertedDto.name).toBe(name.value)
    expect(convertedDto.description).toBe(description.value)
    expect(convertedDto.ownerId).toBe(ownerId.value)
    expect(convertedDto.workouts).toStrictEqual(
      workouts.map((workout) => workout.value),
    )
  })
})
