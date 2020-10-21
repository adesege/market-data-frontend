import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
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
  try {
    const { data } = await axios.get<IMarketWithCoordinates[]>('/search', { params });
    dispatch(setResults(data));
  } catch (error) {
    const exception: AxiosError = error;
    if (exception.response.status === 404) {
      dispatch(setResults([]));
    }
    throw error;
  }
};

export default searchSlice.reducer;
