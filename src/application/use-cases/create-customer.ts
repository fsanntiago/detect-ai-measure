import { Either, right } from '@/core/either'

import { CustomerRepository } from '../repositories/customer-repository'
import { Customer } from '@/entity/customer'

interface CustomerUseCaseRequest {
  id: string
}

type CustomerUseCaseResponse = Either<never, { customer: Customer }>

export class CreateCustomerUseCase {
  constructor(private customerRepository: CustomerRepository) {}
  async execute({
    id,
  }: CustomerUseCaseRequest): Promise<CustomerUseCaseResponse> {
    const customerCreated = await this.customerRepository.findById(id)

    if (customerCreated) {
      return right({ customer: customerCreated })
    }

    const newCustomer = Customer.create({})

    const customer = await this.customerRepository.create(newCustomer)

    return right({ customer })
  }
}
