import { HttpError } from '@/core/errors/http-error'
import { ServerError } from '../errors/server-error'
import { HttpResponse } from '../http-response'

export const ok = <T = any>(body: T): HttpResponse<T> => ({
  statusCode: 200,
  body,
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
})

export const badRequest = (error: HttpError): HttpResponse<HttpError> => ({
  statusCode: 400,
  body: error,
})

export const unauthorized = (error: HttpError): HttpResponse<HttpError> => ({
  statusCode: 401,
  body: error,
})

export const forbidden = (error: HttpError): HttpResponse<HttpError> => ({
  statusCode: 403,
  body: error,
})

export const notFound = (error: HttpError): HttpResponse<HttpError> => ({
  statusCode: 404,
  body: error,
})

export const conflict = (error: HttpError): HttpResponse<HttpError> => ({
  statusCode: 409,
  body: error,
})

export const serverError = (
  error?: HttpError | unknown
): HttpResponse<Error> => {
  const stack = error instanceof Error ? error.stack : undefined
  return {
    statusCode: 500,
    body: new ServerError(stack),
  }
}
