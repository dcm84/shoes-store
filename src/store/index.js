import { configureStore } from '@reduxjs/toolkit'

import catalogHitsReducer from './slices/catalogHitsSlice';
import catalogCategoriesReducer from './slices/catalogCategoriesSlice';
import catalogItemsReducer from './slices/catalogItemsSlice';
import catalogSearchReducer from './slices/catalogSearchSlice';
import catalogItemReducer from './slices/catalogItemSlice';
import catalogCartReducer from './slices/catalogCartSlice'

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