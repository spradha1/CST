import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { delaySecond } from "./timerAPI";


export interface TimeSet {
  hours: number;
  minutes: number;
  seconds: number;
}

export const decrementAsync = createAsyncThunk('timer/delaySecond',
  async () => {
    await delaySecond();
    return;
  }
);


const timerSlice = createSlice({

  name: 'timer',
  initialState: {
    curTime: {
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    setting: true,
    running: false,
    ringing: false,
  },

  reducers: {
    setTimer: (state, action: PayloadAction<TimeSet>) => {
      state.setting = false;
      state.running = true;
      state.curTime = {
        hours: action.payload.hours,
        minutes: action.payload.minutes,
        seconds: action.payload.seconds,
      }
    },
    stopResume: (state) => {
      state.running = !state.running;
    },
    deleteTimer: (state) => {
      state.setting = true;
      state.running = false;
      state.ringing = false;
      state.curTime = {
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    },
    reset: (state, action: PayloadAction<TimeSet>) => {
      state.running = false;
      state.ringing = false;
      state.curTime = {
        hours: action.payload.hours,
        minutes: action.payload.minutes,
        seconds: action.payload.seconds,
      }
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(decrementAsync.fulfilled, (state) => {
        if (state.running) {
          let newCurTime = Object.assign({}, state.curTime);
          if (state.curTime.seconds === 0) {
            if (state.curTime.minutes === 0) {
              if (state.curTime.hours !== 0) {
                newCurTime.hours -= 1;
                newCurTime.minutes = 59;
                newCurTime.seconds = 59;
              }
            }
            else {
              newCurTime.minutes -= 1;
              newCurTime.seconds = 59;
            }
          }
          else {
            newCurTime.seconds -= 1;
          }

          if (state.curTime.seconds === 1 && state.curTime.minutes === 0 && state.curTime.hours === 0) {
            newCurTime.seconds = 0;
            state.running = false;
            state.ringing = true;
          }

          state.curTime = newCurTime;
        }
      });
  }
});

export const { setTimer, stopResume, deleteTimer, reset} = timerSlice.actions;

export default timerSlice.reducer;