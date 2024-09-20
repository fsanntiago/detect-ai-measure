import { UseCaseError } from '@/core/errors/use-case-error'

export class DoubleReportError extends UseCaseError {
  constructor(description?: string) {
    super('DOUBLE_REPORT', description ?? 'Leitura do mês já realizada')
  }
}
