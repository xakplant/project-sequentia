import { randomUUID } from 'crypto';
import { IProduct } from '../product.model';

export const mockProduct: IProduct = {
  id: randomUUID(),
  name: 'asd',
  description: 'asd',
  price: 15.75,
  media: 'url',
};
