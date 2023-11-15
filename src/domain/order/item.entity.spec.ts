import Item from "./item.entity";
import Product from "../product/product.entity";

const EMPTY = '';
const ZERO = 0;

describe('Item', () => {

  let validItem: Item;
  const validId = 'id';
  const validQuantity = 1;
  const validProduct = new Product('id', 'name', 10);

  beforeEach(() => {
    validItem = new Item(validId, validProduct, validQuantity);
  });

  it('should assign the id parameter to the id atribute when creating a new valid item.', () => {
    expect(validItem.id).toBe(validId);
  });

  it('should assign the id of the product parameter to the productId atribute when creating a new valid item.', () => {
    expect(validItem.productId).toBe(validProduct.id);
  });

  it('should assign the price of the product parameter to the price atribute when creating a new valid item.', () => {
    expect(validItem.price).toBe(validProduct.price);
  });

  it('should assign the quantity parameter to the quantity atribute when creating a new valid item.', () => {
    expect(validItem.quantity).toBe(validQuantity);
  });

  it('should correctly calculate the total atribute when creating a new valid item.', () => {
    expect(validItem.total).toBe(validProduct.price * validQuantity);
  });

  it('should throw error when creating a new item with an invalid id.', () => {
    expect(() => new Item(EMPTY, validProduct, validQuantity)).toThrow('Id is required.');
  });

  it('should throw error when creating a new item with an invalid quantity.', () => {
    expect(() => new Item(validId, validProduct, ZERO)).toThrow('Quantity must be greater than 0.');
  });

  it('should change the quantity when calling changeQuantity with a valid quantity parameter.', () => {
    const newQuantity = 20;
    validItem.changeQuantity(newQuantity);
    expect(validItem.quantity).toBe(newQuantity);
  });

  it('should correctly calculate the total when calling changeQuantity with a valid quantity parameter.', () => {
    const newQuantity = 20;
    validItem.changeQuantity(newQuantity);
    expect(validItem.quantity).toBe(newQuantity);
    expect(validItem.total).toBe(validProduct.price * newQuantity);
  });

  it('should throw error when calling changeQuantity with an invalid quantity parameter.', () => {
    expect(() => validItem.changeQuantity(ZERO)).toThrow('Quantity must be greater than 0.');
  });

});
