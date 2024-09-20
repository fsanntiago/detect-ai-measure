import { User as PrismaUser, Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Customer } from '@/entity/customer'

export class PrismaCustomerMapper {
  static toDomain(raw: PrismaUser): Customer {
    return Customer.create({}, new UniqueEntityID(raw.id))
  }

  static toPrisma(customer: Customer): Prisma.UserUncheckedCreateInput {
    return {
      id: customer.id.toString(),
    }
  }
}
