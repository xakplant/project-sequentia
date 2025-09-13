import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';
import { UUID } from 'crypto';

export interface IProduct {
  id: UUID;
  name: string;
  description: string;
  price: number;
  media: string;
}

export class Product extends Model<IProduct> {}

Product.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    media: {
      type: DataTypes.STRING,
    },
  },
  { sequelize, tableName: 'products' },
);
