import Product from "../product/product.entity";

export default class Item {

  private _id: string;
  private _productId: string;
  private _price: number;
  private _quantity: number;

  public constructor(
    id: string,
    product: Product,
    quantity: number
  ) {
    this._id = id;
    this._productId = product.id;
    this._price = product.price;
    this._quantity = quantity;
    this.validateAll();
  }

  public get id(): string {
    return this._id;
  }

  public get productId(): string {
    return this._productId;
  }

  public get price(): number {
    return this._price;
  }

  public get quantity(): number {
    return this._quantity;
  }

  public get total(): number {
    return Item.calculateTotal(this.price, this.quantity);
  }

  public changeQuantity(newQuantity: number): void {
    this._quantity = newQuantity;
    this.validateQuantity();
  }

  private validateAll(): void {
    if (!this.id.length) {
      throw new Error('Id is required.');
    }
    this.validateQuantity();
  }

  private validateQuantity(): void {
    if (this.quantity <= 0) {
      throw new Error('Quantity must be greater than 0.');
    }
  }

  private static calculateTotal(price: number, quantity: number): number {
    return price * quantity;
  }

}
