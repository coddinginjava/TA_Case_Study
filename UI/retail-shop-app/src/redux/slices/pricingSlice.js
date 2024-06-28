import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const uploadPricingFeed = createAsyncThunk(
  'pricing/uploadPricingFeed',
  async (formData) => {
    const response = await api.post('/upload', formData);
    return response.data;
  }
);

export const searchPricingRecords = createAsyncThunk(
  'pricing/searchPricingRecords',
  async (searchTerm) => {
    const response = await api.get(`/pricing?search=${searchTerm}`);
    return response.data;
  }
);

export const updatePricingRecord = createAsyncThunk(
  'pricing/updatePricingRecord',
  async (record) => {
    const response = await api.put(`/pricing/${record.id}`, record);
    return response.data;
  }
);

const pricingSlice = createSlice({
  name: 'pricing',
  initialState: {
    records: [],
    selectedRecord: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setSelectedRecord: (state, action) => {
      state.selectedRecord = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadPricingFeed.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadPricingFeed.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.records = action.payload;
      })
      .addCase(uploadPricingFeed.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(searchPricingRecords.fulfilled, (state, action) => {
        state.records = action.payload;
      })
      .addCase(updatePricingRecord.fulfilled, (state, action) => {
        const index = state.records.findIndex((record) => record.id === action.payload.id);
        if (index !== -1) {
          state.records[index] = action.payload;
        }
      });
  },
});

export const { setSelectedRecord } = pricingSlice.actions;
export const selectPricingRecords = (state) => state.pricing.records;
export const selectSelectedRecord = (state) => state.pricing.selectedRecord;

export default pricingSlice.reducer;
