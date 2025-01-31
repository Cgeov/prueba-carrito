/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

const cartStore = (set: any, get: any) => ({
  cart: [],
  total: 0,
  addCart: (product: any) => {
    set((state: any) => ({
      cart: [...state.cart, { ...product, status: "available" }],
      noOfAvailable: state.noOfAvailable + 1,
    }));
  },
  issueBook: (id: number) => {
    const cart = get().cart;
    const updatedBooks = cart?.map((dish: any) => {
      if (dish.id === id) {
        return {
          ...cart,
          status: "issued",
        };
      } else {
        return cart;
      }
    });
    set((state: any) => ({
      books: updatedBooks,
      noOfAvailable: state.noOfAvailable - 1,
      noOfIssued: state.noOfIssued + 1,
    }));
  },
  returnBook: (id: number) => {
    const cart = get().cart;
    const updatedBooks = cart?.map((dish: any) => {
      if (dish.id === id) {
        return {
          ...dish,
          status: "available",
        };
      } else {
        return dish;
      }
    });
    set((state: any) => ({
      books: updatedBooks,
      noOfAvailable: state.noOfAvailable + 1,
      noOfIssued: state.noOfIssued - 1,
    }));
  },
  reset: () => {
    set({
      cart: [],
      noOfAvailable: 0,
      noOfIssued: 0,
    });
  },
});

const useCartStore = create(cartStore);

export default useCartStore;
