import { ConfirmMeasureValueUseCase } from '@/application/use-cases/confirm-measure-value'
import { PrismaMeasureRepository } from '@/infra/http/database/prisma/repositories/prisma-measure-repository'

export function makeConfirmMeasureValueUseCase(): ConfirmMeasureValueUseCase {
  const measureRepository = new PrismaMeasureRepository()

  return new ConfirmMeasureValueUseCase(measureRepository)
}
