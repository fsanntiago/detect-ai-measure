import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface MeasureProps {
  customerId: UniqueEntityID
  image: string
  imageUrl?: string | null
  type: MeasureType
  value: number
  confirmed?: Date | null
  createdAt: Date
  updatedAt?: Date | null
}

export class Measure extends Entity<MeasureProps> {
  get customerId() {
    return this.props.customerId
  }

  get image() {
    return this.props.image
  }

  get type() {
    return this.props.type
  }

  get value() {
    return this.props.value
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get imageUrl() {
    return this.props.imageUrl
  }

  set value(value: number) {
    this.props.value = value
  }

  get confirmed() {
    return this.props.confirmed
  }

  set confirm(confirmed: Date) {
    if (confirmed.getTimezoneOffset() > this.createdAt.getTimezoneOffset()) {
      this.props.confirmed = confirmed
    }
  }

  static create(
    props: Optional<MeasureProps, 'createdAt' | 'imageUrl'>,
    id?: UniqueEntityID
  ) {
    return new Measure(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )
  }
}
