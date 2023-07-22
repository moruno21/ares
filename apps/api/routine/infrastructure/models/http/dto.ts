import { ApiProperty } from '@nestjs/swagger'

import RoutineView from '~/routine/application/models/view'
import Routine from '~/routine/domain/models/routine'

class RoutineDto {
  @ApiProperty()
  readonly id: string

  @ApiProperty()
  readonly description: string

  @ApiProperty()
  readonly name: string

  private constructor(id: string, description: string, name: string) {
    this.id = id
    this.name = name
    this.description = description
  }

  static fromRoutine({ description, id, name }: Routine): RoutineDto {
    return new this(id.value, description.value, name.value)
  }

  static fromRoutineView({ description, id, name }: RoutineView): RoutineDto {
    return new this(id, description, name)
  }
}

export default RoutineDto
