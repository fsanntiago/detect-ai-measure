import { BaseController } from '../base-controller'
import { z } from 'zod'
import { HttpRequest } from '../http-request'
import { InvalidRequestDataError } from '../errors/invalid-request-data-error'
import { badRequest, conflict, ok } from '../helpers/http'
import { HttpResponse } from '../http-response'

import { MeasureNotFoundError } from '@/application/use-cases/errors/measure-not-found-error'
import { MeasureAlreadyConfirmedError } from '@/application/use-cases/errors/measure-already-confirmed'
import { FetchMeasuresUseCase } from '@/application/use-cases/fetch-measures'

const fetchMeasuresParamsSchema = z.object({
  customerId: z.string(),
})

const fetchMeasuresQuerySchema = z.object({
  measure_type: z.enum(['WATER', 'GAS']).optional(),
})

type FetchMeasuresParamsSchema = z.infer<typeof fetchMeasuresParamsSchema>
type FetchMeasuresQuerySchema = z.infer<typeof fetchMeasuresQuerySchema>

export type FetchMeasuresControllerRequest = HttpRequest<
  never,
  FetchMeasuresParamsSchema,
  FetchMeasuresQuerySchema
>

export type FetchMeasuresControllerResponse = HttpResponse<
  InvalidRequestDataError | { success: boolean }
>

export class FetchMeasuresController extends BaseController {
  constructor(private fetchMeasures: FetchMeasuresUseCase) {
    super()
  }

  async handle(
    request: FetchMeasuresControllerRequest
  ): Promise<FetchMeasuresControllerResponse> {
    const fetchMeasuresParamsValidation = fetchMeasuresParamsSchema.safeParse(
      request.params
    )

    const fetchMeasuresQuerySchemaValidation =
      fetchMeasuresQuerySchema.safeParse(request.query)

    if (
      !fetchMeasuresParamsValidation.success ||
      !fetchMeasuresQuerySchemaValidation.success
    ) {
      return badRequest(new InvalidRequestDataError())
    }

    const {
      data: { customerId },
    } = fetchMeasuresParamsValidation
    const {
      data: { measure_type },
    } = fetchMeasuresQuerySchemaValidation

    const result = await this.fetchMeasures.execute({
      customerId,
      measureType: measure_type,
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
