import { UploadImageController } from '@/infra/http/controllers/upload-image-controller'
import { makeUploadAndCreateMeasureUseCase } from '../use-cases/make-upload-and-create-measure-use-case'
import { makeCreateCustomerUseCase } from '../use-cases/make-create-customer-use-case'

export function makeUploadImageController() {
  const uploadAndCreateMeasureUseCase = makeUploadAndCreateMeasureUseCase()
  const createCustomerUseCase = makeCreateCustomerUseCase()

  return new UploadImageController(
    uploadAndCreateMeasureUseCase,
    createCustomerUseCase
  )
}
