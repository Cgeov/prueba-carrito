/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

const useCartStore = create((set: any, get: any) => ({
  cart: [],
  total: 0,
  addCart: (product: any) => {
    const cartData = get().cart;
    const dishExist = cartData.findIndex(
      (dish: any) => dish.name === product.name
    );
    if (dishExist !== -1) {
      cartData[dishExist].quantity += 1;
      cartData[dishExist].subTotal =
        cartData[dishExist].quantity * product.price;
      set({
        cart: cartData,
      });
    } else {
      set({
        cart: [
          ...cartData,
          { ...product, quantity: 1, subTotal: product.price },
        ],
      });
    }
  },
  deleteCart: (product: any, deleteAll?: boolean) => {
    const cartData = get().cart;
    const dishExist = cartData.findIndex(
      (dish: any) => dish.name === product.name
    );

    if (dishExist !== -1) {
      cartData[dishExist].quantity -= 1;
      cartData[dishExist].subTotal =
        cartData[dishExist].quantity * product.price;
      if (deleteAll) {
        cartData.splice(dishExist, 1);
      } else if (cartData[dishExist].quantity === 0) {
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
}));

useCartStore.subscribe((cart) => {
  const data = cart.cart;
  if (data.length > 0) {
    let total: number = 0;
    data.forEach((dish: any) => {
      total += dish.subTotal;
    });
    if (total !== cart.total) {
      useCartStore.setState({ total });
    }
  }
});

export default useCartStore;
