import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: 'idle',
    offset: 0,
    noMoreItems: false,
    items: [
    ]
};

export const catalogItemsSlice = createSlice({
    name: 'catalogItems',
    initialState,
    reducers: {
        appendItems: (state, action) => {
            state.items = [...state.items, ...action.payload];
        },
        cleanItems: (state, action) => {
            state.items = [];
            state.offset = 0;
            state.noMoreItems = false;
        },
        setItemsOffset: (state, action) => {
            state.offset = action.payload;
        },
        setNoMoreItems: (state, action) => {
            state.noMoreItems = action.payload;
        },
        setItemsStatus: (state, action) => {
            state.status = action.payload;
        }
    }
})

export const { appendItems, setItemsOffset, setNoMoreItems, setItemsStatus, cleanItems } = catalogItemsSlice.actions
export default catalogItemsSlice.reducer