import { v4 as uuid, validate, version } from 'uuid'

type Uuid = string

const Uuid = {
  generate: (): Uuid => uuid(),
  validate: (value: string): boolean => validate(value) && version(value) === 4,
} as const

export default Uuid
