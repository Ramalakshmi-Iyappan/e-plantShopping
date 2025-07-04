import { createSlice } from '@reduxjs/toolkit';

const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        const plant = action.payload;
      const existingItem = state.items.find(item => item.name === plant.name);

      if (existingItem) {
        // If plant exists, increase quantity
        existingItem.quantity += 1;
      } else {
        // Add new plant with quantity 1
        state.items.push({ ...plant, quantity: 1 });
      }
    
    },
    removeItem: (state, action) => {
        const plantName = action.payload; // expecting plant name as string
      state.items = state.items.filter(item => item.name !== plantName);
    },
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload; // destructure name and new quantity
        const item = state.items.find(item => item.name === name);
  
        if (item) {
          item.quantity = quantity;
        }

    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
