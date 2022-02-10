import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: 'idle',
    active: 0,
    categories: [
        {
            id: 0, 
            title: 'Все'
        }
    ]
};

export const catalogCategoriesSlice = createSlice({
    name: 'catalogCategories',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = [...initialState.categories, ... action.payload];
        },
        setActiveCategory: (state, action) => {
            state.active = action.payload;
        },
        setCategoryStatus: (state, action) => {
            state.status = action.payload;
        }
    }
})

export const { setCategories, setActiveCategory, setCategoryStatus } = catalogCategoriesSlice.actions
export default catalogCategoriesSlice.reducer