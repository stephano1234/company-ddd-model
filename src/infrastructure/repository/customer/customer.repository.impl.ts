import Customer from "../../../domain/customer/customer.entity";
import CustomerRepository from "../../../domain/customer/repository/customer.repository.interface";
import CustomerAssembler from "../shared/assembler/customer.repository.assembler";
import CustomerModel from "./customer.repository.model";

export default class CustomerRepositoryImpl implements CustomerRepository {

  public async save(customer: Customer): Promise<void> {
    await CustomerModel.create({
      id: customer.id,
      name: customer.name,
      street: customer.address?.street,
      number: customer.address?.number,
      zip: customer.address?.zip,
      city: customer.address?.city,
      active: customer.isActive,
      rewardPoints: customer.rewardPoints
    });
  }

  public async update(customer: Customer): Promise<void> {
    await CustomerModel.update({
      name: customer.name,
      street: customer.address?.street,
      number: customer.address?.number,
      zip: customer.address?.zip,
      city: customer.address?.city,
      active: customer.isActive,
      rewardPoints: customer.rewardPoints
    }, { where: { id: customer.id } });
  }

  public async findById(id: string): Promise<Customer> {
    let customerModel: CustomerModel;
    try {
      customerModel = await CustomerModel.findOne({ where: { id }, rejectOnEmpty: true });
    } catch {
      throw new Error(`Customer with id ${id} was not found.`);
    }
    return CustomerAssembler.toCustomer(customerModel);
  }

  public async findByFilter(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();
    return customerModels.map(CustomerAssembler.toCustomer);
  }

}
