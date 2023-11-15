export default interface Repository<T> {

  save(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  findById(id: string): Promise<T>;
  findByFilter(): Promise<T[]>;

}
