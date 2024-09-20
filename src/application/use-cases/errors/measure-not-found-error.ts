import { UseCaseError } from '@/core/errors/use-case-error'

export class MeasureNotFoundError extends UseCaseError {
  constructor() {
    super('MEASURE_NOT_FOUND', 'Leitura do mês já realizada')
  }
}
