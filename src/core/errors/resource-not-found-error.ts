import { UseCaseError } from '@/core/errors/use-case-error'

export class ResourceNotFoundError extends UseCaseError {
  constructor() {
    super('Not found', 'Resource not found')
  }
}
