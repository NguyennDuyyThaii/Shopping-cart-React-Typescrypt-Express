import { configureStore} from '@reduxjs/toolkit';
import cartsSlice, { calculateSubtotal } from '../features/cartsSlice';
import { productsApi } from '../features/productsApi';
import productsSlice, { productsFetch } from '../features/productsSlice';

export const store = configureStore({
  reducer: {
    products: productsSlice,
    carts: cartsSlice,
    [productsApi.reducerPath]: productsApi.reducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(productsApi.middleware)
  
});

store.dispatch(productsFetch())
store.dispatch(calculateSubtotal(null))


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
