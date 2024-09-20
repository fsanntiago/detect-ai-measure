import { UseCaseError } from '@/core/errors/use-case-error'

export class CustomerAlreadyExistsError extends UseCaseError {
  constructor(identifier: string) {
    super('Customer already exists', `Customer "${identifier}" already exists.`)
  }
}
