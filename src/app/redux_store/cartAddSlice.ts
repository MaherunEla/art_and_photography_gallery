import { createSlice } from "@reduxjs/toolkit";
//import { HomeGalleryData } from "../../../components/HomeGallery";
import { AdProduct } from "@/types";

const slice = createSlice({
  name: "cart",
  initialState: {
    products: [] as AdProduct[],
  },
  reducers: {
    addCart: (state, action: any) => {
      const isExist = state.products.find(
        (product: any) => product.id === action.payload.id
      );
      if (!isExist) {
        state.products.push(action.payload);
        localStorage.setItem("cart", JSON.stringify(state.products));
      }
    },
    addAllCart: (state, action: any) => {
      state.products = action.payload;
    },
    removeCart: (state, action) => {
      const findId = state.products.findIndex(
        (product) => product.id === action.payload
      );
      if (findId !== -1) {
        state.products.splice(findId, 1);
        localStorage.setItem("cart", JSON.stringify(state.products));
      }
    },
    addQuantity: (state, action) => {
      const findId = state.products.findIndex(
        (product) => product.id === action.payload
      );
      if (findId !== -1) {
        const productQuantity = state.products[findId];

        productQuantity["quantity"] = productQuantity["quantity"] + 1;
        state.products[findId] = productQuantity;
        localStorage.setItem("cart", JSON.stringify(state.products));
      }
    },
    decrementQuantity: (state, action) => {
      const findId = state.products.findIndex(
        (product) => product.id === action.payload
      );
      if (findId !== -1) {
        const productQuantity = state.products[findId];
        productQuantity["quantity"] = productQuantity["quantity"] - 1;
        state.products[findId] = productQuantity;
        localStorage.setItem("cart", JSON.stringify(state.products));
      }
    },
  },
});

export const {
  addCart,
  addAllCart,
  removeCart,
  addQuantity,
  decrementQuantity,
} = slice.actions;
export default slice.reducer;
