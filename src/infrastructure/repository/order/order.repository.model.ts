import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import CustomerModel from "../customer/customer.repository.model";
import ItemModel from "./item.repository.model";

@Table({
  tableName: 'orders',
  timestamps: false
})
export default class OrderModel extends Model {

  @PrimaryKey
  @Column({ field: 'id' })
  declare id: string;

  @ForeignKey(() => CustomerModel)
  @Column({ field: 'customer_id', allowNull: false })
  declare customerId: string;

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel;

  @HasMany(() => ItemModel)
  declare items: ItemModel[];

  @Column({ field: 'total', allowNull: false })
  declare total: number;

}
