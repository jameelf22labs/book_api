import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import {
  Attribute,
  AutoIncrement,
  Default,
  HasMany,
  NotNull,
  PrimaryKey,
} from "@sequelize/core/decorators-legacy";
import { Reviews } from "./Reviews.model";

export class Books extends Model {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey()
  @AutoIncrement()
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare title: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare author: string;

  @Attribute(DataTypes.STRING)
  declare description: string;

  @Attribute(DataTypes.STRING)
  declare genre: string;

  @Attribute(DataTypes.DATE)
  declare published_year: Date;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare createdBy: number;

  @Attribute(DataTypes.FLOAT)
  @Default(0.0)
  declare averageRating: number;

  @Attribute(DataTypes.DATE)
  @Default(() => new Date())
  declare createdAt: CreationOptional<Date>;

  @HasMany(() => Reviews, "bookId")
  declare reviews?: NonAttribute<Reviews[]>;
}
