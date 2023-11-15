import Address from "./address.value-object";

export default class Customer {

  private _id: string;
  private _name: string;
  private _address: Address | null = null;
  private _active = false;
  private _rewardPoints = 0;

  public constructor(
    id: string,
    name: string
  ) {
    this._id = id;
    this._name = name;
    this.validateAll();
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get address(): Address | null {
    return this._address;
  }

  public get rewardPoints(): number {
    return this._rewardPoints;
  }

  public get isActive(): boolean {
    return this._active;
  }

  public changeName(newName: string): void {
    this._name = newName;
    this.validateName();
  }

  public addOrChangeAddress(newAddress: Address): void {
    this._address = newAddress;
  }

  public clearAddress(): void {
    this._address = null;
  }

  public activate(): void {
    if (this.address === null) {
      throw new Error('Address is required for activating.');
    }
    this._active = true;
  }

  public deactivate(): void {
    this._active = false;
  }

  public addRewardPoints(points: number): void {
    this._rewardPoints += points;
  }

  public clearRewardPoints(): void {
    this._rewardPoints = 0;
  }

  private validateAll(): void {
    if (!this.id.length) {
      throw new Error('Id is required.');
    }
    this.validateName();
  }

  private validateName(): void {
    if (!this.name.length) {
      throw new Error('Name is required.');
    }
  }

}
