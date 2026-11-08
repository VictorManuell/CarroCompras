import { Component, EventEmitter, OnInit } from '@angular/core';
import { CartItem } from '../../models/cartItems';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { ItemsState } from '../../store/items.reduce';
import { Store } from '@ngrx/store';
import { total } from '../../store/item.action';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  total = 0;

  constructor(
    private store: Store<{ items: ItemsState }>,
    private sharingDataService: SharingDataService,
    private router: Router,
  ) {
    this.store.select('items').subscribe((state) => {
      this.items = state.items;
      this.total = state.total;
    });
  }
  ngOnInit(): void {
   
  }

  onDeleteCart(id: number) {
    this.sharingDataService.idProductEventEmitter.emit(id);
  }
}
