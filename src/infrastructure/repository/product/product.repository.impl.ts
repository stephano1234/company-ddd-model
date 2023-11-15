import Product from "../../../domain/product/product.entity";
import ProductRepository from "../../../domain/product/repository/product.repository.interface";
import ProductAssembler from "../shared/assembler/product.repository.assembler";
import ProductModel from "./product.repository.model";

export default class ProductRepositoryImpl implements ProductRepository {

  public async save(product: Product): Promise<void> {
    await ProductModel.create({
      id: product.id,
      name: product.name,
      price: product.price
    });
  }

  public async update(product: Product): Promise<void> {
    await ProductModel.update({
      name: product.name,
      price: product.price
    }, { where: { id: product.id } });
  }

  public async findById(id: string): Promise<Product> {
    let productModel: ProductModel;
    try {
      productModel = await ProductModel.findOne({ where: { id }, rejectOnEmpty: true });
    } catch {
      throw new Error(`Product with id ${id} was not found.`);
    }
    return ProductAssembler.toProduct(productModel);
  }

  public async findByFilter(): Promise<Product[]> {
    const productModels = await ProductModel.findAll();
    return productModels.map(ProductAssembler.toProduct);
  }

}
