import Customer from "../customer/customer.entity";
import Item from "./item.entity";
import Order from "./order.entity";
import Product from "../product/product.entity";

const EMPTY = '';

describe('Order', () => {

  let validOrder: Order;
  const validId = 'id';
  const customer = new Customer('id', 'name');
  const product = new Product('id', 'name', 10);
  const items = [
    new Item('id1', product, 1),
    new Item('id2', product, 1)
  ];

  beforeEach(() => {
    validOrder = new Order(validId, customer, items);
  });

  it('should assign the id parameter to the id atribute when creating a new valid order.', () => {
    expect(validOrder.id).toBe(validId);
  });

  it('should assign the id of the customer parameter to the customerId atribute when creating a new valid order.', () => {
    expect(validOrder.customerId).toBe(customer.id);
  });

  it('should assign the items parameter to the items atribute when creating a new valid order.', () => {
    expect(validOrder.items.length).toBe(items.length);
    validOrder.items.forEach((item, i) => expect(item).toBe(items[i]));
  });

  it('should correctly calculate the total atribute when creating a new valid order.', () => {
    expect(validOrder.total).toBe(items.reduce((total, item) => total + item.total, 0));
  });

  it('should throw error when creating a new order with an invalid id.', () => {
    expect(() => new Order(EMPTY, customer, items)).toThrow('Id is required.');
  });

  it('should throw error when creating a new order with an empty items list.', () => {
    expect(() => new Order(validId, customer, [])).toThrow('Items are required.');
  });

  it('should correctly calculate the total when calling the changeQuantity method of an associated item.', () => {
    const firstItem = validOrder.items[0]!;
    firstItem.changeQuantity(firstItem.quantity + 1);
    expect(validOrder.total).toBe(items.reduce((total, item) => total + item.total, 0));
  });

});
