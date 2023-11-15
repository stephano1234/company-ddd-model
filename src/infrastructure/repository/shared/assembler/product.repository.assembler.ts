import Product from "../../../../domain/product/product.entity";
import ProductModel from "../../product/product.repository.model";

export default class ProductAssembler {

  public static toProduct(productModel: ProductModel): Product {
    let product: Product;
    try {
      product = new Product(productModel.id, productModel.name, productModel.price);
    } catch (error) {
      throw error;
    }
    return product;
  }

}
