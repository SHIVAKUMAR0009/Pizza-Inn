import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../src/feautures/user/userSlice';
import cartReducer from '../src/feautures/cart/CartSlice';
const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});
export default store;
