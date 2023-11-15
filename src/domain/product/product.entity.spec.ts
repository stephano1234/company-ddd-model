import Product from "./product.entity";

const EMPTY = '';
const NEGATIVE_ONE = -1;

describe('Product', () => {

  let validProduct: Product;
  const validId = 'id';
  const validName = 'name';
  const validPrice = 10;

  beforeEach(() => {
    validProduct = new Product(validId, validName, validPrice);
  });

  it('should assign the id parameter to the id atribute when creating a new valid product.', () => {
    expect(validProduct.id).toBe(validId);
  });

  it('should assign the name parameter to the name atribute when creating a new valid product.', () => {
    expect(validProduct.name).toBe(validName);
  });

  it('should assign the price parameter to the price atribute when creating a new valid product.', () => {
    expect(validProduct.price).toBe(validPrice);
  });

  it('should throw error when creating a new product with an invalid id.', () => {
    expect(() => new Product(EMPTY, validName, validPrice)).toThrow('Id is required.');
  });

  it('should throw error when creating a new product with an invalid name.', () => {
    expect(() => new Product(validId, EMPTY, validPrice)).toThrow('Name is required.');
  });

  it('should throw error when creating a new product with an invalid price.', () => {
    expect(() => new Product(validId, validName, NEGATIVE_ONE)).toThrow('Price must be greater than or equal to 0.');
  });

  it('should change the name when calling changeName with a valid name parameter.', () => {
    const newName = 'newName';
    validProduct.changeName(newName);
    expect(validProduct.name).toBe(newName);
  });

  it('should throw error when calling changeName with an invalid name parameter.', () => {
    expect(() => validProduct.changeName(EMPTY)).toThrow('Name is required.');
  });

  it('should change the price when calling changePrice with a valid price parameter.', () => {
    const newPrice = 20;
    validProduct.changePrice(newPrice);
    expect(validProduct.price).toBe(newPrice);
  });

  it('should throw error when calling changePrice with an invalid price parameter.', () => {
    expect(() => validProduct.changePrice(NEGATIVE_ONE)).toThrow('Price must be greater than or equal to 0.');
  });

});
