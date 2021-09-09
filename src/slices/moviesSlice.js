/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { params } from '../utils/params';

const initialState = {
  data: [],
  totalResults: 0,
  status: 'idle',
  error: null,
};

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (title) => {
    if (title) {
      const { data: response } = await axios.get(
        `http://www.omdbapi.com?apikey=faf7e5bb&s=${title}`,
      );
      return response;
    }
    return 'idle';
  },
);

export const nextPageMovies = createAsyncThunk(
  'movies/nextPageMovies',
  async (page) => {
    const { data: response } = await axios.get(
      `http://www.omdbapi.com?apikey=faf7e5bb&s=${params().get(
        'title',
      )}&page=${page}`,
    );
    return response;
  },
);

export const moviesSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    resetMoviesState(state) {
      state.data = initialState.data;
      state.totalResults = initialState.totalResults;
      state.status = initialState.status;
      state.error = initialState.error;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        if (action.payload === 'idle') {
          state.data = initialState.data;
          state.totalResults = initialState.totalResults;
          state.status = initialState.status;
          state.error = initialState.error;
          return;
        }

        state.status = 'succeeded';

        if (action.payload.Response === 'True') {
          state.data = action.payload.Search;
          state.totalResults = +action.payload.totalResults;
          state.error = null;
        } else {
          state.data = [];
          state.totalResults = 0;
          state.error = action.payload.Error;
        }
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.data = [];
        state.totalResults = 0;
        state.error = action.error.message;
      })
      .addCase(nextPageMovies.pending, (state) => {
        state.status = 'loading more';
      })
      .addCase(nextPageMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';

        if (action.payload.Response === 'True') {
          state.data = [...state.data, ...action.payload.Search];
          state.totalResults = +action.payload.totalResults;
          state.error = null;
        } else {
          state.data = [];
          state.totalResults = 0;
          state.error = action.payload.Error;
        }
      })
      .addCase(nextPageMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.data = [];
        state.totalResults = 0;
        state.error = action.error.message;
      });
  },
});

export const { resetMoviesState } = moviesSlice.actions;

export default moviesSlice.reducer;
