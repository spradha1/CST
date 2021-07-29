import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { delaySecond } from './stopwatchAPI';


export const incrementAsync = createAsyncThunk('stopwatch/delaySecond',
  async () => {
    await delaySecond();
    return;
  }
);

export const stopwatchSlice = createSlice({

  name: 'stopwatch',
  initialState: {
    minutes: 0,
    seconds: 0,
    running: false,
  },

  reducers: {
    startStop: (state) => {
      state.running = !state.running;
    },
    reset: (state) => {
      state.running = false;
      state.minutes = 0;
      state.seconds = 0;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.fulfilled, (state) => {
        if (state.running) {
          state.seconds += 1;
          if (state.seconds === 60) {
            state.seconds = 0;
            state.minutes += 1;
          }
        }
      });
  },
});

export const { startStop, reset } = stopwatchSlice.actions;

export default stopwatchSlice.reducer;
