import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { product } from '../../data/product.data';

@Component({
  selector: 'div[product-card]',
  imports: [],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  @Input() product!: Product;

  @Output() productEventEmitter: EventEmitter<Product> = new EventEmitter();

  onAddCart(product: Product): void {
    this.productEventEmitter.emit(product);
  }
}
