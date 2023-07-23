import Either from '~/shared/either'

import NotFoundRoutine from '../exceptions/not-found'
import RoutineId from '../models/id'
import Routine from '../models/routine'

type Routines = Readonly<{
  findWithId(routineId: RoutineId): Promise<Either<NotFoundRoutine, Routine>>
  save(routine: Routine): Routine
}>

const Routines = 'Routines' as const

export default Routines
