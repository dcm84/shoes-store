import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: 'idle',
    hits: []
};

export const catalogHitsSlice = createSlice({
    name: 'catalogHits',
    initialState,
    reducers: {
        setHits: (state, action) => {
            state.hits = action.payload;
        },
        setHitsStatus: (state, action) => {
            state.status = action.payload;
        }
    }
})

export const { setHits, setHitsStatus } = catalogHitsSlice.actions
export default catalogHitsSlice.reducer