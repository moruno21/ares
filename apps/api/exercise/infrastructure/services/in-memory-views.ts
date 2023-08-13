import { Injectable } from '@nestjs/common'

import ExerciseView from '~/exercise/application/models/view'
import ExerciseViews from '~/exercise/application/services/views'
import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import Either from '~/shared/either'

@Injectable()
class InMemoryExerciseViews implements ExerciseViews {
  constructor(readonly views: ExerciseView[]) {}

  static withViews(views: ExerciseView[]) {
    return new InMemoryExerciseViews(views)
  }

  async add(view: ExerciseView): Promise<ExerciseView> {
    this.views.push(view)

    return view
  }

  async delete(id: string): Promise<void> {
    const index = this.views.findIndex((view) => view.id === id)

    if (index !== -1) this.views.splice(index, 1)
  }

  async getAll(): Promise<ExerciseView[]> {
    return this.views
  }

  async redescribe(id: string, description: string): Promise<void> {
    const index = this.views.findIndex((view) => view.id === id)

    if (index !== -1) {
      const redescribedExerciseView = { ...this.views[index], description }
      this.views[index] = redescribedExerciseView
    }
  }

  async rename(id: string, name: string): Promise<void> {
    const index = this.views.findIndex((view) => view.id === id)

    if (index !== -1) {
      const renamedExerciseView = { ...this.views[index], name }
      this.views[index] = renamedExerciseView
    }
  }

  async withId(id: string): Promise<Either<NotFoundExercise, ExerciseView>> {
    const foundView = this.views.find((view) => view.id === id)

    if (!foundView) return Either.left(NotFoundExercise.withId(id))

    return Either.right(ExerciseView.with(foundView))
  }

  async withName(
    name: string,
  ): Promise<Either<NotFoundExercise, ExerciseView>> {
    const foundView = this.views.find(
      (view) => view.name.toLowerCase() === name.toLowerCase(),
    )

    if (!foundView) return Either.left(NotFoundExercise.withName(name))

    return Either.right(ExerciseView.with(foundView))
  }
}

export default InMemoryExerciseViews
