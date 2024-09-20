import { UseCaseError } from '@/core/errors/use-case-error'

export class InvalidDataError extends UseCaseError {
  constructor(description?: string) {
    super('INVALID_DATA', description ?? 'Invalid data requested')
  }
}
