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
  Unique,
} from "@sequelize/core/decorators-legacy";
import { Books } from "./Books.model";
import { Reviews } from "./Reviews.model";

export class Users extends Model {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey()
  @AutoIncrement()
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  @Unique
  declare email: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare password: string;

  @Attribute(DataTypes.DATE)
  @Default(() => new Date())
  declare createdAt: Date;

  @HasMany(() => Books, "createdBy")
  declare books?: NonAttribute<Books[]>;

  @HasMany(() => Reviews, "userId")
  declare reviews?: NonAttribute<Reviews[]>;
}
