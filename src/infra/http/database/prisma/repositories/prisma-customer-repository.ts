import { CustomerRepository } from '@/application/repositories/customer-repository'
import { Customer } from '@/entity/customer'
import { prisma } from '../prisma-service'
import { PrismaCustomerMapper } from '../mappers/prisma-customer-mapper copy'

export class PrismaCustomerRepository implements CustomerRepository {
  async findById(id: string): Promise<Customer | null> {
    const customer = await prisma.user.findUnique({ where: { id } })

    if (!customer) {
      return null
    }

    return PrismaCustomerMapper.toDomain(customer)
  }

  async create(customer: Customer): Promise<Customer> {
    const data = PrismaCustomerMapper.toPrisma(customer)

    const result = await prisma.user.create({
      data,
    })

    return PrismaCustomerMapper.toDomain(result)
  }
}
