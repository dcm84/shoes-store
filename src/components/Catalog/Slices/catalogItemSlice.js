import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: 'idle',
    item: null,
    quantity: 1,
    selectedSize: null
};

export const catalogItemSlice = createSlice({
    name: 'catalogItem',
    initialState,
    reducers: {
        setLessItem: (state, action) => {
            if (state.quantity > 1)
                state.quantity--;
        },
        setMoreItem: (state, action) => {
            if (state.quantity < 10)
                state.quantity++;
        },
        setItemSelectedSize: (state, action) => {
            state.selectedSize = action.payload;
        },
        setItem: (state, action) => {
            state.item = action.payload;
        },
        setItemStatus: (state, action) => {
            state.status = action.payload;
        },
        cleanItemState: (state, action) => {
            return initialState;
        }
    }
})

export const { setLessItem, setMoreItem, setItemSelectedSize, setItem, setItemStatus, cleanItemState } = catalogItemSlice.actions
export default catalogItemSlice.reducer