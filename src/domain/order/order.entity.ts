import Customer from "../customer/customer.entity";
import Item from "./item.entity";

export default class Order {

  private _id: string;
  private _customerId: string;
  private _items: Item[];

  public constructor(
    id: string,
    customer: Customer,
    items: Item[]
  ) {
    this._id = id;
    this._customerId = customer.id;
    this._items = items;
    this.validateAll();
  }

  public get id(): string {
    return this._id;
  }

  public get customerId(): string {
    return this._customerId;
  }

  public get items(): Item[] {
    return this._items;
  }

  public get total(): number {
    return Order.calculateTotal(this.items);
  }

  private validateAll(): void {
    if (!this.id.length) {
      throw new Error('Id is required.');
    }
    if (!this.items.length) {
      throw new Error('Items are required.');
    }
  }

  private static calculateTotal(items: Item[]): number {
    return items.reduce((total, item) => total + item.total, 0);
  }

}
