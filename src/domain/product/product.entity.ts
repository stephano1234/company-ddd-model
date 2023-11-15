export default class Product {

  private _id: string;
  private _name: string;
  private _price: number;

  public constructor(
    id: string,
    name: string,
    price: number
  ) {
    this._id = id;
    this._name = name;
    this._price = price;
    this.validateAll();
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get price(): number {
    return this._price;
  }

  public changeName(newName: string): void {
    this._name = newName;
    this.validateName();
  }

  public changePrice(newPrice: number): void {
    this._price = newPrice;
    this.validatePrice();
  }

  private validateAll(): void {
    if (!this.id.length) {
      throw new Error('Id is required.');
    }
    this.validateName();
    this.validatePrice();
  }

  private validateName(): void {
    if (!this.name.length) {
      throw new Error('Name is required.');
    }
  }

  private validatePrice(): void {
    if (this.price < 0) {
      throw new Error('Price must be greater than or equal to 0.');
    }
  }

}
