import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ICreateMarket, ICreateMarketResponse, MarketState } from '../interfaces/market';

const marketSlice = createSlice({
  name: 'market',
  initialState: { market: [] } as MarketState,
  reducers: {
    setMarket(state: MarketState, action: PayloadAction<ICreateMarketResponse>) {
      state.market = [action.payload, ...state.market];
    },
  },
});

const { setMarket } = marketSlice.actions;

export const createMarket = (formData: ICreateMarket) => async (
  dispatch: Dispatch<PayloadAction<ICreateMarketResponse>>,
) => {
  const { data } = await axios.post<ICreateMarketResponse>('/market', formData);
  dispatch(setMarket(data));
};

export default marketSlice.reducer;
