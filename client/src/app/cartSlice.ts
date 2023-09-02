import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  cartItems: [],
}

const rtkSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    getCartItems(state, action) {
      state.cartItems = action.payload
    },
    delCartItem(state, action) {
      state.cartItems = state.cartItems.filter((el) => el.id !== action.payload)
    },
    addCartItem(state, action) {
      state.cartItems = [...state.cartItems, action.payload]
    },
  },
})

export default rtkSlice.reducer
export const { getCartItems, delCartItem, addCartItem } = rtkSlice.actions
