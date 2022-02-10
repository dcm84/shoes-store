import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: 'idle',
    items: localStorage.cartItems ? JSON.parse(localStorage.cartItems) : {},
    phone: "",
    address: "",
    accepted: false
};

export const catalogCartSlice = createSlice({
    name: 'catalogCart',
    initialState,
    reducers: {
        changeCartField: (state, action) => {
            const { name, value } = action.payload;
            if(name === "accepted"){
                state[name] = (value === "false") ? true : false;
            }
            else state[name] = value;
        },
        loadCartItems: (state, action) => {
            state.items = localStorage.cartItems ? JSON.parse(localStorage.cartItems) : {};
        },
        setCartStatus: (state, action) => {
            state.status = action.payload;
        },
        cleanCartState: (state, action) => {
            return initialState;
        }
    }
})

export const { changeCartField, loadCartItems, setCartStatus, cleanCartState } = catalogCartSlice.actions
export default catalogCartSlice.reducer