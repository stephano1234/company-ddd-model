import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: 'customers',
  timestamps: false
})
export default class CustomerModel extends Model {

  @PrimaryKey
  @Column({ field: 'id' })
  declare id: string;

  @Column({ field: 'name', allowNull: false })
  declare name: string;

  @Column({ field: 'street', type: DataType.STRING })
  declare street: string | null;

  @Column({ field: 'number', type: DataType.NUMBER })
  declare number: number | null;

  @Column({ field: 'zip', type: DataType.STRING })
  declare zip: string | null;

  @Column({ field: 'city', type: DataType.STRING })
  declare city: string | null;

  @Column({ field: 'active', allowNull: false })
  declare active: boolean;

  @Column({ field: 'rewardPoints', allowNull: false })
  declare rewardPoints: number;

}
