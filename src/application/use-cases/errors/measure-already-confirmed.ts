import { UseCaseError } from '@/core/errors/use-case-error'

export class MeasureAlreadyConfirmedError extends UseCaseError {
  constructor() {
    super('CONFIRMATION_DUPLICATE', 'Leitura do mês já realizada')
  }
}
