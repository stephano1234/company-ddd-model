import { Sequelize } from "sequelize-typescript";
import OrderRepository from "../../../domain/order/repository/order.repository.interface";
import OrderRepositoryImpl from "./order.repository.impl";
import Order from "../../../domain/order/order.entity";
import OrderModel from "./order.repository.model";
import ItemModel from "./item.repository.model";
import ProductModel from "../product/product.repository.model";
import CustomerModel from "../customer/customer.repository.model";
import Customer from "../../../domain/customer/customer.entity";
import Item from "../../../domain/order/item.entity";
import Product from "../../../domain/product/product.entity";

describe('Order Repository', () => {

  const repository: OrderRepository = new OrderRepositoryImpl();
  let sequelize: Sequelize;
  const newValidOrderId = 'id';
  let newValidOrder: Order;
  const persistedCustomer = new Customer('id', 'name');
  const persistedProducts = [
    new Product('id1', 'name1', 10),
    new Product('id2', 'name2', 20),
    new Product('id3', 'name3', 30)
  ];

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    });
    sequelize.addModels([OrderModel, CustomerModel, ItemModel, ProductModel]);
    await sequelize.sync();
    await CustomerModel.create({
      id: persistedCustomer.id,
      name: persistedCustomer.name,
      active: persistedCustomer.isActive,
      rewardPoints: persistedCustomer.rewardPoints
    });
    const items: Item[] = [];
    for (let index = 0; index < persistedProducts.length; index++) {
      const product = persistedProducts[index]!;
      await ProductModel.create({
        id: product.id,
        name: product.name,
        price: product.price
      });
      const item = new Item(`id${index + 1}`, product, index + 1);
      items.push(item);
    }
    newValidOrder = new Order(newValidOrderId, persistedCustomer, items);
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should persist a new order when calling save.', async () => {
    await repository.save(newValidOrder);
    const orderModel = await OrderModel.findOne({
      where: { id: newValidOrderId },
      include: [ItemModel]
    });
    expect(orderModel?.toJSON()).toStrictEqual({
      id: newValidOrderId,
      customerId: newValidOrder.customerId,
      items: newValidOrder.items.map((item) => ({
        id: item.id,
        orderId: newValidOrderId,
        productId: item.productId,
        price: item.price,
        quantity: item.quantity,
        total: item.total
      })),
      total: newValidOrder.total
    });
  });

  it('should persist modifications in a order when calling update.', async () => {
    await repository.save(newValidOrder);
    newValidOrder.items.forEach(item => item.changeQuantity(item.quantity + 1));
    await repository.update(newValidOrder);
    const updatedOrderModel = await OrderModel.findOne({
      where: { id: newValidOrderId },
      include: [ItemModel]
    });
    expect(updatedOrderModel?.toJSON()).toStrictEqual({
      id: newValidOrderId,
      customerId: newValidOrder.customerId,
      items: newValidOrder.items.map((item) => ({
        id: item.id,
        orderId: newValidOrderId,
        productId: item.productId,
        price: item.price,
        quantity: item.quantity,
        total: item.total
      })),
      total: newValidOrder.total
    });
  });

  it('should retrieve the order with the corresponding id when calling findById.', async () => {
    await repository.save(newValidOrder);
    const retrievedOrder = await repository.findById(newValidOrderId);
    expect(retrievedOrder).toStrictEqual(newValidOrder);
  });

  it('should throw error when calling findById with an unexistent id.', async () => {
    await repository.save(newValidOrder);
    const unexistentId = 'unexistentId';
    expect(async () => {
      await repository.findById(unexistentId);
    }).rejects.toThrow(`Order with id ${unexistentId} was not found.`);
  });

  it('should retrieve the list of orders when calling findByFilter.', async () => {
    const orderList = [];
    for (let index = 1; index <= 10; index++) {
      const validOrder = new Order(
        `index${index}`,
        persistedCustomer,
        persistedProducts.map((product, i) => new Item(`id${index}${i + 1}`, product, index))
      );
      orderList.push(validOrder);
      await repository.save(validOrder);
    }
    const retrievedOrders = await repository.findByFilter();
    expect(retrievedOrders).toStrictEqual(orderList);
  });

});
