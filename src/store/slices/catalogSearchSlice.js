import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    quickSearch: '',
    display: false,
    search: '',
    searchField: ''
};

export const catalogSearchSlice = createSlice({
    name: 'catalogSearch',
    initialState,
    reducers: {
        setQuickSearch: (state, action) => {
            state.quickSearch = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        setSearchDisplay: (state, action) => {
            state.display = action.payload;
        },
        setSearchField: (state, action) => {
            state.searchField = action.payload;
        }
    }
})

export const { setQuickSearch, setSearch, setSearchDisplay, setSearchField } = catalogSearchSlice.actions
export default catalogSearchSlice.reducer