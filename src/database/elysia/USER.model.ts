import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasOne,
  HasMany,
  BelongsTo,
  DefaultScope,
} from "sequelize-typescript";

@DefaultScope(() => ({
  attributes: {
    exclude: ["created_at", "updated_at"],
  },
}))
@Table({
  timestamps: true,
  tableName: "USER",
  modelName: "USER",
})
export class USER extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare username: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare password: string;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;
}
