import Either from '~/shared/either'

import NotFoundRoutine from '../exceptions/not-found'
import RoutineId from '../models/id'
import Routine from '../models/routine'

type Routines = Readonly<{
  save(routine: Routine): Routine
  withId(routineId: RoutineId): Promise<Either<NotFoundRoutine, Routine>>
}>

const Routines = 'Routines' as const

export default Routines
