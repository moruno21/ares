import Routine from '../models/routine'

type Routines = Readonly<{
  save(routine: Routine): Routine
}>

const Routines = 'Routines' as const

export default Routines
