/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

const cartStore = (set: any, get: any) => ({
  cart: [],
  total: 0,
  addCart: (product: any) => {
    const cartData = get().cart;

    const dishExist = cartData.findIndex((dish: any) => dish.name === product.name);

    if(dishExist !== -1) {
      cartData[dishExist].quantity += 1;
      set({
        cart: cartData,
      });
    } else {
      set({
        cart: [...cartData, { ...product, quantity: 1 }],
      });
    }
  },
  deleteCart: (product: any) => {
    const cartData = get().cart;
    const dishExist = cartData.findIndex((dish: any) => dish.name === product.name);

    if(dishExist !== -1) {
      cartData[dishExist].quantity -= 1;
      if(cartData[dishExist].quantity === 0) {
        cartData.splice(dishExist, 1);
      }
      set({
        cart: cartData,
      });
    }
  },
  reset: () => {
    set({
      cart: [],
      total: 0,
    });
  },
});

const useCartStore = create(cartStore);

export default useCartStore;
