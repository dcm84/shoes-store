import { setHitsStatus, setHits } from '../store/slices/catalogHitsSlice';
import { setCategories, setCategoryStatus } from '../store/slices/catalogCategoriesSlice';
import { appendItems, setItemsOffset, setNoMoreItems, setItemsStatus } from '../store/slices/catalogItemsSlice';
import { setItem, setItemStatus } from '../store/slices/catalogItemSlice';
import { setCartStatus, cleanCart } from '../store/slices/catalogCartSlice';

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
            console.log("отправляем заказ");
            dispatch(cleanCart());
            dispatch(setCartStatus("success"));
        })
        .catch(e => {
            dispatch(setCartStatus("error"));
        });
}

export { loadHits, loadCategories, loadItems, loadItem, sendOrder }; 