import { Measure } from '@/entity/measure'

export class MeasurePresenter {
  static toHTTP(measure: Measure) {
    return {
      image_url: measure.imageUrl ?? '',
      measure_value: measure.value,
      measure_uuid: measure.id.toString(),
    }
  }
}
