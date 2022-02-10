import { configureStore } from '@reduxjs/toolkit'

import catalogHitsReducer from '../components/Catalog/Slices/catalogHitsSlice';
import catalogCategoriesReducer from '../components/Catalog/Slices/catalogCategoriesSlice';
import catalogItemsReducer from '../components/Catalog/Slices/catalogItemsSlice';
import catalogSearchReducer from '../components/Catalog/Slices/catalogSearchSlice';
import catalogItemReducer from '../components/Catalog/Slices/catalogItemSlice';
import catalogCartReducer from '../components/Catalog/Slices/catalogCartSlice'


const store = configureStore({
  reducer: {
    catalogHits: catalogHitsReducer,
    catalogCategories: catalogCategoriesReducer,
    catalogItems: catalogItemsReducer,
    catalogSearch: catalogSearchReducer,
    catalogItem: catalogItemReducer,
    catalogCart: catalogCartReducer,
  }
});

export default store;