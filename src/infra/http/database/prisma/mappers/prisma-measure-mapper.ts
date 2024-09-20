import { Measure as PrismaMeasure, Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Measure } from '@/entity/measure'

export class PrismaMeasureMapper {
  static toDomain(raw: PrismaMeasure): Measure {
    return Measure.create(
      {
        customerId: new UniqueEntityID(raw.customerId),
        image: raw.image,
        type: raw.type,
        value: raw.value.toNumber(),
        confirmed: raw.confirmedAt,
        createdAt: raw.createdAt,
        imageUrl: raw.imageUrl,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id)
    )
  }

  static toPrisma(measure: Measure): Prisma.MeasureUncheckedCreateInput {
    return {
      id: measure.id.toString(),
      customerId: measure.customerId.toString(),
      image: measure.image,
      value: measure.value,
      type: measure.type,
      confirmedAt: measure.confirmed,
      imageUrl: measure.imageUrl,
      updatedAt: measure.updatedAt,
      createdAt: measure.createdAt,
    }
  }
}
