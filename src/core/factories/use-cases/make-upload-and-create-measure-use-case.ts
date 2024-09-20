import { UploadAndCreateMeasureUseCase } from '@/application/use-cases/upload-and-create-measure'
import { PrismaMeasureRepository } from '@/infra/http/database/prisma/repositories/prisma-measure-repository'
import { Gemini } from '@/infra/llm-service/gemini'

export function makeUploadAndCreateMeasureUseCase(): UploadAndCreateMeasureUseCase {
  const measureRepository = new PrismaMeasureRepository()
  const imageAnalyzer = new Gemini()

  return new UploadAndCreateMeasureUseCase(measureRepository, imageAnalyzer)
}
