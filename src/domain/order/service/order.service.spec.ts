import Customer from "../../customer/customer.entity";
import Item from "../item.entity";
import Order from "../order.entity";
import OrderService from "./order.service";
import Product from "../../product/product.entity";

const EMPTY = '';

describe('Order Service', () => {

  let validOrder: Order;
  const validId = 'id';
  const validCustomerId = 'customerId';
  let validCustomer: Customer;
  const validProduct = new Product('id', 'name', 10);
  const validItems = [
    new Item('id1', validProduct, 1),
    new Item('id2', validProduct, 1)
  ];

  beforeEach(() => {
    validCustomer = new Customer(validCustomerId, 'name');
    validOrder = OrderService.createOrderWithRewardPoints(validId, validCustomer, validItems);
  });

  it('should assign the id parameter to the id atribute of the returned order when calling createOrderWithRewardPoints.', () => {
    expect(validOrder.id).toBe(validId);
  });

  it('should assign the id of the customer parameter to the customerId atribute of the returned order when calling createOrderWithRewardPoints.', () => {
    expect(validOrder.customerId).toBe(validCustomerId);
  });

  it('should assign the items parameter to the items atribute of the returned order when calling createOrderWithRewardPoints.', () => {
    expect(validOrder.items.length).toBe(validItems.length);
    validOrder.items.forEach((item, i) => expect(item).toBe(validItems[i]));
  });

  it('should correctly calculate the total atribute of the returned order when calling createOrderWithRewardPoints.', () => {
    expect(validOrder.total).toBe(validItems.reduce((total, item) => total + item.total, 0));
  });

  it('should throw error when calling createOrderWithRewardPoints with an invalid id.', () => {
    expect(() => OrderService.createOrderWithRewardPoints(EMPTY, validCustomer, validItems)).toThrow('Id is required.');
  });

  it('should throw error when calling createOrderWithRewardPoints with an empty items list.', () => {
    expect(() => OrderService.createOrderWithRewardPoints(validId, validCustomer, [])).toThrow('Items are required.');
  });

  it('should correctly add the reward points of the customer parameter when calling createOrderWithRewardPoints.', () => {
    expect(validCustomer.rewardPoints).toBe(validItems.reduce((total, item) => total + item.total, 0));
  });

});
