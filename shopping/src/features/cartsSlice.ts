import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export interface CartState {
  cartItems: [] | any;
  cartTotalQuantity: number;
  cartTotalAmount: number;
}

const initialState: CartState = {
  // Argument of type 'string | null' is not assignable to parameter of type 'string'. Type 'null' is not assignable to type 'string'
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems") || "{}")
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item: any) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(`increased ${state.cartItems[itemIndex].name} quantity`, {
          position: "bottom-left",
        });
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`added ${action.payload.name} a new product to cart`, {
          position: "bottom-left",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    
    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (item: any) => item.id !== action.payload.id
      );
      state.cartItems = nextCartItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      toast.error(`${action.payload.name} removed from cart`, {
        position: "bottom-left",
      });
    },

    decreaseCartQuantity(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item: any) => item.id === action.payload.id
      );
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.success(
          `Decrease quantity of ${action.payload.name} successfully`
        );
      } else if ((state.cartItems[itemIndex].cartQuantity = 1)) {
        const nextCartItems = state.cartItems.filter(
          (item: any) => item.id !== action.payload.id
        );
        state.cartItems = nextCartItems;

        toast.error(`Can not decrease quantity of ${action.payload.name}`, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    increaseCartQuantity(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item: any) => item.id === action.payload.id
      );
      if (state.cartItems[itemIndex].cartQuantity > 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.success(
          `Increase quantity of ${action.payload.name} successfully`
        );
      } else {
        const nextCartItems = state.cartItems.filter(
          (item: any) => item.id !== action.payload.id
        );
        state.cartItems = nextCartItems;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    cleanCart(state, action) {
      state.cartItems = [];
      toast.error("Cart cleaned", { position: "bottom-left" });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    calculateSubtotal(state, action) {
      if (state.cartItems.length > 0) {
        state.cartTotalQuantity = state.cartItems
          .map((item: any) => item.cartQuantity)
          .reduce((a: any, b: any) => a + b);
        state.cartTotalAmount = state.cartItems
          .map((item: any) => item.cartQuantity * item.price)
          .reduce((a: any, b: any) => a + b);
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseCartQuantity,
  increaseCartQuantity,
  cleanCart,
  calculateSubtotal,
} = cartSlice.actions;

export default cartSlice.reducer;
