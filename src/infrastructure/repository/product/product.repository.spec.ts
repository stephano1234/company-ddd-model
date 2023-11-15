import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/product.entity";
import ProductRepository from "../../../domain/product/repository/product.repository.interface";
import ProductModel from "./product.repository.model";
import ProductRepositoryImpl from "./product.repository.impl";

describe('Product Repository', () => {

  const repository: ProductRepository = new ProductRepositoryImpl();
  let sequelize: Sequelize;
  const newValidProductId = 'id';
  let newValidProduct: Product;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
    newValidProduct = new Product(newValidProductId, 'name', 10);
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should persist a new product when calling save.', async () => {
    await repository.save(newValidProduct);
    const productModel = await ProductModel.findOne({ where: { id: newValidProductId } });
    expect(productModel?.toJSON()).toStrictEqual({
      id: newValidProductId,
      name: newValidProduct.name,
      price: newValidProduct.price
    });
  });

  it('should persist modifications in a product when calling update.', async () => {
    await repository.save(newValidProduct);
    newValidProduct.changeName('updatedName');
    newValidProduct.changePrice(20);
    await repository.update(newValidProduct);
    const updatedProductModel = await ProductModel.findOne({ where: { id: newValidProductId } });
    expect(updatedProductModel?.toJSON()).toStrictEqual({
      id: newValidProductId,
      name: newValidProduct.name,
      price: newValidProduct.price
    });
  });

  it('should retrieve the product with the corresponding id when calling findById.', async () => {
    await repository.save(newValidProduct);
    const retrievedProduct = await repository.findById(newValidProductId);
    expect(retrievedProduct).toStrictEqual(newValidProduct);
  });

  it('should throw error when calling findById with an unexistent id.', async () => {
    await repository.save(newValidProduct);
    const unexistentId = 'unexistentId';
    expect(async () => {
      await repository.findById(unexistentId);
    }).rejects.toThrow(`Product with id ${unexistentId} was not found.`);
  });

  it('should retrieve the list of products when calling findByFilter.', async () => {
    const productList = [];
    for (let index = 1; index <= 10; index++) {
      const validProduct = new Product(`index${index}`, `name${index}`, index);
      productList.push(validProduct);
      await repository.save(validProduct);
    }
    const retrievedProducts = await repository.findByFilter();
    expect(retrievedProducts).toStrictEqual(productList);
  });

});
