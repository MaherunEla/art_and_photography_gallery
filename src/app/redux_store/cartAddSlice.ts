import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdProduct } from "@/types";

interface CartState {
  products: AdProduct[];
}

const initialState: CartState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<AdProduct>) => {
      const isExist = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (!isExist) {
        state.products.push(action.payload);
        localStorage.setItem("cart", JSON.stringify(state.products));
      }
    },
    addAllCart: (state, action: PayloadAction<AdProduct[]>) => {
      state.products = action.payload;
      localStorage.setItem("cart", JSON.stringify(state.products));
    },
    removeCart: (state, action: PayloadAction<string>) => {
      const findId = state.products.findIndex(
        (product) => product.id === action.payload
      );
      if (findId !== -1) {
        state.products.splice(findId, 1);
        localStorage.setItem("cart", JSON.stringify(state.products));
      }
    },
    addQuantity: (state, action: PayloadAction<string>) => {
      const findId = state.products.findIndex(
        (product) => product.id === action.payload
      );
      if (findId !== -1) {
        state.products[findId].quantity += 1;
        localStorage.setItem("cart", JSON.stringify(state.products));
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const findId = state.products.findIndex(
        (product) => product.id === action.payload
      );
      if (findId !== -1) {
        state.products[findId].quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(state.products));
      }
    },
    clearCart: (state) => {
      state.products = [];
      localStorage.removeItem("cart");
    },
  },
});

export const {
  addCart,
  addAllCart,
  removeCart,
  addQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";
// //import { HomeGalleryData } from "../../../components/HomeGallery";
// import { AdProduct } from "@/types";

// const slice = createSlice({
//   name: "cart",
//   initialState: {
//     products: [] as AdProduct[],
//   },
//   reducers: {
//     addCart: (state, action: any) => {
//       const isExist = state.products.find(
//         (product: any) => product.id === action.payload.id
//       );
//       if (!isExist) {
//         //state.products = [...state.products, action.payload];
//         state.products.push(action.payload);
//         localStorage.setItem("cart", JSON.stringify(state.products));
//       }
//     },
//     addAllCart: (state, action: any) => {
//       state.products = action.payload;
//     },
//     removeCart: (state, action) => {
//       const findId = state.products.findIndex(
//         (product) => product.id === action.payload
//       );
//       if (findId !== -1) {
//         state.products.splice(findId, 1);
//         localStorage.setItem("cart", JSON.stringify(state.products));
//       }
//     },
//     addQuantity: (state, action) => {
//       const findId = state.products.findIndex(
//         (product) => product.id === action.payload
//       );
//       if (findId !== -1) {
//         const productQuantity = state.products[findId];

//         productQuantity["quantity"] = productQuantity["quantity"] + 1;
//         state.products[findId] = productQuantity;
//         localStorage.setItem("cart", JSON.stringify(state.products));
//       }
//     },
//     decrementQuantity: (state, action) => {
//       const findId = state.products.findIndex(
//         (product) => product.id === action.payload
//       );
//       if (findId !== -1) {
//         const productQuantity = state.products[findId];
//         productQuantity["quantity"] = productQuantity["quantity"] - 1;
//         state.products[findId] = productQuantity;
//         localStorage.setItem("cart", JSON.stringify(state.products));
//       }
//     },
//     clearCart: (state) => {
//       state.products = [];
//       localStorage.removeItem("cart");
//     },
//   },
// });

// export const {
//   addCart,
//   addAllCart,
//   removeCart,
//   addQuantity,
//   decrementQuantity,
//   clearCart,
// } = slice.actions;
// export default slice.reducer;
