import { randomUUID } from 'node:crypto'
import { Either, left, right } from '@/core/either'
import { MeasureRepository } from '../repositories/measure-repository'
import { isValidImageBase64 } from '@/core/utils/validate-base64-image'
import { InvalidDataError } from './errors/invalid-data-error'
import { DoubleReportError } from './errors/double-report.error'
import { Measure } from '@/entity/measure'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ImageAnalyzer } from '../llm-service/Image-analyzer'

interface UploadAndCreateMeasureUseCaseRequest {
  image: string
  customerCode: string
  measureDateTime: Date
  measureType: MeasureType
}

type UploadAndCreateMeasureUseCaseResponse = Either<
  InvalidDataError | DoubleReportError,
  { measure: Measure }
>

export class UploadAndCreateMeasureUseCase {
  constructor(
    private measureRepository: MeasureRepository,
    private imageAnalyzer: ImageAnalyzer
  ) {}
  async execute({
    image,
    customerCode,
    measureDateTime,
    measureType,
  }: UploadAndCreateMeasureUseCaseRequest): Promise<UploadAndCreateMeasureUseCaseResponse> {
    const isBase64 = isValidImageBase64(image)

    if (!isBase64) {
      throw left(new InvalidDataError())
    }

    const hasDuplicateOnTheCurrentMonth =
      await this.measureRepository.findByTypeOnMonth(
        measureType,
        measureDateTime
      )

    if (hasDuplicateOnTheCurrentMonth) {
      throw left(new DoubleReportError())
    }

    const measureValue = await this.imageAnalyzer.analyze(image)

    const imageUrl = `http://localhost:3333/upload/${randomUUID()}`

    const measure = Measure.create({
      customerId: new UniqueEntityID(customerCode),
      image: image,
      type: measureType,
      imageUrl: imageUrl,
      value: Number(measureValue),
      createdAt: new Date(measureDateTime),
    })

    const measureCreated = await this.measureRepository.create(measure)

    console.log(measureCreated)

    return right({ measure: measureCreated })
  }
}
