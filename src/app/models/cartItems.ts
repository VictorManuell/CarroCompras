import { Product } from './products';

export class CartItem {
  quantity: number = 0;
  product!: Product;
}
