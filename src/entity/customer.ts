import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface CustomerProps {}

export class Customer extends Entity<CustomerProps> {
  static create(props: CustomerProps, id?: UniqueEntityID) {
    return new Customer(
      {
        ...props,
      },
      id
    )
  }
}
