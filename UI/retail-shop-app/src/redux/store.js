import { configureStore } from '@reduxjs/toolkit';
import pricingReducer from './slices/pricingSlice';

const store = configureStore({
  reducer: {
    pricing: pricingReducer,
  },
});

export default store;
