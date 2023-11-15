import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import ProductModel from "../product/product.repository.model";
import OrderModel from "./order.repository.model";

@Table({
  tableName: 'items',
  timestamps: false
})
export default class ItemModel extends Model {

  @PrimaryKey
  @Column({ field: 'id' })
  declare id: string;

  @ForeignKey(() => OrderModel)
  @Column({ field: 'order_id', allowNull: false })
  declare orderId: string;

  @BelongsTo(() => OrderModel)
  declare order: OrderModel;

  @ForeignKey(() => ProductModel)
  @Column({ field: 'product_id', allowNull: false })
  declare productId: string;

  @BelongsTo(() => ProductModel)
  declare product: ProductModel;

  @Column({ field: 'quantity', allowNull: false })
  declare quantity: number;

  @Column({ field: 'price', allowNull: false })
  declare price: number;

  @Column({ field: 'total', allowNull: false })
  declare total: number;

}
