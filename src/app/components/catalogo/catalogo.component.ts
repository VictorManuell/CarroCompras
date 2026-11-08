import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/products';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SharingDataService } from '../../services/sharing-data.service';
import { Store } from '@ngrx/store';
import { load } from '../../store/product.action';

@Component({
  selector: 'catalogo',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalogo.component.html',
})
export class CatalogoComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private store: Store<{ products: { products: Product[] } }>,
    private sharingDataService: SharingDataService,
  ) {
    this.store.select('products').subscribe((state) => {
      this.products = state.products;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(load());
  }

  onAddCart(product: Product) {
    this.sharingDataService.productEventEmitter.emit(product);
  }
}
