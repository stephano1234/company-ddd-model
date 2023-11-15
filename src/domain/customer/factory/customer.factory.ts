import Address from "../address.value-object";
import Customer from "../customer.entity";

export default class CustomerFactory {

  public static createActive(id: string, name: string, address: Address): Customer {
    const customer = new Customer(id, name);
    customer.addOrChangeAddress(address);
    customer.activate();
    return customer;
  }

}
