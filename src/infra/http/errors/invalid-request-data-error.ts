import { HttpError } from '@/core/errors/http-error'

export class InvalidRequestDataError extends HttpError {
  constructor() {
    super({
      errorCode: 'INVALID_DATA',
      errorDescription: 'Invalid request data',
    })
  }
}
