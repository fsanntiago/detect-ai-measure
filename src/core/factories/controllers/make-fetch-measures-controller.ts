import { makeFetchMeasuresUseCase } from '../use-cases/make-fetch-measures-use-case'

export function makeFetchMeasuresController() {
  const fetchMeasuresUseCase = makeFetchMeasuresUseCase()

  return new FetchMeasuresController(fetchMeasuresUseCase)
}
