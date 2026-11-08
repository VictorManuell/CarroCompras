import { createReducer, on } from '@ngrx/store';
import { Product } from '../models/products';
import { findAll, load } from './product.action';

const products: Product[] = [];

const initialState = {
  products,
};

export const productReducer = createReducer(
  initialState,
  on(load, (state) => ({ products: [...state.products] })),
  on(findAll, (state, { products }) => ({ products: [...products] })),
);
