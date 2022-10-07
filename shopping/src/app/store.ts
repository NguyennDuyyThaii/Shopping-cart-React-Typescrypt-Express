import { configureStore} from '@reduxjs/toolkit';
import authSlice, { loadUser } from '../features/authSlice';
import cartsSlice, { calculateSubtotal } from '../features/cartsSlice';
import { productsApi } from '../features/productsApi';
import productsSlice, { productsFetch } from '../features/productsSlice';

export const store = configureStore({
  reducer: {
    products: productsSlice,
    carts: cartsSlice,
    auth: authSlice,
    [productsApi.reducerPath]: productsApi.reducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(productsApi.middleware)
  
});

store.dispatch(productsFetch())
store.dispatch(calculateSubtotal(null))
store.dispatch(loadUser(null))


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
