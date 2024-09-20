import dayjs from 'dayjs'

import { MeasureRepository } from '@/application/repositories/measure-repository'

import { Measure } from '@/entity/measure'

export class InMemoryMeasureRepository implements MeasureRepository {
  public items: Measure[] = []

  async findByTypeOnMonth(type: string) {
    const measure = this.items.find(item => {
      const measureDate = dayjs(item.createdAt)
      const isSameMonth = measureDate.month() === dayjs().month()

      return item.type === type && isSameMonth
    })

    if (!measure) {
      return false
    }

    return true
  }

  async create(measure: Measure) {
    this.items.push(measure)

    return measure
  }
}
