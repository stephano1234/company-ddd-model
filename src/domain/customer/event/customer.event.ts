import Event from "../../shared/event/event.interface";
import Customer from "../customer.entity";

export default abstract class CustomerEvent extends Event<Customer> {

  constructor(customer: Customer) {
    super(customer);
  }

}
