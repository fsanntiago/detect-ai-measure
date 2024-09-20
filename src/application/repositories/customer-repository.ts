import { Customer } from '@/entity/customer'

export interface CustomerRepository {
  findById(id: string): Promise<Customer | null>
  create(Customer: Customer): Promise<Customer>
}
