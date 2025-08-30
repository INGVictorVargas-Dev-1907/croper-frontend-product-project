import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './reducers/productsReducer';
import alertReducer from './reducers/alertReducer';
import filterReducer from './reducers/filterReducer';
import authReducer from './reducers/authReducer';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        alert: alertReducer,
        filters: filterReducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['persist/PERSIST'],
        },
        }),
});

export default store;