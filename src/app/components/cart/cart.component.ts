import { Component, Input } from '@angular/core';
import { CartItem } from '../../models/cartItems';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  @Input() items: CartItem[] = [];
}
