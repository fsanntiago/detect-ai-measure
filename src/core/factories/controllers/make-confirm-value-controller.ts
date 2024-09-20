import { makeConfirmMeasureValueUseCase } from '../use-cases/make-confirm-measure-value-use-case'
import { ConfirmMeasureValueController } from '@/infra/http/controllers/confirm-measure-value-controller'

export function makeConfirmValueController() {
  const confirmMeasureValueUseCase = makeConfirmMeasureValueUseCase()

  return new ConfirmMeasureValueController(confirmMeasureValueUseCase)
}
