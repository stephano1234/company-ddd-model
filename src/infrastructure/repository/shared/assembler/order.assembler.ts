import Item from "../../../../domain/order/item.entity";
import Order from "../../../../domain/order/order.entity";
import ItemModel from "../../order/item.repository.model";
import OrderModel from "../../order/order.repository.model";
import CustomerAssembler from "./customer.assembler";
import ProductAssembler from "./product.assembler";

export default class OrderAssembler {

  public static toOrder(orderModel: OrderModel): Order {
    let order: Order;
    try {
      order = new Order(
        orderModel.id,
        CustomerAssembler.toCustomer(orderModel.customer),
        orderModel.items.map(OrderAssembler.toItem)
      );
    } catch (error) {
      throw error;
    }
    return order;
  }

  public static toItem(itemModel: ItemModel): Item {
    let item: Item;
    try {
      item = new Item(
        itemModel.id,
        ProductAssembler.toProduct(itemModel.product),
        itemModel.quantity
      );
    } catch (error) {
      throw error;
    }
    return item;
  }

}
