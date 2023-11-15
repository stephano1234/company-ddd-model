import Order from "../../../domain/order/order.entity";
import OrderRepository from "../../../domain/order/repository/order.repository.interface";
import OrderAssembler from "../shared/assembler/order.repository.assembler";
import CustomerModel from "../customer/customer.repository.model";
import ProductModel from "../product/product.repository.model";
import ItemModel from "./item.repository.model";
import OrderModel from "./order.repository.model";

export default class OrderRepositoryImpl implements OrderRepository {

  public async save(order: Order): Promise<void> {
    await OrderModel.create({
      id: order.id,
      customerId: order.customerId,
      items: order.items.map((item) => ({
        id: item.id,
        price: item.price,
        productId: item.productId,
        quantity: item.quantity,
        total: item.total
      })),
      total: order.total
    }, { include: [ItemModel] });
  }

  public async update(order: Order): Promise<void> {
    for (let item of order.items) {
      await ItemModel.update({
        price: item.price,
        quantity: item.quantity,
        total: item.total
      }, { where: { id: item.id } })
    }
    await OrderModel.update({
      total: order.total
    }, { where: { id: order.id } });
  }

  public async findById(id: string): Promise<Order> {
    let orderModel: OrderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: { id },
        include: [
          CustomerModel,
          { model: ItemModel, include: [ProductModel] }
        ],
        rejectOnEmpty: true
      });
    } catch {
      throw new Error(`Order with id ${id} was not found.`);
    }
    return OrderAssembler.toOrder(orderModel);
  }

  public async findByFilter(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: [
        CustomerModel,
        { model: ItemModel, include: [ProductModel] }
      ],
    });
    return orderModels.map(OrderAssembler.toOrder);
  }

}
