import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: 'products',
  timestamps: false
})
export default class ProductModel extends Model {

  @PrimaryKey
  @Column({ field: 'id' })
  declare id: string;

  @Column({ field: 'name', allowNull: false })
  declare name: string;

  @Column({ field: 'price', allowNull: false })
  declare price: number;

}
