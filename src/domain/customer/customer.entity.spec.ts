import Address from "./address.value-object";
import Customer from "./customer.entity";

const EMPTY = '';

describe('Customer', () => {

  let validCustomer: Customer;
  const validId = 'id';
  const validName = 'name';
  const validAddress = new Address('street', 10, 'zip', 'city');

  beforeEach(() => {
    validCustomer = new Customer(validId, validName);
  });

  it('should assign the id parameter to the id atribute when creating a new valid customer.', () => {
    expect(validCustomer.id).toBe(validId);
  });

  it('should assign the name parameter to the name atribute when creating a new valid customer.', () => {
    expect(validCustomer.name).toBe(validName);
  });

  it('should clear the address of the customer when creating a new valid customer.', () => {
    expect(validCustomer.address).toBe(null);
  });

  it('should deactivate the customer when creating a new valid customer.', () => {
    expect(validCustomer.isActive).toBe(false);
  });

  it('should clear the reward points of the customer when creating a new valid customer.', () => {
    expect(validCustomer.rewardPoints).toBe(0);
  });

  it('should throw error when creating a new customer with an invalid id.', () => {
    expect(() => new Customer(EMPTY, validName)).toThrow('Id is required.');
  });

  it('should throw error when creating a new customer with an invalid name.', () => {
    expect(() => new Customer(validId, EMPTY)).toThrow('Name is required.');
  });

  it('should change the name when calling changeName with a valid name parameter.', () => {
    const newName = 'newName';
    validCustomer.changeName(newName);
    expect(validCustomer.name).toBe(newName);
  });

  it('should throw error when calling changeName with an invalid name parameter.', () => {
    expect(() => validCustomer.changeName(EMPTY)).toThrow('Name is required.');
  });

  it('should add the address when calling addOrChangeAddress with an address parameter.', () => {
    validCustomer.addOrChangeAddress(validAddress);
    expect(validCustomer.address).toBe(validAddress);
  });

  it('should change the address when calling addOrChangeAddress with an address parameter.', () => {
    validCustomer.addOrChangeAddress(validAddress);
    expect(validCustomer.address).toBe(validAddress);
    const newAddress = new Address('newStreet', 100, 'newZip', 'newCity');
    validCustomer.addOrChangeAddress(newAddress);
    expect(validCustomer.address).toBe(newAddress);
  });

  it('should clear the address when calling clearAddress.', () => {
    validCustomer.addOrChangeAddress(validAddress);
    expect(validCustomer.address).toBe(validAddress);
    validCustomer.clearAddress();
    expect(validCustomer.address).toBe(null);
  });

  it('should activate the customer when calling activate on a customer with an address.', () => {
    validCustomer.addOrChangeAddress(validAddress);
    expect(validCustomer.address).toBe(validAddress);
    validCustomer.activate();
    expect(validCustomer.isActive).toBe(true);
  });

  it('should throw error when calling activate on a customer without an address.', () => {
    expect(() => validCustomer.activate()).toThrow('Address is required for activating.');
  });

  it('should deactivate the customer when calling deactivate on an active customer.', () => {
    validCustomer.addOrChangeAddress(validAddress);
    expect(validCustomer.address).toBe(validAddress);
    validCustomer.activate();
    expect(validCustomer.isActive).toBe(true);
    validCustomer.deactivate();
    expect(validCustomer.isActive).toBe(false);
  });

  it('should add reward points when calling addRewardPoints with the quantity of points.', () => {
    validCustomer.addRewardPoints(10);
    expect(validCustomer.rewardPoints).toBe(10);
    validCustomer.addRewardPoints(10);
    expect(validCustomer.rewardPoints).toBe(20);
    validCustomer.addRewardPoints(10);
    expect(validCustomer.rewardPoints).toBe(30);
    validCustomer.addRewardPoints(10);
    expect(validCustomer.rewardPoints).toBe(40);
    validCustomer.addRewardPoints(10);
    expect(validCustomer.rewardPoints).toBe(50);
  });

  it('should clear the reward points when calling clearRewardPoints.', () => {
    validCustomer.addRewardPoints(10);
    expect(validCustomer.rewardPoints).toBe(10);
    validCustomer.clearRewardPoints();
    expect(validCustomer.rewardPoints).toBe(0);
  });

});
