import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { literal } from 'sequelize';

@Table({
  tableName: 'texts',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Text extends Model<Text> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  text: string;

  @Column({
    type: 'TIMESTAMP',
    allowNull: false,
    defaultValue: literal('CURRENT_TIMESTAMP'),
  })
  created_at: string;

  @Column({
    type: 'TIMESTAMP',
    allowNull: false,
    defaultValue: literal('CURRENT_TIMESTAMP'),
  })
  updated_at: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  is_deleted: boolean;
}
