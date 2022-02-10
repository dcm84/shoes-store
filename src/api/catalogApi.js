import { setHitsStatus, setHits } from '../components/Catalog/Slices/catalogHitsSlice';
import { setCategories, setCategoryStatus } from '../components/Catalog/Slices/catalogCategoriesSlice';
import { appendItems, setItemsOffset, setNoMoreItems, setItemsStatus } from '../components/Catalog/Slices/catalogItemsSlice';
import { setItem, setItemStatus } from '../components/Catalog/Slices/catalogItemSlice';
import { loadCartItems, setCartStatus, cleanCartState } from '../components/Catalog/Slices/catalogCartSlice';

const loadHits = () => (dispatch, getState) => {
    dispatch(setHitsStatus("pending"));
    console.log("downloading hits");
    fetch(process.env.REACT_APP_API_URL + "top-sales", { crossDomain: true })
        .then(response => {
            return response.json()
        })
        .then(hits => {
            dispatch(setHits(hits));
            dispatch(setHitsStatus("success"));
        })
        .catch(e => {
            dispatch(setHitsStatus("error"));
        });
}

const loadCategories = () => (dispatch, getState) => {
    dispatch(setCategoryStatus("pending"));
    console.log("downloading categories");
    fetch(process.env.REACT_APP_API_URL + "categories", { crossDomain: true })
        .then(response => {
            return response.json()
        })
        .then(categories => {
            dispatch(setCategories(categories));
            dispatch(setCategoryStatus("success"));
        })
        .catch(e => {
            dispatch(setCategoryStatus("error"));
        });
}

const loadItems = () => (dispatch, getState) => {
    const state = getState();
    const activeCategory = state.catalogCategories.active;
    const categoryQuery = activeCategory === 0 ? "" : "&categoryId=" + activeCategory;
    const offset = state.catalogItems.offset;
    const searchQuery = state.catalogSearch.search
        ? "&q=" + state.catalogSearch.search : "";

    dispatch(setItemsStatus("pending"));
    console.log("downloading items, offset", offset);
    fetch(process.env.REACT_APP_API_URL + "items?offset=" + offset + categoryQuery + searchQuery, { crossDomain: true })
        .then(response => {
            return response.json()
        })
        .then(items => {
            if (items.length < 6) {
                dispatch(setNoMoreItems(true));
            }
            dispatch(setItemsOffset(offset + 6));
            dispatch(appendItems(items));
            dispatch(setItemsStatus("success"));
        })
        .catch(e => {
            dispatch(setItemsStatus("error"));
        });
}

const loadItem = (id) => (dispatch, getState) => {
    dispatch(setItemStatus("pending"));
    console.log("downloading item");
    fetch(process.env.REACT_APP_API_URL + "items/" + id, { crossDomain: true })
        .then(response => {
            return response.json()
        })
        .then(item => {
            dispatch(setItem(item));
            dispatch(setItemStatus("success"));
        })
        .catch(e => {
            dispatch(setItemStatus("error"));
        });
}


const addToCart = (item) => (dispatch, getState) => {
    //продаем по тем ценам, что были раньше, но сколько заказал, пока была акция
    const itemCartId = item.id + item.size + item.price;
    const storedItems = localStorage.cartItems ? JSON.parse(localStorage.cartItems) : {};

    if (storedItems[itemCartId]) {
        storedItems[itemCartId].quantity = storedItems[itemCartId].quantity + item.quantity;
    }
    else {
        storedItems[itemCartId] = {
            id: item.id,
            title: item.title,
            size: item.size,
            price: item.price,
            quantity: item.quantity
        }
    }

    //хранить цену в открытом виде в localStorage - это хорошая попытка разорить магазин:)
    //но таковы условия задачи
    localStorage.setItem('cartItems', JSON.stringify(storedItems));
    dispatch(loadCartItems());
    dispatch(setCartStatus('idle'));
}

const removeFromCart = (id) => (dispatch, getState) => {
    console.log("removing id=", id);
    let storedItems = localStorage.cartItems ? JSON.parse(localStorage.cartItems) : {};

    if (storedItems[id]) {
        delete storedItems[id];
    }

    localStorage.setItem('cartItems', JSON.stringify(storedItems));

    dispatch(loadCartItems());
}

const cleanCart = () => (dispatch, getState) => {
    localStorage.setItem('cartItems', JSON.stringify({}));
    dispatch(cleanCartState());
    dispatch(loadCartItems());
}

const sendOrder = () => (dispatch, getState) => {
    console.log("sending order ...");
    dispatch(setCartStatus("pending"));
    const state = getState();

    const cartState = state.catalogCart;

    let items = [];
    Object.values(cartState.items).forEach(item => {
        items.push(
            {
                "id": item.id,
                "price": item.price,
                "count": item.quantity
            }
        )
    })

    fetch(process.env.REACT_APP_API_URL + "order", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "owner": {
                "phone": cartState.phone,
                "address": cartState.address,
            },
            "items": items
        })
    })
        .then(() => {
            dispatch(cleanCart());
            dispatch(setCartStatus("success"));
        })
        .catch(e => {
            dispatch(setCartStatus("error"));
        });
}

export { loadHits, loadCategories, loadItems, loadItem, addToCart, removeFromCart, sendOrder }; 