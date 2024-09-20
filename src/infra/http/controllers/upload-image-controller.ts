import { UploadAndCreateMeasureUseCase } from '@/application/use-cases/upload-and-create-measure'
import { BaseController } from '../base-controller'
import { z } from 'zod'
import { HttpRequest } from '../http-request'
import { InvalidRequestDataError } from '../errors/invalid-request-data-error'
import { badRequest, conflict, ok } from '../helpers/http'
import { HttpResponse } from '../http-response'
import { DoubleReportError } from '@/application/use-cases/errors/double-report.error'
import { HttpError } from '@/core/errors/http-error'
import { MeasurePresenter } from '../presenters/measure-presenter'
import { CreateCustomerUseCase } from '@/application/use-cases/create-customer'

const uploadImageBodySchema = z.object({
  image: z.string(),
  customer_code: z.string(),
  measure_datetime: z.preprocess(arg => {
    if (typeof arg === 'string' || arg instanceof Date) {
      return new Date(arg)
    }
    return arg
  }, z.date()),
  measure_type: z.enum(['WATER', 'GAS']),
})

type UploadImageBodySchema = z.infer<typeof uploadImageBodySchema>

export type UploadImageControllerRequest = HttpRequest<UploadImageBodySchema>

export type UploadImageControllerResponse = HttpResponse<
  | InvalidRequestDataError
  | { image_url: string; measure_value: number; measure_uuid: string }
>

export class UploadImageController extends BaseController {
  constructor(
    private uploadAndCreateMeasure: UploadAndCreateMeasureUseCase,

    private createCustomer: CreateCustomerUseCase
  ) {
    super()
  }

  async handle(
    request: UploadImageControllerRequest
  ): Promise<UploadImageControllerResponse> {
    const { success, data, error } = uploadImageBodySchema.safeParse(
      request.body
    )

    if (!success) {
      console.error(error.format())
      return badRequest(new InvalidRequestDataError())
    }

    const { image, customer_code, measure_datetime, measure_type } = data

    const resultCustomer = await this.createCustomer.execute({
      id: customer_code,
    })

    const customer = resultCustomer.value.customer

    const result = await this.uploadAndCreateMeasure.execute({
      customerCode: customer.id.toString(),
      image: image,
      measureDateTime: measure_datetime,
      measureType: measure_type,
    })

    if (result.isLeft()) {
      const error = result.value

      const httpError = new HttpError({
        errorCode: error.errorCode,
        errorDescription: error.errorDescription,
      })

      switch (error.constructor) {
        case DoubleReportError:
          return conflict(httpError)
        default:
          return badRequest(httpError)
      }
    }

    const measure = result.value.measure

    return ok(MeasurePresenter.toHTTP(measure))
  }
}
