import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ICreateMarket, ICreateMarketResponse, MarketState } from '../interfaces/market';

const marketSlice = createSlice({
  name: 'market',
  initialState: { markets: [] } as MarketState,
  reducers: {
    setMarket(state: MarketState, action: PayloadAction<ICreateMarketResponse>) {
      state.markets = [action.payload, ...state.markets];
    },
    setMarkets(state: MarketState, action: PayloadAction<ICreateMarketResponse[]>) {
      state.markets = action.payload;
    },
  },
});

const { setMarket, setMarkets } = marketSlice.actions;

export const createMarket = (formData: ICreateMarket) => async (
  dispatch: Dispatch<PayloadAction<ICreateMarketResponse>>,
) => {
  const { data } = await axios.post<ICreateMarketResponse>('/markets', formData);
  dispatch(setMarket(data));
};

export const getMarkets = () => async (
  dispatch: Dispatch<PayloadAction<ICreateMarketResponse[]>>,
) => {
  const { data } = await axios.get<ICreateMarketResponse[]>('/markets');
  dispatch(setMarkets(data));
};

export default marketSlice.reducer;
