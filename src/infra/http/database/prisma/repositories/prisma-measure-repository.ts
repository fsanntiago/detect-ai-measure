import { MeasureRepository } from '@/application/repositories/measure-repository'
import { Measure } from '@/entity/measure'
import dayjs from 'dayjs'
import { prisma } from '../prisma-service'
import { PrismaMeasureMapper } from '../mappers/prisma-measure-mapper'

export class PrismaMeasureRepository implements MeasureRepository {
  async fetchMeasureByCustomerIdAndMeasureType(
    customerId: string,
    measureType?: MeasureType
  ): Promise<Measure[] | null> {
    const measures = await prisma.measure.findMany({
      where: {
        customerId,
        type: measureType,
      },
    })

    if (!measures) {
      return null
    }

    return measures.map(PrismaMeasureMapper.toDomain)
  }

  async findById(id: string): Promise<Measure | null> {
    const measure = await prisma.measure.findUnique({ where: { id } })

    if (!measure) {
      return null
    }

    return PrismaMeasureMapper.toDomain(measure)
  }

  async save(measure: Measure): Promise<Measure> {
    const data = PrismaMeasureMapper.toPrisma(measure)

    console.log(measure.confirmed)
    console.log(data.confirmedAt)

    const result = await prisma.measure.update({
      where: {
        id: measure.id.toString(),
      },
      data,
    })

    return PrismaMeasureMapper.toDomain(result)
  }

  async findByTypeOnMonth(type: MeasureType, date: Date): Promise<boolean> {
    const startOfMonth = dayjs(date).startOf('month').toDate()
    const endOfMonth = dayjs(date).endOf('month').toDate()

    const measure = await prisma.measure.findFirst({
      where: {
        type,
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    })

    if (!measure) {
      return false
    }

    return true
  }
  async create(measure: Measure): Promise<Measure> {
    const data = PrismaMeasureMapper.toPrisma(measure)

    const result = await prisma.measure.create({
      data,
    })

    return PrismaMeasureMapper.toDomain(result)
  }
}
