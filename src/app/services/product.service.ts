import { Injectable } from '@angular/core';
import { Product } from '../models/products';
import { products } from '../data/products.data';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  findAll(): Observable<Product[]> {
    return of(products);
  }
}
