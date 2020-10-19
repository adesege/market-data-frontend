import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ICreateMarket, MarketState } from '../interfaces/market';

const marketSlice = createSlice({
  name: 'market',
  initialState: {
    markets: [],
    market: {
      name: '',
      description: '',
      category: '',
      images: ['', '', ''],
      address: '',
    },
  } as MarketState,
  reducers: {
    addMarket(state: MarketState, action: PayloadAction<ICreateMarket>) {
      state.markets = [action.payload, ...state.markets];
    },
    setMarket(state: MarketState, action: PayloadAction<ICreateMarket>) {
      state.market = action.payload;
    },
    updateMarket(state: MarketState, action: PayloadAction<ICreateMarket>) {
      const index = state.markets.findIndex((item) => item.id === action.payload.id);
      if (index > -1) {
        state.markets[index] = action.payload;
      }
      state.market = action.payload;
    },
    removeMarket(state: MarketState, action: PayloadAction<string>) {
      const index = state.markets.findIndex((item) => item.id === action.payload);
      if (index > -1) {
        state.markets.splice(index, 1);
      }
    },
    setMarkets(state: MarketState, action: PayloadAction<ICreateMarket[]>) {
      state.markets = action.payload;
    },
  },
});

const {
  addMarket,
  setMarket,
  setMarkets,
  updateMarket,
  removeMarket,
} = marketSlice.actions;

export const createMarket = (formData: ICreateMarket) => async (
  dispatch: Dispatch<PayloadAction<ICreateMarket>>,
) => {
  const { data } = await axios.post<ICreateMarket>('/markets', formData);
  dispatch(addMarket(data));
};

export const editMarket = (formData: ICreateMarket) => async (
  dispatch: Dispatch<PayloadAction<ICreateMarket>>,
) => {
  const { data } = await axios.patch<ICreateMarket>(`/markets/${formData.id}`, formData);
  dispatch(updateMarket(data));
};

export const getMarkets = () => async (
  dispatch: Dispatch<PayloadAction<ICreateMarket[]>>,
) => {
  const { data } = await axios.get<ICreateMarket[]>('/markets');
  dispatch(setMarkets(data));
};

export const getMarket = (marketId: string) => async (
  dispatch: Dispatch<PayloadAction<ICreateMarket>>,
) => {
  const { data } = await axios.get<ICreateMarket>(`/markets/${marketId}`);
  dispatch(setMarket(data));
};

export const deleteMarket = (marketId: string) => async (
  dispatch: Dispatch<PayloadAction<string>>,
) => {
  await axios.delete(`/markets/${marketId}`);
  dispatch(removeMarket(marketId));
};

export default marketSlice.reducer;
