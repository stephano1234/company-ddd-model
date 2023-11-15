export default class Address {

  private _street: string;
  private _number: number;
  private _zip: string;
  private _city: string;

  public constructor(
    street: string,
    number: number,
    zip: string,
    city: string
  ) {
    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;
    this.validateAll();
  }

  public get street(): string {
    return this._street;
  }

  public get number(): number {
    return this._number;
  }

  public get zip(): string {
    return this._zip;
  }

  public get city(): string {
    return this._city;
  }

  private validateAll(): void {
    if (!this.street.length) {
      throw new Error('Street is required.');
    }
    if (this.number <= 0) {
      throw new Error('Number must be greater than or equal to 0.');
    }
    if (!this.zip.length) {
      throw new Error('Zip is required.');
    }
    if (!this.city.length) {
      throw new Error('City is required.');
    }
  }

  public toString(): string {
    return `${this.street}, ${this.number}, ${this.zip} ${this.city}`;
  }

}
