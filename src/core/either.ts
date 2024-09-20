// Error
export class Left<L, R> {
  readonly value: L

  constructor(value: L) {
    this.value = value
  }

  isRight(): this is Right<L, R> {
    return false
  }

  isLeft(): this is Left<L, R> {
    return true
  }
}

// Success
export class Right<L, R> {
  readonly value: R

  constructor(value: R) {
    this.value = value
  }

  isRight(): this is Right<L, R> {
    return true
  }

  isLeft(): this is Left<L, R> {
    return false
  }
}

export type Either<L, R> = Left<L, R> | Right<L, R>

/**
 * Constructs a new instance of Left containing the provided value
 *
 * @param value The value to be contained in the Left instance
 * @returns A new instance of Left(error) containing the provided value
 */
export const left = <L, R>(value: L): Either<L, R> => {
  return new Left(value)
}

/**
 * Constructs a new instance of Right containing the provided value
 *
 * @param value The value to be contained in the Right instance
 * @returns A new instance of Right(success) containing the provided value
 */
export const right = <L, R>(value: R): Either<L, R> => {
  return new Right(value)
}
