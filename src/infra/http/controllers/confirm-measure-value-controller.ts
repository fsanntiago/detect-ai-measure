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
import { ConfirmMeasureValueUseCase } from '@/application/use-cases/confirm-measure-value'
import { MeasureNotFoundError } from '@/application/use-cases/errors/measure-not-found-error'
import { MeasureAlreadyConfirmedError } from '@/application/use-cases/errors/measure-already-confirmed'

const confirmMeasureValueBodySchema = z.object({
  measure_uuid: z.string(),
  confirmed_value: z.number(),
})

type ConfirmMeasureValueBodySchema = z.infer<
  typeof confirmMeasureValueBodySchema
>

export type ConfirmMeasureValueControllerRequest =
  HttpRequest<ConfirmMeasureValueBodySchema>

export type ConfirmMeasureValueControllerResponse = HttpResponse<
  InvalidRequestDataError | { success: boolean }
>

export class ConfirmMeasureValueController extends BaseController {
  constructor(private confirmMeasureValue: ConfirmMeasureValueUseCase) {
    super()
  }

  async handle(
    request: ConfirmMeasureValueControllerRequest
  ): Promise<ConfirmMeasureValueControllerResponse> {
    const { success, data, error } = confirmMeasureValueBodySchema.safeParse(
      request.body
    )

    if (!success) {
      console.error(error.format())
      return badRequest(new InvalidRequestDataError())
    }

    const { confirmed_value, measure_uuid } = data

    const result = await this.confirmMeasureValue.execute({
      measureId: measure_uuid,
      confirmedValue: confirmed_value,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case MeasureNotFoundError:
          return conflict(new MeasureNotFoundError())
        default:
          return badRequest(new MeasureAlreadyConfirmedError())
      }
    }

    return ok({ success: true })
  }
}
