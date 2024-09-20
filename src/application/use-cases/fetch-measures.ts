import { Either, left, right } from '@/core/either'

import { MeasureRepository } from '../repositories/measure-repository'

import { MeasureNotFoundError } from './errors/measure-not-found-error'
import { MeasureAlreadyConfirmedError } from './errors/measure-already-confirmed'
import { Measure } from '@/entity/measure'

interface FetchMeasuresUseCaseRequest {
  customerId: string
  measureType?: MeasureType
}

type FetchMeasuresResponse = Either<
  MeasureNotFoundError | MeasureAlreadyConfirmedError,
  { measures: Measure[] }
>

export class FetchMeasuresUseCase {
  constructor(private measureRepository: MeasureRepository) {}

  async execute({
    customerId,
    measureType,
  }: FetchMeasuresUseCaseRequest): Promise<FetchMeasuresResponse> {
    const measures =
      await this.measureRepository.fetchMeasureByCustomerIdAndMeasureType(
        customerId,
        measureType
      )

    if (!measures) {
      return left(new MeasureNotFoundError())
    }

    return right({ measures })
  }
}
