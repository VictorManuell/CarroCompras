import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../services/product.service';
import { findAll, load } from '../product.action';
import { catchError, EMPTY, exhaustMap, map } from 'rxjs';

@Injectable()
export class ProductsEffects {
  private actions$ = inject(Actions);
  private service = inject(ProductService);

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(load),
      exhaustMap(() =>
        this.service.findAll().pipe(
          map((products) => findAll({ products })),
          catchError((error: unknown) => {
            console.error('Error al cargar los productos:', error);
            return EMPTY;
          }),
        ),
      ),
    ),
  );
}
