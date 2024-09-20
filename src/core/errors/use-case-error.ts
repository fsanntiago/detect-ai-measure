import { BaseError } from './base-error'

export class UseCaseError extends BaseError {
  constructor(errorCode: string, errorDescription: string) {
    super(errorCode, errorDescription)
  }
}
