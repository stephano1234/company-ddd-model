import Address from "../address.value-object";
import CustomerFactory from "./customer.factory";

describe('Customer Factory', () => {

  const id = 'id';
  const name = 'name';
  const address = new Address('street', 10, 'zip', 'city');

  it('should create a new active customer with the provided address, id and name when calling createActive.', () => {
    const customer = CustomerFactory.createActive(id, name, address);
    expect(customer.id).toBe(id);
    expect(customer.name).toBe(name);
    expect(customer.address).toBe(address);
    expect(customer.isActive).toBe(true);
    expect(customer.rewardPoints).toBe(0);
  });

});
