import { useMemo } from 'react'

const useRoutines = () => {
  const routines = useMemo(
    () => [
      {
        description: 'Mock Routine description 1',
        id: 'routine1',
        name: 'Mock Routine 1',
      },
      {
        description: 'Mock Routine description 2',
        id: 'routine2',
        name: 'Mock Routine 2',
      },
      {
        description: 'Mock Routine description 3',
        id: 'routine3',
        name: 'Mock Routine 3',
      },
      {
        description: 'Mock Routine description 4',
        id: 'routine4',
        name: 'Mock Routine 4',
      },
    ],
    [],
  )

  return { routines }
}

export default useRoutines
