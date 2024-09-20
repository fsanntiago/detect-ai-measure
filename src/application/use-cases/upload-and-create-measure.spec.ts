import { InMemoryMeasureRepository } from '@/test/repositories/in-memory-measure-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { UploadAndCreateMeasureUseCase } from './upload-and-create-measure'
import { ImageAnalyzer } from '../llm-service/Image-analyzer'
import { Gemini } from '@/infra/llm-service/gemini'

let inMemoryMeasureRepository: InMemoryMeasureRepository
let imageAnalyzer: ImageAnalyzer
let sut: UploadAndCreateMeasureUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    inMemoryMeasureRepository = new InMemoryMeasureRepository()
    imageAnalyzer = new Gemini()
    sut = new UploadAndCreateMeasureUseCase(
      inMemoryMeasureRepository,
      imageAnalyzer
    )
  })

  it('should be able to upload and create a measure', async () => {
    const result = await sut.execute({
      customerCode: '123',
      image:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
      measureDateTime: new Date(),
      measureType: 'WATER',
    })
    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      student: inMemoryMeasureRepository.items[0],
    })
  })

  // it('should not be able to authenticate with wrong email', async () => {
  //   await expect(() =>
  //     sut.execute({
  //       email: 'john@example.com',
  //       password: '123456',
  //     })
  //   ).rejects.toBeInstanceOf(InvalidCredentialsError)
  // })

  // it('should not be able to authenticate with wrong password', async () => {
  //   await userRepository.create({
  //     email: 'john@example.com',
  //     name: 'John',
  //     password_hash: await hash('123456', 6),
  //   })

  //   await expect(() =>
  //     sut.execute({
  //       email: 'john@example.com',
  //       password: '12345611',
  //     })
  //   ).rejects.toBeInstanceOf(InvalidCredentialsError)
  // })
})
