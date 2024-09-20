import { CreateCustomerUseCase } from '@/application/use-cases/create-customer'
import { PrismaCustomerRepository } from '@/infra/http/database/prisma/repositories/prisma-customer-repository'

export function makeCreateCustomerUseCase(): CreateCustomerUseCase {
  const customerRepository = new PrismaCustomerRepository()

  return new CreateCustomerUseCase(customerRepository)
}
