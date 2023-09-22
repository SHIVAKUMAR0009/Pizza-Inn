import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      //payload=newitem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // pizzaId=action.paylaod
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // pizzaId=action.paylaod
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },

    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },

    clearCart(state) {
      state.cart = [];
    },
  },
});
export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;
export const getTotalCartQuantity = (state) =>
  //here state is an callback function ////and we use this custom selectorr function right in the useselector hook
  state.cart.cart.reduce((sum, currentitem) => sum + currentitem.quantity, 0);

export const getTotalCartPrice = (state) =>
  //here state is an callback function ////and we use this custom selectorr function right in the useselector hook
  state.cart.cart.reduce((sum, currentitem) => sum + currentitem.totalPrice, 0);
export const getItemById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
