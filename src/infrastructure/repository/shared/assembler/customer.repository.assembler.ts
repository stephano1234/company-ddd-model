import Address from "../../../../domain/customer/address.value-object";
import Customer from "../../../../domain/customer/customer.entity";
import CustomerModel from "../../customer/customer.repository.model";

export default class CustomerAssembler {

  public static toCustomer(customerModel: CustomerModel): Customer {
    let customer: Customer;
    try {
      customer = new Customer(customerModel.id, customerModel.name);
      try {
        const address = new Address(
          customerModel.street ?? '',
          customerModel.number ?? -1,
          customerModel.zip ?? '',
          customerModel.city ?? ''
        );
        customer.addOrChangeAddress(address);
      } catch {
        customer.clearAddress();
      }
      if (customerModel.active) {
        customer.activate();
      }
      customer.addRewardPoints(customerModel.rewardPoints);
    } catch (error) {
      throw error;
    }
    return customer;
  }

}
