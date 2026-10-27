import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SharingDataService } from '../../services/sharing-data.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'catalogo',
  imports: [ProductCardComponent],
  templateUrl: './catalogo.component.html',
})
export class CatalogoComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productServices: ProductService,
    private sharingDataService: SharingDataService,
  ) {}

  ngOnInit(): void {
    this.products = this.productServices.findAll();
  }

  onAddCart(product: Product) {
    this.sharingDataService.productEventEmitter.emit(product);
  }
}
