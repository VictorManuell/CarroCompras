import { createAction, props } from '@ngrx/store';
import { Product } from '../models/products';

export const load = createAction('load');

export const findAll = createAction(
  'findAll',
  props<{ products: Product[] }>(),
);
