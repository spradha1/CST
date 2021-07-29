import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import stopwatchReducer from '../features/stopwatch/stopwatchSlice';
import timerReducer from '../features/timer/timerSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    stopwatch: stopwatchReducer,
    timer: timerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
