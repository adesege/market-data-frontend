import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IMarketWithCoordinates } from '../interfaces/market';

interface SearchState {
  results: IMarketWithCoordinates[]
}

const searchSlice = createSlice({
  initialState: { results: [] } as SearchState,
  name: 'search',
  reducers: {
    setResults(state: SearchState, action: PayloadAction<IMarketWithCoordinates[]>) {
      state.results = action.payload;
    },
  },
});

const { setResults } = searchSlice.actions;

export const searchMarket = (params: any) => async (
  dispatch: Dispatch<PayloadAction<IMarketWithCoordinates[]>>,
) => {
  const { data } = await axios.get<IMarketWithCoordinates[]>('/search', { params });
  dispatch(setResults(data));
};

export default searchSlice.reducer;
