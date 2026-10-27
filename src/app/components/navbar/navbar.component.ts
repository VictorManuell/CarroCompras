import { Component, Input } from '@angular/core';
import { CartItem } from '../../models/cartItems';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @Input() items: CartItem[] = [];
  @Input() total: number = 0;
  @Input() products: Product[] = [];
}
