import { Either, left, right } from '@/core/either'

import { MeasureRepository } from '../repositories/measure-repository'

import { MeasureNotFoundError } from './errors/measure-not-found-error'
import { MeasureAlreadyConfirmedError } from './errors/measure-already-confirmed'
import { Measure } from '@/entity/measure'

interface ConfirmMeasureValueUseCaseRequest {
  measureId: string
  confirmedValue: number
}

type ConfirmMeasureValueResponse = Either<
  MeasureNotFoundError | MeasureAlreadyConfirmedError,
  { measure: Measure }
>

export class ConfirmMeasureValueUseCase {
  constructor(private measureRepository: MeasureRepository) {}


  async execute({
    measureId,
    confirmedValue,
  }: ConfirmMeasureValueUseCaseRequest): Promise<ConfirmMeasureValueResponse> {
    const measure = await this.measureRepository.findById(measureId)

    if (!measure) {
      return left(new MeasureNotFoundError())
    }

    if (measure.confirm) {
      return left(new MeasureAlreadyConfirmedError())
    }

    measure.confirm = new Date()

    measure.value = confirmedValue

    const measureConfirmed = await this.measureRepository.save(measure)

    return right({ measure: measureConfirmed })
  }
}
