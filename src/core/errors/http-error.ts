import { BaseError } from './base-error'

export class HttpError extends BaseError {
  constructor({
    errorCode,
    errorDescription,
  }: {
    errorCode: string
    errorDescription: string
  }) {
    super(errorCode, errorDescription)
  }
}
