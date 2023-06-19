import NameType from '~/shared/name-type'

const left = 'left'

type Left<Value> = NameType<{ value: Value }, typeof left>

const right = 'right'

type Right<Value> = NameType<{ value: Value }, typeof right>

type Either<L, R> = Left<L> | Right<R>

const Either = {
  isLeft: <L, R>(value: Either<L, R>): value is Left<L> =>
    value.__name__ === left,
  isRight: <L, R>(value: Either<L, R>): value is Right<R> =>
    value.__name__ === right,
  left: <L>(value: L): Left<L> => ({
    __name__: left,
    value,
  }),
  right: <R>(value: R): Right<R> => ({
    __name__: right,
    value,
  }),
} as const

export default Either
