import { FetchMeasuresUseCase } from '@/application/use-cases/fetch-measures'
import { PrismaMeasureRepository } from '@/infra/http/database/prisma/repositories/prisma-measure-repository'

export function makeFetchMeasuresUseCase(): FetchMeasuresUseCase {
  const measureRepository = new PrismaMeasureRepository()

  return new FetchMeasuresUseCase(measureRepository)
}
