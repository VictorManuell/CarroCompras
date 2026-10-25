import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CartItem } from '../../models/cartItems';
import { Product } from '../../models/product';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnChanges {
  @Input() items: CartItem[] = [];
  total = 0;
  @Output() idProductEventEmitter = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    // let itemsChanges = changes['items'];
    this.calculateTotal();
    this.saveSession();
    /* if (!itemsChanges.firstChange) {
    } */
  }
  onDeleteCart(id: number) {
    this.idProductEventEmitter.emit(id);
  }

  calculateTotal(): void {
    this.total = this.items.reduce(
      (accumulator, item) => accumulator + item.quantity * item.product.price,
      0,
    );
  }

  //se guarda en sessionSotorage metodo ya nativo
  saveSession(): void {
    //recordar parsear por que solo aseptra string o texto plano
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }
}
