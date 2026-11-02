import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartItem } from '../models/cartItems';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterOutlet, Router } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import Swal from 'sweetalert2';
import { ItemsState } from '../store/items.reduce';
import { Store } from '@ngrx/store';
import { add, remove, total } from '../store/item.action';
@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterOutlet],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit {
  items: CartItem[] = [];

  showCart: boolean = false; //variable para controlar si mostramos u ocultamos la vista del carro de compras

  constructor(
    private store: Store<{ items: ItemsState }>,
    private router: Router,
    private sharingDataService: SharingDataService,
  ) {
    this.store.select('items').subscribe((state) => {
      this.items = state.items;
      //this.total = state.total;
      this.saveSession();
      console.log('Cambio el estado');
    });
  }

  ngOnInit(): void {
    //this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
    // this.calculateTotal();
    //this.store.dispatch(total());
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart() {
    this.sharingDataService.productEventEmitter.subscribe((product) => {
      this.store.dispatch(add({ product }));
      this.store.dispatch(total());
      // this.calculateTotal();
      // this.saveSession();
      this.router.navigate(['/cart']);
      Swal.fire({
        title: 'Shoppingt cart',
        text: 'Nuevo producto agregado al carro',
        icon: 'success',
      });
    });
  }

  onDeleteCart(): void {
    this.sharingDataService.idProductEventEmitter.subscribe((id) => {
      console.log(id + ' Se a Ejecutado el evento idProductEventEmitter');

      Swal.fire({
        title: 'Esta seguro que desea eliminar?',
        text: 'Cuidado el item se eliminara del carro de compras!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.items.length == 0) {
            sessionStorage.removeItem('cart');
            sessionStorage.clear();
          }
          //this.calculateTotal();
          this.store.dispatch(remove({ id }));
          this.store.dispatch(total());
          //this.saveSession();
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/cart']);
            });

          Swal.fire({
            title: 'Eliminado!',
            text: 'Se a eliminado el item del carrito de compras.',
            icon: 'success',
          });
        }
      });
    });
  }

  /*   calculateTotal(): void {
    this.total = this.items.reduce(
      (accumulator, item) => accumulator + item.quantity * item.product.price,
      0,
    );
  } */

  //se guarda en sessionSotorage metodo ya nativo
  saveSession(): void {
    //recordar parsear por que solo aseptra string o texto plano
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

  //metodo de vista de el componente de carro de compras
  closeCart(): void {
    this.showCart = !this.showCart;
  }
}
