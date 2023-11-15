import Customer from "../../customer/customer.entity";
import Item from "../item.entity";
import Order from "../order.entity";

export default class OrderService {

  public static createOrderWithRewardPoints(id: string, customer: Customer, items: Item[]): Order {
    const order = new Order(id, customer, items);
    customer.addRewardPoints(order.total);
    return order;
  }

}
