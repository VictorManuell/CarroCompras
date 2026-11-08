import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { itemsReducer } from './store/items.reduce';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { productReducer } from './store/product.reducer';
import { provideEffects } from '@ngrx/effects';
import { ProductsEffects } from './store/effects/products.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Rendimiento optimizado
    provideRouter(routes), // Rutas de la app
    provideStore({
      items: itemsReducer, // Estado del carrito
      products: productReducer, // Estado del catálogo
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(ProductsEffects), // Efectos de la app
  ],
};
