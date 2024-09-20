import { ZodError } from 'zod'
import { serverError } from './helpers/http'
import { HttpRequest } from './http-request'
import { HttpResponse } from './http-response'

export abstract class BaseController {
  abstract handle(httpRequest: HttpRequest): Promise<HttpResponse>

  async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      return await this.handle(httpRequest)
    } catch (error) {
      return serverError(error)
    }
  }
}
