import { Measure } from '@/entity/measure'

export interface MeasureRepository {
  findByTypeOnMonth(type: MeasureType, date: Date): Promise<boolean>
  create(measure: Measure): Promise<Measure>
  findById(id: string): Promise<Measure | null>
  save(measure: Measure): Promise<Measure>
  fetchMeasureByCustomerIdAndMeasureType(
    customerId: string,
    measureType?: MeasureType
  ): Promise<Measure[] | null>
}
