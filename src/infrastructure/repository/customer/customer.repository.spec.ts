import { Sequelize } from "sequelize-typescript";
import Address from "../../../domain/customer/address.value-object";
import Customer from "../../../domain/customer/customer.entity";
import CustomerModel from "./customer.repository.model";
import CustomerRepository from "../../../domain/customer/repository/customer.repository.interface";
import CustomerRepositoryImpl from "./customer.repository.impl";

describe('Customer Repository', () => {

  const repository: CustomerRepository = new CustomerRepositoryImpl();
  let sequelize: Sequelize;
  const newValidCustomerId = 'id';
  let newValidCustomer: Customer;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    });
    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
    newValidCustomer = new Customer(newValidCustomerId, 'name');
    newValidCustomer.addOrChangeAddress(new Address('street', 10, 'zip', 'city'));
    newValidCustomer.addRewardPoints(10);
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should persist a new customer when calling save.', async () => {
    await repository.save(newValidCustomer);
    const customerModel = await CustomerModel.findOne({ where: { id: newValidCustomerId } });
    expect(customerModel?.toJSON()).toStrictEqual({
      id: newValidCustomerId,
      name: newValidCustomer.name,
      street: newValidCustomer.address?.street,
      number: newValidCustomer.address?.number,
      zip: newValidCustomer.address?.zip,
      city: newValidCustomer.address?.city,
      active: newValidCustomer.isActive,
      rewardPoints: newValidCustomer.rewardPoints
    });
  });

  it('should persist modifications in a customer when calling update.', async () => {
    await repository.save(newValidCustomer);
    newValidCustomer.changeName('updatedName');
    newValidCustomer.addOrChangeAddress(new Address('updatedStreet', 20, 'updatedZip', 'updatedCity'));
    newValidCustomer.deactivate();
    newValidCustomer.addRewardPoints(10);
    await repository.update(newValidCustomer);
    const updatedCustomerModel = await CustomerModel.findOne({ where: { id: newValidCustomerId } });
    expect(updatedCustomerModel?.toJSON()).toStrictEqual({
      id: newValidCustomerId,
      name: newValidCustomer.name,
      street: newValidCustomer.address?.street,
      number: newValidCustomer.address?.number,
      zip: newValidCustomer.address?.zip,
      city: newValidCustomer.address?.city,
      active: newValidCustomer.isActive,
      rewardPoints: newValidCustomer.rewardPoints
    });
  });

  it('should retrieve the customer with the corresponding id when calling findById.', async () => {
    await repository.save(newValidCustomer);
    const retrievedCustomer = await repository.findById(newValidCustomerId);
    expect(retrievedCustomer).toStrictEqual(newValidCustomer);
  });

  it('should retrieve the customer with an empty address and the corresponding id when calling findById.', async () => {
    newValidCustomer.clearAddress();
    await repository.save(newValidCustomer);
    const retrievedCustomer = await repository.findById(newValidCustomerId);
    expect(retrievedCustomer).toStrictEqual(newValidCustomer);
  });

  it('should throw error when calling findById with an unexistent id.', async () => {
    await repository.save(newValidCustomer);
    const unexistentId = 'unexistentId';
    expect(async () => {
      await repository.findById(unexistentId);
    }).rejects.toThrow(`Customer with id ${unexistentId} was not found.`);
  });

  it('should retrieve the list of customers when calling findByFilter.', async () => {
    const customerList = [];
    for (let index = 1; index <= 10; index++) {
      const validCustomer = new Customer(`index${index}`, `name${index}`);
      validCustomer.addOrChangeAddress(new Address(`street${index}`, index, `zip${index}`, `city${index}`));
      validCustomer.addRewardPoints(index);
      customerList.push(validCustomer);
      await repository.save(validCustomer);
    }
    const retrievedCustomers = await repository.findByFilter();
    expect(retrievedCustomers).toStrictEqual(customerList);
  });

});
