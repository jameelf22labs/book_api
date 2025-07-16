import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "@sequelize/core";
import {
  Attribute,
  AutoIncrement,
  Default,
  NotNull,
  PrimaryKey,
} from "@sequelize/core/decorators-legacy";

export class Reviews extends Model {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey()
  @AutoIncrement()
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare bookId: number;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare userId: number;

  @Attribute(DataTypes.INTEGER)
  @Default(() => "0.00")
  declare rating: number;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare comment: string;

  @Attribute(DataTypes.DATE)
  @Default(() => new Date())
  declare createdAt: Date;
}
