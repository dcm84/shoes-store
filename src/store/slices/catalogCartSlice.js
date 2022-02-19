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
        addCartItems: (state, action) => {
            const item = action.payload;
            const itemCartId = item.id + item.size + item.price;
            if (state.items[itemCartId]) {
                state.items[itemCartId].quantity = state.items[itemCartId].quantity + item.quantity;
            }
            else {
                state.items[itemCartId] = {
                    id: item.id,
                    title: item.title,
                    size: item.size,
                    price: item.price,
                    quantity: item.quantity
                }
            }
        },
        removeCartItem: (state, action) => {
            const id = action.payload;
            if (state.items[id]) {
                delete state.items[id];
            }
            return state;
        },
        setCartStatus: (state, action) => {
            state.status = action.payload;
        },
        cleanCart: (state, action) => {
            return {
                status: 'idle',
                items: {},
                phone: "",
                address: "",
                accepted: false
            }
        }
    }
})

export const { changeCartField, loadCartItems, addCartItems, removeCartItem, setCartStatus, cleanCart } = catalogCartSlice.actions
export default catalogCartSlice.reducer